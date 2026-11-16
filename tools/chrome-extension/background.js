/* Kawaki Agent Chrome Bridge v2: Manifest V3 service worker.

   Connects to the local bridge server (ws://127.0.0.1:8765). The server only accepts this extension
   (its ID is pinned by the "key" in manifest.json) and only takes commands from local clients holding
   the token in tools/chrome-bridge/.token. Web pages cannot reach it.

   Built for agents that pay per token:
   - snapshot: the page as short lines, interactive elements numbered [n] so later calls say "click 12"
   - text / table / links: just the part you need, windowed with max + offset
   - click / type / select / press / scroll / wait, with an optional snapshot of the result in the same call
   - screenshot: scaled JPEG saved to disk by the server, so no base64 comes back to the agent
   - batch: several steps in one round trip
   - eval and cdp: full control through the Chrome DevTools Protocol when you need it

   Commands without an explicit tabId go to the agent tab (set by "open" or "use"), else the active tab.
   Older scripts that send no "v" field get the original v1 behaviour (see legacy.js). */

importScripts('legacy.js');

const BRIDGE_WS_URL = 'ws://127.0.0.1:8765';
const VERSION = chrome.runtime.getManifest().version;
const LEGACY_ONLY = new Set(['get_content', 'upload_file', 'inspect_contra', 'contra_eval']);

let ws = null;
let reconnectTimer = null;
let heartbeatTimer = null;
let agentTabId = null;
let agentWindowId = null;
let cdpBlockedUntil = 0;
const activity = [];
const attached = new Map(); // tabId -> idle detach timer

const sleep = ms => new Promise(r => setTimeout(r, ms));
const clip = (s, n) => { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n) + '...' : s; };

chrome.storage.session.get(['agentTabId', 'agentWindowId']).then(s => {
  if (agentTabId == null && s.agentTabId != null) agentTabId = s.agentTabId;
  if (agentWindowId == null && s.agentWindowId != null) agentWindowId = s.agentWindowId;
}).catch(() => {});

function setAgentTab(id) { agentTabId = id; chrome.storage.session.set({ agentTabId: id }).catch(() => {}); }
function setAgentWindow(id) { agentWindowId = id; chrome.storage.session.set({ agentWindowId: id }).catch(() => {}); }

/* ---------- connection ---------- */

function send(obj) {
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
}

function connectBridge() {
  if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) return;
  try {
    ws = new WebSocket(BRIDGE_WS_URL);
  } catch (e) {
    scheduleReconnect();
    return;
  }
  ws.onopen = () => {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
    startHeartbeat();
    send({ event: 'hello', version: VERSION });
  };
  ws.onmessage = async (event) => {
    let msg;
    try { msg = JSON.parse(event.data); } catch (e) { return; }
    const { id, action } = msg;
    if (id == null) return;
    const params = msg.params || {};
    if (action === 'ping' || action === 'keepalive') return send({ id, result: { pong: true } });
    const t0 = Date.now();
    let result = null;
    let error = null;
    try {
      result = await handleCommand(action, params);
    } catch (err) {
      error = (err && err.message) || String(err);
    }
    note(action, params, error, Date.now() - t0);
    send({ id, result, error });
  };
  ws.onclose = () => {
    stopHeartbeat();
    ws = null;
    scheduleReconnect();
  };
  ws.onerror = () => {
    try { ws.close(); } catch (e) { /* closing anyway */ }
  };
}

function scheduleReconnect() {
  if (!reconnectTimer) reconnectTimer = setTimeout(() => { reconnectTimer = null; connectBridge(); }, 2000);
}

function startHeartbeat() {
  stopHeartbeat();
  // A message every 20 s keeps the service worker alive while the bridge is connected.
  heartbeatTimer = setInterval(() => send({ event: 'ping' }), 20000);
}

function stopHeartbeat() {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

function note(action, p, error, ms) {
  // What the popup shows. Never records typed values.
  const target = p.url || (p.ref != null ? 'ref ' + p.ref : '') || p.selector || (action === 'click' ? p.text : '') || (p.steps ? p.steps.length + ' steps' : '');
  activity.push({ t: Date.now(), a: action, d: clip(target || '', 70), ok: !error, ms, e: error ? clip(error, 120) : undefined });
  if (activity.length > 40) activity.shift();
}

/* ---------- tabs ---------- */

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab && tab.id) return tab.id;
  const [anyTab] = await chrome.tabs.query({ active: true });
  if (anyTab && anyTab.id) return anyTab.id;
  throw new Error('No active browser tab found');
}

async function tabFor(p) {
  if (p.tabId) return Number(p.tabId);
  if (agentTabId != null) {
    try { await chrome.tabs.get(agentTabId); return agentTabId; } catch (e) { setAgentTab(null); }
  }
  return getActiveTabId();
}

/* Waits for a page load. With expectNav it ignores the "complete" state of the page being left. */
function waitForTabLoad(tabId, timeoutMs = 30000, expectNav = false) {
  return new Promise(resolve => {
    let done = false;
    let sawLoading = false;
    const finish = (timedOut) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      chrome.tabs.onUpdated.removeListener(listener);
      resolve({ timedOut: !!timedOut });
    };
    const timer = setTimeout(() => finish(true), timeoutMs);
    function listener(id, info, tab) {
      if (id !== tabId) return;
      if (info.status === 'loading') sawLoading = true;
      if (info.status === 'complete' && (sawLoading || !expectNav)) finish(false);
      // Hash-only navigations change the URL without a load.
      if (info.url && !sawLoading) setTimeout(() => chrome.tabs.get(tabId).then(t => { if (!sawLoading && t.status === 'complete') finish(false); }).catch(() => finish(false)), 600);
    }
    chrome.tabs.onUpdated.addListener(listener);
    if (!expectNav) chrome.tabs.get(tabId).then(t => { if (t.status === 'complete') finish(false); }).catch(() => finish(false));
  });
}

async function pageInfo(tabId, extra) {
  const t = await chrome.tabs.get(tabId);
  return Object.assign({ tab: t.id, title: clip(t.title, 120), url: t.url }, extra || {});
}

chrome.tabs.onRemoved.addListener(id => {
  if (id === agentTabId) setAgentTab(null);
  if (attached.has(id)) { clearTimeout(attached.get(id)); attached.delete(id); }
});
chrome.windows.onRemoved.addListener(id => { if (id === agentWindowId) setAgentWindow(null); });

