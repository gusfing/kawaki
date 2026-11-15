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
  const res = await post('contra_eval', {
    tabId,
    cmd: 'click_skill_toggle_btn',
    payload: {}
  });
  console.log('Result:', res);
  await new Promise(r => setTimeout(r, 1200));
  await post('screenshot', { tabId, savePath: 'after_toggle_click.png' });
}

run().catch(console.error);

