const fs = require('fs');

const effects = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Effects-CxNg0Y4s.js', 'utf8');

const hgIdx = effects.indexOf('function hg(');
if (hgIdx !== -1) {
  console.log('Function hg code:');
  console.log(effects.substring(hgIdx, hgIdx + 2000));
}
