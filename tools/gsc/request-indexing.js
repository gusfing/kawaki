/* Requests indexing in Google Search Console for a list of pages, through the Kawaki Chrome Bridge.
   Owner-approved use only: this is the same as pressing "Request indexing" in URL Inspection by hand. Google allows about
   11 requests a day; the script stops at the first "Quota exceeded" and logs what it did.

   node tools/gsc/request-indexing.js /pricing /blog /technical-seo     (paths, or full https://kawaki.co.in URLs)
   node tools/gsc/request-indexing.js --file reports/seo/index-queue.txt (one path per line)

   Needs the bridge running (npm run bridge:chrome) and the owner signed in to Search Console in Chrome.
   Log: reports/seo/actions-YYYY-MM.md */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { call } = require(path.join(ROOT, 'tools', 'chrome-bridge', 'client'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const SITE = 'https://kawaki.co.in';
const HOME = 'https://search.google.com/search-console?resource_id=sc-domain%3Akawaki.co.in';

const args = process.argv.slice(2);
let list = args.filter(a => !a.startsWith('--'));
const fi = args.indexOf('--file');
if (fi > -1) list = fs.readFileSync(path.resolve(args[fi + 1]), 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const urls = list.map(p => (/^https?:/.test(p) ? p : SITE + (p.startsWith('/') ? p : '/' + p)));
if (!urls.length) { console.error('Give paths or --file <list>.'); process.exit(1); }

const LOG = path.join(ROOT, 'reports', 'seo', `actions-${new Date().toISOString().slice(0, 7)}.md`);
const log = line => { console.log(line); fs.appendFileSync(LOG, line + '\n'); };
const page = async () => (await call('text', { max: 40000 })).text;

(async () => {
  log(`\n## ${new Date().toISOString().slice(0, 10)}: Google indexing requests`);
  for (const url of urls) {
    await call('navigate', { url: HOME, waitFor: 'Overview', timeout: 30000 });
    for (let k = 0; ; k++) {
      try { await call('type', { text: 'Inspect any URL in kawaki.co.in', value: url, enter: true }); break; }
      catch (e) {
        if (k > 12) throw e;
        try { await call('click', { text: 'Search', role: 'button', settle: 0 }); } catch (e2) { /* compact layout not showing yet */ }
        await sleep(1000);
      }
    }
    await call('wait', { text: 'URL is', timeout: 90000, _timeout: 110000 });
    let t = await page();
    const state = (t.match(/URL is (not )?on Google[^\n]*/) || ['?'])[0];
    const reason = (t.match(/Page is not indexed: ([^\n]*)/) || [, ''])[1];
    if (/URL is on Google/.test(state) && !/REQUEST INDEXING/.test(t)) { log(`- ${url}: already on Google.`); continue; }
    if (!/REQUEST INDEXING/.test(t)) { log(`- ${url}: ${state}. No request button, skipped.`); continue; }
    await call('click', { text: 'REQUEST INDEXING' });
    let result = 'no answer after 3 minutes';
    for (let i = 0; i < 36; i++) {
      await sleep(5000);
      t = await page();
      if (/Indexing requested/.test(t)) { result = 'indexing requested'; break; }
      if (/Quota exceeded/i.test(t)) { result = 'QUOTA EXCEEDED'; break; }
      if (/Indexing request rejected|Something went wrong/i.test(t)) { result = (t.match(/(Indexing request rejected|Something went wrong)[^\n]*/i) || ['error'])[0]; break; }
    }
    log(`- ${url}: ${state}${reason ? ' (' + reason + ')' : ''}. Result: ${result}.`);
    await call('click', { text: 'Dismiss', role: 'button', settle: 0 }).catch(() => {});
    if (/QUOTA/.test(result)) { log('  Daily quota reached; the rest wait for tomorrow.'); break; }
  }
})().catch(e => log('- stopped: ' + e.message));
