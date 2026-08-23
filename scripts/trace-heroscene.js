const fs = require('fs');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

// Look for how HeroScene is created and mounted in Background-DjAaLSkd.js
const heroIdx = content.indexOf('HeroScene-D_12ayjh.js');
console.log('HeroScene import snippet:', content.substring(heroIdx - 100, heroIdx + 400));

// Check what sections array is passed to Background
const bgComponentIdx = content.indexOf('function Background(');
if (bgComponentIdx !== -1) {
  console.log('Background component:', content.substring(bgComponentIdx, bgComponentIdx + 1000));
} else {
  // Search for default export or Background component definition
  const exp = content.match(/function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{[^}]*Background/);
  console.log('Export match:', exp);
}
