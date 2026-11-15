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

async function inspectUrl(url) {
  console.log(`Inspecting URL: ${url}...`);

  const code = `
    (() => {
      const input = document.querySelector('input[aria-label="Inspect any URL in kawaki.co.in"]');
      if (!input) return { error: "Inspect input not found" };

      input.focus();
      input.value = "${url}";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      const keydown = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true });
      const form = input.closest('form');
      input.dispatchEvent(keydown);
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      return { success: true };
    })()
  `;

  await evalChrome(code);
  await sleep(7000);

  const res = await evalChrome(`
    (() => {
      const divs = Array.from(document.querySelectorAll('div, span, p'))
        .filter(el => {
          const t = el.innerText || '';
          return (t.includes('URL is on Google') || t.includes('URL is not on Google') || t.includes('Discovered') || t.includes('Crawled')) && el.children.length < 4;
        })
        .map(el => el.innerText.trim());

      return {
        url: window.location.href,
        status: Array.from(new Set(divs)).slice(0, 5)
      };
    })()
  `);

  console.log('Result for', url, ':', JSON.stringify(res.data?.value, null, 2));
}

async function run() {
  await inspectUrl("https://kawaki.co.in/sitemap.html");
}

run().catch(console.error);

