const fs = require('fs');

const effects = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Effects-CxNg0Y4s.js', 'utf8');

console.log('Effects length:', effects.length);

// Look for export of u as p
const pIdx = effects.indexOf('as p');
if (pIdx !== -1) {
  console.log('Export of p in effects:', effects.substring(Math.max(0, pIdx - 150), pIdx + 100));
}

// Find hook p definition (probably useTheatre or useSheet)
const hookMatches = effects.match(/function\s+[a-zA-Z0-9_]+\s*\(\s*\{\s*name\s*,\s*stateUrl/);
console.log('Hook match:', hookMatches);