/* ---------- page scripts (self-contained: they run inside the page, in the extension's isolated world) ---------- */

async function inject(tabId, func, args, world) {
  const res = await chrome.scripting.executeScript({ target: { tabId }, func, args: args || [], world: world || 'ISOLATED' });
  const v = res && res[0] ? res[0].result : undefined;
  if (v && v.error) throw new Error(v.error);
  return v;
}

function snapshotFn(o) {
  try {
    const clean = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    const cut = (s, n) => (s.length > n ? s.slice(0, n) + '...' : s);
    const root = o.selector ? document.querySelector(o.selector) : (document.body || document.documentElement);
    if (!root) return { error: 'No element matches ' + o.selector };
    const VW = innerWidth;
    const VH = innerHeight;
    const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|HEAD|META|LINK|svg|CANVAS|VIDEO|AUDIO|OBJECT|EMBED)$/;
    const ROLES = new Set(['button', 'link', 'tab', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'checkbox', 'radio', 'switch', 'option', 'combobox', 'textbox', 'searchbox', 'slider', 'spinbutton', 'treeitem']);
    const NESTED = 'a[href],button,input,select,textarea,[role=button],[role=link],[role=checkbox],[role=tab],[role=menuitem],[role=option],[role=switch]';
    const TABLES = 'table,[role=table],[role=grid],[role=treegrid]';
    const allTables = Array.from(document.querySelectorAll(TABLES)).filter(t => !(t.parentElement && t.parentElement.closest(TABLES)));
    const refs = [];
    const lines = [];
    let buf = '';
    let prefix = '';
    let visited = 0;
    let stopped = false;

    const add = line => {
      if (prefix) { line = prefix + line; prefix = ''; }
      if (lines.length && lines[lines.length - 1] === line) return;
      lines.push(line);
    };
    const flush = () => { const t = clean(buf); buf = ''; if (t) add(cut(t, 400)); };
    const inView = el => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.right > 0 && r.top < VH && r.left < VW; };

    function kindOf(el, cs, role) {
      const tag = el.tagName;
      if (role && ROLES.has(role)) return role;
      if (tag === 'A') return el.hasAttribute('href') ? 'link' : null;
      if (tag === 'BUTTON' || tag === 'SUMMARY') return 'button';
      if (tag === 'INPUT') {
        const t = (el.getAttribute('type') || 'text').toLowerCase();
        if (t === 'hidden') return null;
        if (/^(button|submit|reset|image)$/.test(t)) return 'button';
        if (t === 'checkbox' || t === 'radio') return t;
        return 'input:' + t;
      }
      if (tag === 'SELECT') return 'select';
      if (tag === 'TEXTAREA') return 'textarea';
      if (el.isContentEditable && el.hasAttribute('contenteditable')) return 'editable';
      if (o.pointer !== false && cs.cursor === 'pointer' && el.parentElement && getComputedStyle(el.parentElement).cursor !== 'pointer') {
        const t = clean(el.innerText);
        if (t && t.length < 80) return 'clickable';
      }
      return null;
    }

    function nameOf(el) {
      let n = el.getAttribute('aria-label') || '';
      const lb = el.getAttribute('aria-labelledby');
      if (!n && lb) n = lb.split(/\s+/).map(id => { const e = document.getElementById(id); return e ? (e.innerText || e.textContent) : ''; }).join(' ');
      if (!n && el.labels && el.labels.length) n = el.labels[0].innerText;
      if (!n && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) n = el.getAttribute('placeholder') || el.getAttribute('name') || el.title || '';
      if (!n && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) n = el.innerText || '';
      if (!clean(n)) n = el.title || (el.querySelector('img[alt]') || {}).alt || el.getAttribute('data-tooltip') || '';
      return cut(clean(n), 90);
    }

    function stateOf(el, k) {
      const s = [];
      if (/^input:|^(textarea|editable|textbox|searchbox|combobox)$/.test(k)) {
        const type = (el.getAttribute('type') || '').toLowerCase();
        let v = clean('value' in el && el.tagName !== 'BUTTON' ? el.value : el.innerText);
        if (type === 'password') v = v ? '***' : '';
        if (v || /^input:|textarea/.test(k)) s.push('=' + JSON.stringify(cut(v, 60)));
      }
      if (k === 'select') {
        const opt = el.selectedOptions && el.selectedOptions[0];
        s.push('=' + JSON.stringify(opt ? clean(opt.text) : '') + ' (' + el.options.length + ' options)');
      }
      if (el.checked === true || el.getAttribute('aria-checked') === 'true') s.push('checked');
      if (el.getAttribute('aria-selected') === 'true') s.push('selected');
      const ex = el.getAttribute('aria-expanded');
      if (ex) s.push(ex === 'true' ? 'expanded' : 'collapsed');
      if (el.getAttribute('aria-pressed') === 'true') s.push('pressed');
      const cur = el.getAttribute('aria-current');
      if (cur && cur !== 'false') s.push('current');
      if (el.disabled || el.getAttribute('aria-disabled') === 'true') s.push('disabled');
      if (k === 'link' && o.hrefs !== false) {
        const h = el.getAttribute('href') || '';
        if (h && !/^(#|javascript:)/i.test(h)) {
          let u = h;
          try { const abs = new URL(h, location.href); u = abs.origin === location.origin ? abs.pathname + abs.search : abs.href; } catch (e) { /* keep raw */ }
          s.push('-> ' + cut(u, 80));
        }
      }
      return s.length ? ' ' + s.join(' ') : '';
    }

    function rowsOf(t) {
      if (t.tagName === 'TABLE') return Array.from(t.rows).map(r => Array.from(r.cells).map(c => clean(c.innerText)));
      return Array.from(t.querySelectorAll('[role=row]')).filter(r => r.closest(TABLES) === t)
        .map(r => Array.from(r.querySelectorAll('[role=cell],[role=gridcell],[role=columnheader],[role=rowheader]')).filter(c => c.closest('[role=row]') === r).map(c => clean(c.innerText)));
    }

    function emitTable(t) {
      const rows = rowsOf(t).filter(r => r.some(Boolean));
      const idx = allTables.indexOf(t);
      add('[table ' + idx + '] ' + rows.length + ' rows');
      const n = o.rows == null ? 8 : o.rows;
      rows.slice(0, n).forEach(r => add('| ' + r.map(c => cut(c, 60)).join(' | ')));
      if (rows.length > n) add('... +' + (rows.length - n) + ' rows (table ' + idx + ')');
    }

    function kids(node) {
      if (node.shadowRoot) return node.shadowRoot.childNodes;
      if (node.tagName === 'SLOT') { const a = node.assignedNodes({ flatten: true }); return a.length ? a : node.childNodes; }
      return node.childNodes;
    }

    function walk(node, noText) {
      for (const c of Array.from(kids(node))) {
        if (stopped) return;
        if (c.nodeType === 3) { if (!noText) buf += c.nodeValue; continue; }
        if (c.nodeType !== 1) continue;
        if (++visited > 40000) { stopped = true; return; }
        const el = c;
        const tag = el.tagName;
        if (SKIP.test(tag)) continue;
        if (tag === 'BR') { flush(); continue; }
        if (el.getAttribute('aria-hidden') === 'true') continue;
        if (tag === 'IFRAME' || tag === 'FRAME') { flush(); add('[iframe] ' + cut(el.src || '', 100)); continue; }
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') continue;
        if (cs.opacity === '0' && tag !== 'INPUT') continue;
        if (o.viewport && cs.display !== 'contents' && cs.position !== 'fixed' && !inView(el)) continue;
        const role = (el.getAttribute('role') || '').toLowerCase();
        const block = cs.display !== 'inline' && cs.display !== 'contents';

        if (o.tables !== 'walk' && (tag === 'TABLE' || role === 'table' || role === 'grid' || role === 'treegrid')) { flush(); emitTable(el); continue; }

        const hm = /^H([1-6])$/.exec(tag);
        const level = hm ? +hm[1] : (role === 'heading' ? (+el.getAttribute('aria-level') || 2) : 0);
        if (level) {
          flush();
          if (el.querySelector(NESTED)) { prefix = '#'.repeat(level) + ' '; walk(el, noText); flush(); prefix = ''; }
          else { const t = clean(el.innerText); if (t) add('#'.repeat(level) + ' ' + cut(t, 200)); }
          continue;
        }

        const k = kindOf(el, cs, role);
        if (k) {
          flush();
          const i = refs.push(el);
          add('[' + i + ']' + k + ' ' + JSON.stringify(nameOf(el)) + stateOf(el, k));
          if (!/^(input:|select|textarea|checkbox|radio)/.test(k) && el.querySelector(NESTED)) walk(el, true);
          continue;
        }

        if (role === 'dialog' || role === 'alertdialog' || tag === 'DIALOG') {
          flush();
          add('[dialog ' + JSON.stringify(cut(clean(el.getAttribute('aria-label') || ''), 60)) + ']');
          walk(el, noText);
          flush();
          add('[/dialog]');
          continue;
        }

        if (block) flush();
        walk(el, noText);
        if (block) flush();
      }
    }

    walk(root, false);
    flush();
    globalThis.__kawakiRefs = refs;

    let out = lines;
    if (o.interactive) out = out.filter(l => /^(\[\d|#|\[table|\[dialog|\[\/dialog)/.test(l));
    if (o.grep) { const re = new RegExp(o.grep, 'i'); out = out.filter(l => re.test(l)); }
    const text = out.join('\n');
    const total = text.length;
    const off = Math.max(0, o.offset || 0);
    const max = o.max || 6000;
    let body = text.slice(off, off + max);
    if (off + max < total) { const nl = body.lastIndexOf('\n'); if (nl > max * 0.5) body = body.slice(0, nl); }
    body = body.replace(/^\n/, '');
    const end = off + body.length + (off > 0 ? 1 : 0);
    const se = document.scrollingElement || document.documentElement;
    let head = document.title + ' | ' + location.href;
    if (o.viewport) head += ' | scroll ' + Math.round(se.scrollTop) + '/' + Math.max(0, se.scrollHeight - se.clientHeight);
    if (stopped) head += ' | (page too large: stopped after 40000 elements, use --sel)';
    const tail = end < total ? '\n... ' + (total - end) + ' more chars: offset=' + end : '';
    return { text: head + '\n' + (body || '(nothing matched)') + tail, refs: refs.length };
  } catch (e) {
    return { error: 'snapshot failed: ' + (e && e.message) };
  }
}

function actFn(op, o) {
  try {
    const clean = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    const refs = globalThis.__kawakiRefs || [];
    const vis = e => {
      if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true, checkOpacity: true, checkVisibilityCSS: true })) return false;
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const roleOf = e => {
      const r = e.getAttribute('role');
      if (r) return r;
      const t = e.tagName;
      if (t === 'A') return 'link';
      if (t === 'BUTTON' || t === 'SUMMARY') return 'button';
      if (t === 'INPUT') return /^(button|submit|reset|image)$/.test(e.type) ? 'button' : (e.type === 'checkbox' || e.type === 'radio') ? e.type : 'textbox';
      if (t === 'TEXTAREA') return 'textbox';
      if (t === 'SELECT') return 'select';
      return t.toLowerCase();
    };
    const describe = el => {
      const r = el.getAttribute('role');
      const field = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      const n = clean(el.getAttribute('aria-label') || (field ? ((el.labels && el.labels[0] && el.labels[0].innerText) || el.getAttribute('placeholder') || el.name) : el.innerText) || el.title || '').slice(0, 60);
      return el.tagName.toLowerCase() + (r ? '[' + r + ']' : '') + ' "' + n + '"';
    };
    const CLICKABLE = 'a[href],button,[role=button],[role=link],[role=tab],[role=option],[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio],[role=row],[role=checkbox],[role=radio],[role=switch],[role=treeitem],label,summary,[onclick],[tabindex="0"]';

    function byText(text, role, nth) {
      const want = clean(text).toLowerCase();
      const nm = e => clean(e.getAttribute('aria-label') || e.innerText || e.value || e.title || e.getAttribute('placeholder') || '').toLowerCase();
      let cands = Array.from(document.querySelectorAll('a[href],button,input,select,textarea,summary,label,[role],[onclick],[tabindex]'))
        .filter(e => !/^(presentation|none|generic|group|region|main|navigation|banner|contentinfo|complementary|document|application|list|listitem|img)$/.test(e.getAttribute('role') || ''))
        .filter(vis);
      if (role) cands = cands.filter(e => roleOf(e) === role);
      const innermost = hits => hits.filter(e => !hits.some(x => x !== e && e.contains(x)));
      for (const test of [n => n === want, n => n.startsWith(want), n => n.includes(want)]) {
        const hits = innermost(cands.filter(e => test(nm(e))));
        if (hits.length) return hits[nth || 0] || null;
      }
      if (role) return null;
      // Any visible element whose own text matches, then its nearest clickable ancestor.
      const all = Array.from(document.body.querySelectorAll('*')).filter(e => !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(e.tagName));
      let hits = all.filter(e => (e.innerText || '').toLowerCase().includes(want) && vis(e));
      hits = innermost(hits);
      const exact = hits.filter(e => clean(e.innerText).toLowerCase() === want);
      const pick = (exact.length ? exact : hits)[nth || 0];
      return pick ? (pick.closest(CLICKABLE) || pick) : null;
    }

    function find() {
      if (o.ref != null) {
        const el = refs[Number(o.ref) - 1];
        if (!el || !el.isConnected) throw new Error('ref ' + o.ref + ' is gone (the page changed). Run snapshot again.');
        return el;
      }
      if (o.selector) {
        let el = null;
        let bad = false;
        try { el = document.querySelector(o.selector); } catch (e) { bad = true; }
        if (el) return el;
        if (!bad) throw new Error('No element matches selector ' + o.selector);
        const t = byText(o.selector, o.role, o.nth);
        if (t) return t;
        throw new Error('Nothing matches "' + o.selector + '"');
      }
      if (o.text) {
        const el = byText(o.text, o.role, o.nth);
        if (el) return el;
        throw new Error('Nothing visible matches text "' + o.text + '"' + (o.role ? ' with role ' + o.role : ''));
      }
      throw new Error('Say which element: ref, selector or text');
    }

    function scroller() {
      const se = document.scrollingElement || document.documentElement;
      if (se.scrollHeight > se.clientHeight + 5) return se;
      let best = null;
      let area = 0;
      for (const e of document.querySelectorAll('body *')) {
        if (e.scrollHeight <= e.clientHeight + 20) continue;
        const oy = getComputedStyle(e).overflowY;
        if (oy !== 'auto' && oy !== 'scroll') continue;
        const a = e.clientWidth * e.clientHeight;
        if (a > area) { area = a; best = e; }
      }
      return best || se;
    }

    if (op === 'click') {
      const el = find();
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (o.trusted) return { x, y, desc: describe(el) };
      const base = { bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, button: 0 };
      el.dispatchEvent(new PointerEvent('pointerover', base));
      el.dispatchEvent(new PointerEvent('pointerdown', Object.assign({ pointerId: 1, isPrimary: true, pointerType: 'mouse' }, base)));
      el.dispatchEvent(new MouseEvent('mousedown', base));
      if (typeof el.focus === 'function') { try { el.focus({ preventScroll: true }); } catch (e) { /* not focusable */ } }
      el.dispatchEvent(new PointerEvent('pointerup', Object.assign({ pointerId: 1, isPrimary: true, pointerType: 'mouse' }, base)));
      el.dispatchEvent(new MouseEvent('mouseup', base));
      if (typeof el.click === 'function') el.click(); else el.dispatchEvent(new MouseEvent('click', base));
      return { desc: describe(el) };
    }

    if (op === 'rect') {
      const el = find();
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, x0: r.left, y0: r.top, w: r.width, h: r.height, sx: scrollX, sy: scrollY, desc: describe(el) };
    }

    if (op === 'focus') {
      const el = find();
      el.scrollIntoView({ block: 'center' });
      el.focus();
      if (o.clear !== false) {
        if (typeof el.select === 'function') el.select();
        else if (el.isContentEditable) { const rg = document.createRange(); rg.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); }
      }
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, desc: describe(el) };
    }

    if (op === 'type') {
      const el = find();
      el.scrollIntoView({ block: 'center' });
      el.focus();
      const v = String(o.value == null ? '' : o.value);
      if (el.isContentEditable) {
        if (o.clear !== false) { const rg = document.createRange(); rg.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); }
        document.execCommand('insertText', false, v);
      } else if ('value' in el && /^(INPUT|TEXTAREA)$/.test(el.tagName)) {
        const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, o.clear === false ? el.value + v : v);
        el.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: v }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        throw new Error(describe(el) + ' does not take text');
      }
      return { desc: describe(el) };
    }

    if (op === 'select') {
      const el = find();
      if (el.tagName !== 'SELECT') throw new Error(describe(el) + ' is not a <select>. Click it, then click the option.');
      const want = clean(o.value).toLowerCase();
      const opts = Array.from(el.options);
      const opt = opts.find(x => x.value.toLowerCase() === want) || opts.find(x => clean(x.text).toLowerCase() === want) || opts.find(x => clean(x.text).toLowerCase().includes(want));
      if (!opt) throw new Error('No option "' + o.value + '". Options: ' + opts.map(x => clean(x.text)).slice(0, 25).join(' | '));
      el.value = opt.value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return { desc: describe(el), selected: clean(opt.text) };
    }

    if (op === 'key') {
      const el = document.activeElement || document.body;
      const init = { key: o.key, code: o.code || o.key, bubbles: true, cancelable: true, ctrlKey: !!o.ctrl, shiftKey: !!o.shift, altKey: !!o.alt, metaKey: !!o.meta };
      const go = el.dispatchEvent(new KeyboardEvent('keydown', init));
      el.dispatchEvent(new KeyboardEvent('keypress', init));
      el.dispatchEvent(new KeyboardEvent('keyup', init));
      if (o.key === 'Enter' && go && el.form && el.tagName === 'INPUT') { try { el.form.requestSubmit(); } catch (e) { el.form.submit(); } }
      return { pressed: o.key, synthetic: true };
    }

    if (op === 'scroll') {
      if (o.ref != null || o.selector || o.text) {
        const el = find();
        el.scrollIntoView({ block: 'center' });
        return { to: describe(el) };
      }
      const s = o.container ? document.querySelector(o.container) : scroller();
      if (!s) throw new Error('No scroll container ' + o.container);
      if (o.to === 'top') s.scrollTop = 0;
      else if (o.to === 'bottom') s.scrollTop = s.scrollHeight;
      else s.scrollBy(0, o.dy != null ? Number(o.dy) : Math.round(s.clientHeight * 0.85));
      return { y: Math.round(s.scrollTop), max: Math.max(0, s.scrollHeight - s.clientHeight) };
    }

    if (op === 'text') {
      const el = (o.ref != null || o.selector) ? find() : document.body;
      const t = (el.innerText || el.textContent || '').replace(/[ \t ]+/g, ' ').replace(/ ?\n ?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
      const off = Math.max(0, o.offset || 0);
      const max = o.max || 4000;
      const part = t.slice(off, off + max);
      return { text: part + (off + max < t.length ? '\n... ' + (t.length - off - max) + ' more chars: offset=' + (off + max) : '') };
    }

    if (op === 'table') {
      const SEL = 'table,[role=table],[role=grid],[role=treegrid]';
      let tables = Array.from(document.querySelectorAll(SEL)).filter(t => !(t.parentElement && t.parentElement.closest(SEL)));
      if (o.selector) {
        const s = document.querySelector(o.selector);
        if (!s) throw new Error('No element matches ' + o.selector);
        tables = s.matches(SEL) ? [s] : Array.from(s.querySelectorAll(SEL)).filter(t => !(t.parentElement && t.parentElement.closest(SEL) && s.contains(t.parentElement.closest(SEL))));
      }
      const rowsOf = t => {
        const rows = t.tagName === 'TABLE'
          ? Array.from(t.rows).map(r => Array.from(r.cells).map(c => clean(c.innerText)))
          : Array.from(t.querySelectorAll('[role=row]')).filter(r => r.closest(SEL) === t)
            .map(r => Array.from(r.querySelectorAll('[role=cell],[role=gridcell],[role=columnheader],[role=rowheader]')).filter(c => c.closest('[role=row]') === r).map(c => clean(c.innerText)));
        return rows.filter(r => r.some(Boolean));
      };
      if (!tables.length) return { text: 'No tables on this page.' };
      if (o.index == null && tables.length > 1) {
        return { text: tables.map((t, i) => { const r = rowsOf(t); return '[table ' + i + '] ' + r.length + ' rows: ' + (r[0] || []).join(' | ').slice(0, 160); }).join('\n') + '\n(read one: table <index>)' };
      }
      const idx = o.index == null ? 0 : Number(o.index);
      const t = tables[idx];
      if (!t) throw new Error('No table ' + idx + '; there are ' + tables.length);
      const rows = rowsOf(t);
      const off = Math.max(0, o.offset || 0);
      const max = o.rows || 100;
      const body = rows.slice(off, off + max);
      const lines = (off > 0 && rows[0] ? [rows[0]].concat(body) : body).map(r => r.join('\t'));
      const more = rows.length - (off + max);
      return { text: '[table ' + idx + '] ' + rows.length + ' rows\n' + lines.join('\n') + (more > 0 ? '\n... ' + more + ' more rows: offset=' + (off + max) : '') };
    }

    if (op === 'links') {
      const scope = o.selector ? document.querySelector(o.selector) : document;
      if (!scope) throw new Error('No element matches ' + o.selector);
      const re = o.grep ? new RegExp(o.grep, 'i') : null;
      const seen = new Set();
      const out = [];
      for (const a of scope.querySelectorAll('a[href]')) {
        const href = a.href;
        if (!href || /^javascript:/i.test(href) || seen.has(href)) continue;
        const t = clean(a.innerText || a.getAttribute('aria-label') || a.title || '');
        if (re && !re.test(t + ' ' + href)) continue;
        seen.add(href);
        out.push(t.slice(0, 80) + ' -> ' + href);
        if (out.length >= (o.max || 150)) break;
      }
      return { text: out.join('\n') || 'No links.' };
    }

    return { error: 'Unknown page op ' + op };
  } catch (e) {
    return { error: (e && e.message) || String(e) };
  }
}

