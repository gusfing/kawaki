const http = require('http');

async function request(path, payload = null) {
  return new Promise((resolve, reject) => {
    const isPost = Boolean(payload);
    const postData = isPost ? JSON.stringify(payload) : '';
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path,
      method: isPost ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  const status = await request('/eval', {
    tabId: 573207323,
    expression: `(() => ({
      url: window.location.href,
      title: document.title,
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ id: i.id, name: i.name, type: i.type, placeholder: i.placeholder, value: i.value })),
      textSnippet: document.body.innerText.slice(0, 500)
    }))()`
  });
  console.log(JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

