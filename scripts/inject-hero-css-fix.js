const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Remove the old CSS fix if it exists
html = html.replace(/<style id="kawaki-hero-fix">[\s\S]*?<\/style>\s*/, '');

// Tailwind's translate-y-[-100%] compiles to something like:
// .translate-y-\[-100\%\] { --tw-translate-y: -100%; translate: ... }
// We need !important with higher specificity

const cssOverride = `
<style id="kawaki-hero-fix">
  /* Override Tailwind translate that pushes hero off-screen */
  div.translate-y-\\[-100\\%\\][data-section-id="hero"],
  [data-section-id="hero"].translate-y-\\[-100\\%\\],
  [data-section-id="hero"] {
    --tw-translate-y: 0% !important;
    translate: none !important;
    transform: translateY(0) !important;
    height: 100vh !important;
  }
</style>
`;

const headClose = html.indexOf('</head>');
if (headClose !== -1) {
  html = html.substring(0, headClose) + cssOverride + html.substring(headClose);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Injected stronger CSS hero fix');
} else {
  console.log('Could not find </head>');
}
