const https = require('https');
const http = require('http');

function probe(url) {
  return new Promise(resolve => {
    const req = https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const canMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         data.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
        const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
        resolve({
          url,
          status: res.statusCode,
          location: res.headers.location || null,
          canonical: canMatch ? canMatch[1] : null,
          title: titleMatch ? titleMatch[1] : null
        });
      });
    });
    req.on('error', err => {
      resolve({ url, error: err.message });
    });
  });
}

(async () => {
  console.log('Testing www vs apex on root:');
  const r1 = await probe('https://www.kawaki.co.in/');
  const r2 = await probe('https://kawaki.co.in/');
  console.log('www:', r1);
  console.log('apex:', r2);

  console.log('\nTesting www vs apex on /robots.txt:');
  const r3 = await probe('https://www.kawaki.co.in/robots.txt');
  const r4 = await probe('https://kawaki.co.in/robots.txt');
  console.log('www:', r3);
  console.log('apex:', r4);

  console.log('\nTesting www vs apex on /sitemap.xml:');
  const r5 = await probe('https://www.kawaki.co.in/sitemap.xml');
  const r6 = await probe('https://kawaki.co.in/sitemap.xml');
  console.log('www:', r5);
  console.log('apex:', r6);

  console.log('\nTesting www vs apex on /contact:');
  const r7 = await probe('https://www.kawaki.co.in/contact');
  const r8 = await probe('https://kawaki.co.in/contact');
  console.log('www:', r7);
  console.log('apex:', r8);
})();
