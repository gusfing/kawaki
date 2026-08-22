const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Remove the old CSS fix
html = html.replace(/<style id="kawaki-hero-fix">[\s\S]*?<\/style>\s*/, '');

// Directly remove translate-y-[-100%] from the hero element class
// Also remove safe-h-150-svh which makes it 150vh (too tall)
const oldClass = 'class="relative overflow-clip flex justify-end safe-h-150-svh translate-y-[-100%]" data-section-id="hero"';
const newClass = 'class="relative overflow-clip flex justify-end" data-section-id="hero" style="height:100vh;"';

if (html.includes(oldClass)) {
  html = html.replace(oldClass, newClass);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Removed translate-y-[-100%] and safe-h-150-svh from hero class');
} else {
  // Maybe the previous fix already modified it
  const alt = 'class="relative overflow-clip flex justify-end" data-section-id="hero" style="height:100vh;"';
  if (html.includes(alt)) {
    console.log('Already fixed');
  } else {
    // Search for the actual current state
    const match = html.match(/class="[^"]*" data-section-id="hero"/);
    console.log('Current hero element:', match ? match[0] : 'NOT FOUND');
  }
}
