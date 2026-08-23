const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

let pos = 0;
while ((pos = content.indexOf('uProgress', pos)) !== -1) {
  console.log('uProgress occurrence at', pos, ':', content.substring(Math.max(0, pos - 50), pos + 100));
  pos += 9;
}
