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
  const code = `
    (() => {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const pwdInput = document.getElementById('password');
      const pwdConfInput = document.getElementById('password_confirmation');
      const termsInput = document.getElementById('accept_terms');

      if (nameInput) {
        nameInput.value = 'Kunal Sharma';
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (emailInput) {
        emailInput.value = 'ks05460@gmail.com';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (pwdInput) {
        pwdInput.value = 'KawakiStudios@2026';
        pwdInput.dispatchEvent(new Event('input', { bubbles: true }));
        pwdInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (pwdConfInput) {
        pwdConfInput.value = 'KawakiStudios@2026';
        pwdConfInput.dispatchEvent(new Event('input', { bubbles: true }));
        pwdConfInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (termsInput) {
        termsInput.checked = true;
        termsInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      return {
        name: nameInput?.value,
        email: emailInput?.value,
        pwd: pwdInput?.value ? 'filled' : 'missing',
        terms: termsInput?.checked
      };
    })()
  `;

  const res = await request('/eval', { tabId: 573207439, expression: code });
  console.log('Hotfrog pre-fill with ks05460@gmail.com:', JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