async function waitFn(o) {
  const t0 = Date.now();
  const timeout = o.timeout || 10000;
  const test = () => {
    if (o.selector) {
      let el;
      try { el = document.querySelector(o.selector); } catch (e) { return 'bad selector: ' + o.selector; }
      const ok = !!el && (!el.checkVisibility || el.checkVisibility());
      return o.gone ? !ok : ok;
    }
    if (o.text) {
      const has = ((document.body && document.body.innerText) || '').toLowerCase().includes(String(o.text).toLowerCase());
      return o.gone ? !has : has;
    }
    return true;
  };
  while (Date.now() - t0 < timeout) {
    const r = test();
    if (r === true) return { ok: true, ms: Date.now() - t0 };
    if (typeof r === 'string') return { error: r };
    await new Promise(res => setTimeout(res, 250));
  }
  return { ok: false, ms: Date.now() - t0 };
}

function settleFn(quiet, max) {
  return new Promise(resolve => {
    const start = Date.now();
    let timer = null;
    let cap = null;
    let obs = null;
    const done = () => { if (obs) obs.disconnect(); clearTimeout(timer); clearTimeout(cap); resolve({ ms: Date.now() - start }); };
    obs = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(done, quiet); });
    obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
    timer = setTimeout(done, quiet);
    cap = setTimeout(done, max);
  });
}

