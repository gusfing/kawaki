const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

// Search for where activeSection is calculated from scroll
const scrollSectionIdx = content.indexOf('activeSection');
console.log('Searching for scroll/section calculation in Background...');

// Find all occurrences of hero in Background
let pos = 0;
while ((pos = content.indexOf('hero', pos)) !== -1) {
  console.log('hero occurrence at', pos, ':', content.substring(Math.max(0, pos - 50), pos + 100));
  pos += 4;
}
