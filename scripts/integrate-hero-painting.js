const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove old injected styles/scripts/layers if present
html = html.replace(/<div id="kawaki-hero-background-layer"[\s\S]*?<\/div>\s*<\/div>/g, '');
html = html.replace(/<style id="kawaki-hero-scroll-controller-styles">[\s\S]*?<\/style>\s*/g, '');
html = html.replace(/<script id="kawaki-hero-scroll-controller">[\s\S]*?<\/script>\s*/g, '');

const heroBgHtml = `
<!-- Opening Renaissance Hero Painting Layer -->
<div id="kawaki-hero-background-layer" class="fixed inset-0 pointer-events-none z-0 overflow-hidden" style="position: fixed; inset: 0; z-index: 0; pointer-events: none;">
  <img id="kawaki-hero-bg-img" src="/cdn.shopify.com/s/files/1/0951/3130/4218/files/hero-desktopa166.jpg" alt="Renaissance Edition" style="width: 100%; height: 100%; object-fit: cover; object-position: center; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);" />
  <div id="kawaki-hero-vignette" style="position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.65) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.85) 100%); pointer-events: none; transition: opacity 0.8s ease;"></div>
</div>
`;

const dynamicScript = `
<script id="kawaki-hero-scroll-controller">
(function() {
  'use strict';

  function applyStyles() {
    if (!document.getElementById('kawaki-runtime-styles')) {
      const style = document.createElement('style');
      style.id = 'kawaki-runtime-styles';
      style.textContent = \`
        /* Three.js canvas layer positioning */
        .sticky.top-0.left-0.w-full.h-screen {
          z-index: 1 !important;
        }

        /* Hero image fades out smoothly when scrolling down to Sidekick */
        body.scrolled-to-sidekick #kawaki-hero-bg-img {
          opacity: 0 !important;
          transform: scale(1.08) !important;
        }

        body.scrolled-to-sidekick #kawaki-hero-vignette {
          opacity: 0 !important;
        }

        /* Sidekick section title hidden at top, reveals on scroll */
        #sidekick h2.headline-1,
        #sidekick h2,
        #sidekick .rich-text {
          opacity: 0 !important;
          transform: translateY(35px) !important;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        body.scrolled-to-sidekick #sidekick h2.headline-1,
        body.scrolled-to-sidekick #sidekick h2,
        body.scrolled-to-sidekick #sidekick .rich-text {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Hero spacer section to give full 100vh breathing room to opening frame */
        [data-section-id="hero"] {
          height: 100vh !important;
          min-height: 100vh !important;
          display: block !important;
          position: relative !important;
          translate: none !important;
          transform: none !important;
          pointer-events: none;
        }

        /* DaVinci geometric lines */
        .davinci-lines__container {
          transition: opacity 0.6s ease-out;
          pointer-events: none;
          z-index: 2;
        }

        body.scrolled-to-sidekick .davinci-lines__container {
          opacity: 0.15;
        }

        body.scrolled-past-hero .davinci-lines__container {
          opacity: 0;
        }
      \`;
      document.head.appendChild(style);
    }
  }

  function initController() {
    applyStyles();

    const container = document.querySelector('[data-section-name="side-and-lines"]');
    if (container) {
      container.setAttribute('data-initiated', 'true');
      container.setAttribute('data-sidebar-ready', 'true');
      container.setAttribute('data-sidebar-loaded', 'true');
    }

    // Progressively draw the golden ratio geometry lines
    const linesSvgs = document.querySelectorAll('svg.davinci-lines');
    linesSvgs.forEach(svg => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          svg.setAttribute('data-active', String(i));
          svg.setAttribute('data-animating', String(i));
        }, 150 + i * 250);
      }
    });

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
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      if (scrollY >= vh * 0.25) {
        document.body.classList.add('scrolled-to-sidekick');
      } else {
        document.body.classList.remove('scrolled-to-sidekick');
      }

      if (scrollY >= vh * 0.65) {
        document.body.classList.add('scrolled-past-hero');
      } else {
        document.body.classList.remove('scrolled-past-hero');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (document.readyState === 'complete') {
    setTimeout(initController, 200);
    setTimeout(applyStyles, 1000);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initController, 200);
      setTimeout(applyStyles, 1000);
    });
  }
})();
</script>
`;

// Insert heroBgHtml right after <body>
const bodyStartIdx = html.indexOf('<body');
if (bodyStartIdx !== -1) {
  const bodyCloseTagIdx = html.indexOf('>', bodyStartIdx);
  html = html.substring(0, bodyCloseTagIdx + 1) + '\n' + heroBgHtml + html.substring(bodyCloseTagIdx + 1);
}

// Insert script before </body>
const bodyEndIdx = html.lastIndexOf('</body>');
if (bodyEndIdx !== -1) {
  html = html.substring(0, bodyEndIdx) + dynamicScript + html.substring(bodyEndIdx);
} else {
  html += dynamicScript;
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully integrated Creation of Adam hero background layer into public/index.html');
