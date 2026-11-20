/* Kawaki Directory Filler: popup. All data stays in chrome.storage.local (this browser). Nothing is sent anywhere. */
const $ = id => document.getElementById(id);
let profile = Object.assign({}, DEFAULT_PROFILE);
let queue = []; // { name, url, status: 'todo' | 'done' | 'skipped', date }
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function load() {
  const s = await chrome.storage.local.get(['profile', 'queue']);
  profile = Object.assign({}, DEFAULT_PROFILE, s.profile || {});
  queue = s.queue || [];
}
const saveProfile = () => chrome.storage.local.set({ profile });
const saveQueue = () => chrome.storage.local.set({ queue });

/* ---------- tabs ---------- */
document.querySelectorAll('nav button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('nav button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  ['fill', 'queue', 'content', 'profile'].forEach(t => { $('tab-' + t).hidden = t !== b.dataset.tab; });
}));

/* ---------- fill ---------- */
async function fill(overwrite) {
  const out = $('result');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !/^https?:/.test(tab.url || '')) { out.innerHTML = '<div class="result warn">Open the directory form in a normal web page tab first.</div>'; return; }
  let results = [];
  try {
    results = await chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, func: fillPage, args: [profile, { overwrite }] });
  } catch (e) {
    out.innerHTML = '<div class="result warn">Could not fill this page: ' + esc(e.message) + '</div>';
    return;
  }
  const filled = [], skipped = [];
  results.forEach(r => { if (r.result) { filled.push(...r.result.filled); skipped.push(...r.result.skipped); } });
  out.innerHTML = '<div class="result"><b class="' + (filled.length ? 'ok' : 'warn') + '">' + filled.length + ' field' + (filled.length === 1 ? '' : 's') + ' filled</b>' +
    (filled.length ? '<ul>' + filled.slice(0, 14).map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '<br>Nothing matched. Use the copy buttons below.') +
    (skipped.length ? '<p class="label" style="margin:10px 0 0">Not filled, do these yourself</p><ul>' + Array.from(new Set(skipped)).slice(0, 10).map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '') + '</div>';
}
$('fillBtn').addEventListener('click', () => fill(false));
$('fillOverBtn').addEventListener('click', () => fill(true));

/* ---------- copy list ---------- */
const COPY = [['businessName', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['website', 'Website'], ['city', 'City'], ['tagline', 'Tagline'], ['descriptionShort', 'Short description'], ['descriptionMedium', 'Medium description'], ['descriptionLong', 'Long description'], ['keywords', 'Keywords'], ['logoUrl', 'Logo URL'], ['linkedin', 'LinkedIn']];
function renderCopy() {
  $('copyList').innerHTML = COPY.map(([k, l]) => '<span class="v" title="' + esc(profile[k]) + '"><b style="color:var(--yellow)">' + l + '</b> ' + esc(String(profile[k] || '').slice(0, 50)) + '</span><button class="btn" data-copy="' + k + '" type="button">Copy</button>').join('');
  $('copyList').querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(profile[b.dataset.copy] || ''); b.textContent = 'Copied'; } catch (e) { b.textContent = 'Failed'; }
    setTimeout(() => { b.textContent = 'Copy'; }, 1200);
  }));
}

/* ---------- profile editor ---------- */
function renderProfile() {
  $('profileForm').innerHTML = PROFILE_FIELDS.map(([k, l, multi]) =>
    '<div class="field"><label class="label" for="p-' + k + '">' + esc(l) + '</label>' +
    (multi ? '<textarea id="p-' + k + '" data-k="' + k + '" rows="' + (k === 'descriptionLong' ? 7 : 3) + '">' + esc(profile[k]) + '</textarea>' : '<input type="text" id="p-' + k + '" data-k="' + k + '" value="' + esc(profile[k]) + '">') + '</div>').join('');
  let t;
  $('profileForm').querySelectorAll('[data-k]').forEach(el => el.addEventListener('input', () => {
    profile[el.dataset.k] = el.value;
    clearTimeout(t);
    t = setTimeout(() => { saveProfile(); renderCopy(); }, 300);
  }));
}
$('resetBtn').addEventListener('click', async () => {
  if (!$('resetBtn').dataset.sure) { $('resetBtn').dataset.sure = '1'; $('resetBtn').textContent = 'Press again to confirm'; setTimeout(() => { delete $('resetBtn').dataset.sure; $('resetBtn').textContent = 'Reset to defaults'; }, 3000); return; }
  profile = Object.assign({}, DEFAULT_PROFILE);
  await saveProfile(); renderProfile(); renderCopy();
  $('resetBtn').textContent = 'Reset to defaults'; delete $('resetBtn').dataset.sure;
});

