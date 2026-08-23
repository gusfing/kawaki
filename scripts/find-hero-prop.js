const fs = require('fs');

const drIp = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/(_locale).editions.winter2026-DrIpAwX1.js', 'utf8');

const pos = drIp.indexOf('const y=[...e?[{handle:"hero",...e}]:[],...t||[]];');
if (pos !== -1) {
  console.log('Component header and body:');
  console.log(drIp.substring(Math.max(0, pos - 1200), pos + 300));
}
