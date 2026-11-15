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
  console.log('1. Click Add hourly rate...');
  await post('click', { tabId, selector: 'Add hourly rate' });
  await new Promise(r => setTimeout(r, 1500));

  console.log('2. Click dropdown trigger...');
  // Click the element that has "I'd prefer not to say" or svg or select
  await post('click', { tabId, selector: "I'd prefer not to say" });
  await new Promise(r => setTimeout(r, 1500));

  // Find all elements that have text starting with $
  const res = await post('contra_eval', {
    tabId,
    cmd: 'click_containing',
    payload: { text: '50 - $75' }
  });
  console.log('Click containing 50 - $75:', res);

  await new Promise(r => setTimeout(r, 1000));
  await post('screenshot', { tabId, savePath: 'dropdown_debug.png' });
}

run().catch(console.error);

