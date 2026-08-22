const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const fallbackScript = `
<script>
// Fallback animation controller for static serving (React hydration may fail)
(function() {
  'use strict';

  function initFallbackAnimations() {
    const container = document.querySelector('[data-section-name="side-and-lines"]');
    if (!container) return;

    // Force data attributes for CSS transitions
    container.setAttribute('data-initiated', 'true');
    container.setAttribute('data-sidebar-ready', 'true');
    container.setAttribute('data-sidebar-loaded', 'true');

    // The CSS rule [data-initiated=true][data-sidebar-ready=true] .davinci-lines__title { opacity: 0 }
    // hides the title. We override it with inline styles after a delay to create the reveal animation.

    const title = document.querySelector('.davinci-lines__title');
    const titleClone = document.querySelector('svg.title');
    const loader = document.querySelector('.davinci-lines__loader');
    const complete = document.querySelector('.davinci-lines__complete');
    const tosEl = document.querySelector('.terms-of-service');
    const subtitle = document.querySelector('.subtitle');

    // Animate the SVG lines drawing in
    const linesSvgs = document.querySelectorAll('svg.davinci-lines');
    linesSvgs.forEach(svg => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          svg.setAttribute('data-active', String(i));
          svg.setAttribute('data-animating', String(i));
        }, 300 + i * 400);
      }
    });

    // Show the loader border first
    if (loader) {
      loader.style.transition = 'opacity 0.8s ease-out, stroke-dashoffset 1.5s ease-out';
      loader.style.opacity = '1';
      loader.style.strokeDashoffset = '0';
    }

    // After loader, show complete border
    setTimeout(() => {
      if (loader) loader.style.opacity = '0';
      if (complete) {
        complete.style.transition = 'opacity 0.6s ease-out, stroke-dashoffset 1s ease-out';
        complete.style.opacity = '1';
        complete.style.strokeDashoffset = '0';
      }
    }, 1800);

    // Reveal the title SVG
    setTimeout(() => {
      if (title) {
        title.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        title.style.opacity = '1';
      }
      if (titleClone) {
        titleClone.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        titleClone.style.opacity = '1';
      }
    }, 2200);

    // Show subtitle and terms
    setTimeout(() => {
      if (subtitle) {
        subtitle.style.transition = 'opacity 0.8s ease-out';
        subtitle.style.opacity = '1';
      }
      if (tosEl) {
        tosEl.style.transition = 'opacity 0.8s ease-out';
        tosEl.style.opacity = '1';
      }
    }, 2800);

    // Scroll-based: hide title & lines when scrolling down
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          if (scrollY > vh * 0.3) {
            container.setAttribute('data-scrolled', 'true');
            if (title) title.style.opacity = '0';
            if (titleClone) titleClone.style.opacity = '0';
            if (subtitle) subtitle.style.opacity = '0';
            if (tosEl) tosEl.style.opacity = '0';
          } else {
            container.setAttribute('data-scrolled', 'false');
            if (title) title.style.opacity = '1';
            if (titleClone) titleClone.style.opacity = '1';
            if (subtitle) subtitle.style.opacity = '1';
            if (tosEl) tosEl.style.opacity = '1';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Wait for DOM + initial React attempt, then patch
  if (document.readyState === 'complete') {
    setTimeout(initFallbackAnimations, 1500);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initFallbackAnimations, 1500);
    });
  }
})();
</script>`;

// Insert before </body>
const bodyClose = html.lastIndexOf('</body>');
if (bodyClose !== -1) {
  html = html.substring(0, bodyClose) + fallbackScript + '\n' + html.substring(bodyClose);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Injected fallback animation script before </body>');
} else {
  console.log('Could not find </body> tag');
}
