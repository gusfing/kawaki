/* IndexNow: tell Bing (and the other IndexNow engines) about pages that changed.

   node scripts/submit-indexnow.js <url> [url...]   submit these URLs
   node scripts/submit-indexnow.js --changed        submit pages whose sitemap lastmod is newer than the last run
   add --wait                                       wait up to 6 minutes for each URL to go live (after a push)
   node scripts/submit-indexnow.js --all            every sitemap URL. Rarely right: Bing reads resubmitting
                                                    unchanged pages as noise, and that is how 2,400 submissions
                                                    piled up for a 230-page site in 2026.

   Every URL is checked first: only pages answering 200 on https://kawaki.co.in are sent, never 404s or redirects.
   One endpoint is enough; IndexNow engines share submissions with each other. */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const stateFile = path.join(rootDir, 'data', 'indexnow-state.json');
const args = process.argv.slice(2);
const flag = f => args.includes(f);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function key() {
  for (const f of fs.readdirSync(publicDir)) {
    if (!f.endsWith('.txt') || f.length < 36) continue;
    const candidate = f.slice(0, -4);
    if (fs.readFileSync(path.join(publicDir, f), 'utf8').trim() === candidate) return candidate;
  }
  console.error('[IndexNow] No key file (public/<key>.txt containing the key) found.');
  process.exit(1);
}

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(m => ({ loc: m[1].trim(), lastmod: m[2].trim() }));
}

async function isLive(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(15000) });
    return r.status === 200;
  } catch (e) {
    return false;
  }
}

async function main() {
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
  let urls = args.filter(a => /^https?:\/\//.test(a));
  if (flag('--changed')) {
    const since = state.lastRun || '0000-00-00';
    urls = urls.concat(sitemapUrls().filter(u => u.lastmod > since).map(u => u.loc));
  } else if (flag('--all')) {
    urls = urls.concat(sitemapUrls().map(u => u.loc));
  }
  urls = [...new Set(urls)].filter(u => /^https:\/\/kawaki\.co\.in(\/|$)/.test(u));
  if (!urls.length) {
    console.log('[IndexNow] Nothing to submit. Pass URLs, or --changed (see the top of this file).');
    return;
  }

  const live = [];
  for (const u of urls) {
    let ok = await isLive(u);
    for (let i = 0; !ok && flag('--wait') && i < 18; i++) { await sleep(20000); ok = await isLive(u); }
    if (ok) live.push(u); else console.log(`  skipped (not 200 on the live site): ${u}`);
  }
  if (!live.length) {
    console.log('[IndexNow] No live URLs to submit.');
    return;
  }

  const k = key();
  const res = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: 'kawaki.co.in', key: k, keyLocation: `https://kawaki.co.in/${k}.txt`, urlList: live }),
    signal: AbortSignal.timeout(15000)
  });
  if (res.status === 200 || res.status === 202) {
    console.log(`[IndexNow] HTTP ${res.status} Accepted: ${live.length} URL(s) sent.`);
    state.lastRun = new Date().toISOString().split('T')[0];
    state.lastCount = live.length;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
  } else {
    console.error(`[IndexNow] HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    process.exit(1);
  }
}

main().catch(e => { console.error('[IndexNow] ' + e.message); process.exit(1); });
