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
  const code = `
    (() => {
      const seeDetailsBtn = Array.from(document.querySelectorAll('button, div[role="button"], a'))
        .find(b => (b.innerText || '').trim().toUpperCase() === 'SEE DETAILS');

      if (seeDetailsBtn) {
        seeDetailsBtn.click();
        return { clicked: true };
      }
      return { clicked: false };
    })()
  `;

  const res = await evalChrome(code);
  console.log('See details click:', res.data?.value);

  await sleep(3000);

  const detailCode = `
    (() => {
      const dialog = document.querySelector('[role="dialog"], [role="alertdialog"], .modal, .VfPpkd-BI8Wr-di8rgd') || document.body;
      return {
        text: dialog.innerText.slice(0, 1000)
      };
    })()
  `;

  const dRes = await evalChrome(detailCode);
  console.log('Dialog / Details Text:\n', dRes.data?.value?.text);
}

run().catch(console.error);

