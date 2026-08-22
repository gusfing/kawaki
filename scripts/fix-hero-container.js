const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// The hero container is empty and pushed off-screen by translate-y-[-100%]
// The 3D canvas renders via React Three Fiber on top of it separately
// Fix: Remove the negative translate so it doesn't create layout issues,
// and since it's empty, give it height 0 to not create a gap
const before = 'class="relative overflow-clip flex justify-end safe-h-150-svh translate-y-[-100%]" data-section-id="hero"';
const after = 'class="relative overflow-clip flex justify-end" data-section-id="hero" style="height:100vh;"';

if (html.includes(before)) {
  html = html.replace(before, after);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Fixed hero container: removed translate-y-[-100%] and set height:100vh');
} else {
  console.log('Could not find hero container element');
}
