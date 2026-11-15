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
  const urlToInspect = "https://kawaki.co.in/directory";
  console.log(`Triggering URL Inspection for: ${urlToInspect}...`);

  const triggerCode = `
    (() => {
      const input = document.querySelector('input[aria-label="Inspect any URL in kawaki.co.in"]');
      if (!input) return { error: "Inspect input not found" };

      input.focus();
      input.value = "${urlToInspect}";
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // Dispatch Enter key
      const keydown = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true });
      const keypress = new KeyboardEvent('keypress', { key: 'Enter', keyCode: 13, which: 13, bubbles: true });
      const keyup = new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, which: 13, bubbles: true });

      input.dispatchEvent(keydown);
      input.dispatchEvent(keypress);
      input.dispatchEvent(keyup);

      // Check if parent form exists and submit it
      const form = input.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }

      return { success: true, value: input.value };
    })()
  `;

  const res = await evalChrome(triggerCode);
  console.log('Trigger result:', res.data?.value);

  // Wait 6 seconds for inspection to load
  await sleep(6000);

  const status = await evalChrome(`
    (() => {
      return {
        url: window.location.href,
        textSnippet: (document.body ? document.body.innerText : '').slice(0, 1000)
      };
    })()
  `);

  console.log('Current URL after inspection:', status.data?.value?.url);
}

run().catch(console.error);

