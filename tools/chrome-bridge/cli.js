#!/usr/bin/env node
/* Kawaki Chrome Bridge CLI. Short commands, plain-text output, built to keep agent token use low.
   Run with no arguments for help. */
const path = require('path');
const fs = require('fs');
const { call, status } = require('./client');

const HELP = `Kawaki Chrome Bridge CLI    node tools/chrome-bridge/cli.js <command> [args] [--flags]

Commands default to the agent tab (set by "open" or "use"), else your active tab. --tab <id> overrides.
A <target> is a ref number from snap (12), a CSS selector (#id, .class, css:...), or visible text (text:Export, or just Export).

  status                         is the extension connected
  tabs                           list tabs (* agent tab, + active)
  open <url> [--wait T]          open in the agent window (--here: a tab in your window) and make it the agent tab
  use <tabId>                    make an existing tab the agent tab
  go <url> [--wait T]            navigate the agent tab
  back | forward | reload
  snap [--max N] [--offset N] [--sel CSS] [--grep RE] [--vp] [--i] [--rows N] [--nohref]
                                 page as compact lines; interactive elements get [ref] numbers
                                 --vp only what is on screen, --i only controls and headings
  find <regex>                   snapshot lines matching regex (cheap way to locate a control)
  click <target> [--snap] [--wait T] [--trusted] [--role R] [--nth N]
  type <target> <text> [--enter] [--append] [--trusted]
  select <target> <option>
  press <key>                    Enter, Escape, Tab, ArrowDown, Control+a ...
  scroll [down|up|top|bottom|<px>|<target>] [--in CSS] [--snap]
  wait <text> | wait --sel CSS | wait --url PART | wait <ms>   [--gone] [--timeout ms]
  text [target] [--max N] [--offset N]
  table [index] [--rows N] [--offset N] [--sel CSS]          tab-separated rows
  links [--grep RE] [--sel CSS] [--max N]
  shot [file] [--full] [--ref N | --sel CSS] [--width px] [--q 1-100]   saves a JPEG, prints the path
  eval <js> [--max N]            runs in the page (await allowed, return for statements)
  close [tabId]                  close the agent tab or a given tab
  detach                         drop the debugger (removes Chrome's "debugging" bar)
  batch <json | @file.json>      [{"do":"click","ref":3},{"do":"wait","text":"Done"},{"do":"snapshot"}]
  raw <action> [json]            any action with a JSON body

Flags: --tab <id>, --timeout <ms>, --json (print the raw JSON reply)`;

const BOOL = new Set(['snap', 'trusted', 'enter', 'append', 'full', 'vp', 'i', 'gone', 'here', 'focus', 'json', 'nohref', 'png']);

function parse(argv) {
  const pos = [];
  const f = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--') && a.length > 2) {
      const k = a.slice(2);
      if (BOOL.has(k)) f[k] = true;
      else { f[k] = argv[i + 1]; i++; }
    } else pos.push(a);
  }
  return { pos, f };
}

