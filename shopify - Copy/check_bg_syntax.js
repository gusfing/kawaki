
const vm = require('vm');
const fs = require('fs');

const src = fs.readFileSync(r'c:\\My Web Sites\\shopify\\cdn.shopify.com\\oxygen-v2\\47215\\49013\\102837\\4097382\\assets\\Background-DjAaLSkd.js', 'utf-8');

try {
    new vm.Script(src, { filename: 'Background-DjAaLSkd.js' });
    console.log('No script syntax error!');
} catch (e) {
    console.log('Script syntax error:', e.message, 'at stack:', e.stack);
}
