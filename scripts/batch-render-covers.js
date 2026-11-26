const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let pw;
try {
  pw = require('playwright');
} catch (e) {
  pw = require('playwright-core');
}

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'assets', 'images', 'blog');
const TEMPLATE = path.join(ROOT, 'templates', 'blog-cover', 'cover.html');
const ARTICLES_FILE = path.join(ROOT, 'data', 'all-published-articles.json');

const STRUCK = ['Guesswork', 'Filler', 'Bought themes', 'Plugin piles', 'Black boxes', 'Lock-in'];

function wordsFor(tags, seed) {
  const kept = (tags || []).slice(0, 3);
  const cut = STRUCK[seed % STRUCK.length];
  const out = [];
  kept.forEach((t, i) => { out.push(t); if (i === 0) out.push('cut:' + cut); });
  return (out.length ? out : ['Plain words', 'cut:' + cut, 'Real work']).join('|');
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
  console.log(`🚀 Starting batch rendering for ${articles.length} covers...`);

  const browser = await pw.chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: 1376, height: 768 } });

  const covers = {};
  let i = 0;
  for (const a of articles) {
    const topic = (a.tags && a.tags[0]) || 'Engineering';
    const shortTitle = a.title.split(':')[0].trim();
    const words = wordsFor(a.tags, i++);
    
    const params = new URLSearchParams({
      t: shortTitle,
      k: topic,
      s: a.slug,
      w: words
    });
    
    const fileUrl = 'file://' + TEMPLATE + '?' + params.toString();
    await page.goto(fileUrl);
    await page.waitForFunction(() => document.body.dataset.ready === '1');
    await page.evaluate(() => document.fonts.ready);

    const jpg = path.join(OUT, `${a.slug}-cover.jpg`);
    const webp = path.join(OUT, `${a.slug}-cover.webp`);
    const webp720 = path.join(OUT, `${a.slug}-cover-720.webp`);

    await page.screenshot({ path: jpg, type: 'jpeg', quality: 92 });
    execSync(`ffmpeg -v error -y -i "${jpg}" -c:v libwebp -quality 85 "${webp}"`);
    execSync(`ffmpeg -v error -y -i "${jpg}" -vf scale=720:-2 -c:v libwebp -quality 82 "${webp720}"`);

    covers[a.slug] = `/assets/images/blog/${a.slug}-cover.jpg`;
    console.log(`✓ [${i}/${articles.length}] Rendered: ${a.slug}`);
  }

  await browser.close();
  fs.writeFileSync(path.join(ROOT, 'data', 'blog-covers.json'), JSON.stringify(covers, null, 2) + '\n');
  console.log(`🎉 Batch rendering complete! Rendered ${Object.keys(covers).length} covers.`);
})();
