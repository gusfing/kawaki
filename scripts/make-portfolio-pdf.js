/* Kawaki Studios portfolio PDF. Built from data/case-studies.json, so it always matches the website.
   node scripts/make-portfolio-pdf.js   ->   portfolio/Kawaki-Studios-Portfolio.pdf

   Order: cover, about, contents, Part 1 "Projects" (numbered overview), Part 2 "Case studies" (the same numbers, one page each), contact.
   Client work comes first; the studio's own products and concepts follow and are labelled as such.
   Uses the site's fonts and colours. Needs Playwright with Chromium (set PLAYWRIGHT_DIR if it lives elsewhere). */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const OUT_DIR = path.join(ROOT, 'portfolio');
const OUT = path.join(OUT_DIR, 'Kawaki-Studios-Portfolio.pdf');

function loadPlaywright() {
  for (const dir of [ROOT, process.env.PLAYWRIGHT_DIR].filter(Boolean)) {
    try { return require(require.resolve('playwright', { paths: [dir] })); } catch (e) { /* try the next place */ }
  }
  console.error('Playwright not found. Run: npm i -D playwright@1.64.1 && npx playwright install chromium (or set PLAYWRIGHT_DIR).');
  process.exit(1);
}

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const { execFileSync } = require('child_process');
const IMG_CACHE = path.join(os.tmpdir(), 'kawaki-portfolio-img');
fs.mkdirSync(IMG_CACHE, { recursive: true });
/* Re-encodes a site image as a JPEG of the given width, so the PDF is light. Falls back to the original if ffmpeg is missing. */
function file(p, width) {
  const src = path.join(PUB, p);
  if (!width) return pathToFileURL(src).href;
  const out = path.join(IMG_CACHE, p.replace(/[^a-z0-9]+/gi, '_') + '_' + width + '.jpg');
  try {
    if (!fs.existsSync(out)) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vf', `scale='min(${width},iw)':-2`, '-q:v', '4', out]);
    return pathToFileURL(out).href;
  } catch (e) { return pathToFileURL(src).href; }
}
const exists = p => !!p && fs.existsSync(path.join(PUB, p));

const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'case-studies.json'), 'utf8'));
const all = (Array.isArray(raw) ? raw : (raw.caseStudies || raw.studies || Object.values(raw)));
const isOwn = c => /^(Product|Concept|In private testing)$/i.test(c.status || '');
const items = all.filter(c => !isOwn(c)).concat(all.filter(isOwn)).map((c, i) => Object.assign({}, c, { n: String(i + 1).padStart(2, '0') }));
const label = c => isOwn(c) ? (/Concept/i.test(c.status) ? 'Studio concept' : /private/i.test(c.status) ? 'Studio product, in private testing' : 'Studio product') : 'Client project';
const domain = c => c.domain || (c.live ? c.live.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '');

const ASTERISK = '<svg viewBox="0 0 40 40"><path d="M20 6v28M8 13l24 14M8 27l24-14" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>';
const SPARK = '<svg viewBox="0 0 40 40"><path d="M20 4c1.6 9.4 6.6 14.4 16 16-9.4 1.6-14.4 6.6-16 16-1.6-9.4-6.6-14.4-16-16 9.4-1.6 14.4-6.6 16-16z" fill="currentColor"/></svg>';

/* Page numbers: 1 cover, 2 about, 3 contents, 4..(3+P) projects, then one page per case study, then contact. */
const PER_PAGE = 4;
const projectPages = Math.ceil(items.length / PER_PAGE);
const firstProjectPage = 4;
const firstCasePage = firstProjectPage + projectPages;
const contactPage = firstCasePage + items.length;
const TOTAL = contactPage;
const pageOfCase = i => firstCasePage + i;

const foot = n => `<footer class="foot"><span>Kawaki Studios &middot; Portfolio &middot; November 2026</span><span>${String(n).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span></footer>`;
const page = (n, cls, inner) => `<section class="page ${cls}">${inner}${n > 1 ? foot(n) : ''}</section>`;

