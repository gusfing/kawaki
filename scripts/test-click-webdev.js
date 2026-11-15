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
  console.log('Clicking Web Developer...');
  const res = await post('click', { tabId, selector: 'Web Developer' });
  console.log('Result:', res);
  await new Promise(r => setTimeout(r, 1200));
  await post('screenshot', { tabId, savePath: 'after_web_dev_click.png' });
}

run().catch(console.error);

