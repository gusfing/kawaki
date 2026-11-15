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
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { resolve({ raw: body }); }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  const code = `
    (() => {
      // Find search result rows in Gmail
      const rows = Array.from(document.querySelectorAll('tr[role="row"], .zA'))
        .map(r => {
          const sender = r.querySelector('.yX, .zF, .bA4')?.innerText || '';
          const snippet = r.querySelector('.y6, .y2')?.innerText || '';
          const date = r.querySelector('.xW, .m1')?.innerText || '';
          return { sender, snippet, date, fullText: r.innerText.replace(/\\n+/g, ' ') };
        });

      return {
        url: window.location.href,
        rowsCount: rows.length,
        rows: rows.slice(0, 10)
      };
    })()
  `;

  const res = await request('/eval', { tabId: 573207387, expression: code });
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