/* ---------- Chrome DevTools Protocol (trusted input, eval, screenshots of background tabs) ---------- */

chrome.debugger.onDetach.addListener((src, reason) => {
  if (src.tabId != null) { clearTimeout(attached.get(src.tabId)); attached.delete(src.tabId); }
  // The person pressed "Cancel" on Chrome's debugging bar: respect it for five minutes.
  if (reason === 'canceled_by_user') cdpBlockedUntil = Date.now() + 5 * 60 * 1000;
});

async function cdp(tabId, method, params) {
  if (Date.now() < cdpBlockedUntil) throw new Error('Debugging was cancelled in Chrome; trusted input, eval and background screenshots are paused for a few minutes.');
  if (!attached.has(tabId)) {
    try {
      await chrome.debugger.attach({ tabId }, '1.3');
    } catch (e) {
      if (!/already attached/i.test(e.message || '')) throw new Error('Could not attach the debugger: ' + e.message);
    }
    attached.set(tabId, null);
  }
  clearTimeout(attached.get(tabId));
  attached.set(tabId, setTimeout(() => detach(tabId), 45000));
  return chrome.debugger.sendCommand({ tabId }, method, params || {});
}

async function detach(tabId) {
  clearTimeout(attached.get(tabId));
  attached.delete(tabId);
  try { await chrome.debugger.detach({ tabId }); } catch (e) { /* already gone */ }
}

