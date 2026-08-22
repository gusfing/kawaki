const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../shopify/index.html'), 'utf8');
console.log('HTML Total Length:', html.length);

const regex = /(?:src|href)="([^"]+)"/g;
let match;
const links = [];
while ((match = regex.exec(html)) !== null) {
  links.push(match[1]);
}

console.log('Total links found:', links.length);
const dotDot = links.filter(l => l.includes('../../') || l.includes('../'));
console.log('Links containing ../ or ../../:', dotDot.length);
console.log('Sample dotDot:', dotDot.slice(0, 10));

const localCdn = links.filter(l => l.includes('cdn.shopify.com'));
console.log('Local cdn links:', localCdn.slice(0, 10));
