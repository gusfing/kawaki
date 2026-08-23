const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Search for hero backgroundAssets, 3d models, glb in the html / streamController data
const streamMatch = html.match(/streamController\.enqueue\("(.+?)"\)/s);
if (streamMatch) {
  const data = streamMatch[1];
  console.log('Stream data length:', data.length);
  
  // Find all .glb and .json animation URLs
  const glbs = data.match(/[^"\\]+\.glb/g);
  console.log('GLB files mentioned:', glbs);

  const ktx2s = data.match(/[^"\\]+\.ktx2/g);
  console.log('KTX2 files mentioned:', ktx2s ? ktx2s.slice(0, 10) : null);

  const stateUrls = data.match(/[^"\\]+theatre[^"\\]*\.json/g);
  console.log('Theatre state JSON files:', stateUrls);

  // Check section 0 (hero) data
  const heroIndex = data.indexOf('HeroScene');
  if (heroIndex !== -1) {
    console.log('HeroScene snippet:', data.substring(heroIndex - 100, heroIndex + 500));
  }
}
