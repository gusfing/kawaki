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
  console.log('Submitting Entireweb with ks05460@gmail.com...');
  const code = `
    (() => {
      const urlInput = document.getElementById('contact-us-name');
      const emailInput = document.getElementById('contact-us-email');
      const form = document.getElementById('addurl') || document.querySelector('form');

      if (!urlInput || !emailInput || !form) return { error: 'Missing inputs' };

      urlInput.value = 'https://kawaki.co.in';
      urlInput.dispatchEvent(new Event('input', { bubbles: true }));
      urlInput.dispatchEvent(new Event('change', { bubbles: true }));

      emailInput.value = 'ks05460@gmail.com';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));

      form.submit();
      return { submitted: true };
    })()
  `;

  await request('/eval', { tabId: 573207409, expression: code });
  await sleep(4000);

  const status = await request('/eval', {
    tabId: 573207409,
    expression: `(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 600)
    }))()`
  });

  console.log('Submission status:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

