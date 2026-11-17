/* Kawaki Studios: stamp every HTML page with the current content hash of the shared assets.
   Assets are served with year-long immutable caching, so a page that points at an old ?v=
   would keep a stale copy in returning visitors' browsers. Runs last in `npm run build`. */
const fs = require('fs');
const path = require('path');
const { ver } = require('./lib/shell');

const PUB = path.resolve(__dirname, '..', 'public');
const ASSETS = ['assets/css/site.css', 'assets/js/site.js', 'assets/css/chatbot.css', 'assets/js/chatbot.js', 'assets/js/exit-popup.js'];
const v = Object.fromEntries(ASSETS.map(a => [a, ver(a)]));
const rules = ASSETS.map(a => [new RegExp('/' + a.replace(/[.]/g, '\\.') + '\\?v=[A-Za-z0-9_]+', 'g'), '/' + a + '?v=' + v[a]]);
// The chat script carries its stylesheet's hash for the stylesheet it injects.
const chatCssAttr = [/data-css-v="[A-Za-z0-9_]+"/g, `data-css-v="${v['assets/css/chatbot.css']}"`];

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(x => {
  if (x.isDirectory()) return ['assets', 'admin', 'www.gstatic.com'].includes(x.name) ? [] : walk(path.join(d, x.name));
  return x.name.endsWith('.html') ? [path.join(d, x.name)] : [];
});

let files = 0;
for (const f of walk(PUB)) {
  const s = fs.readFileSync(f, 'utf8');
  let t = s;
  for (const [re, to] of rules) t = t.replace(re, to);
  t = t.replace(chatCssAttr[0], chatCssAttr[1]);
  if (t !== s) { fs.writeFileSync(f, t, 'utf8'); files++; }
}
console.log(`✓ [stamp-assets] ${files} pages updated to ${Object.values(v).join(', ')}`);