function target(t) {
  if (t == null || t === '') return {};
  const s = String(t);
  if (/^\d+$/.test(s)) return { ref: Number(s) };
  if (s.startsWith('css:')) return { selector: s.slice(4) };
  if (s.startsWith('text:')) return { text: s.slice(5) };
  if (/^[#.[]/.test(s) || /^[a-z][a-z0-9-]*([#.[:>\s]|$)/.test(s) && /[#.[\]=:>]/.test(s)) return { selector: s };
  return { text: s };
}

const num = v => (v == null ? undefined : Number(v));

function show(data, f) {
  if (f.json) return console.log(JSON.stringify(data));
  if (data == null) return console.log('ok');
  if (typeof data !== 'object') return console.log(String(data));
  if (typeof data.text === 'string' && Object.keys(data).every(k => k === 'text' || k === 'refs')) return console.log(data.text);
  if (Array.isArray(data.steps)) {
    data.steps.forEach((s, i) => {
      const { do: name, text, snapshot, ...rest } = s;
      const extra = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : '';
      console.log(`#${i + 1} ${name}${extra}`);
      if (text) console.log(text);
      if (snapshot) console.log(snapshot);
    });
    return;
  }
  const { snapshot, ...rest } = data;
  console.log(Object.entries(rest).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join(' | ') || 'ok');
  if (snapshot) console.log(snapshot);
}

async function main() {
  const { pos, f } = parse(process.argv.slice(2));
  const [cmd, ...args] = pos;
  if (!cmd || cmd === 'help' || f.help) return console.log(HELP);

  const base = {};
  if (f.tab) base.tabId = Number(f.tab);
  if (f.timeout) { base.timeout = Number(f.timeout); base._timeout = Number(f.timeout) + 15000; }
  const run = (action, params) => call(action, Object.assign({}, base, params));
  const snapOpt = f.snap ? true : undefined;

  switch (cmd) {
    case 'status': {
      const s = await status();
      if (s.connected) console.log(`connected: extension v${s.extension || '?'} (${s.extensionId})`);
      else console.log(s.error ? `error: ${s.error}` : 'NOT connected: load or reload tools/chrome-extension in chrome://extensions');
      return;
    }
    case 'tabs': return show(await run('tabs', {}), f);
    case 'open': return show(await run('open', { url: args[0], waitFor: f.wait, here: f.here, focus: f.focus, _timeout: 90000 }), f);
    case 'use': return show(await run('use', { tabId: Number(args[0]) }), f);
    case 'go':
    case 'navigate': return show(await run('navigate', { url: args[0], waitFor: f.wait, _timeout: 90000 }), f);
    case 'back':
    case 'forward':
    case 'reload': return show(await run(cmd, {}), f);
    case 'snap':
    case 'snapshot':
      return show(await run('snapshot', { max: num(f.max), offset: num(f.offset), selector: f.sel, grep: f.grep, viewport: f.vp, interactive: f.i, rows: num(f.rows), hrefs: f.nohref ? false : undefined }), f);
    case 'find':
      return show(await run('snapshot', { grep: args.join(' '), max: num(f.max) || 4000, rows: 0 }), f);
    case 'click': return show(await run('click', Object.assign(target(args.join(' ')), { snap: snapOpt, waitFor: f.wait, trusted: f.trusted, role: f.role, nth: num(f.nth) })), f);
    case 'type': {
      const [t, ...rest] = args;
      return show(await run('type', Object.assign(target(t), { value: rest.join(' '), enter: f.enter, clear: f.append ? false : undefined, trusted: f.trusted, snap: snapOpt, waitFor: f.wait })), f);
    }
    case 'select': return show(await run('select', Object.assign(target(args[0]), { value: args.slice(1).join(' ') })), f);
    case 'press': return show(await run('press', { key: args[0], snap: snapOpt, waitFor: f.wait }), f);
    case 'scroll': {
      const a = args.join(' ');
      const p = { container: f.in, snap: snapOpt };
      if (!a || a === 'down') Object.assign(p, {});
      else if (a === 'up') p.dy = -600;
      else if (a === 'top' || a === 'bottom') p.to = a;
      else if (/^-?\d+$/.test(a)) p.dy = Number(a);
      else Object.assign(p, target(a));
      return show(await run('scroll', p), f);
    }
    case 'wait': {
      const a = args.join(' ');
      const p = { gone: f.gone, selector: f.sel, url: f.url, timeout: num(f.timeout) };
      if (/^\d+$/.test(a) && !f.sel && !f.url) p.ms = Number(a);
      else if (a) p.text = a;
      p._timeout = (p.timeout || 10000) + 15000;
      return show(await run('wait', p), f);
    }
    case 'text': return show(await run('text', Object.assign(target(args.join(' ')), { max: num(f.max), offset: num(f.offset) })), f);
    case 'table': return show(await run('table', { index: args[0] != null ? Number(args[0]) : undefined, rows: num(f.rows), offset: num(f.offset), selector: f.sel }), f);
    case 'links': return show(await run('links', { grep: f.grep, selector: f.sel, max: num(f.max) }), f);
    case 'shot':
    case 'screenshot': {
      const file = args[0] ? path.resolve(args[0]) : undefined;
      const png = f.png || (file && /\.png$/i.test(file));
      const p = { savePath: file, full: f.full, ref: num(f.ref), selector: f.sel, width: num(f.width), quality: num(f.q), format: png ? 'png' : 'jpeg' };
      const r = await run('screenshot', p);
      return console.log(f.json ? JSON.stringify(r) : `${r.savedTo} (${r.w}x${r.h}, ${(r.fileSize / 1024).toFixed(0)} KB)`);
    }
    case 'eval': {
      const r = await run('eval', { expression: args.join(' ') });
      let out = typeof r.value === 'string' ? r.value : JSON.stringify(r.value);
      if (out === undefined) out = 'undefined';
      const max = num(f.max) || 8000;
      return console.log(out.length > max ? out.slice(0, max) + `\n... ${out.length - max} more chars (--max)` : out);
    }
    case 'close': return show(await run('close', args[0] ? { tabId: Number(args[0]) } : {}), f);
    case 'detach': return show(await run('detach', {}), f);
    case 'batch': {
      const src = args.join(' ');
      const steps = JSON.parse(src.startsWith('@') ? fs.readFileSync(src.slice(1), 'utf8') : src);
      return show(await run('batch', { steps: Array.isArray(steps) ? steps : steps.steps, _timeout: 300000 }), f);
    }
    case 'raw': return console.log(JSON.stringify(await run(args[0], args[1] ? JSON.parse(args.slice(1).join(' ')) : {})));
    default:
      console.error(`Unknown command "${cmd}". Run with no arguments for help.`);
      process.exitCode = 2;
  }
}

main().catch(e => {
  console.error('error: ' + e.message);
  process.exitCode = 1;
});
