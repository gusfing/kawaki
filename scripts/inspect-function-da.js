const fs = require('fs');

const butterflies = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Butterflies-Bb0NiD7m.js', 'utf8');

const daIdx = butterflies.indexOf('function Da(');
if (daIdx !== -1) {
  console.log('Function Da full code:');
  console.log(butterflies.substring(daIdx, daIdx + 2000));
}
