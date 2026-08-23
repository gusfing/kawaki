const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Remove old script block if present
html = html.replace(/<script id="kawaki-hero-scroll-controller">[\s\S]*?<\/script>\s*/g, '');

const dynamicScript = `
<script id="kawaki-hero-scroll-controller">
(function() {
  'use strict';

  function applyStyles() {
    if (!document.getElementById('kawaki-runtime-styles')) {
      const style = document.createElement('style');
      style.id = 'kawaki-runtime-styles';
      style.textContent = \`
        /* Hide Sidekick heading at scroll = 0, fade in smoothly on scroll */
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

        /* Hero opening spacer so the Renaissance scene is admired before Sidekick */
        [data-section-id="hero"] {
          height: 60vh !important;
          min-height: 60vh !important;
          display: block !important;
          position: relative !important;
          translate: none !important;
          transform: none !important;
          pointer-events: none;
        }

        /* DaVinci geometric drawing lines */
        .davinci-lines__container {
          transition: opacity 0.6s ease-out;
          pointer-events: none;
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
    applyStyles();

    const container = document.querySelector('[data-section-name="side-and-lines"]');
    if (container) {
      container.setAttribute('data-initiated', 'true');
      container.setAttribute('data-sidebar-ready', 'true');
      container.setAttribute('data-sidebar-loaded', 'true');
    }

    // Progressively activate golden drawing lines
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

    // Scroll handler
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      if (scrollY >= vh * 0.18) {
        document.body.classList.add('scrolled-to-sidekick');
      } else {
        document.body.classList.remove('scrolled-to-sidekick');
      }

      if (scrollY >= vh * 0.55) {
        document.body.classList.add('scrolled-past-hero');
      } else {
        document.body.classList.remove('scrolled-past-hero');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Run on load and also after React hydration
  if (document.readyState === 'complete') {
    setTimeout(initController, 200);
    setTimeout(applyStyles, 1000);
    setTimeout(applyStyles, 2500);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initController, 200);
      setTimeout(applyStyles, 1000);
      setTimeout(applyStyles, 2500);
    });
  }
})();
</script>
`;

const bodyIdx = html.lastIndexOf('</body>');
if (bodyIdx !== -1) {
  html = html.substring(0, bodyIdx) + dynamicScript + html.substring(bodyIdx);
} else {
  html += dynamicScript;
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully injected runtime style controller into public/index.html');
