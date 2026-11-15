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
  console.log('Clicking REQUEST INDEXING button for /directory...');

  const clickCode = `
    (() => {
      const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const reqBtn = btns.find(b => (b.innerText || '').trim().toUpperCase() === 'REQUEST INDEXING');
      if (reqBtn) {
        reqBtn.click();
        return { clicked: true, text: reqBtn.innerText };
      }
      return { clicked: false };
    })()
  `;

  const res = await evalChrome(clickCode);
  console.log('Click result:', res.data?.value);

  // Wait 12 seconds for the live testing popup to complete
  console.log('Waiting for live URL check modal to complete...');
  for (let i = 0; i < 6; i++) {
    await sleep(4000);
    const modalCheck = await evalChrome(`
      (() => {
        const dialog = document.querySelector('[role="dialog"], [role="alertdialog"], .modal, .VfPpkd-BI8Wr-di8rgd');
        const gotItBtn = Array.from(document.querySelectorAll('button, div[role="button"]'))
          .find(b => (b.innerText || '').trim().toLowerCase() === 'got it');

        let dismissed = false;
        if (gotItBtn) {
          gotItBtn.click();
          dismissed = true;
        }

        return {
          dialogText: dialog ? dialog.innerText.slice(0, 300) : null,
          dismissed
        };
      })()
    `);
    console.log(`Poll ${i+1}:`, modalCheck.data?.value);
    if (modalCheck.data?.value?.dismissed) {
      console.log('Successfully dismissed confirmation modal!');
      break;
    }
  }
}

run().catch(console.error);

