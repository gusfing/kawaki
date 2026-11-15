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
      const input = document.querySelector('input[aria-label="Enter sitemap URL"]');
      const allButtons = Array.from(document.querySelectorAll('button, div[role="button"], span[role="button"], [jsaction*="click"]'))
        .map(b => ({
          text: (b.innerText || '').trim(),
          ariaLabel: b.getAttribute('aria-label'),
          role: b.getAttribute('role'),
          tag: b.tagName,
          disabled: b.getAttribute('aria-disabled') || b.disabled,
          class: b.className
        }))
        .filter(b => b.text.length > 0 && b.text.length < 50);

      // Find all rows in sitemap tables
      const tableRows = Array.from(document.querySelectorAll('table tr, [role="row"]'))
        .map(r => r.innerText.replace(/\\s+/g, ' ').trim())
        .filter(r => r.length > 0);

      return {
        url: window.location.href,
        hasInput: Boolean(input),
        inputValue: input ? input.value : null,
        inputPlaceholder: input ? input.placeholder : null,
        buttons: allButtons.slice(0, 20),
        tableRows: tableRows.slice(0, 15)
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);

