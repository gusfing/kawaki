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
      if (!input) return { error: "No input found" };

      input.focus();
      input.value = "https://kawaki.co.in/sitemap-blog.xml";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // Find submit button
      const submitBtn = Array.from(document.querySelectorAll('div[role="button"], button'))
        .find(b => (b.innerText || '').trim().toUpperCase() === 'SUBMIT');

      return {
        inputValue: input.value,
        buttonFound: Boolean(submitBtn),
        buttonDisabled: submitBtn ? submitBtn.getAttribute('aria-disabled') : null,
        buttonClass: submitBtn ? submitBtn.className : null
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);

