const http = require('http');
const fs = require('fs');
const path = require('path');

function bridgeRequest(action, payload = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: `/${action}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
      timeout: 20000
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('1. Navigating to profile page...');
  await bridgeRequest('navigate', {
    tabId: 573207320,
    url: 'https://contra.com/kunal_sharma_3knl9lca/about'
  });
  await sleep(3500);

  const imgPath = path.resolve('public/assets/images/blog/ai-automation-architecture-hero.jpg');
  console.log('Reading cover image:', imgPath);
  const base64Data = fs.readFileSync(imgPath).toString('base64');

  console.log('2. Uploading cover image to Contra...');
  const res = await bridgeRequest('upload_file', {
    tabId: 573207320,
    selector: 'input[type="file"]',
    base64Data,
    fileName: 'kawaki-hero-cover.jpg',
    mimeType: 'image/jpeg'
  });
  console.log('Upload result:', res);

  await sleep(5000);

  const content = await bridgeRequest('get_content', { tabId: 573207320 });
  console.log('Content snippet (first 1000 chars):\n', content.data.textSnippet.slice(0, 1000));
}

run().catch(console.error);
