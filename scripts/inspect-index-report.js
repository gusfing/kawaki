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
      const rows = Array.from(document.querySelectorAll('table tr, [role="row"]'))
        .map(r => {
          const cells = Array.from(r.querySelectorAll('td, th, [role="cell"], [role="columnheader"]'))
            .map(c => (c.innerText || '').trim().replace(/\\s+/g, ' '));
          return cells.join(' | ');
        })
        .filter(r => r.length > 0);

      // Find clickable links/rows for "Discovered - currently not indexed"
      const discoveredLink = Array.from(document.querySelectorAll('a, div[role="button"], tr, td'))
        .find(el => (el.innerText || '').toLowerCase().includes('discovered - currently not indexed'));

      return {
        url: window.location.href,
        hasDiscoveredLink: Boolean(discoveredLink),
        rows: rows.slice(0, 15)
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);

