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
  console.log('Clicking $50 - $75/hr...');
  
  // Click the option
  const clickRes = await post('click', {
    tabId,
    selector: '$50 - $75/hr'
  });
  console.log('Option click:', clickRes);

  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Save button...');
  const saveRes = await post('click', {
    tabId,
    selector: 'Save'
  });
  console.log('Save click:', saveRes);

  await new Promise(r => setTimeout(r, 2500));
  await post('screenshot', { tabId, savePath: 'contra_rate_saved.png' });
}

run().catch(console.error);

