const http = require('http');

async function request(path, payload = null) {
  return new Promise((resolve, reject) => {
    const isPost = Boolean(payload);
    const postData = isPost ? JSON.stringify(payload) : '';
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path,
      method: isPost ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Searching Gmail for "yellowpages"...');
  const searchCode = `
    (() => {
      const q = document.querySelector('input[name="q"], input[aria-label="Search mail"]');
      if (!q) return { error: 'Search input not found' };

      q.focus();
      q.value = 'yellowpages';
      q.dispatchEvent(new Event('input', { bubbles: true }));
      q.dispatchEvent(new Event('change', { bubbles: true }));

      // Dispatch Enter
      q.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      q.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      q.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));

      const form = q.closest('form');
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      return { success: true };
    })()
  `;

  await request('/eval', { tabId: 573207387, expression: searchCode });
  await sleep(4000);

  const res = await request('/eval', {
    tabId: 573207387,
    expression: `(() => {
      const allText = document.body ? document.body.innerText : '';
      const lines = allText.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
      return {
        url: window.location.href,
        title: document.title,
        textSnippet: allText.slice(0, 800)
      };
    })()`
  });

  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

