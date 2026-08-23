const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Replace the hero div with clean markup
const heroTarget = /<div[^>]*data-section-id="hero"[^>]*>[\s\S]*?<\/div>/;
const cleanHero = `<div class="relative overflow-clip flex justify-end" data-section-id="hero" style="height: 100vh; min-height: 100vh;"><div data-section-hero style="height: 100vh; width: 100%;"></div></div>`;

if (heroTarget.test(html)) {
  html = html.replace(heroTarget, cleanHero);
  console.log('Replaced hero section with clean container containing data-section-hero');
} else {
  console.log('Hero section target not matched');
}

fs.writeFileSync('public/index.html', html, 'utf8');
