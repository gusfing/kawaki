const http = require('http');

async function evalChrome(expression, tabId = 573206870) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ expression, tabId });
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
  console.log('Logging in to Yellowpages.in...');
  const loginCode = `
    (() => {
      const emailInput = document.getElementById('MainContent_txtEmail');
      const pwdInput = document.getElementById('MainContent_txtPass');
      const btn = document.getElementById('MainContent_btnLogin');

      if (!emailInput || !pwdInput || !btn) return { error: 'Missing login elements' };

      emailInput.value = 'contact@kawaki.co.in';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));

      pwdInput.value = 'KawakiStudios@2026';
      pwdInput.dispatchEvent(new Event('input', { bubbles: true }));
      pwdInput.dispatchEvent(new Event('change', { bubbles: true }));

      btn.click();
      return { success: true };
    })()
  `;

  await evalChrome(loginCode);
  await sleep(4000);

  const status = await evalChrome(`
    (() => {
      const err = document.getElementById('MainContent_lblMsg');
      const text = document.body ? document.body.innerText : '';
      return {
        url: window.location.href,
        title: document.title,
        errMsg: err ? err.innerText : null,
        snippet: text.slice(0, 800)
      };
    })()
  `);

  console.log('Login result:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

