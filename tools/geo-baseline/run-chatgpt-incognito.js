/* GEO baseline in a clean ChatGPT: asks the buyer questions in reports/seo/geo-prompts.md in a private (incognito) window,
   signed out, so there is no account, memory or custom instruction to skew the answers. Records whether Kawaki Studios is
   named and whether kawaki.co.in is linked, plus who is named instead.

   Needs the Kawaki Chrome Bridge running (npm run bridge:chrome) with "Allow in Incognito" switched on for the extension
   (chrome://extensions, Kawaki Agent Chrome Bridge, Details).

   node tools/geo-baseline/run-chatgpt-incognito.js            all questions
   node tools/geo-baseline/run-chatgpt-incognito.js 3,5,7      only these question numbers

   It stops and asks you if ChatGPT shows a bot check or a login wall. It never tries to get past one.
   Results: reports/seo/geo-clean-YYYY-MM-DD.json (re-running the same day continues where it stopped). */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { call } = require(path.join(ROOT, 'tools', 'chrome-bridge', 'client'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PREFIX = 'Search the web and name specific companies. ';
const PROMPTS = fs.readFileSync(path.join(ROOT, 'reports', 'seo', 'geo-prompts.md'), 'utf8').split('\n')
  .map(l => /^(\d{1,2})\.\s+(.*)$/.exec(l)).filter(Boolean).map(m => [Number(m[1]), m[2].trim()]);
const OUT = path.join(ROOT, 'reports', 'seo', `geo-clean-${new Date().toISOString().slice(0, 10)}.json`);
const done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;

const page = async () => (await call('text', { selector: 'body', max: 90000 })).text;
const BLOCK = /verify you are human|just a moment|checking your browser|captcha|unusual activity|are you a robot/i;

async function dismissNotices() {
  for (const t of ['Stay logged out', 'Stay signed out', 'Continue without', 'Got it', 'Okay', 'Close']) {
    await call('click', { text: t, settle: 0, timeout: 3000 }).catch(() => {});
  }
}

async function ask(prompt) {
  await call('navigate', { url: 'https://chatgpt.com/', timeout: 45000, _timeout: 75000 });
  await sleep(5000);
  let body = await page();
  if (BLOCK.test(body.slice(0, 1500))) throw new Error('BOT_CHECK');
  await dismissNotices();
  await sleep(800);
  const before = (await page()).length;
  await call('type', { selector: '[role=textbox], #prompt-textarea, textarea', value: PREFIX + prompt });
  await sleep(1000);
  await call('click', { selector: 'button[data-testid=send-button]', settle: 0 }).catch(() => call('press', { key: 'Enter', settle: 0 }));
  let last = -1, stable = 0, text = '';
  for (let i = 0; i < 70; i++) {
    await sleep(4000);
    text = await page();
    if (BLOCK.test(text.slice(0, 1500)) && text.length < before + 300) throw new Error('BOT_CHECK');
    if (/log in to continue|sign up to continue|reached the limit|too many requests/i.test(text) && text.length < before + 600) throw new Error('LOGIN_WALL');
    if (text.length > before + 200 && text.length === last) { if (++stable >= 2) break; } else stable = 0;
    last = text.length;
  }
  const answer = text.slice(Math.max(0, before - 50));
  const links = (await call('links', { selector: 'main', max: 80 }).catch(() => ({ text: '' }))).text.split('\n').map(l => (l.split(' -> ')[1] || '').trim()).filter(u => /^https?:/.test(u));
  return { answer, links };
}

(async () => {
  await call('open', { url: 'https://chatgpt.com/', incognito: true, timeout: 45000, _timeout: 75000 });
  console.log('Private window open. Running in a clean ChatGPT.');
  for (const [n, p] of PROMPTS) {
    if (only && !only.includes(n)) continue;
    if (done[n]) { console.log(n, 'already recorded'); continue; }
    try {
      const { answer, links } = await ask(p);
      if (answer.length < 300) { console.log(n, 'answer too short, not recorded'); continue; }
      const contexts = (answer.match(/.{0,110}kawaki.{0,110}/gi) || []).slice(0, 3).map(c => c.replace(/\s+/g, ' '));
      const domains = Array.from(new Set(links.map(l => { try { return new URL(l).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }).filter(h => h && !/chatgpt\.com|openai\.com|mapbox|openstreetmap/.test(h)))).slice(0, 14);
      done[n] = { prompt: p, mentioned: contexts.length > 0, mentionContexts: contexts, cited: links.some(l => /kawaki\.co\.in/i.test(l)), sourceDomains: domains, answerChars: answer.length, answerHead: answer.slice(0, 260).replace(/\s+/g, ' ') };
      fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
      console.log(`${n}. named=${done[n].mentioned} linked=${done[n].cited} sources=${domains.length} | ${p.slice(0, 60)}`);
    } catch (e) {
      if (e.message === 'BOT_CHECK' || e.message === 'LOGIN_WALL') {
        console.log(`\nStopped at question ${n}: ChatGPT is showing a ${e.message === 'BOT_CHECK' ? 'bot check' : 'login or limit wall'}. Complete it yourself in the private window, then run this command again. Finished answers are kept.`);
        break;
      }
      console.log(n, 'FAILED:', e.message.slice(0, 160));
    }
  }
  const k = Object.keys(done);
  console.log(`\n${k.length} recorded: named in ${k.filter(i => done[i].mentioned).length}, linked in ${k.filter(i => done[i].cited).length}. File: ${path.relative(ROOT, OUT)}`);
})().catch(e => console.log('stopped:', e.message));
