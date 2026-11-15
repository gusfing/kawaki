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
  console.log('Updating Hotfrog IN with ks05460@gmail.com...');
  const code = `
    (() => {
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.value = 'ks05460@gmail.com';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        emailInput.dispatchEvent(new Event('change', { bubbles: true }));
        return { updated: true, val: emailInput.value };
      }
      return { updated: false };
    })()
  `;

  const res = await request('/eval', { tabId: 573207439, expression: code });
  console.log('Hotfrog update:', JSON.stringify(res, null, 2));
}

run().catch(console.error);
