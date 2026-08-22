const fs = require('fs');
const h = fs.readFileSync('public/index.html', 'utf8');
const sections = ['agentic','online','retail','marketing','checkout','operations','shop-app','b2b','finance','shipping','developer'];
sections.forEach(s => {
  const found = h.includes('id="' + s + '"');
  console.log(s + ': ' + (found ? 'FOUND' : 'MISSING'));
});

// Also check the __remixContext stream data for these section names
const streamMatch = h.match(/streamController\.enqueue\("(.+?)"\)/s);
if (streamMatch) {
  console.log('\n--- Stream data section check ---');
  const streamData = streamMatch[1];
  sections.forEach(s => {
    const found = streamData.includes(s);
    console.log(s + ' in stream: ' + (found ? 'FOUND' : 'MISSING'));
  });
}
