const https = require('https');

const pages = [
  '/',
  '/about',
  '/services',
  '/case-studies',
  '/case-studies/acme-headless-ecommerce',
  '/case-studies/fintech-roi-calculator',
  '/blog',
  '/contact'
];

async function checkPage(path) {
  return new Promise((resolve) => {
    https.get('https://www.kawaki.co.in' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        const descMatch = data.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        const twMatch = data.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i);
        resolve({
          path,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : null,
          desc: descMatch ? descMatch[1] : null,
          twCard: twMatch ? twMatch[1] : null
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Checking live production at https://www.kawaki.co.in ...');
  for (const p of pages) {
    const res = await checkPage(p);
    console.log(`\nPath: ${res.path} [${res.status}]`);
    console.log(`Title: ${res.title}`);
    console.log(`Description: ${res.desc ? res.desc.substring(0, 80) + '...' : 'none'}`);
    console.log(`Twitter Card: ${res.twCard}`);
  }
}

run();