function shot(c, thumb) {
  const src = c.frame && c.frame.src;
  if (exists(src)) {
    return `<div class="frame${thumb ? ' frame--thumb' : ''}"><div class="frame__bar"><i></i><i></i><i></i><span>${esc(domain(c) || c.name)}</span></div><img src="${file(src, thumb ? 700 : 1300)}" alt="${esc(c.name)}"></div>`;
  }
  return `<div class="frame frame--none${thumb ? ' frame--thumb' : ''}"><span class="badge">${SPARK}</span><b>${esc(c.name)}</b><span>${esc(c.category || '')}</span></div>`;
}

const pages = [];

pages.push(page(1, 'cover', `
  <p class="mono kicker"><b>Kawaki Studios</b> &nbsp; Portfolio &nbsp; November 2026</p>
  <h1>Selected<br>work<span class="badge badge--xl">${ASTERISK}</span></h1>
  <p class="lede">Websites, web apps and Shopify stores, designed and coded by the developers you speak to. ${items.length} projects from our New Delhi studio.</p>
  <p class="mono cover__meta">kawaki.co.in &nbsp;&middot;&nbsp; hello@kawaki.co.in &nbsp;&middot;&nbsp; +91 76781 23943</p>
`));

pages.push(page(2, 'about', `
  <p class="mono kicker">About the studio</p>
  <div class="two">
    <div>
      <h2>A web engineering studio in New Delhi.</h2>
      <p class="body">Kawaki Studios LLP designs and builds custom websites, web applications and Shopify stores, working directly with founders. The developers you speak to are the people who build your project.</p>
      <p class="body">Work runs in milestone sprints, in a Git repository, with a staging link for every milestone. At the end, you get the repository.</p>
      <p class="body">Founded and led by Kunal Sharma, an AWS Certified AI Practitioner.</p>
    </div>
    <div>
      <p class="mono kicker small">What we build</p>
      <ul class="list">
        <li>Custom websites</li><li>Web applications</li><li>Shopify stores and headless storefronts</li><li>Mobile apps</li><li>AI workflow automation</li><li>Technical SEO and AI search</li><li>Website security cleanup</li>
      </ul>
      <p class="mono kicker small" style="margin-top:26px">What we leave out</p>
      <p class="strip"><s>Page builders</s><s>Bought themes</s><s>Plugin piles</s><s>Black-box scripts</s></p>
    </div>
  </div>
`));

const tocRow = (c, p) => `<li><span class="n">${c.n}</span><span class="t">${esc(c.name)}</span><span class="c">${esc(c.category || '')}</span><span class="p">${String(p).padStart(2, '0')}</span></li>`;
pages.push(page(3, 'toc', `
  <p class="mono kicker">Contents</p>
  <div class="two two--toc">
    <div>
      <h2 class="h3">Part 1<br>Projects</h2>
      <p class="muted">All ${items.length} at a glance, numbered. Client work first, then the studio's own products and concepts.</p>
      <p class="mono pg">Pages ${String(firstProjectPage).padStart(2, '0')} to ${String(firstCasePage - 1).padStart(2, '0')}</p>
      <h2 class="h3" style="margin-top:34px">Part 2<br>Case studies</h2>
      <p class="muted">One page each, with the same numbers: the client, the brief, what we built and the stack.</p>
      <p class="mono pg">Pages ${String(firstCasePage).padStart(2, '0')} to ${String(contactPage - 1).padStart(2, '0')}</p>
    </div>
    <ol class="toc">${items.map((c, i) => tocRow(c, pageOfCase(i))).join('')}</ol>
  </div>
`));

for (let k = 0; k < projectPages; k++) {
  const slice = items.slice(k * PER_PAGE, (k + 1) * PER_PAGE);
  const head = k === 0 ? 'Part 1 &nbsp; Projects' : 'Part 1 &nbsp; Projects, continued';
  pages.push(page(firstProjectPage + k, 'projects', `
    <p class="mono kicker">${head}</p>
    <div class="grid">${slice.map((c, j) => `
      <article class="card">
        ${shot(c, true)}
        <div class="card__row"><span class="num">${c.n}</span><span class="mono tag ${isOwn(c) ? 'own' : ''}">${esc(label(c))}</span></div>
        <h3>${esc(c.name)}</h3>
        <p class="mono meta">${esc(c.category || '')}${c.year ? ' &middot; ' + esc(c.year) : ''}</p>
        <p class="small">${esc(c.lede || '')}</p>
        <p class="mono page-ref">Case study, page ${String(pageOfCase(k * PER_PAGE + j)).padStart(2, '0')}</p>
      </article>`).join('')}</div>
  `));
}