async function trustedClick(tabId, x, y) {
  await cdp(tabId, 'Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await cdp(tabId, 'Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await cdp(tabId, 'Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
}

const KEYS = {
  Enter: [13, '\r'], Tab: [9, ''], Escape: [27, ''], Backspace: [8, ''], Delete: [46, ''], Space: [32, ' '],
  ArrowUp: [38, ''], ArrowDown: [40, ''], ArrowLeft: [37, ''], ArrowRight: [39, ''],
  Home: [36, ''], End: [35, ''], PageUp: [33, ''], PageDown: [34, '']
};

function parseKey(combo) {
  const parts = String(combo).split('+');
  const key = parts.pop() || '+';
  const mods = parts.map(m => m.toLowerCase());
  return {
    key,
    ctrl: mods.includes('control') || mods.includes('ctrl'),
    shift: mods.includes('shift'),
    alt: mods.includes('alt'),
    meta: mods.includes('meta') || mods.includes('cmd')
  };
}

async function pressKey(tabId, combo) {
  const k = parseKey(combo);
  let code;
  let text;
  if (KEYS[k.key]) [code, text] = KEYS[k.key];
  else if (k.key.length === 1) { code = k.key.toUpperCase().charCodeAt(0); text = k.key; }
  else throw new Error('Unknown key "' + k.key + '". Use Enter, Tab, Escape, Backspace, Delete, Space, Arrow*, Home, End, PageUp, PageDown or one character.');
  const modifiers = (k.alt ? 1 : 0) | (k.ctrl ? 2 : 0) | (k.meta ? 4 : 0) | (k.shift ? 8 : 0);
  const key = k.key === 'Space' ? ' ' : k.key;
  const codeName = KEYS[k.key] ? (k.key === 'Space' ? 'Space' : k.key) : (/[a-z]/i.test(k.key) ? 'Key' + k.key.toUpperCase() : /\d/.test(k.key) ? 'Digit' + k.key : '');
  const base = { modifiers, key, code: codeName, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code };
  const commands = k.ctrl && !k.alt && !k.shift && k.key.toLowerCase() === 'a' ? ['selectAll'] : undefined;
  await cdp(tabId, 'Input.dispatchKeyEvent', Object.assign({}, base, { type: text && !k.ctrl && !k.alt && !k.meta ? 'keyDown' : 'rawKeyDown', text: text && !k.ctrl && !k.alt && !k.meta ? text : undefined, commands }));
  await cdp(tabId, 'Input.dispatchKeyEvent', Object.assign({}, base, { type: 'keyUp' }));
}

async function evalCode(tabId, code) {
  const src = String(code || '').trim().replace(/;+\s*$/, '');
  try {
    const asExpr = '(async () => (\n' + src + '\n))()';
    const check = await cdp(tabId, 'Runtime.compileScript', { expression: asExpr, sourceURL: '', persistScript: false });
    const expression = check.exceptionDetails ? '(async () => {\n' + src + '\n})()' : asExpr;
    const r = await cdp(tabId, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true, timeout: 30000 });
    if (r.exceptionDetails) {
      const ex = r.exceptionDetails;
      throw Object.assign(new Error((ex.exception && ex.exception.description) || ex.text || 'Script error'), { fromPage: true });
    }
    return { value: r.result ? r.result.value : undefined };
  } catch (e) {
    if (e.fromPage) throw e;
    // No debugger here (for example a chrome:// page, or debugging was cancelled): try the page's own world.
    let res;
    try {
      res = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: async (c) => {
        try {
          let fn;
          try { fn = new Function('return (async () => (' + c + '))()'); } catch (se) { fn = new Function('return (async () => {' + c + '})()'); }
          return { ok: true, value: await fn() };
        } catch (err) {
          return { ok: false, error: (err && err.message) || String(err) };
        }
      },
      args: [src]
      });
    } catch (e2) {
      throw new Error('Debugger: ' + e.message + ' | Page script: ' + e2.message);
    }
    const v = res && res[0] && res[0].result;
    if (!v) throw new Error(e.message);
    if (!v.ok) throw new Error(v.error + (/unsafe-eval|Content Security Policy/i.test(v.error) ? ' (and the debugger was unavailable: ' + e.message + ')' : ''));
    return { value: v.value };
  }
}

