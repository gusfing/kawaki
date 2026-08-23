const fs = require('fs');
const path = require('path');

const dir = 'public/cdn.shopify.com/s/files/1/0951/3130/4218/files/';
const files = fs.readdirSync(dir);

console.log('Hero and Fallback files in files directory:');
const heroFiles = files.filter(f => f.toLowerCase().includes('hero') || f.toLowerCase().includes('fallback') || f.toLowerCase().includes('adam') || f.toLowerCase().includes('creation'));
console.log(heroFiles);

for (const h of heroFiles) {
  console.log(h, ':', fs.statSync(path.join(dir, h)).size, 'bytes');
}
