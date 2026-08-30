const fs = require('fs');

const drIp = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/(_locale).editions.winter2026-DrIpAwX1.js', 'utf8');

const pos = drIp.indexOf('const y=[...e?[{handle:"hero",...e}]:[],...t||[]];');
console.log('500 chars before:');
console.log(drIp.substring(pos - 3500, pos - 2000));
