const fs = require('fs');

const drIp = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/(_locale).editions.winter2026-DrIpAwX1.js', 'utf8');

console.log('DrIp length:', drIp.length);

// Search for Background or sections list passed to Background
const bgMatches = drIp.match(/Background[^;]{1,300}/g);
console.log('Background references in DrIp:', bgMatches ? bgMatches.slice(0, 10) : 'none');

// Search for sections prop or sections data in DrIp
const secMatches = drIp.match(/sections:[^;]{1,300}/g);
console.log('sections matches in DrIp:', secMatches ? secMatches.slice(0, 5) : 'none');
