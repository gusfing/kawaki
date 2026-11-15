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
      const buttons = Array.from(document.querySelectorAll('button, div[role="button"], a[role="button"]'))
        .map(b => (b.innerText || '').trim())
        .filter(t => t.length > 0 && t.length < 50);

      const main = document.querySelector('[role="main"], c-wiz') || document.body;

      return {
        url: window.location.href,
        buttons,
        text: main.innerText.slice(0, 1500)
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

