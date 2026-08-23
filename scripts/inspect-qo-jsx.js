const fs = require('fs');

const butterflies = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Butterflies-Bb0NiD7m.js', 'utf8');

const qoIdx = butterflies.indexOf('function Qo(');
if (qoIdx !== -1) {
  console.log('Qo return JSX:');
  console.log(butterflies.substring(qoIdx + 4000, qoIdx + 7000));
}
