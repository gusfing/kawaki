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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Navigating tab 573207387 to Gmail spam folder...');
  await request('/navigate', { tabId: 573207387, url: 'https://mail.google.com/mail/u/0/#spam', wait: true });
  await sleep(3500);

  const res = await request('/eval', {
    tabId: 573207387,
    expression: `(() => {
      const allText = document.body ? document.body.innerText : '';
      const lines = allText.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
      return {
        url: window.location.href,
        title: document.title,
        sampleLines: lines.filter(l => l.toLowerCase().includes('yellow') || l.toLowerCase().includes('confirm') || l.toLowerCase().includes('verif') || l.toLowerCase().includes('code') || l.toLowerCase().includes('password'))
      };
    })()`
  });
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

