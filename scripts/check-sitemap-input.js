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
      let parent = input;
      while (parent && !parent.innerText.includes('Add a new sitemap') && parent.parentElement) {
        parent = parent.parentElement;
      }
      return {
        sectionText: parent ? parent.innerText : 'not found'
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log('Section Text:\n', res.data?.value?.sectionText);
}

run().catch(console.error);
