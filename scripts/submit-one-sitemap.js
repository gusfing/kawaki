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

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function submitSitemap(url) {
  console.log(`Submitting sitemap: ${url}...`);

  // 1. Enter URL into input
  const fillCode = `
    (() => {
      const input = document.querySelector('input[aria-label="Enter sitemap URL"]');
      if (!input) return { error: "No input found" };
      input.focus();
      input.value = "${url}";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      const submitBtn = Array.from(document.querySelectorAll('div[role="button"], button'))
        .find(b => (b.innerText || '').trim().toUpperCase() === 'SUBMIT');

      if (!submitBtn) return { error: "Submit button not found" };
      
      // Click submit
      submitBtn.click();
      return { success: true, clicked: true };
    })()
  `;

  const fillRes = await evalChrome(fillCode);
  console.log('Click result:', fillRes.data?.value);

  // Wait 4 seconds for modal / response
  console.log('Waiting for response modal...');
  await sleep(4000);

  // Check for dialog and dismiss if present
  const checkModalCode = `
    (() => {
      // Check dialog or snackbar
      const dialog = document.querySelector('[role="dialog"], [role="alertdialog"], .modal, .VfPpkd-BI8Wr-di8rgd');
      const dialogText = dialog ? dialog.innerText : null;

      // Look for "Got it" or "OK" or "Close" button
      let dismissed = false;
      const gotItBtn = Array.from(document.querySelectorAll('button, div[role="button"]'))
        .find(b => {
          const t = (b.innerText || '').trim().toLowerCase();
          return t === 'got it' || t === 'ok' || t === 'dismiss' || t === 'close';
        });

      if (gotItBtn) {
        gotItBtn.click();
        dismissed = true;
      }

      // Check current rows in table
      const rows = Array.from(document.querySelectorAll('table tr, [role="row"]'))
        .map(r => r.innerText.replace(/\\s+/g, ' ').trim())
        .filter(r => r.length > 0);

      return {
        dialogText,
        dismissed,
        rows: rows.slice(0, 8)
      };
    })()
  `;

  const modalRes = await evalChrome(checkModalCode);
  console.log('Modal Result:', JSON.stringify(modalRes.data?.value, null, 2));
}

async function run() {
  await submitSitemap("https://kawaki.co.in/sitemap-blog.xml");
}

run().catch(console.error);