/* ---------- directory queue ---------- */
function parseLines(text) {
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    const m = /^(.*?)\s*[|,\t]\s*(https?:\/\/\S+)\s*$/.exec(l) || (/^(https?:\/\/\S+)$/.exec(l) ? ['', '', l] : null);
    if (!m) return null;
    const url = m[2];
    let name = (m[1] || '').trim();
    if (!name) { try { name = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { name = url; } }
    return { name, url, status: 'todo', date: '' };
  }).filter(Boolean);
}
const nextIndex = () => queue.findIndex(q => q.status === 'todo');
function renderQueue() {
  const todo = queue.filter(q => q.status === 'todo').length;
  $('count').textContent = queue.length ? todo + ' left of ' + queue.length : '';
  const i = nextIndex();
  $('current').innerHTML = i < 0
    ? '<div class="q-current"><span class="label">Directories</span><h2>' + (queue.length ? 'All done' : 'No list yet') + '</h2><a>' + (queue.length ? 'Export the CSV to update your tracker.' : 'Paste your list below.') + '</a></div>'
    : '<div class="q-current"><span class="label">Next</span><h2>' + esc(queue[i].name) + '</h2><a>' + esc(queue[i].url) + '</a><div class="row" style="margin:10px 0 0"><button class="btn primary" id="openBtn" type="button">Open it</button></div></div>';
  if ($('openBtn')) $('openBtn').addEventListener('click', () => chrome.tabs.create({ url: queue[nextIndex()].url, active: true }));
  $('queueList').innerHTML = queue.map((q, n) => '<li class="' + q.status + '"><span class="st">' + (n + 1) + '</span><span class="nm">' + esc(q.name) + '</span><span class="st">' + q.status + '</span></li>').join('');
}
function mark(status) {
  const i = nextIndex();
  if (i < 0) return;
  queue[i].status = status;
  queue[i].date = new Date().toISOString().slice(0, 10);
  saveQueue(); renderQueue();
}
$('doneBtn').addEventListener('click', () => mark('done'));
$('skipBtn').addEventListener('click', () => mark('skipped'));
$('importBtn').addEventListener('click', () => {
  const add = parseLines($('importBox').value).filter(n => !queue.some(q => q.url === n.url));
  queue.push(...add);
  $('importBox').value = '';
  saveQueue(); renderQueue();
});
$('clearBtn').addEventListener('click', () => {
  if (!$('clearBtn').dataset.sure) { $('clearBtn').dataset.sure = '1'; $('clearBtn').textContent = 'Press again to confirm'; setTimeout(() => { delete $('clearBtn').dataset.sure; $('clearBtn').textContent = 'Clear the list'; }, 3000); return; }
  queue = []; saveQueue(); renderQueue(); $('clearBtn').textContent = 'Clear the list'; delete $('clearBtn').dataset.sure;
});
/* CSV in the same columns as data/directory_submissions_tracker.csv. */
$('exportBtn').addEventListener('click', () => {
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const rows = [['Platform', 'Category', 'Target_URL', 'DA', 'Status', 'Account_Email', 'Submission_Date', 'Notes']].concat(
    queue.map(r => [r.name, 'Business Directory', r.url, '', r.status === 'done' ? 'Submitted' : r.status === 'skipped' ? 'Skipped' : 'Not started', profile.email, r.date, '']));
  const blob = new Blob([rows.map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'directory_submissions_' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.appendChild(a); a.click(); a.remove();
});



/* ---------- articles and projects ---------- */
let CONTENT = { projects: [], articles: [] };
let kind = 'projects';
let picked = null;
let sourceLine = true;
async function loadContent() {
  try { CONTENT = await (await fetch(chrome.runtime.getURL('content.json'))).json(); } catch (e) { CONTENT = { projects: [], articles: [] }; }
}
const itemTitle = it => it.title || it.name;
function renderContentList() {
  const q = $('contentSearch').value.trim().toLowerCase();
  const list = CONTENT[kind].filter(it => !q || (itemTitle(it) + ' ' + (it.category || '') + ' ' + (it.tags || []).join(' ')).toLowerCase().includes(q));
  $('contentList').innerHTML = list.length
    ? list.map(it => '<li class="pick' + (picked && picked.id === it.id ? ' on' : '') + '" data-id="' + esc(it.id) + '"><span class="nm">' + esc(itemTitle(it)).slice(0, 70) + '</span><span class="st">' + (kind === 'projects' ? (it.kind === 'own' ? 'own' : 'client') : esc(it.words + ' w')) + '</span></li>').join('')
    : '<li><span class="nm">Nothing found. Run: node scripts/export-directory-content.js</span></li>';
  $('contentList').querySelectorAll('.pick').forEach(li => li.addEventListener('click', () => { picked = CONTENT[kind].find(x => x.id === li.dataset.id); renderContentList(); renderPick(); }));
}
async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; } catch (e) { btn.textContent = 'Failed'; }
  setTimeout(() => { btn.textContent = btn.dataset.label; }, 1200);
}
function showResult(filled, skipped) {
  $('cResult').innerHTML = '<div class="result"><b class="' + (filled.length ? 'ok' : 'warn') + '">' + filled.length + ' filled</b>' +
    (filled.length ? '<ul>' + filled.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '<br>Nothing matched. Use the copy buttons.') +
    (skipped.length ? '<ul>' + Array.from(new Set(skipped)).map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '') + '</div>';
}
async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !/^https?:/.test(tab.url || '')) { $('cResult').innerHTML = '<div class="result warn">Open the form in a normal web page tab first.</div>'; return null; }
  return tab;
}
function renderPick() {
  const box = $('contentPick');
  if (!picked) { box.innerHTML = '<p class="note">Pick one, open the site article or project form, then press Fill.</p>'; return; }
  const it = picked;
  const isA = kind === 'articles';
  const copies = isA
    ? [['Title', it.title], ['Summary', it.excerpt], ['Link', it.url], ['Tags', (it.tags || []).join(', ')], ['Text', it.plain], ['Markdown', it.markdown], ['HTML', it.html]]
    : [['Name', it.name], ['Summary', it.summary], ['Description', it.description], ['Live link', it.liveUrl || it.pageUrl], ['Case study', it.pageUrl], ['Tags', (it.tags || []).join(', ')], ['Image links', (it.images || []).join('\n')]];
  box.innerHTML = '<div class="q-current" style="margin-top:10px"><span class="label">' + (isA ? 'Article' : (it.kind === 'own' ? 'Studio product or concept, not client work' : 'Client project')) + '</span><h2>' + esc(itemTitle(it)).slice(0, 80) + '</h2>' +
    '<a>' + esc(isA ? it.url : (it.liveUrl || it.pageUrl)) + '</a>' +
    (isA ? '<label class="chk"><input type="checkbox" id="srcChk" ' + (sourceLine ? 'checked' : '') + '> Add the source line and link back to kawaki.co.in</label>' : '') +
    '<div class="row" style="margin:10px 0 0"><button class="btn primary" id="cFill" type="button">Fill this form</button>' +
    (isA ? '<button class="btn" id="cFillText" type="button" title="Plain text instead of formatted">Fill as plain text</button>' : '<button class="btn" id="cImg" type="button">Attach images</button>') + '</div></div>' +
    '<div id="cResult"></div><p class="label" style="margin-top:12px">Copy</p><div class="copy">' +
    copies.map(([l], i) => '<span class="v"><b style="color:var(--yellow)">' + l + '</b></span><button class="btn" data-ci="' + i + '" data-label="Copy" type="button">Copy</button>').join('') + '</div>';
  box.querySelectorAll('[data-ci]').forEach(b => b.addEventListener('click', () => copyText(copies[+b.dataset.ci][1] || '', b)));
  if ($('srcChk')) $('srcChk').addEventListener('change', e => { sourceLine = e.target.checked; });
  const run = async format => {
    const tab = await activeTab();
    if (!tab) return;
    let results = [];
    try { results = await chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, func: fillPage, args: [profile, { content: { kind: isA ? 'article' : 'project', item: it }, sourceLine, format }] }); }
    catch (e) { $('cResult').innerHTML = '<div class="result warn">' + esc(e.message) + '</div>'; return; }
    const filled = [], skipped = [];
    results.forEach(r => { if (r.result) { filled.push(...r.result.filled); skipped.push(...r.result.skipped); } });
    showResult(filled, skipped);
  };
  $('cFill').addEventListener('click', () => run('rich'));
  if ($('cFillText')) $('cFillText').addEventListener('click', () => run('text'));
  if ($('cImg')) $('cImg').addEventListener('click', attach);
}
/* Fetch each image from kawaki.co.in, convert to JPEG (most directories reject WebP), and set it on the page upload box. */
async function attach() {
  const tab = await activeTab();
  if (!tab) return;
  $('cResult').innerHTML = '<div class="result">Fetching images...</div>';
  const files = [];
  for (const [i, url] of (picked.images || []).slice(0, 6).entries()) {
    try {
      const blob = await (await fetch(url)).blob();
      const bmp = await createImageBitmap(blob);
      const w = Math.min(bmp.width, 2000);
      const c = new OffscreenCanvas(w, Math.round(bmp.height * w / bmp.width));
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      const jpg = await c.convertToBlob({ type: 'image/jpeg', quality: 0.88 });
      const b = new Uint8Array(await jpg.arrayBuffer());
      let s = '';
      for (let k = 0; k < b.length; k += 0x8000) s += String.fromCharCode.apply(null, b.subarray(k, k + 0x8000));
      files.push({ name: picked.id + '-' + (i + 1) + '.jpg', type: 'image/jpeg', b64: btoa(s) });
    } catch (e) { /* skip an image that cannot be fetched */ }
  }
  if (!files.length) { $('cResult').innerHTML = '<div class="result warn">Could not fetch the images.</div>'; return; }
  let res = [];
  try { res = await chrome.scripting.executeScript({ target: { tabId: tab.id, allFrames: true }, func: attachImages, args: [files] }); }
  catch (e) { $('cResult').innerHTML = '<div class="result warn">' + esc(e.message) + '</div>'; return; }
  const out = res.map(r => r.result).filter(Boolean);
  const ok = out.find(r => r.attached);
  $('cResult').innerHTML = ok
    ? '<div class="result"><b class="ok">' + ok.attached + ' image' + (ok.attached === 1 ? '' : 's') + ' attached</b><br>' + (ok.multiple ? '' : 'This box takes one file at a time; use the image links for the rest. ') + 'Check the preview, then press the site upload button.</div>'
    : '<div class="result warn">' + esc((out.find(r => r.error) || {}).error || 'No upload box found.') + '</div>';
}
function setKind(k) {
  kind = k; picked = null;
  $('kindProjects').setAttribute('aria-pressed', String(k === 'projects'));
  $('kindArticles').setAttribute('aria-pressed', String(k === 'articles'));
  renderContentList(); renderPick();
}
$('kindProjects').addEventListener('click', () => setKind('projects'));
$('kindArticles').addEventListener('click', () => setKind('articles'));
$('contentSearch').addEventListener('input', renderContentList);

(async () => { await load(); await loadContent(); renderCopy(); renderProfile(); renderQueue(); renderContentList(); renderPick(); })();
