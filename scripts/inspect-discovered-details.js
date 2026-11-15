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
  const clickCode = `
    (() => {
      const rows = Array.from(document.querySelectorAll('tr, [role="row"]'));
      const discoveredRow = rows.find(r => (r.innerText || '').toLowerCase().includes('discovered - currently not indexed'));
      if (discoveredRow) {
        discoveredRow.click();
        return { clicked: true, text: discoveredRow.innerText };
      }
      return { clicked: false };
    })()
  `;

  const res = await evalChrome(clickCode);
  console.log('Click result:', res.data?.value);

  await sleep(4000);

  const inspectCode = `
    (() => {
      const title = document.title;
      const url = window.location.href;
      const details = Array.from(document.querySelectorAll('div, p, span'))
        .filter(el => {
          const t = el.innerText || '';
          return t.includes('Validation') || t.includes('Started') || t.includes('See details');
        })
        .map(el => el.innerText.trim())
        .slice(0, 10);

      const tableRows = Array.from(document.querySelectorAll('table tr, [role="row"]'))
        .map(r => r.innerText.replace(/\\s+/g, ' ').trim())
        .slice(0, 15);

      return {
        title,
        url,
        details,
        tableRows
      };
    })()
  `;

  const inspectRes = await evalChrome(inspectCode);
  console.log('Page details:', JSON.stringify(inspectRes.data?.value, null, 2));
}

run().catch(console.error);

