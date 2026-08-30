const fs = require('fs');

const butterflies = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Butterflies-Bb0NiD7m.js', 'utf8');

console.log('Butterflies length:', butterflies.length);

// Look for export of A as x or asset component
const xIdx = butterflies.indexOf('url:');
if (xIdx !== -1) {
  console.log('url in butterflies:', butterflies.substring(Math.max(0, xIdx - 300), xIdx + 500));
}

// Find export { ... A as x }
const expIdx = butterflies.indexOf('as x');
if (expIdx !== -1) {
  console.log('Export of x:', butterflies.substring(Math.max(0, expIdx - 100), expIdx + 50));
}
