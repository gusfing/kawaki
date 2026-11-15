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
  console.log('Filling ExactSeek form with ks05460@gmail.com...');
  const code = `
    (() => {
      const url = document.getElementById('URL');
      const name = document.getElementById('NAME');
      const email = document.getElementById('EMAIL');
      const agree = document.getElementById('Agreed to Terms');

      if (url) {
        url.value = 'https://kawaki.co.in';
        url.dispatchEvent(new Event('input', { bubbles: true }));
        url.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (name) {
        name.value = 'Kunal Sharma';
        name.dispatchEvent(new Event('input', { bubbles: true }));
        name.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (email) {
        email.value = 'ks05460@gmail.com';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        email.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (agree) {
        agree.checked = true;
        agree.dispatchEvent(new Event('change', { bubbles: true }));
      }

      return {
        url: url?.value,
        name: name?.value,
        email: email?.value,
        agree: agree?.checked
      };
    })()
  `;

  const res = await request('/eval', { tabId: 573207409, expression: code });
  console.log('Filled:', JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

