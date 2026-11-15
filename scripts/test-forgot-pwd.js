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
  console.log('Navigating tab 573206870 to login page...');
  await request('/navigate', { tabId: 573206870, url: 'http://yellowpages.in/login', wait: true });
  await sleep(2500);

  console.log('Clicking Forgot Password...');
  const clickCode = `
    (() => {
      const forgotLink = Array.from(document.querySelectorAll('a, span, div'))
        .find(el => (el.innerText || '').trim().toLowerCase() === 'forgot password');

      if (forgotLink) {
        forgotLink.click();
        return { clicked: true };
      }
      return { clicked: false };
    })()
  `;

  const clickRes = await request('/eval', { tabId: 573206870, expression: clickCode });
  console.log('Click result:', clickRes.data?.value);

  await sleep(2000);

  const checkModal = await request('/eval', {
    tabId: 573206870,
    expression: `(() => {
      const input = document.getElementById('MainContent_userInput') || document.querySelector('input[placeholder*="email" i], input[type="email"]');
      const submitBtn = document.getElementById('MainContent_btnForgotPwd');
      const visible = input ? input.offsetParent !== null : false;
      return {
        inputFound: !!input,
        inputVisible: visible,
        inputId: input ? input.id : null,
        btnFound: !!submitBtn,
        textSnippet: document.body.innerText.slice(0, 600)
      };
    })()`
  });

  console.log('Modal status:', JSON.stringify(checkModal.data?.value, null, 2));
}

run().catch(console.error);

