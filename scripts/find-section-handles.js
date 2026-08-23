const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Find all handles in the stream data
const streamMatch = html.match(/streamController\.enqueue\("(.+?)"\)/s);
if (streamMatch) {
  const data = streamMatch[1];
  
  // Search for handles like "hero", "sidekick", etc.
  const handleMatches = data.match(/"handle":"([^"]+)"/g);
  console.log('Handles in JSON:', handleMatches);

  // Search for section list definitions
  const sectionHandles = data.match(/(?:hero|sidekick|agentic|online|retail|marketing|checkout|operations|shop-app|b2b|finance|shipping|developer)/g);
  console.log('Unique section keywords found:', Array.from(new Set(sectionHandles)));
}
