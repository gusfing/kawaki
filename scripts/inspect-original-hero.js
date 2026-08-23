const fs = require('fs');

const originalHtml = fs.readFileSync('shopify/index.html', 'utf8');

const mainIdx = originalHtml.indexOf('<main');
const sidekickIdx = originalHtml.indexOf('id="sidekick"');

console.log('Original snippet between <main and id="sidekick":');
console.log(originalHtml.substring(mainIdx, sidekickIdx + 200));
