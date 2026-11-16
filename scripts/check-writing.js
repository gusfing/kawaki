/* Kawaki Studios: writing check. Scans the visible text of every public page (and, with
   --file, any markdown draft) for the phrases and characters banned in data/writing-rules.json.
   Exits non-zero when anything is found, so `npm run build` stops before AI-sounding copy ships.
   Usage: node scripts/check-writing.js            all public pages
          node scripts/check-writing.js --file x.md one draft */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const rules = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'writing-rules.json'), 'utf8'));
const phrases = rules.bannedPhrases.map(p => new RegExp(p, 'gi'));
const chars = rules.bannedCharacters;

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ');
}
function markdownText(md) {
  return md.replace(/^---[\s\S]*?---/, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\]\([^)]*\)/g, ']').replace(/\s+/g, ' ');
}

function check(text) {
  const hits = [];
  for (const re of phrases) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) hits.push(text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 30).trim());
  }
  for (const ch of chars) {
    let i = text.indexOf(ch);
    while (i !== -1) { hits.push(text.slice(Math.max(0, i - 40), i + 30).trim()); i = text.indexOf(ch, i + 1); }
  }
  return hits;
}

const fileArg = process.argv.indexOf('--file');
if (fileArg > -1) {
  const f = process.argv[fileArg + 1];
  const hits = check(markdownText(fs.readFileSync(f, 'utf8')));
  if (hits.length) { console.error(`✗ [check-writing] ${f}: ${hits.length} problem(s)`); hits.slice(0, 20).forEach(h => console.error('   … ' + h)); process.exit(1); }
  console.log(`✓ [check-writing] ${f} is clean`);
  process.exit(0);
}

const PUB = path.join(ROOT, 'public');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(x => x.isDirectory()
  ? (['assets', 'admin', 'www.gstatic.com'].includes(x.name) ? [] : walk(path.join(d, x.name)))
  : x.name.endsWith('.html') ? [path.join(d, x.name)] : []);
let bad = 0, total = 0;
for (const f of walk(PUB)) {
  const hits = check(visibleText(fs.readFileSync(f, 'utf8')));
  if (!hits.length) continue;
  bad++; total += hits.length;
  console.error(`✗ ${path.relative(PUB, f)}: ${hits.length}`);
  hits.slice(0, 4).forEach(h => console.error('   … ' + h));
}
if (bad) { console.error(`\n✗ [check-writing] ${total} banned phrase(s) on ${bad} page(s). Rewrite them in plain language (rules: data/writing-rules.json, AGENTS.md).`); process.exit(1); }
console.log('✓ [check-writing] every public page passes the writing rules');
