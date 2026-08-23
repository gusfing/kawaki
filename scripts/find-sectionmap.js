const fs = require('fs');

const drIp = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/(_locale).editions.winter2026-DrIpAwX1.js', 'utf8');

let pos = 0;
while ((pos = drIp.indexOf('sectionMap', pos)) !== -1) {
  console.log('sectionMap at', pos, ':', drIp.substring(Math.max(0, pos - 150), pos + 250));
  pos += 10;
}
