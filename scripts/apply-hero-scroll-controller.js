const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove old injected styles and scripts
html = html.replace(/<style id="kawaki-hero-fix">[\s\S]*?<\/style>\s*/g, '');
html = html.replace(/<script id="kawaki-anim-script">[\s\S]*?<\/script>\s*/g, '');

// Clean up any previously appended scripts right before </body>
const scriptMarker = '<script id="kawaki-hero-scroll-controller">';
const existingScriptIdx = html.indexOf(scriptMarker);
if (existingScriptIdx !== -1) {
  html = html.substring(0, existingScriptIdx);
  // Re-add </body></html> if needed
  if (!html.includes('</body>')) {
    html += '</body>\n</html>';
  }
}

// 2. Create the complete, polished scroll controller and CSS
const heroStyles = `
<style id="kawaki-hero-scroll-controller-styles">
  /* Left sidebar positioning and aesthetics */
  aside[data-section-name="side-nav"] {
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 2rem;
    width: 280px;
    z-index: 50;
    pointer-events: auto !important;
  }

  /* Sidekick section title should be hidden at scroll = 0 and reveal on scroll */
  #sidekick .headline-1 {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  body.scrolled-to-sidekick #sidekick .headline-1 {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hero spacer section to give the opening scene full 100vh breathing room */
  [data-section-id="hero"] {
    height: 100vh !important;
    min-height: 100vh !important;
    display: flex !important;
    position: relative !important;
    translate: none !important;
    transform: none !important;
    pointer-events: none;
  }

  /* Da Vinci lines SVG box */
  .davinci-lines__container {
    transition: opacity 0.5s ease-out;
  }

  body.scrolled-past-hero .davinci-lines__container {
    opacity: 0;
    pointer-events: none;
  }
</style>
`;

const heroScript = `
<script id="kawaki-hero-scroll-controller">
(function() {
  'use strict';

  function initHeroScrollController() {
    const container = document.querySelector('[data-section-name="side-and-lines"]');
    if (container) {
      container.setAttribute('data-initiated', 'true');
      container.setAttribute('data-sidebar-ready', 'true');
      container.setAttribute('data-sidebar-loaded', 'true');
    }

    // SVG lines drawing in sequence on load
    const linesSvgs = document.querySelectorAll('svg.davinci-lines');
    linesSvgs.forEach(svg => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          svg.setAttribute('data-active', String(i));
          svg.setAttribute('data-animating', String(i));
        }, 200 + i * 300);
      }
    });

    // Make subtitle and left sidebar visible
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
      subtitle.style.transition = 'opacity 0.8s ease-out';
      subtitle.style.opacity = '1';
    }

    const tos = document.querySelector('.terms-of-service');
    if (tos) {
      tos.style.transition = 'opacity 0.8s ease-out';
      tos.style.opacity = '1';
    }

    // Scroll state manager
    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY >= vh * 0.25) {
        document.body.classList.add('scrolled-to-sidekick');
      } else {
        document.body.classList.remove('scrolled-to-sidekick');
      }

      if (scrollY >= vh * 0.7) {
        document.body.classList.add('scrolled-past-hero');
      } else {
        document.body.classList.remove('scrolled-past-hero');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  if (document.readyState === 'complete') {
    setTimeout(initHeroScrollController, 500);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initHeroScrollController, 500);
    });
  }
})();
</script>
`;

// Insert styles before </head>
const headIdx = html.indexOf('</head>');
if (headIdx !== -1) {
  html = html.substring(0, headIdx) + heroStyles + html.substring(headIdx);
}

// Insert script before </body>
const bodyIdx = html.lastIndexOf('</body>');
if (bodyIdx !== -1) {
  html = html.substring(0, bodyIdx) + heroScript + html.substring(bodyIdx);
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully updated public/index.html with polished hero scroll controller!');
