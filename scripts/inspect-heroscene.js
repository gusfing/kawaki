const fs = require('fs');
const path = require('path');

const dir = 'public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/';

console.log('=== HeroScene-D_12ayjh.js ===');
console.log(fs.readFileSync(path.join(dir, 'HeroScene-D_12ayjh.js'), 'utf8'));

console.log('=== FallbackImageScene-B62JAlRS.js ===');
console.log(fs.readFileSync(path.join(dir, 'FallbackImageScene-B62JAlRS.js'), 'utf8'));
