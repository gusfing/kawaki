const fs = require('fs');

const effects = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Effects-CxNg0Y4s.js', 'utf8');

const exportIdx = effects.lastIndexOf('export{');
if (exportIdx !== -1) {
  console.log('Exports from Effects:', effects.substring(exportIdx));
}
