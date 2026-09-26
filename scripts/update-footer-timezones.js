const fs = require('fs');
const path = require('path');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern 1: 4 cities (New Delhi, Tokyo, London, New York) with // STUDIOS & LOCAL TIME or // STUDIOS &amp; LOCAL TIME
  const pattern4 = /<div class="footer-col-header">\/\/\s*STUDIOS\s*(?:&|&amp;)\s*LOCAL TIME<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>New Delhi(?:\s*\(HQ\))?<\/span>\s*<span class="footer-time-clock" id="footerTimeDelhi">([^<]*)<\/span>\s*<\/div>\s*<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>Tokyo<\/span>\s*<span class="footer-time-clock" id="footerTimeTokyo">([^<]*)<\/span>\s*<\/div>\s*<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>London<\/span>\s*<span class="footer-time-clock" id="footerTimeLondon">([^<]*)<\/span>\s*<\/div>\s*<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>New York<\/span>\s*<span class="footer-time-clock" id="footerTimeNY">([^<]*)<\/span>\s*<\/div>\s*<\/div>/g;

  content = content.replace(pattern4, (match, d, t, l, ny) => {
    return `<div class="footer-col-header">// CLIENT TIME ZONES</div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New Delhi — Studio HQ</span>
                        <span class="footer-time-clock" id="footerTimeDelhi">${d}</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>Tokyo — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeTokyo">${t}</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>London — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeLondon">${l}</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New York — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeNY">${ny}</span>
                    </div>
                </div>`;
  });

  // Pattern 2: 3 cities (New Delhi, London, New York) in security subpages
  const pattern3 = /<div class="footer-col-header">\/\/\s*STUDIOS\s*(?:&|&amp;)\s*LOCAL TIME<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>New Delhi(?:\s*\(HQ\))?<\/span>\s*<span class="footer-time-clock" id="footerTimeDelhi">([^<]*)<\/span>\s*<\/div>\s*<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>London<\/span>\s*<span class="footer-time-clock" id="footerTimeLondon">([^<]*)<\/span>\s*<\/div>\s*<\/div>\s*<div class="footer-time-badge">\s*<div class="footer-time-city">\s*<span>New York<\/span>\s*<span class="footer-time-clock" id="footerTimeNY">([^<]*)<\/span>\s*<\/div>\s*<\/div>/g;

  content = content.replace(pattern3, (match, d, l, ny) => {
    return `<div class="footer-col-header">// CLIENT TIME ZONES</div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New Delhi — Studio HQ</span>
                        <span class="footer-time-clock" id="footerTimeDelhi">${d}</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>London — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeLondon">${l}</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New York — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeNY">${ny}</span>
                    </div>
                </div>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer time zones in: ${filePath}`);
    return true;
  }
  return false;
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      if (!p.includes('node_modules') && !p.includes('.git')) walk(p);
    } else if (file.endsWith('.html') || file === 'build-blog.js') {
      updateFile(p);
    }
  });
}

walk(path.resolve(__dirname, '..', 'public'));
updateFile(path.resolve(__dirname, '..', 'scripts', 'build-blog.js'));
