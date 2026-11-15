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
  console.log('Filling OnToplist Add Business form...');
  const fillCode = `
    (() => {
      function setVal(id, val) {
        const el = document.getElementById(id);
        if (el) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      }

      setVal('email', 'contact@kawaki.co.in');
      setVal('password', 'KawakiStudios@2026');
      setVal('sitename', 'Kawaki Studios');
      setVal('slug', 'kawaki-studios');
      setVal('category', '218'); // Web Development
      setVal('url', 'https://kawaki.co.in');
      setVal('autocomplete', 'New Delhi, Delhi 110001, India');
      setVal('description', 'Kawaki Studios is an engineering-first digital studio building high-performance websites, custom web applications, headless Shopify stores, and AI automation systems for ambitious brands.');
      setVal('contact_person', 'Kunal Sharma');
      setVal('phone', '+918368246502');
      setVal('contact_email', 'contact@kawaki.co.in');
      setVal('twitter', 'https://twitter.com/kawakistudios');
      setVal('linkedin', 'https://linkedin.com/company/kawaki-studios');

      return {
        email: document.getElementById('email')?.value,
        sitename: document.getElementById('sitename')?.value,
        url: document.getElementById('url')?.value,
        category: document.getElementById('category')?.value,
        descriptionLen: document.getElementById('description')?.value.length
      };
    })()
  `;

  const fillRes = await request('/eval', { tabId: 573207409, expression: fillCode });
  console.log('Fill result:', JSON.stringify(fillRes.data?.value, null, 2));

  await sleep(1500);

  // Click "List My Business" button
  console.log('Clicking List My Business button...');
  const clickCode = `
    (() => {
      const btn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
        .find(b => (b.innerText || b.value || '').trim().toLowerCase() === 'list my business');

      if (!btn) return { error: 'Submit button not found' };
      btn.click();
      return { clicked: true };
    })()
  `;

  const clickRes = await request('/eval', { tabId: 573207409, expression: clickCode });
  console.log('Click result:', JSON.stringify(clickRes.data?.value, null, 2));

  await sleep(5000);

  const finalStatus = await request('/eval', {
    tabId: 573207409,
    expression: `(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 800)
    }))()`
  });

  console.log('Final page state:', JSON.stringify(finalStatus.data?.value, null, 2));
}

run().catch(console.error);

