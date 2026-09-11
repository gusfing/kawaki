const https = require('https');

function verify() {
  https.get('https://www.kawaki.co.in/services/ai-automation', (res) => {
    console.log('Status code:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const titleMatch = data.match(/<title>([^<]*)<\/title>/);
      console.log('Title:', titleMatch ? titleMatch[1] : 'Not found');
      const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      console.log('H1:', h1Match ? h1Match[1].trim() : 'Not found');
      const canonicalMatch = data.match(/<link rel="canonical" href="([^"]*)"/);
      console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'Not found');
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

verify();
