const http = require('http');

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
      timeout: 15000
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

async function run() {
  const tabId = 573210256;
  const res = await bridgeRequest('get_content', { tabId });
  if (res.success && res.data) {
    console.log('=== GSC Page Indexing Content ===');
    console.log(res.data.textSnippet.slice(500, 3500));
  } else {
    console.log('Failed to get content:', res);
  }
}

run().catch(console.error);

