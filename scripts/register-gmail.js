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
  console.log('Navigating tab 573206870 to http://yellowpages.in/register...');
  await request('/navigate', { tabId: 573206870, url: 'http://yellowpages.in/register', wait: true });
  await sleep(3000);

  console.log('Filling form with ks05460@gmail.com...');
  const fillCode = `
    (() => {
      const fname = document.getElementById('MainContent_firstname');
      const lname = document.getElementById('MainContent_lastname');
      const uname = document.getElementById('MainContent_username');
      const pwd = document.getElementById('MainContent_password');
      const btn = document.getElementById('MainContent_btnRegister');

      if (!fname || !lname || !uname || !pwd || !btn) return { error: 'Missing elements' };

      fname.value = 'Kunal';
      fname.dispatchEvent(new Event('input', { bubbles: true }));
      fname.dispatchEvent(new Event('change', { bubbles: true }));

      lname.value = 'Sharma';
      lname.dispatchEvent(new Event('input', { bubbles: true }));
      lname.dispatchEvent(new Event('change', { bubbles: true }));

      uname.value = 'ks05460@gmail.com';
      uname.dispatchEvent(new Event('input', { bubbles: true }));
      uname.dispatchEvent(new Event('change', { bubbles: true }));

      pwd.value = 'KawakiStudios@2026';
      pwd.dispatchEvent(new Event('input', { bubbles: true }));
      pwd.dispatchEvent(new Event('change', { bubbles: true }));

      btn.click();
      return { success: true };
    })()
  `;

  const fillRes = await request('/eval', { tabId: 573206870, expression: fillCode });
  console.log('Fill result:', fillRes.data?.value);

  await sleep(4000);

  const status = await request('/eval', {
    tabId: 573206870,
    expression: `(() => ({ url: window.location.href, title: document.title, text: document.body.innerText.slice(0, 500) }))()`
  });

  console.log('Status after registration:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

