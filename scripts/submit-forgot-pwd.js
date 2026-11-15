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
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve({ raw: body }); }
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
  console.log('Entering ks05460@gmail.com into Forgot Password...');
  const submitCode = `
    (() => {
      const input = document.getElementById('MainContent_userInput');
      const btn = document.getElementById('MainContent_btnForgotPwd');
      if (!input || !btn) return { error: 'Missing input or button' };

      input.value = 'ks05460@gmail.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      btn.click();
      return { success: true };
    })()
  `;

  await request('/eval', { tabId: 573206870, expression: submitCode });
  await sleep(4000);

  const status = await request('/eval', {
    tabId: 573206870,
    expression: `(() => {
      const lbl = document.getElementById('MainContent_lblMsg');
      const text = document.body ? document.body.innerText : '';
      return {
        url: window.location.href,
        title: document.title,
        lblMsg: lbl ? lbl.innerText : null,
        snippet: text.slice(0, 600)
      };
    })()`
  });

  console.log('Result:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

