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
  console.log('Navigating to BlogFlux register with date values...');
  await request('/navigate', {
    tabId: 573207409,
    url: 'https://www.blogflux.com/register.php?redir=www.blogflux.com/user.php?action=addblog',
    wait: true
  });
  await sleep(3500);

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

      setVal('registration-username', 'kawakistudios');
      setVal('registration-password', 'KawakiStudios@2026');
      setVal('registration-verify-password', 'KawakiStudios@2026');
      setVal('registration-email', 'contact@kawaki.co.in');

      setVal('dob_date', '15');
      setVal('dob_month', '1');
      setVal('dob_year', '1995');

      const submitBtn = Array.from(document.querySelectorAll('input[type="submit"]'))
        .find(b => (b.value || '').toLowerCase().includes('register'));

      if (!submitBtn) return { error: 'Submit button not found' };
      submitBtn.click();
      return { clicked: true };
    })()
  `;

  await request('/eval', { tabId: 573207409, expression: fillCode });
  await sleep(5000);

  const status = await request('/eval', {
    tabId: 573207409,
    expression: `(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 800)
    }))()`
  });

  console.log('After registration with date:', JSON.stringify(status.data?.value, null, 2));
}

run().catch(console.error);
