const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Find the translate-y-[-100%] element
const idx = html.indexOf('safe-h-150-svh translate-y-[-100%]');
if (idx === -1) {
  console.log('NOT FOUND');
  process.exit(1);
}

// Find the opening tag
let tagStart = html.lastIndexOf('<', idx);
// Find everything after this tag for about 2000 chars
const snippet = html.substring(tagStart, tagStart + 3000);
console.log('SNIPPET:', snippet.substring(0, 2000));
console.log('\n--- END ---');

// Check what's between this element and #main-content
const mainContentIdx = html.indexOf('id="main-content"');
const between = html.substring(idx, mainContentIdx);
console.log('\nBetween hero-scene and main-content length:', between.length);
console.log('Between snippet:', between.substring(0, 500));
