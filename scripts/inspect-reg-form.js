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

async function run() {
  const code = `
    (() => {
      const btn = document.getElementById('MainContent_btnRegister');
      const fname = document.getElementById('MainContent_firstname');
      const lname = document.getElementById('MainContent_lastname');
      const uname = document.getElementById('MainContent_username');
      const pwd = document.getElementById('MainContent_password');

      return {
        btnOnclick: btn ? btn.getAttribute('onclick') : null,
        btnType: btn ? btn.type : null,
        validators: Array.from(document.querySelectorAll('[id*="validator"], span[style*="color:Red"], .text-danger, span[id*="MainContent"]'))
          .map(v => ({ id: v.id, text: v.innerText, style: v.style.cssText }))
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

