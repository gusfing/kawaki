const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('public/cdn.shopify.com/oxygen-v2/47215/49013/102837/4097382/assets/Background-DjAaLSkd.js', 'utf8');

// Look for activeSection or activeScene or sectionIndex logic
console.log('Background JS length:', content.length);

const matches = content.match(/(?:activeSection|currentSection|activeScene|hero|sectionIndex|useScroll|useSection|theatre)[^"'`\s,\);}{]*/g);
console.log('Matches:', Array.from(new Set(matches)).slice(0, 30));

// Check how scenes are mapped: HeroScene vs SidekickScene
const sceneMatches = content.match(/(?:HeroScene|SidekickScene|FallbackImageScene)[^;]+/g);
console.log('\nScene declarations:', sceneMatches);
