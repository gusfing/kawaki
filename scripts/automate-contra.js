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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const tabId = 573207320;
  console.log('Moving Contra tab to worker window...');
  const res = await bridgeRequest('create_worker_window', { tabId });
  console.log('Window created:', res);

  await sleep(2000);

  console.log('Testing get_content on unthrottled worker tab...');
  const t0 = Date.now();
  const content = await bridgeRequest('get_content', { tabId });
  console.log(`get_content finished in ${Date.now() - t0}ms!`);
  console.log('Title:', content.data ? content.data.title : null);
  console.log('Snippet end 500 chars:\n', content.data ? content.data.textSnippet.slice(-500) : null);
}

run().catch(console.error);
