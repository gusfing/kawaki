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
  console.log('1. Navigating to addRate=true...');
  await post('navigate', { tabId, url: 'https://contra.com/kunal_sharma_3knl9lca/about?addRate=true', wait: true });
  await new Promise(r => setTimeout(r, 3000));

  console.log('2. Selecting rate...');
  const res = await post('contra_eval', {
    tabId,
    cmd: 'select_contra_rate',
    payload: { rate: '$50 - $75/hr' }
  });
  console.log('Select result:', res);
  await new Promise(r => setTimeout(r, 1500));
  await post('screenshot', { tabId, savePath: 'after_select.png' });

  console.log('3. Clicking Save...');
  const saveRes = await post('click', { tabId, selector: 'Save' });
  console.log('Save result:', saveRes);
  await new Promise(r => setTimeout(r, 3000));
  await post('screenshot', { tabId, savePath: 'after_save.png' });
}

run().catch(console.error);

