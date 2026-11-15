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

async function submitSitemap(url) {
  console.log(`\n========================================`);
  console.log(`▶ Submitting: ${url}`);
  console.log(`========================================`);

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
      submitBtn.click();
      return { success: true };
    })()
  `;

  const fillRes = await evalChrome(fillCode);
  if (!fillRes.success || fillRes.data?.value?.error) {
    console.error('Failed to fill/submit:', fillRes);
    return false;
  }

  // Wait 4-5 seconds for GSC modal dialog
  await sleep(4500);

  // Dismiss modal if open
  const dismissCode = `
    (() => {
      const gotItBtn = Array.from(document.querySelectorAll('button, div[role="button"]'))
        .find(b => {
          const t = (b.innerText || '').trim().toLowerCase();
          return t === 'got it' || t === 'ok' || t === 'dismiss' || t === 'close';
        });

      if (gotItBtn) {
        gotItBtn.click();
        return { dismissed: true };
      }
      return { dismissed: false };
    })()
  `;

  await evalChrome(dismissCode);
  await sleep(2000);
  return true;
}

async function run() {
  const sitemaps = [
    "https://kawaki.co.in/sitemap-services.xml",
    "https://kawaki.co.in/sitemap-case-studies.xml",
    "https://kawaki.co.in/sitemap-locations.xml",
    "https://kawaki.co.in/sitemap.xml"
  ];

  for (const sm of sitemaps) {
    await submitSitemap(sm);
  }

  // Get final table state
  const inspectCode = `
    (() => {
      const rows = Array.from(document.querySelectorAll('table tr, [role="row"]'))
        .map(r => r.innerText.replace(/\\s+/g, ' ').trim())
        .filter(r => r.length > 0);
      return rows;
    })()
  `;

  const finalRows = await evalChrome(inspectCode);
  console.log('\n========================================');
  console.log('🏁 FINAL SUBMITTED SITEMAPS IN GSC:');
  console.log('========================================');
  if (finalRows.data?.value) {
    finalRows.data.value.forEach((r, idx) => console.log(`${idx}: ${r}`));
  }
}

run().catch(console.error);

