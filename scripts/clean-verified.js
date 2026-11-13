const fs = require('fs');
const p = 'public/index.html';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/\r?\n\s*<div style="font-size: 0\.72rem[^>]*>[\s\S]*?<\/div>/g, '');
fs.writeFileSync(p, c, 'utf8');
console.log('Cleaned Verified via lines');