async function screenshot(tabId, p) {
  const tab = await chrome.tabs.get(tabId);
  const fmt = p.format === 'png' ? 'png' : 'jpeg';
  const quality = Math.min(100, Math.max(20, Number(p.quality) || 70));
  const width = Number(p.width) || (p.v ? 1280 : 100000);
  let dataUrl;
  const element = p.ref != null || p.selector;
  if (!element && !p.full && tab.active) {
    dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: fmt, quality });
  } else {
    let clip;
    if (element) {
      const r = await inject(tabId, actFn, ['rect', p]);
      await sleep(150);
      clip = { x: r.x0 + r.sx, y: r.y0 + r.sy, width: Math.max(1, r.w), height: Math.max(1, r.h), scale: 1 };
    } else if (p.full) {
      const m = await cdp(tabId, 'Page.getLayoutMetrics');
      const size = m.cssContentSize || m.contentSize;
      clip = { x: 0, y: 0, width: Math.min(size.width, 2400), height: Math.min(size.height, 16000), scale: 1 };
    }
    const r = await cdp(tabId, 'Page.captureScreenshot', { format: fmt, quality: fmt === 'jpeg' ? quality : undefined, clip, captureBeyondViewport: !!clip, fromSurface: true });
    dataUrl = 'data:image/' + fmt + ';base64,' + r.data;
  }
  return encodeImage(dataUrl, width, fmt, quality);
}

async function encodeImage(dataUrl, maxW, fmt, quality) {
  const blob = await (await fetch(dataUrl)).blob();
  const bmp = await createImageBitmap(blob);
  let w = bmp.width;
  let h = bmp.height;
  if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
  const canvas = new OffscreenCanvas(w, h);
  canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
  const out = await canvas.convertToBlob({ type: fmt === 'png' ? 'image/png' : 'image/jpeg', quality: quality / 100 });
  const bytes = new Uint8Array(await out.arrayBuffer());
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return { base64: btoa(s), mime: out.type, w, h };
}

/* ---------- waiting ---------- */

