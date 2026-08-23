const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// The hero container is empty (React was supposed to fill it) and blocks the 3D scene.
// Instead of showing it as a blank box, hide it completely.
// The 3D canvas renders independently as a sticky body child.

// Update the fallback script: instead of making it 100vh visible, hide it
const oldFix = `    // Fix hero container pushed off-screen by translate-y-[-100%]
    const heroContainer = document.querySelector('[data-section-id="hero"]');
    if (heroContainer) {
      heroContainer.classList.remove('translate-y-[-100%]');
      heroContainer.classList.remove('safe-h-150-svh');
      heroContainer.style.translate = 'none';
      heroContainer.style.transform = 'none';
      heroContainer.style.height = '100vh';
      console.log('[Kawaki Fix] Hero container translate fix applied');
    }`;

const newFix = `    // Fix hero container: it's empty (React was supposed to fill it with 3D content)
    // The 3D canvas renders separately as a sticky body child
    // Hide this empty container so it doesn't block the 3D scene
    const heroContainer = document.querySelector('[data-section-id="hero"]');
    if (heroContainer) {
      heroContainer.style.display = 'none';
      console.log('[Kawaki Fix] Empty hero container hidden');
    }`;

if (html.includes(oldFix)) {
  html = html.replace(oldFix, newFix);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Updated hero fix: now hides empty container instead of showing it');
} else {
  console.log('Could not find old fix to replace');
  // Try alternate approach - just search and replace
  const altOld = "heroContainer.style.height = '100vh'";
  if (html.includes(altOld)) {
    console.log('Found alternate marker');
  }
}
