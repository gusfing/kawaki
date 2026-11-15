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

  console.log('1. Clicking dropdown button (I\'d prefer not to say)...');
  const openMenuRes = await post('contra_eval', {
    tabId,
    cmd: 'click_containing',
    payload: { text: "I'd prefer not to say" }
  });
  console.log('Dropdown click:', openMenuRes);
  await new Promise(r => setTimeout(r, 1200));

  console.log('2. Clicking rate option $50 - $75/hr...');
  const selectRes = await post('contra_eval', {
    tabId,
    cmd: 'click_containing',
    payload: { text: '50 - $75' }
  });
  console.log('Select option result:', selectRes);
  await new Promise(r => setTimeout(r, 1000));

  console.log('3. Clicking Save...');
  const saveRes = await post('contra_eval', {
    tabId,
    cmd: 'click_containing',
    payload: { text: 'Save' }
  });
  console.log('Save result:', saveRes);
  await new Promise(r => setTimeout(r, 3000));

  const content = await post('get_content', { tabId });
  console.log('=== Post-save snippet ===');
  console.log(content.data?.textSnippet?.slice(0, 1500));
}

run().catch(console.error);
