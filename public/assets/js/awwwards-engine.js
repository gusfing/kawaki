/**
 * KAWAKI STUDIOS — Awwwards Interactive Motion & Micro-Interaction Engine
 * Conforms to Awwwards Site of the Day criteria: 60 FPS, subtle physics, zero layout shifts.
 */
(function() {
  'use strict';

  // 1. Accessibility check: Bail early on prefers-reduced-motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // 2. Cursor Glow Follower (Desktop Fine Pointer Only)
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'kawaki-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let mouseX = -200, mouseY = -200;
    let currentX = -200, currentY = -200;
    let isMoving = false;

    window.addEventListener('pointermove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(renderGlow);
      }
    }, { passive: true });

    function renderGlow() {
      // Lerp smoothing factor
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
        requestAnimationFrame(renderGlow);
      } else {
        isMoving = false;
      }
    }
  }

  // 3. Magnetic Physics on Interactive Targets
  function initMagneticTargets() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const targets = document.querySelectorAll('[data-magnetic], .vol-btn-primary, .hero-btn, .about-btn, .kawaki-chat-launcher');

    targets.forEach(el => {
      let boundRect = null;

      el.addEventListener('mouseenter', function() {
        boundRect = el.getBoundingClientRect();
      });

      el.addEventListener('mousemove', function(e) {
        if (!boundRect) boundRect = el.getBoundingClientRect();
        const centerX = boundRect.left + boundRect.width / 2;
        const centerY = boundRect.top + boundRect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;

        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      el.addEventListener('mouseleave', function() {
        boundRect = null;
        el.style.transform = 'translate3d(0px, 0px, 0px)';
      });
    });
  }

  // 4. Scroll Reveal Observer
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.cs-card, .feature-card, .about-media-card, .hero-lama-left, .hero-lama-right');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      el.classList.add('awwwards-reveal');
      observer.observe(el);
    });
  }

  // 5. Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMagneticTargets();
      initScrollReveals();
    });
  } else {
    initMagneticTargets();
    initScrollReveals();
  }
})();
