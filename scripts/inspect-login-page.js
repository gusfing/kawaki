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
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'))
        .filter(el => el.type !== 'hidden')
        .map(el => ({
          tag: el.tagName,
          type: el.type,
          id: el.id,
          name: el.name,
          placeholder: el.placeholder,
          value: el.value,
          visible: el.offsetParent !== null
        }));

      const links = Array.from(document.querySelectorAll('a, button, input[type="submit"], input[type="button"]'))
        .filter(el => (el.innerText || el.value || '').toLowerCase().includes('register'))
        .map(el => ({
          tag: el.tagName,
          id: el.id,
          text: (el.innerText || el.value || '').trim(),
          href: el.getAttribute('href'),
          onclick: el.getAttribute('onclick')
        }));

      return {
        visibleInputs: inputs.filter(i => i.visible),
        allInputs: inputs,
        registerLinks: links
      };
    })()
  `;

  const res = await evalChrome(code);
  console.log(JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

