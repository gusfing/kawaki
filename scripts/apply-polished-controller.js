const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove old injected styles and scripts
html = html.replace(/<style id="kawaki-hero-scroll-controller-styles">[\s\S]*?<\/style>\s*/g, '');
html = html.replace(/<script id="kawaki-hero-scroll-controller">[\s\S]*?<\/script>\s*/g, '');

const polishedStyles = `
<style id="kawaki-hero-scroll-controller-styles">
  /* Sidekick hero text must ONLY appear when scrolled into Section 1 */
  #sidekick h2.headline-1,
  #sidekick h2,
  #sidekick .rich-text {
    opacity: 0 !important;
    transform: translateY(40px) !important;
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  body.scrolled-to-sidekick #sidekick h2.headline-1,
  body.scrolled-to-sidekick #sidekick h2,
  body.scrolled-to-sidekick #sidekick .rich-text {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  /* Hero Section spacing: gives 80vh of pure Renaissance opening experience */
  [data-section-id="hero"] {
    height: 80vh !important;
    min-height: 80vh !important;
    display: block !important;
    position: relative !important;
    translate: none !important;
    transform: none !important;
    pointer-events: none;
  }

  /* Center DaVinci lines container */
  .davinci-lines__container {
    transition: opacity 0.5s ease-out;
    pointer-events: none;
  }

  body.scrolled-to-sidekick .davinci-lines__container {
    opacity: 0.2;
  }

  body.scrolled-past-hero .davinci-lines__container {
    opacity: 0;
  }
</style>
`;

const polishedScript = `
<script id="kawaki-hero-scroll-controller">
(function() {
  'use strict';

  function initController() {
    const container = document.querySelector('[data-section-name="side-and-lines"]');
    if (container) {
      container.setAttribute('data-initiated', 'true');
      container.setAttribute('data-sidebar-ready', 'true');
      container.setAttribute('data-sidebar-loaded', 'true');
    }

    // Sequentially draw all golden Da Vinci geometric lines
    const linesSvgs = document.querySelectorAll('svg.davinci-lines');
    linesSvgs.forEach(svg => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          svg.setAttribute('data-active', String(i));
          svg.setAttribute('data-animating', String(i));
        }, 150 + i * 250);
      }
    });

    // Make subtitle and left sidebar smooth
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

      if (scrollY >= vh * 0.2) {
        document.body.classList.add('scrolled-to-sidekick');
      } else {
        document.body.classList.remove('scrolled-to-sidekick');
      }

      if (scrollY >= vh * 0.6) {
        document.body.classList.add('scrolled-past-hero');
      } else {
        document.body.classList.remove('scrolled-past-hero');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (document.readyState === 'complete') {
    setTimeout(initController, 300);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initController, 300);
    });
  }
})();
</script>
`;

const headIdx = html.indexOf('</head>');
if (headIdx !== -1) {
  html = html.substring(0, headIdx) + polishedStyles + html.substring(headIdx);
}

const bodyIdx = html.lastIndexOf('</body>');
if (bodyIdx !== -1) {
  html = html.substring(0, bodyIdx) + polishedScript + html.substring(bodyIdx);
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Applied polished scroll controller and styles to public/index.html');
