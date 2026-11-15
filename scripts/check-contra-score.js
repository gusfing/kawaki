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
      timeout: 10000
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
  const res = await bridgeRequest('get_content', { tabId: 573208770 });
  console.log('Snippet length:', res.data ? res.data.textSnippet.length : 0);
  console.log('Checklist:\n', res.data ? res.data.textSnippet.slice(1000, 2500) : null);
}

run().catch(console.error);
