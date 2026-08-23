const fs = require('fs');

const drIp = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/(_locale).editions.winter2026-DrIpAwX1.js', 'utf8');

const pos = drIp.indexOf('jsx(lo,{hero:o');
if (pos !== -1) {
  console.log('Context around hero:o:');
  console.log(drIp.substring(Math.max(0, pos - 1500), pos + 100));
}
