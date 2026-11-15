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
      // Find element containing "URL is on Google" or "URL is not on Google"
      const allDivs = Array.from(document.querySelectorAll('div, span, p'))
        .filter(el => {
          const t = el.innerText || '';
          return (t.includes('URL is') || t.includes('Page indexing') || t.includes('Discovery') || t.includes('Crawl')) && el.children.length < 5;
        })
        .map(el => el.innerText.trim());

      return {
        url: window.location.href,
        foundSnippets: Array.from(new Set(allDivs)).slice(0, 15)
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

