const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Find the existing fallback script and add hero fix to it
const heroFixCode = `
    // Fix hero container pushed off-screen by translate-y-[-100%]
    const heroContainer = document.querySelector('[data-section-id="hero"]');
    if (heroContainer) {
      heroContainer.classList.remove('translate-y-[-100%]');
      heroContainer.classList.remove('safe-h-150-svh');
      heroContainer.style.translate = 'none';
      heroContainer.style.transform = 'none';
      heroContainer.style.height = '100vh';
      console.log('[Kawaki Fix] Hero container translate fix applied');
    }
`;

// Insert the hero fix right after initFallbackAnimations function starts
const insertMarker = "container.setAttribute('data-initiated', 'true');";
if (html.includes(insertMarker) && !html.includes('Hero container translate fix')) {
  html = html.replace(
    insertMarker,
    insertMarker + '\n' + heroFixCode
  );
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Added hero container fix to fallback animation script');
} else if (html.includes('Hero container translate fix')) {
  console.log('Hero fix already in fallback script');
} else {
  console.log('Could not find insertion point');
}
