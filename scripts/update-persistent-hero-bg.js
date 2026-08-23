const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Remove old script block
html = html.replace(/<script id="kawaki-hero-scroll-controller">[\s\S]*?<\/script>\s*/g, '');

const persistentScript = `
<script id="kawaki-hero-scroll-controller">
(function() {
  'use strict';

  function ensureHeroBg() {
    if (!document.getElementById('kawaki-hero-background-layer') && document.body) {
      const layer = document.createElement('div');
      layer.id = 'kawaki-hero-background-layer';
      layer.style.cssText = 'position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;';
      
      const img = document.createElement('img');
      img.id = 'kawaki-hero-bg-img';
      img.src = '/cdn.shopify.com/s/files/1/0951/3130/4218/files/hero-desktopa166.jpg';
      img.alt = 'Renaissance Edition Hero';
      img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; object-position: center; transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);';
      
      const vignette = document.createElement('div');
      vignette.id = 'kawaki-hero-vignette';
      vignette.style.cssText = 'position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.55) 100%), linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 15%, transparent 80%, rgba(0,0,0,0.8) 100%); pointer-events: none; transition: opacity 0.7s ease;';
      
      layer.appendChild(img);
      layer.appendChild(vignette);
      document.body.prepend(layer);
    }
  }

  function ensureStyles() {
    if (!document.getElementById('kawaki-runtime-styles') && document.head) {
      const style = document.createElement('style');
      style.id = 'kawaki-runtime-styles';
      style.textContent = \`
        /* Three.js canvas layer positioning */
        .sticky.top-0.left-0.w-full.h-screen {
          z-index: 1 !important;
        }

        /* Hide duplicate SVG title in center box */
        [data-section-name="side-and-lines"][data-initiated="true"] .davinci-lines__title {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Hero painting background fades smoothly as you scroll into Sidekick */
        body.scrolled-to-sidekick #kawaki-hero-bg-img {
          opacity: 0 !important;
          transform: scale(1.06) !important;
        }

        body.scrolled-to-sidekick #kawaki-hero-vignette {
          opacity: 0 !important;
        }

        /* Sidekick section title hidden at top, reveals smoothly on scroll */
        #sidekick h2.headline-1,
        #sidekick h2,
        #sidekick .rich-text {
          opacity: 0 !important;
          transform: translateY(30px) !important;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        body.scrolled-to-sidekick #sidekick h2.headline-1,
        body.scrolled-to-sidekick #sidekick h2,
        body.scrolled-to-sidekick #sidekick .rich-text {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Hero spacer section to give natural scroll transition distance */
        [data-section-id="hero"] {
          height: 45vh !important;
          min-height: 45vh !important;
          display: block !important;
          position: relative !important;
          translate: none !important;
          transform: none !important;
          pointer-events: none;
        }

        /* DaVinci geometric lines box */
        .davinci-lines__container {
          transition: opacity 0.6s ease-out;
          pointer-events: none;
          z-index: 2;
        }

        body.scrolled-to-sidekick .davinci-lines__container {
          opacity: 0.1;
        }

        body.scrolled-past-hero .davinci-lines__container {
          opacity: 0;
        }
      \`;
      document.head.appendChild(style);
    }
  }

  function initController() {
    ensureHeroBg();
    ensureStyles();

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

      if (scrollY >= vh * 0.18) {
        document.body.classList.add('scrolled-to-sidekick');
      } else {
        document.body.classList.remove('scrolled-to-sidekick');
      }

      if (scrollY >= vh * 0.5) {
        document.body.classList.add('scrolled-past-hero');
      } else {
        document.body.classList.remove('scrolled-past-hero');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  setInterval(ensureHeroBg, 250);
  setInterval(ensureStyles, 500);

  if (document.readyState === 'complete') {
    setTimeout(initController, 100);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initController, 100);
    });
  }
})();
</script>
`;

const bodyEndIdx = html.lastIndexOf('</body>');
if (bodyEndIdx !== -1) {
  html = html.substring(0, bodyEndIdx) + persistentScript + html.substring(bodyEndIdx);
} else {
  html += persistentScript;
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully written persistent hero background script to public/index.html');
