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
  console.log('1. Clicking Add hourly rate...');
  await post('click', { tabId, selector: 'Add hourly rate' });
  await new Promise(r => setTimeout(r, 1500));

  console.log('2. Inspecting dialog buttons...');
  const inspectRes = await post('inspect_contra', { tabId });
  console.log('Buttons:', inspectRes.data?.buttons);
}

run().catch(console.error);

