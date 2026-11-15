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

async function run() {
  const code = `
    (() => {
      const emailInput = document.getElementById('MainContent_txtEmail') || document.getElementById('ipEmail');
      const pwdInput = document.getElementById('MainContent_txtPass') || document.getElementById('ipPwd');
      const userText = Array.from(document.querySelectorAll('a, span')).map(el => el.innerText).filter(t => t.includes('My account') || t.includes('Welcome') || t.includes('Logout'));

      return {
        url: window.location.href,
        title: document.title,
        hasEmail: !!emailInput,
        hasPwd: !!pwdInput,
        userText
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

