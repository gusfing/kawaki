const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

const pos = content.indexOf('Ye=Me.get("uProgress")');
if (pos !== -1) {
  console.log('Next 2000 chars:', content.substring(pos, pos + 2000));
}
