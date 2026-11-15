const http = require('http');

async function evalChrome(expression) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ expression });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: '/eval',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Registering with contact@kawaki.co.in...');

  const fillCode = `
    (() => {
      const fname = document.getElementById('MainContent_firstname');
      const lname = document.getElementById('MainContent_lastname');
      const uname = document.getElementById('MainContent_username');
      const pwd = document.getElementById('MainContent_password');
      const btn = document.getElementById('MainContent_btnRegister');

      if (!fname || !lname || !uname || !pwd || !btn) {
        return { error: 'Missing elements' };
      }

      fname.value = 'Kunal';
      fname.dispatchEvent(new Event('input', { bubbles: true }));
      fname.dispatchEvent(new Event('change', { bubbles: true }));

      lname.value = 'Sharma';
      lname.dispatchEvent(new Event('input', { bubbles: true }));
      lname.dispatchEvent(new Event('change', { bubbles: true }));

      uname.value = 'contact@kawaki.co.in';
      uname.dispatchEvent(new Event('input', { bubbles: true }));
      uname.dispatchEvent(new Event('change', { bubbles: true }));

      pwd.value = 'KawakiStudios@2026';
      pwd.dispatchEvent(new Event('input', { bubbles: true }));
      pwd.dispatchEvent(new Event('change', { bubbles: true }));

      btn.click();
      return { success: true };
    })()
  `;

  const fillRes = await evalChrome(fillCode);
  console.log('Fill result:', fillRes.data?.value);

  await sleep(4000);

  const status = await evalChrome(`
    (() => {
      const lblMsg = document.getElementById('MainContent_lblMsg');
      const text = document.body ? document.body.innerText : '';
      return {
        url: window.location.href,
        title: document.title,
        lblMsg: lblMsg ? lblMsg.innerText : null,
        snippet: text.slice(0, 1000)
      };
    })()
  `);

  console.log('Status after registering with contact@kawaki.co.in:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);
