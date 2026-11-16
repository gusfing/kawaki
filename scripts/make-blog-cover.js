/* Kawaki Studios: blog cover images. No AI image generation: covers are rendered from
   templates/blog-cover/cover.html in the site's own fonts and colours, so every cover is on brand.

   One cover:  node scripts/make-blog-cover.js --slug my-post --title "Short title" --topic "Shopify" [--words "Shopify|Liquid|cut:Bought themes"]
   All posts:  node scripts/make-blog-cover.js --all      (renders every published post and points its featuredImage at the cover)

   Writes public/assets/images/blog/<slug>-cover.jpg (1376x768) plus <slug>-cover.webp and <slug>-cover-720.webp.
   Needs Playwright with Chromium (npx playwright install chromium) and ffmpeg on the PATH.
   If Playwright lives elsewhere, set PLAYWRIGHT_DIR to the folder that contains its node_modules. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'assets', 'images', 'blog');
const TEMPLATE = path.join(ROOT, 'templates', 'blog-cover', 'cover.html');

function loadPlaywright() {
  const tries = [ROOT, process.env.PLAYWRIGHT_DIR].filter(Boolean);
  for (const dir of tries) {
    try { return require(require.resolve('playwright', { paths: [dir] })); } catch (e) { /* try the next place */ }
  }
  console.error('Playwright not found. Run: npx -y playwright@1.64.1 install chromium && npm i -D playwright@1.64.1\n(or set PLAYWRIGHT_DIR to a folder where Playwright is installed)');
  process.exit(1);
}

const arg = k => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : null; };
const STRUCK = ['Guesswork', 'Filler', 'Bought themes', 'Plugin piles', 'Black boxes', 'Lock-in'];

function wordsFor(tags, seed) {
  const kept = (tags || []).slice(0, 3);
  const cut = STRUCK[seed % STRUCK.length];
  const out = [];
  kept.forEach((t, i) => { out.push(t); if (i === 0) out.push('cut:' + cut); });
  return (out.length ? out : ['Plain words', 'cut:' + cut, 'Real work']).join('|');
}

async function render(page, { slug, title, topic, words }) {
  const url = pathToFileURL(TEMPLATE).href + '?' + new URLSearchParams({ t: title, k: topic, s: slug, w: words }).toString();
  await page.goto(url);
  await page.waitForFunction(() => document.body.dataset.ready === '1');
  await page.evaluate(() => document.fonts.ready);
  const jpg = path.join(OUT, `${slug}-cover.jpg`);
  await page.screenshot({ path: jpg, type: 'jpeg', quality: 92 });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', jpg, '-c:v', 'libwebp', '-quality', '84', path.join(OUT, `${slug}-cover.webp`)]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', jpg, '-vf', 'scale=720:-2', '-c:v', 'libwebp', '-quality', '82', path.join(OUT, `${slug}-cover-720.webp`)]);
  return `/assets/images/blog/${slug}-cover.jpg`;
}

async function main() {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1376, height: 768 }, deviceScaleFactor: 1 });

  if (process.argv.includes('--all')) {
    const { SEO_TITLES } = require('./lib/article-page');
    const { FALLBACK_BLOGS } = require('../lib/db-api-handler.js');
    const { DatabaseSync } = require('node:sqlite');
    const map = new Map();
    (FALLBACK_BLOGS || []).filter(b => b.status === 'published').forEach(b => map.set(b.slug, { slug: b.slug, title: b.title, tags: b.tags }));
    const db = new DatabaseSync(path.join(ROOT, 'data.db'));
    for (const r of db.prepare("SELECT slug, title, tags FROM blogs WHERE status = 'published'").all()) {
      let tags = r.tags; try { tags = JSON.parse(r.tags); } catch (e) { tags = String(r.tags || '').split(',').map(s => s.trim()).filter(Boolean); }
      map.set(r.slug, { slug: r.slug, title: r.title, tags });
    }
    let i = 0;
    const done = {};
    for (const a of map.values()) {
      const short = SEO_TITLES[a.slug] || a.title.split(':')[0];
      done[a.slug] = await render(page, { slug: a.slug, title: short, topic: (a.tags && a.tags[0]) || 'Engineering', words: wordsFor(a.tags, i++) });
      console.log('  cover ' + a.slug);
    }
    db.close();
    fs.writeFileSync(path.join(ROOT, 'data', 'blog-covers.json'), JSON.stringify(done, null, 2) + '\n');
    console.log(`✓ ${Object.keys(done).length} covers. Paths listed in data/blog-covers.json`);
  } else {
    const slug = arg('slug'), title = arg('title');
    if (!slug || !title) { console.error('Usage: node scripts/make-blog-cover.js --slug <slug> --title "<short title>" [--topic "<topic>"] [--words "A|B|cut:C"]'); process.exit(1); }
    const out = await render(page, { slug, title, topic: arg('topic') || 'Engineering', words: arg('words') || wordsFor([arg('topic') || 'Engineering'], 0) });
    console.log(`✓ Cover written. Use in the post's frontmatter: featuredImage: "${out}"`);
  }
  await browser.close();
}
main().catch(e => { console.error(e); process.exit(1); });
