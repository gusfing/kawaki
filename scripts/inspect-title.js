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
  await post('navigate', { tabId, url: 'https://contra.com/w/kunal_sharma_3knl9lca/portfolio/new', wait: true });
  await new Promise(r => setTimeout(r, 3000));
  await post('click', { tabId, selector: 'Discard' });
  await new Promise(r => setTimeout(r, 1000));

  const inspectRes = await post('contra_eval', {
    tabId,
    cmd: 'inspect_title_dom',
    payload: {}
  });
  console.log('Title element inspection:', JSON.stringify(inspectRes, null, 2));
}

run().catch(console.error);

