const fs = require('fs');
const path = require('path');

const dir = 'public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/';
const files = fs.readdirSync(dir);

console.log('Searching for HeroScene and 3D models...');
for (const file of files) {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (content.includes('HeroScene') || content.includes('EW26_Hero') || content.includes('FallbackImageScene') || content.includes('Theatre') || content.includes('useTheatre')) {
      console.log('File:', file, 'length:', content.length);
      const matches = content.match(/(?:HeroScene|EW26_Hero|FallbackImageScene|SidekickScene|glb|usdz)[^"'`\s,\);}]*/g);
      if (matches) {
        console.log('  Matches:', Array.from(new Set(matches)).slice(0, 10));
      }
    }
  }
}
