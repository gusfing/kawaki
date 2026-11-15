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
  const code = `
    (() => {
      const u = document.getElementById('registration-username');
      const p = document.getElementById('registration-password');
      const btn = Array.from(document.querySelectorAll('input[type="submit"]')).find(b => (b.value || '').includes('Login'));

      if (!u || !p || !btn) return { error: 'Missing elements' };

      u.value = 'kawakistudios';
      u.dispatchEvent(new Event('input', { bubbles: true }));
      u.dispatchEvent(new Event('change', { bubbles: true }));

      p.value = 'KawakiStudios@2026';
      p.dispatchEvent(new Event('input', { bubbles: true }));
      p.dispatchEvent(new Event('change', { bubbles: true }));

      btn.click();
      return { success: true };
    })()
  `;

  const res = await request('/eval', { tabId: 573207409, expression: code });
  console.log('Login result:', JSON.stringify(res.data?.value, null, 2));

  await sleep(4000);

  const status = await request('/eval', {
    tabId: 573207409,
    expression: `(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 800)
    }))()`
  });

  console.log('Page after login:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