items.forEach((c, i) => {
  const gal = (c.gallery || []).filter(g => exists(g.src)).slice(0, 3);
  pages.push(page(pageOfCase(i), 'case', `
    <p class="mono kicker">Part 2 &nbsp; Case study ${c.n}</p>
    <div class="case__cols">
      <div class="case__media">
        ${shot(c, false)}
        ${gal.length ? `<div class="thumbs">${gal.map(g => `<figure><img src="${file(g.src, 560)}" alt="${esc(g.caption || c.name)}"><figcaption>${esc(g.caption || '')}</figcaption></figure>`).join('')}</div>` : ''}
      </div>
      <div class="case__text">
        <p class="mono tag ${isOwn(c) ? 'own' : ''}">${esc(label(c))}</p>
        <h2 class="case__name"><span class="num">${c.n}</span> ${esc(c.name)}</h2>
        <p class="mono meta">${esc(c.category || '')}${c.year ? ' &middot; ' + esc(c.year) : ''}${c.status && !/^Live$/i.test(c.status) ? ' &middot; ' + esc(c.status) : ''}</p>
        <p class="lede2">${esc(c.lede || '')}</p>
        ${c.client ? `<p class="mono lbl">The client</p><p class="small">${esc(c.client)}</p>` : ''}
        ${c.brief ? `<p class="mono lbl">The brief</p><p class="small">${esc(c.brief)}</p>` : ''}
        ${(c.built || []).length ? `<p class="mono lbl">What we built</p><ul class="built">${c.built.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
        <p class="mono facts">${c.stack ? '<b>Stack</b> ' + esc(c.stack) : ''}${c.live ? (c.stack ? ' &nbsp;&middot;&nbsp; ' : '') + '<b>Live</b> ' + esc(domain(c)) : ''}</p>
      </div>
    </div>
  `));
});

pages.push(page(contactPage, 'contact', `
  <p class="mono kicker">Working with us</p>
  <h2 class="big">Tell us what<br>you are building.<span class="badge badge--xl">${ASTERISK}</span></h2>
  <div class="two two--contact">
    <div>
      <p class="mono lbl">Contact</p>
      <p class="contact">hello@kawaki.co.in<br>+91 76781 23943 (WhatsApp)<br>kawaki.co.in</p>
      <p class="small muted">Kawaki Studios LLP, New Delhi, India. Open Monday to Sunday, 10:00 to 19:00 IST.</p>
    </div>
    <div>
      <p class="mono lbl">How it works</p>
      <p class="small">Most custom builds cost ₹1,50,000 to ₹5,00,000, or $2,500 to $10,000 for clients outside India, billed by milestone. A typical marketing site takes 4 to 8 weeks. Web applications are scoped in discovery and sit at the top of that range or above.</p>
      <p class="small">Every milestone arrives on a staging link, and the repository is handed over at the end.</p>
    </div>
  </div>
`));

const font = f => pathToFileURL(path.join(PUB, 'assets', 'fonts', f)).href;
const css = `
@font-face { font-family: 'Bricolage'; src: url('${font('bricolage-display.woff2')}') format('woff2'); font-weight: 640 800; font-stretch: 75% 92%; }
@font-face { font-family: 'Bricolage'; src: url('${font('bricolage-text.woff2')}') format('woff2'); font-weight: 400 639; font-stretch: 88% 100%; }
@font-face { font-family: 'Geist Mono'; src: url('${font('geist-mono-400_600-normal.woff2')}') format('woff2'); font-weight: 400 600; }
@page { size: 1280px 720px; margin: 0; }
:root { --indigo: #23003F; --deep: #18002C; --raised: #2E0B4F; --yellow: #FFFDB4; --lilac: #BCACCE; --red: #F94500; }
* { box-sizing: border-box; margin: 0; }
html, body { background: var(--indigo); }
body { font-family: 'Bricolage', system-ui, sans-serif; color: var(--yellow); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 1280px; height: 720px; overflow: hidden; padding: 52px 64px 56px; page-break-after: always; break-after: page; background: var(--indigo); }
.mono { font: 500 12px/1.2 'Geist Mono', ui-monospace, monospace; letter-spacing: 0.08em; text-transform: uppercase; color: var(--lilac); }
.kicker { margin-bottom: 26px; } .kicker b { color: var(--red); font-weight: 500; } .small { }
.foot { position: absolute; left: 64px; right: 64px; bottom: 24px; display: flex; justify-content: space-between; font: 500 11px/1 'Geist Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; color: var(--lilac); border-top: 1px solid rgba(188,172,206,0.3); padding-top: 12px; }
h1, h2, h3 { font-weight: 790; font-stretch: 82%; letter-spacing: -0.03em; line-height: 0.95; }
.badge { display: inline-grid; place-items: center; width: 1em; height: 1em; border-radius: 50%; background: var(--red); color: var(--indigo); vertical-align: middle; margin-left: 0.18em; }
.badge svg { width: 56%; height: 56%; }
.badge--xl { font-size: 0.62em; }
.muted { color: var(--lilac); }
.cover { display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 72px; }
.cover h1 { font-size: 220px; line-height: 0.86; margin-bottom: 30px; }
.cover .lede { max-width: 760px; font-size: 24px; line-height: 1.3; color: var(--lilac); margin-bottom: 28px; }
.cover__meta { color: var(--yellow); }
.cover .kicker { position: absolute; top: 52px; left: 64px; }
.two { display: grid; grid-template-columns: 1.1fr 1fr; gap: 80px; margin-top: 8px; }
.about h2 { font-size: 64px; margin-bottom: 26px; }
.body { font-size: 19px; line-height: 1.42; color: var(--lilac); margin-bottom: 16px; max-width: 560px; }
.list { list-style: none; padding: 0; } .list li { font-size: 24px; font-weight: 650; font-stretch: 90%; padding: 9px 0; border-bottom: 1px solid rgba(188,172,206,0.25); }
.strip { display: flex; flex-wrap: wrap; gap: 8px 22px; } .strip s { font: 500 15px 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; color: var(--lilac); text-decoration-color: var(--red); text-decoration-thickness: 2px; }
.small.kicker, .kicker.small { margin-bottom: 12px; }
.two--toc { grid-template-columns: 0.8fr 1.2fr; gap: 64px; }
.h3 { font-size: 46px; margin-bottom: 12px; } .pg { margin-top: 10px; color: var(--yellow); }
.toc { list-style: none; padding: 0; min-width: 0; } .toc li { display: grid; grid-template-columns: 40px 1fr 170px 34px; gap: 10px; align-items: baseline; padding: 9px 0; border-bottom: 1px solid rgba(188,172,206,0.22); }
.toc .n { font: 600 12px 'Geist Mono', monospace; color: var(--red); } .toc .t { font-size: 22px; font-weight: 650; font-stretch: 90%; } .toc .c { font-size: 13px; color: var(--lilac); } .toc .p { font: 500 12px 'Geist Mono', monospace; color: var(--lilac); text-align: right; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 40px; }
.card { display: grid; grid-template-columns: 270px 1fr; gap: 20px; align-items: start; }
.card .frame { grid-row: 1 / span 6; }
.card > :not(.frame) { grid-column: 2; }
.card h3 { font-size: 30px; margin: 2px 0 4px; } .card .meta { margin-bottom: 8px; font-size: 10.5px; line-height: 1.4; }
.card__row { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; margin: 0; }
.num { font: 700 15px 'Geist Mono', monospace; color: var(--red); letter-spacing: 0.04em; }
.small { font-size: 13.5px; line-height: 1.38; color: var(--lilac); } .card .small { font-size: 13.5px; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
.tag { font-size: 10.5px; } .tag.own { color: var(--yellow); }
.page-ref { margin-top: 8px; font-size: 10.5px; color: var(--yellow); }
.frame { border: 1.5px solid rgba(188,172,206,0.55); border-radius: 8px; overflow: hidden; background: var(--deep); }
.frame__bar { display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-bottom: 1px solid rgba(188,172,206,0.3); background: var(--raised); }
.frame__bar i { width: 7px; height: 7px; border-radius: 50%; border: 1.2px solid var(--lilac); } .frame__bar span { margin-left: 8px; font: 500 10px 'Geist Mono', monospace; color: var(--lilac); letter-spacing: 0.06em; }
.frame img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
.frame--thumb img { aspect-ratio: 16 / 9.4; }
.case__media .frame img { aspect-ratio: 16 / 9; }
.frame--none { display: grid; place-items: center; align-content: center; gap: 6px; aspect-ratio: 16 / 10; background: var(--raised); text-align: center; padding: 20px; }
.frame--none .badge { font-size: 54px; margin: 0 0 6px; } .frame--none b { font-size: 26px; font-weight: 790; font-stretch: 82%; letter-spacing: -0.02em; } .frame--none span:last-child { font: 500 11px 'Geist Mono', monospace; color: var(--lilac); text-transform: uppercase; letter-spacing: 0.08em; }
.case__cols { display: grid; grid-template-columns: 640px 1fr; gap: 44px; }
.case .small { font-size: 13px; line-height: 1.34; }
.thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
.thumbs figure { margin: 0; } .thumbs img { width: 100%; aspect-ratio: 16 / 8; object-fit: cover; object-position: top; border-radius: 5px; border: 1px solid rgba(188,172,206,0.4); display: block; }
.thumbs figcaption { font: 500 9.5px/1.3 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em; color: var(--lilac); margin-top: 4px; }
.case__name { font-size: 52px; margin: 6px 0 6px; display: flex; align-items: baseline; gap: 14px; } .case__name .num { font-size: 22px; transform: translateY(-14px); }
.lede2 { font-size: 17px; line-height: 1.3; margin: 8px 0 10px; font-weight: 520; }
.lbl { margin: 11px 0 4px; color: var(--red); }
.built { list-style: none; padding: 0; } .built li { font-size: 13px; line-height: 1.32; color: var(--lilac); padding-left: 16px; position: relative; margin-bottom: 3px; } .built li::before { content: '*'; position: absolute; left: 0; top: 1px; font: 700 14px 'Geist Mono', monospace; color: var(--red); }
.facts { margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(188,172,206,0.3); color: var(--lilac); line-height: 1.6; } .facts b { color: var(--yellow); font-weight: 500; }
.contact .big { }
.big { font-size: 118px; line-height: 0.9; margin: 10px 0 40px; }
.two--contact { grid-template-columns: 1fr 1fr; gap: 70px; } .contact { font-size: 30px; font-weight: 700; font-stretch: 88%; line-height: 1.3; margin: 6px 0 14px; letter-spacing: -0.01em; }
.contact .small, .page.contact .small { font-size: 15.5px; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Kawaki Studios portfolio</title><style>${css}</style></head><body>${pages.join('\n')}</body></html>`;

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tmp = path.join(os.tmpdir(), 'kawaki-portfolio.html');
  fs.writeFileSync(tmp, html);
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0), null, { timeout: 30000 }).catch(() => console.warn('Some images did not load'));
  await p.pdf({ path: OUT, width: '1280px', height: '720px', printBackground: true, preferCSSPageSize: true });
  const bad = await p.evaluate(() => [...document.querySelectorAll('.page')].map((el, i) => el.scrollHeight > el.clientHeight + 1 ? i + 1 : 0).filter(Boolean));
  await browser.close();
  const mb = (fs.statSync(OUT).size / 1048576).toFixed(1);
  console.log(`portfolio PDF: ${TOTAL} pages, ${mb} MB -> ${path.relative(ROOT, OUT)}`);
  if (bad.length) console.warn('Pages whose content overflows (check them):', bad.join(', '));
})().catch(e => { console.error(e); process.exit(1); });
