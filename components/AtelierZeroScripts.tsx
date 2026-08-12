'use client';
import { useEffect } from 'react';

export function AtelierZeroScripts() {
  useEffect(() => {
    
      /*
       * Scroll-reveal observer — mirrors apps/landing-page/app/_components/reveal-root.tsx.
       * Watches every [data-reveal] element and flips data-revealed='true'
       * when it first enters the viewport, triggering the CSS transition.
       */
      (function () {
        var elements = document.querySelectorAll('[data-reveal]:not([data-revealed])');
        if (!elements.length) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          for (var i = 0; i < elements.length; i++) (elements[i] as HTMLElement).dataset.revealed = 'true';
          return;
        }
        var observer = new IntersectionObserver(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            (entries[i].target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entries[i].target);
          }
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        for (var j = 0; j < elements.length; j++) observer.observe(elements[j]);
      })();
    
      /*
       * Headroom-style sticky header — mirrors apps/landing-page/app/_components/header.tsx.
       * Hides the nav on downward scroll, re-pins it on upward scroll, and
       * always keeps it visible near the top of the page.
       */
      (function () {
        var nav = document.querySelector('header.nav');
        if (!nav) return;
        var SHOW_TOP = 100;
        var DELTA = 6;
        var lastY = window.scrollY || 0;
        function onScroll() {
          if (!nav) return;
          var y = window.scrollY || 0;
          var d = y - lastY;
          if (y <= SHOW_TOP) {
            nav.classList.remove('is-hidden');
          } else if (d > DELTA) {
            nav.classList.add('is-hidden');
          } else if (d < -DELTA) {
            nav.classList.remove('is-hidden');
          }
          lastY = y;
        }
        window.addEventListener('scroll', onScroll, { passive: true });
      })();
    
  }, []);
  return null;
}
