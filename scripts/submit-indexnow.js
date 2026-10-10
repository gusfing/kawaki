const https = require('https');
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

// Allow filtering by argument if specified (e.g. node submit-indexnow.js https://kawaki.co.in/)
const passedUrls = process.argv.slice(2).filter(u => u.startsWith('http'));
const urlsToSubmit = passedUrls.length > 0 ? passedUrls : locMatches;

console.log(`   Submitting ${urlsToSubmit.length} canonical URLs to https://api.indexnow.org/indexnow ...`);

const payload = JSON.stringify({
  host: 'kawaki.co.in',
  key: indexNowKey,
  keyLocation: `https://kawaki.co.in/${indexNowKey}.txt`,
  urlList: urlsToSubmit
});

const req = https.request('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let responseBody = '';
  res.on('data', chunk => responseBody += chunk);
  res.on('end', () => {
    console.log(`\nHTTP Response Status: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200) {
      console.log('✓ [IndexNow] SUCCESS (200 OK): URLs submitted and acknowledged by IndexNow network.');
    } else if (res.statusCode === 202) {
      console.log('✓ [IndexNow] ACCEPTED (202): URLs received. Search engine will validate key at https://kawaki.co.in/' + indexNowKey + '.txt once deployed.');
    } else {
      console.log(`⚠️ [IndexNow] Response (${res.statusCode}): ${responseBody}`);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ [IndexNow] Request failed:', err.message);
});

req.write(payload);
req.end();