async function waitFor(tabId, o) {
  const timeout = Number(o.timeout) || 10000;
  const t0 = Date.now();
  if (o.url) {
    while (Date.now() - t0 < timeout) {
      const t = await chrome.tabs.get(tabId);
      const hit = t.url.includes(o.url);
      if ((o.gone ? !hit : hit) && t.status === 'complete') return { ok: true, ms: Date.now() - t0 };
      await sleep(250);
    }
    throw new Error('Timed out after ' + timeout + ' ms waiting for the URL ' + (o.gone ? 'to stop containing' : 'to contain') + ' "' + o.url + '"');
  }
  if (!o.selector && !o.text) { await sleep(Math.min(Number(o.ms) || 1000, 60000)); return { ok: true, ms: Date.now() - t0 }; }
  while (Date.now() - t0 < timeout) {
    try {
      const r = await inject(tabId, waitFn, [Object.assign({}, o, { timeout: timeout - (Date.now() - t0) })]);
      if (r && r.ok) return { ok: true, ms: Date.now() - t0 };
      break;
    } catch (e) {
      if (/^bad selector/.test(e.message)) throw e;
      await sleep(400); // the page was navigating; try again on the new document
    }
  }
  throw new Error('Timed out after ' + timeout + ' ms waiting for ' + (o.selector ? 'selector ' + o.selector : 'text "' + o.text + '"') + (o.gone ? ' to go away' : ''));
}

/* After click / type / press: let the page react, follow navigations, optionally return a fresh snapshot. */
async function afterAction(tabId, beforeUrl, p, newTabs) {
  if (p.settle !== 0) {
    await sleep(80);
    const tab = await chrome.tabs.get(tabId);
    if (tab.status === 'loading') await waitForTabLoad(tabId, Number(p.timeout) || 30000);
    try {
      await inject(tabId, settleFn, [Number(p.quiet) || 300, Number(p.maxSettle) || 3000]);
    } catch (e) {
      await waitForTabLoad(tabId, 15000);
    }
  }
  if (p.waitFor) await waitFor(tabId, { text: p.waitFor, timeout: p.timeout });
  const tab = await chrome.tabs.get(tabId);
  const out = {};
  if (tab.url !== beforeUrl) { out.url = tab.url; out.title = clip(tab.title, 120); }
  if (newTabs && newTabs.length) out.newTab = newTabs[0];
  if (p.snap) out.snapshot = (await inject(tabId, snapshotFn, [typeof p.snap === 'object' ? p.snap : { max: 3000 }])).text;
  return out;
}

function watchNewTabs(openerId) {
  const ids = [];
  const fn = t => { if (t.openerTabId === openerId) ids.push(t.id); };
  chrome.tabs.onCreated.addListener(fn);
  return { ids, stop: () => chrome.tabs.onCreated.removeListener(fn) };
}

/* ---------- commands ---------- */

