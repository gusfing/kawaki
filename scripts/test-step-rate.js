const http = require('http');

function post(action, payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: '/' + action,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.write(data);
    req.end();
  });
}

async function run() {
  const tabId = 573210206;
  console.log('Step A: Navigating to addRate=true...');
  await post('navigate', { tabId, url: 'https://contra.com/kunal_sharma_3knl9lca/about?addRate=true', wait: true });
  await new Promise(r => setTimeout(r, 3000));
  await post('screenshot', { tabId, savePath: 'stepA.png' });

  console.log('Step B: Selecting $50 - $75/hr...');
  const res = await post('contra_eval', {
    tabId,
    cmd: 'select_contra_rate',
    payload: { rate: '$50 - $75/hr' }
  });
  console.log('Step B result:', res);
  await new Promise(r => setTimeout(r, 1000));
  await post('screenshot', { tabId, savePath: 'stepB.png' });
}

run().catch(console.error);

