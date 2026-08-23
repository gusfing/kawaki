const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

// Look for RC[ or activeSection in Background
const rcIdx = content.indexOf('RC={hero:mC');
if (rcIdx !== -1) {
  console.log('RC snippet:', content.substring(rcIdx - 200, rcIdx + 800));
}

// Look for activeSection selection logic
const activeIdx = content.indexOf('activeSection');
if (activeIdx !== -1) {
  console.log('\nactiveSection snippet:', content.substring(activeIdx - 100, activeIdx + 400));
}
