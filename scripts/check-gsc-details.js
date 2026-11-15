const http = require('http');

function post(action, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: '127.0.0.1',
      port: 8765,
      path: '/' + action,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
      timeout: 10000
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve({ raw: b }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const tabs = await post('list_tabs', {});
  const gscTab = tabs.data?.find(t => t.url && t.url.includes('search.google.com'));
  console.log('GSC Tab:', gscTab?.id, gscTab?.url);
  if (!gscTab) return;

  const result = await post('eval', {
    tabId: gscTab.id,
    expression: `(() => {
      const text = document.body ? document.body.innerText : '';
      const tables = Array.from(document.querySelectorAll('table')).map(t => t.innerText);
      const rows = Array.from(document.querySelectorAll('tr, [role="row"]')).map(r => r.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean);
      return {
        title: document.title,
        url: window.location.href,
        snippet: text.slice(0, 3000),
        rows: rows.slice(0, 30)
      };
    })()`
  });

  console.log('Result:', JSON.stringify(result, null, 2));
}

run().catch(console.error);

