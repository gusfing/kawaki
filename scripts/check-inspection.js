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
      const inputs = Array.from(document.querySelectorAll('input'))
        .map(i => ({
          ariaLabel: i.getAttribute('aria-label'),
          placeholder: i.placeholder,
          class: i.className,
          name: i.name,
          type: i.type
        }));
      return {
        url: window.location.href,
        inputs
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);
