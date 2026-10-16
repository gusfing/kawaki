const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');

// 1. Locate IndexNow Key
const files = fs.readdirSync(publicDir);
let indexNowKey = null;

for (const f of files) {
  if (f.endsWith('.txt') && f.length >= 32) {
    const keyCandidate = f.slice(0, -4);
    const content = fs.readFileSync(path.join(publicDir, f), 'utf8').trim();
    if (content === keyCandidate) {
      indexNowKey = keyCandidate;
      break;
    }
  }
}

if (!indexNowKey) {
  console.error('❌ [IndexNow] Error: No valid IndexNow key file found in public/ directory!');
  process.exit(1);
}

console.log(`⚡ [IndexNow] Using Key: ${indexNowKey}`);
console.log(`   Key Location: https://kawaki.co.in/${indexNowKey}.txt`);

// 2. Read Canonical URLs from sitemap.xml
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ [IndexNow] Error: public/sitemap.xml not found!');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

const passedUrls = process.argv.slice(2).filter(u => u.startsWith('http'));
const urlsToSubmit = passedUrls.length > 0 ? passedUrls : locMatches;

console.log(`   Submitting ${urlsToSubmit.length} canonical URLs to IndexNow network...\n`);

const payload = JSON.stringify({
  host: 'kawaki.co.in',
  key: indexNowKey,
  keyLocation: `https://kawaki.co.in/${indexNowKey}.txt`,
  urlList: urlsToSubmit
});

const endpoints = [
  { name: 'Microsoft Bing', url: 'https://www.bing.com/indexnow' },
  { name: 'IndexNow Global', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Yandex', url: 'https://yandex.com/indexnow' }
];

async function submitAll() {
  let anySuccess = false;

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: payload,
        signal: AbortSignal.timeout(10000)
      });

      const bodyText = await res.text();
      if (res.status === 200 || res.status === 202) {
        console.log(`✓ [${ep.name}] Status ${res.status} OK: Successfully submitted ${urlsToSubmit.length} URLs.`);
        anySuccess = true;
      } else {
        console.warn(`⚠️ [${ep.name}] Response ${res.status}: ${bodyText.slice(0, 100)}`);
      }
    } catch (err) {
      console.warn(`⚠️ [${ep.name}] Connection notice: ${err.message}`);
    }
  }

  if (anySuccess) {
    console.log('\n🚀 [IndexNow] Batch submission completed successfully across active search gateways.');
  } else {
    console.error('\n❌ [IndexNow] Failed to reach any IndexNow endpoint.');
    process.exit(1);
  }
}

submitAll();
