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
  console.log('Clicking MainContent_btnList...');
  await evalChrome(`document.getElementById('MainContent_btnList').click()`);
  await sleep(4000);

  const status = await evalChrome(`
    (() => {
      return {
        url: window.location.href,
        title: document.title,
        inputsCount: document.querySelectorAll('input').length,
        textSnippet: document.body ? document.body.innerText.slice(0, 1000) : ''
      };
    })()
  `);

  console.log('Result:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);

