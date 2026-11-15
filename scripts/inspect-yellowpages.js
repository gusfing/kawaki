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
      const forms = Array.from(document.querySelectorAll('form')).map(f => ({
        id: f.id,
        name: f.name,
        action: f.action,
        method: f.method
      }));

      const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
        tag: el.tagName,
        type: el.type || '',
        id: el.id,
        name: el.name,
        placeholder: el.placeholder || '',
        value: el.value || '',
        required: el.required,
        ariaLabel: el.getAttribute('aria-label') || ''
      }));

      const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"], a.btn, div[role="button"]'))
        .map(b => (b.innerText || b.value || '').trim())
        .filter(t => t.length > 0 && t.length < 50);

      return {
        url: window.location.href,
        title: document.title,
        forms,
        inputs,
        buttons
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

