const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. Generate or load key
const key = '9f7d4c8b2a1e0536781294abef0369c2';
const keyFilePath = path.join(__dirname, '..', 'public', `${key}.txt`);
fs.writeFileSync(keyFilePath, key, 'utf8');
console.log(`[IndexNow] Verification key file created: public/${key}.txt`);

// 2. Read sitemap URLs
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`[IndexNow] Found ${urls.length} URLs in sitemap.xml`);

// 3. Prepare payload for IndexNow
const payload = {
  host: 'kawaki.co.in',
  key: key,
  keyLocation: `https://kawaki.co.in/${key}.txt`,
  urlList: urls
};

function submitIndexNow(endpointHost, endpointPath) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(payload);
    const req = https.request({
      hostname: endpointHost,
      port: 443,
      path: endpointPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          endpoint: `${endpointHost}${endpointPath}`,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          response: body
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        endpoint: `${endpointHost}${endpointPath}`,
        error: err.message
      });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('[IndexNow] Submitting batch to IndexNow endpoints...');
  
  // Submit to IndexNow API hub
  const resHub = await submitIndexNow('api.indexnow.org', '/indexnow');
  console.log('[IndexNow] api.indexnow.org response:', resHub);

  // Submit to Bing endpoint
  const resBing = await submitIndexNow('www.bing.com', '/indexnow');
  console.log('[IndexNow] www.bing.com response:', resBing);

  // Submit to Yandex endpoint
  const resYandex = await submitIndexNow('yandex.com', '/indexnow');
  console.log('[IndexNow] yandex.com response:', resYandex);
}

run().catch(console.error);