async function handleCommand(action, p = {}) {
  if (LEGACY_ONLY.has(action) || (!p.v && (action === 'click' || action === 'fill'))) return legacyCommand(action, p);

  switch (action) {
    case 'ping':
    case 'status':
      return { ok: true, version: VERSION, agentTab: agentTabId, debugger: Array.from(attached.keys()) };

    case 'reload_extension':
      setTimeout(() => chrome.runtime.reload(), 100);
      return { reloaded: true };

    case 'list_tabs': {
      const tabs = await chrome.tabs.query({});
      return tabs.map(t => ({ id: t.id, windowId: t.windowId, title: t.title, url: t.url, active: t.active, status: t.status }));
    }

    case 'tabs': {
      const tabs = await chrome.tabs.query({});
      return { text: tabs.map(t => t.id + (t.id === agentTabId ? '*' : '') + (t.active ? '+' : '') + ' ' + clip(t.title, 60) + ' | ' + clip(t.url, 110)).join('\n') + '\n(* agent tab, + active in its window)' };
    }

    case 'get_active_tab': {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      return tab || (await chrome.tabs.query({ active: true }))[0] || null;
    }

    case 'open_tab': {
      const tab = await chrome.tabs.create({ url: p.url || 'about:blank', active: p.active !== false });
      if (p.wait) await waitForTabLoad(tab.id);
      return { id: tab.id, url: tab.url || p.url };
    }

    case 'open': {
      // Opens in the agent's own window, so your tabs are left alone. here:true opens a tab in your current window.
      const url = p.url || 'about:blank';
      let tab;
      if (p.here) {
        tab = await chrome.tabs.create({ url, active: !!p.active });
      } else {
        let win = null;
        if (agentWindowId != null) { try { win = await chrome.windows.get(agentWindowId); } catch (e) { win = null; } }
        if (win) tab = await chrome.tabs.create({ windowId: win.id, url, active: true });
        else {
          const w = await chrome.windows.create({ url, focused: !!p.focus, width: Number(p.width) || 1400, height: Number(p.height) || 900 });
          setAgentWindow(w.id);
          tab = w.tabs[0];
        }
      }
      setAgentTab(tab.id);
      const load = await waitForTabLoad(tab.id, Number(p.timeout) || 30000);
      if (p.settle !== 0) { try { await inject(tab.id, settleFn, [400, 4000]); } catch (e) { /* page not scriptable */ } }
      if (p.waitFor) await waitFor(tab.id, { text: p.waitFor, timeout: p.timeout });
      return pageInfo(tab.id, load.timedOut ? { loadTimedOut: true } : null);
    }

    case 'use': {
      const t = await chrome.tabs.get(Number(p.tabId));
      setAgentTab(t.id);
      return pageInfo(t.id);
    }

    case 'navigate': {
      if (!p.v) {
        const tabId = p.tabId || (await getActiveTabId());
        await chrome.tabs.update(tabId, { url: p.url });
        if (p.wait) await waitForTabLoad(tabId, 30000, true);
        return { id: tabId, url: p.url };
      }
      const tabId = await tabFor(p);
      const loading = waitForTabLoad(tabId, Number(p.timeout) || 30000, true);
      await chrome.tabs.update(tabId, { url: p.url });
      const load = await loading;
      if (p.settle !== 0) { try { await inject(tabId, settleFn, [400, 4000]); } catch (e) { /* not scriptable */ } }
      if (p.waitFor) await waitFor(tabId, { text: p.waitFor, timeout: p.timeout });
      return pageInfo(tabId, load.timedOut ? { loadTimedOut: true } : null);
    }

    case 'back':
    case 'forward':
    case 'reload': {
      const tabId = await tabFor(p);
      const loading = waitForTabLoad(tabId, Number(p.timeout) || 30000, true);
      try {
        if (action === 'back') await chrome.tabs.goBack(tabId);
        else if (action === 'forward') await chrome.tabs.goForward(tabId);
        else await chrome.tabs.reload(tabId);
      } catch (e) {
        if (action === 'reload') throw e;
        // Chrome skips history entries made by clicks without a real user gesture; go to the entry directly.
        const h = await cdp(tabId, 'Page.getNavigationHistory');
        const entry = h.entries[h.currentIndex + (action === 'back' ? -1 : 1)];
        if (!entry) throw new Error('No ' + (action === 'back' ? 'previous' : 'next') + ' page in this tab');
        await cdp(tabId, 'Page.navigateToHistoryEntry', { entryId: entry.id });
      }
      await loading;
      if (p.settle !== 0) { try { await inject(tabId, settleFn, [400, 4000]); } catch (e) { /* not scriptable */ } }
      return pageInfo(tabId);
    }

    case 'focus_tab': {
      const tab = await chrome.tabs.update(Number(p.tabId), { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
      return { id: tab.id, active: true };
    }

    case 'create_worker_window': {
      const win = await chrome.windows.create({ tabId: p.tabId, focused: false, width: 1366, height: 768 });
      return { windowId: win.id, tabId: p.tabId };
    }

    case 'close_tab':
      await chrome.tabs.remove(Number(p.tabId));
      return { closed: p.tabId };

    case 'close': {
      const id = p.tabId ? Number(p.tabId) : agentTabId;
      if (id == null) throw new Error('No agent tab to close. Pass a tab id.');
      await chrome.tabs.remove(id);
      return { closed: id };
    }

    case 'snapshot': {
      const tabId = await tabFor(p);
      return inject(tabId, snapshotFn, [p]);
    }

    case 'click': {
      const tabId = await tabFor(p);
      const before = (await chrome.tabs.get(tabId)).url;
      const watch = watchNewTabs(tabId);
      try {
        const r = await inject(tabId, actFn, ['click', p]);
        if (p.trusted) await trustedClick(tabId, r.x, r.y);
        return Object.assign({ clicked: r.desc }, await afterAction(tabId, before, p, watch.ids));
      } finally {
        watch.stop();
      }
    }

    case 'type': {
      const tabId = await tabFor(p);
      const before = (await chrome.tabs.get(tabId)).url;
      let r;
      if (p.trusted) {
        r = await inject(tabId, actFn, ['focus', p]);
        await cdp(tabId, 'Input.insertText', { text: String(p.value == null ? '' : p.value) });
      } else {
        r = await inject(tabId, actFn, ['type', p]);
      }
      if (p.enter) {
        try { await pressKey(tabId, 'Enter'); } catch (e) { await inject(tabId, actFn, ['key', { key: 'Enter' }]); }
      }
      return Object.assign({ typed: r.desc }, await afterAction(tabId, before, Object.assign({}, p, { settle: p.enter ? p.settle : 0 })));
    }

    case 'select': {
      const tabId = await tabFor(p);
      const r = await inject(tabId, actFn, ['select', p]);
      return Object.assign(r, await afterAction(tabId, (await chrome.tabs.get(tabId)).url, p));
    }

    case 'press': {
      const tabId = await tabFor(p);
      const before = (await chrome.tabs.get(tabId)).url;
      let synthetic = false;
      try {
        await pressKey(tabId, p.key);
      } catch (e) {
        if (/Unknown key/.test(e.message)) throw e;
        await inject(tabId, actFn, ['key', parseKey(p.key)]);
        synthetic = true;
      }
      return Object.assign({ pressed: p.key }, synthetic ? { synthetic } : {}, await afterAction(tabId, before, p));
    }

    case 'scroll': {
      const tabId = await tabFor(p);
      const r = await inject(tabId, actFn, ['scroll', p]);
      if (p.snap) r.snapshot = (await inject(tabId, snapshotFn, [Object.assign({ viewport: true, max: 3000 }, typeof p.snap === 'object' ? p.snap : {})])).text;
      return r;
    }

    case 'wait': {
      const tabId = await tabFor(p);
      return waitFor(tabId, p);
    }

    case 'text':
    case 'table':
    case 'links': {
      const tabId = await tabFor(p);
      return inject(tabId, actFn, [action, p]);
    }

    case 'screenshot': {
      const tabId = p.v ? await tabFor(p) : (p.tabId || (await getActiveTabId()));
      return screenshot(tabId, p);
    }

    case 'eval': {
      const tabId = p.v ? await tabFor(p) : (p.tabId || (await getActiveTabId()));
      return evalCode(tabId, p.expression || p.code);
    }

    case 'cdp': {
      const tabId = await tabFor(p);
      if (!p.method) throw new Error('cdp needs a method, for example Network.getCookies');
      return cdp(tabId, p.method, p.params || {});
    }

    case 'detach': {
      const ids = Array.from(attached.keys());
      await Promise.all(ids.map(detach));
      return { detached: ids };
    }

    case 'batch': {
      const out = [];
      for (const step of p.steps || []) {
        const name = step.do || step.action;
        if (name === 'batch') { out.push({ do: name, error: 'batch cannot nest' }); break; }
        try {
          const r = await handleCommand(name, Object.assign({ v: 2, tabId: p.tabId }, step));
          out.push(Object.assign({ do: name }, r && typeof r === 'object' && !Array.isArray(r) ? r : { value: r }));
        } catch (e) {
          out.push({ do: name, error: e.message });
          if (p.stopOnError !== false) break;
        }
      }
      return { steps: out };
    }

    default:
      throw new Error('Unknown action: ' + action);
  }
}

/* ---------- popup ---------- */

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (sender.id !== chrome.runtime.id) return false;
  if (msg && msg.type === 'status') {
    reply({ connected: !!ws && ws.readyState === WebSocket.OPEN, version: VERSION, agentTabId, debugger: Array.from(attached.keys()), activity: activity.slice(-12).reverse() });
    return false;
  }
  if (msg && msg.type === 'reconnect') { connectBridge(); reply({ ok: true }); return false; }
  if (msg && msg.type === 'detach') {
    Promise.all(Array.from(attached.keys()).map(detach)).then(() => reply({ ok: true }));
    return true;
  }
  return false;
});

/* ---------- lifecycle ---------- */

chrome.alarms.create('bridge_keepalive', { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(a => { if (a.name === 'bridge_keepalive') connectBridge(); });
chrome.runtime.onInstalled.addListener(() => connectBridge());
chrome.runtime.onStartup.addListener(() => connectBridge());
connectBridge();
