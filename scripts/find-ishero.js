const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

let pos = 0;
while ((pos = content.indexOf('isHero', pos)) !== -1) {
  console.log('isHero occurrence at', pos, ':', content.substring(Math.max(0, pos - 80), pos + 150));
  pos += 6;
}
