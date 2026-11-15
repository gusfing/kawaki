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
  console.log('Dispatching Enter on skill input...');
  const res = await post('contra_eval', {
    tabId,
    cmd: 'commit_skill_enter',
    payload: {}
  });
  console.log('Result:', res);
  await new Promise(r => setTimeout(r, 1500));
  await post('screenshot', { tabId, savePath: 'after_skill_enter.png' });
}

run().catch(console.error);

