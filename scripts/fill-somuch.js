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

async function run() {
  const code = `
    (() => {
      const link = document.getElementById('txtLink');
      const title = document.getElementById('txtTitle');
      const email = document.getElementById('txtEmail');
      const info = document.getElementById('txtInfo');
      const cat = document.getElementById('drpCategoryID');

      if (link) {
        link.value = 'https://kawaki.co.in';
        link.dispatchEvent(new Event('input', { bubbles: true }));
        link.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (title) {
        title.value = 'Kawaki Studios — Web Design & Development';
        title.dispatchEvent(new Event('input', { bubbles: true }));
        title.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (email) {
        email.value = 'ks05460@gmail.com';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        email.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (cat) {
        cat.value = '1065'; // Web Design
        cat.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (info) {
        info.value = 'Kawaki Studios is a digital product and web development studio building custom websites, web applications, ecommerce stores, and AI-powered systems.';
        info.dispatchEvent(new Event('input', { bubbles: true }));
        info.dispatchEvent(new Event('change', { bubbles: true }));
      }

      return {
        link: link?.value,
        title: title?.value,
        email: email?.value,
        cat: cat?.value,
        info: info?.value
      };
    })()
  `;

  const res = await request('/eval', { tabId: 573207442, expression: code });
  console.log('Filled SoMuch:', JSON.stringify(res.data?.value, null, 2));
}

run().catch(console.error);

