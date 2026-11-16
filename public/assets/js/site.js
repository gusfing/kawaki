/* Kawaki Studios: shared site script (homepage and inner pages). Every block runs only when its markup is on the page. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var hasGsap = !!(gsap && ST);
  var lenis = null;

  if (hasGsap) {
    gsap.registerPlugin(ST);
    if (!reduce && typeof window.Lenis === 'function') {
      lenis = new window.Lenis({ lerp: 0.12, smoothWheel: true });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- In-page anchors (skip link, "See the work") ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: id === '#main' ? 0 : -24 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ---------- Header steps aside on scroll down ---------- */
  var header = document.getElementById('globalNav');
  if (header && hasGsap) {
    var lastY = 0;
    ST.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        var y = self.scroll();
        var open = document.body.classList.contains('menu-is-open');
        if (!open && y > 200 && y > lastY + 2) { header.classList.add('is-hidden'); document.body.classList.add('scroll-down'); }
        else if (y < lastY - 2 || y <= 200 || open) { header.classList.remove('is-hidden'); document.body.classList.remove('scroll-down'); }
        lastY = y;
      }
    });
  }

  /* ---------- Menu: aria state, focus trap, scroll lock (open/close itself is main.js) ---------- */
  var menu = document.getElementById('fullscreenMenu');
  var toggle = document.getElementById('menuToggleBtn');
  if (menu && toggle) {
    var outside = [document.getElementById('main'), $('.site-foot')].filter(Boolean);
    var focusables = function () {
      return [toggle].concat($$('a[href], button:not([disabled])', menu).filter(function (el) {
        return el.getClientRects().length > 0;
      }));
    };
    var trap = function (e) {
      if (e.key !== 'Tab') return;
      var f = focusables();
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    var wasOpen = false;
    new MutationObserver(function () {
      var open = menu.classList.contains('open');
      if (open === wasOpen) return;
      wasOpen = open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      outside.forEach(function (el) { el.inert = open; });
      if (open) {
        if (lenis) lenis.stop();
        document.addEventListener('keydown', trap);
        setTimeout(function () {
          var first = $('.main-menu-links a', menu);
          if (first) first.focus({ preventScroll: true });
        }, 380);
      } else {
        if (lenis) lenis.start();
        document.removeEventListener('keydown', trap);
        if (menu.contains(document.activeElement) || document.activeElement === document.body) toggle.focus({ preventScroll: true });
      }
    }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- Headings trace in from the left ---------- */
  if (hasGsap && !reduce) {
    $$('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el, { clipPath: 'inset(-10% 100% -10% 0)' }, {
        clipPath: 'inset(-10% 0% -10% 0)', duration: 1.15, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
    $$('.case__media').forEach(function (fig) {
      gsap.fromTo(fig, { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'expo.out',
        scrollTrigger: { trigger: fig, start: 'top 85%', once: true }
      });
    });
  }
  $$('[data-path-mark]').forEach(function (el) {
    if (!hasGsap || reduce) { el.classList.add('is-drawn'); return; }
    ST.create({ trigger: el, start: 'top 80%', once: true, onEnter: function () { el.classList.add('is-drawn'); } });
  });

  /* ---------- Ticker: what is cut and what is kept ---------- */
  var ticker = $('[data-ticker]');
  if (ticker && hasGsap && !reduce) {
    var track = $('[data-track]', ticker);
    var btn = $('[data-ticker-toggle]', ticker);
    var tick = gsap.to(track, { xPercent: -50, ease: 'none', duration: 46, repeat: -1 });
    var userPaused = false, hovering = false, boost = 0, onScreen = true;
    var sync = function () { if (userPaused || hovering || !onScreen) tick.pause(); else tick.resume(); };
    ST.create({
      trigger: ticker, start: 'top bottom', end: 'bottom top',
      onToggle: function (s) { onScreen = s.isActive; sync(); },
      onUpdate: function (s) { boost = Math.min(Math.abs(s.getVelocity()) / 450, 4); }
    });
    gsap.ticker.add(function () { boost *= 0.93; tick.timeScale(1 + boost); });
    ticker.addEventListener('pointerenter', function () { hovering = true; sync(); });
    ticker.addEventListener('pointerleave', function () { hovering = false; sync(); });
    btn.hidden = false;
    btn.addEventListener('click', function () {
      userPaused = !userPaused;
      btn.setAttribute('aria-pressed', String(userPaused));
      btn.textContent = userPaused ? 'Play' : 'Pause';
      btn.setAttribute('aria-label', userPaused ? 'Play ticker' : 'Pause ticker');
      sync();
    });
  }

  /* ---------- More projects: each row reveals its site as a bar, like a waterfall entry ---------- */
  var list = $('[data-index]');
  if (list && finePointer) {
    var stripsLoaded = false;
    var loadStrips = function () {
      if (stripsLoaded) return;
      stripsLoaded = true;
      $$('img[data-src]', list).forEach(function (im) { im.src = im.getAttribute('data-src'); });
    };
    list.addEventListener('pointerenter', loadStrips, { once: true });
    list.addEventListener('focusin', loadStrips, { once: true });
  }

  /* ---------- Showreel: live sites we built, each one arriving like a page load ---------- */
  var reel = $('[data-reel]');
  if (reel) {
    var video = $('video', reel);
    var domainEl = $('[data-reel-domain]', reel);
    var load = $('.browser__load', reel);
    var toggleBtn = $('[data-reel-toggle]', reel);
    var segs = [['bazzaro.in', 0], ['kaladesignco.com', 3.5], ['urbanlandproducts.com', 7], ['decorlabs.co.in', 10.5]];
    var seg = -1, wantPlay = !reduce, reelOnScreen = false, reelReady = false;
    var setSeg = function (i) {
      if (i === seg) return;
      seg = i;
      domainEl.textContent = segs[i][0];
      if (hasGsap && !reduce) gsap.fromTo(load, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.55, ease: 'power2.out', onComplete: function () { gsap.to(load, { opacity: 0, duration: 0.3 }); } });
    };
    var syncReel = function () {
      if (!reelReady) return;
      if (wantPlay && reelOnScreen) { var pr = video.play(); if (pr) pr.catch(function () {}); } else video.pause();
    };
    var loadReel = function () {
      if (reelReady) return;
      $$('source[data-src]', video).forEach(function (src) { src.src = src.getAttribute('data-src'); });
      video.load();
      reelReady = true;
      toggleBtn.hidden = false;
      toggleBtn.textContent = wantPlay ? 'Pause' : 'Play';
      toggleBtn.setAttribute('aria-pressed', String(!wantPlay));
      syncReel();
    };
    video.addEventListener('playing', function () { reel.classList.add('is-playing'); });
    toggleBtn.addEventListener('click', function () {
      wantPlay = !wantPlay;
      toggleBtn.textContent = wantPlay ? 'Pause' : 'Play';
      toggleBtn.setAttribute('aria-label', wantPlay ? 'Pause reel' : 'Play reel');
      toggleBtn.setAttribute('aria-pressed', String(!wantPlay));
      if (!reelReady) loadReel(); else syncReel();
    });
    /* Load only after the page is interactive, so the reel never competes with the critical path. */
    var startReel = function () {
      if (!finePointer) {
        /* Phones: start on the first scroll or tap (or after 7 s), so the reel never delays the first screen. */
        var go = function () {
          ['scroll', 'touchstart', 'pointerdown'].forEach(function (ev) { window.removeEventListener(ev, go); });
          clearTimeout(later);
          loadReel();
        };
        var later = setTimeout(go, 7000);
        ['scroll', 'touchstart', 'pointerdown'].forEach(function (ev) { window.addEventListener(ev, go, { passive: true, once: true }); });
        return;
      }
      if ('requestIdleCallback' in window) requestIdleCallback(loadReel, { timeout: 1500 }); else setTimeout(loadReel, 400);
    };
    if (reduce) { toggleBtn.hidden = false; toggleBtn.textContent = 'Play'; toggleBtn.setAttribute('aria-label', 'Play reel'); toggleBtn.setAttribute('aria-pressed', 'true'); }
    else if (document.readyState === 'complete') startReel();
    else window.addEventListener('load', startReel, { once: true });

    if (hasGsap) {
      ST.create({ trigger: reel, start: 'top bottom', end: 'bottom top', onToggle: function (s) { reelOnScreen = s.isActive; syncReel(); } });
      gsap.ticker.add(function () {
        if (!reelReady || video.paused) return;
        var t = video.currentTime, i = 0;
        for (var n = 0; n < segs.length; n++) if (t >= segs[n][1]) i = n;
        setSeg(i);
      });
    }
    setSeg(0);

  }

  /* ---------- Reel panel opens from the margins to full width as it scrolls in ---------- */
  var stage = $('[data-stage]');
  if (stage && hasGsap && !reduce) {
    var gut = function () { var w = $('.wrap'); return w ? parseFloat(getComputedStyle(w).paddingLeft) || 16 : 16; };
    var rad = function () { return window.innerWidth > 900 ? 24 : 18; };
    gsap.fromTo(stage,
      { clipPath: function () { return 'inset(0px ' + gut() + 'px 0px ' + gut() + 'px round ' + rad() + 'px)'; } },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top 70%', end: 'top 8%', scrub: true, invalidateOnRefresh: true } });
  }

  /* ---------- Hero scene: each layer drifts at its own depth while the scene passes ---------- */
  var scene = $('[data-scene]');
  /* The side screenshots wait for the load event, so on a slow phone they never compete with the first screen. */
  var deferred = $$('img[data-defer-src]');
  var showDeferred = function () {
    deferred.forEach(function (im) {
      im.addEventListener('load', function () { im.classList.add('is-in'); }, { once: true });
      if (im.hasAttribute('data-defer-srcset')) im.srcset = im.getAttribute('data-defer-srcset');
      im.src = im.getAttribute('data-defer-src');
    });
  };
  if (deferred.length) {
    if (document.readyState === 'complete') showDeferred(); else window.addEventListener('load', showDeferred, { once: true });
  }
  if (scene && hasGsap && !reduce) {
    $$('[data-depth]', scene).forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth')) || 0;
      var amp = function () { return d * scene.offsetHeight * 0.1; };
      gsap.fromTo(el, { y: amp }, {
        y: function () { return -amp(); }, ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
      });
    });
  }

  /* ---------- Manifesto: one giant line slides past; each word lights as it reaches the reading point ---------- */
  var man = $('[data-manifesto]');
  if (man) {
    var mline = $('.manifesto__line', man);
    var lit = $$('.mw, .mbadge', man);
    if (hasGsap && !reduce) {
      man.classList.add('is-live');
      var light = function (w) {
        return {
          onEnter: function () { w.classList.add('is-lit'); },
          onLeaveBack: function () { w.classList.remove('is-lit'); }
        };
      };
      if (finePointer && window.innerWidth > 900) {
        man.classList.add('manifesto--pin');
        var slide = gsap.to(mline, {
          x: function () { return -(mline.scrollWidth - window.innerWidth * 0.62); },
          ease: 'none',
          scrollTrigger: { trigger: man, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }
        });
        lit.forEach(function (w) {
          ST.create(Object.assign({ trigger: w, containerAnimation: slide, start: 'left 68%' }, light(w)));
        });
      } else {
        lit.forEach(function (w) { ST.create(Object.assign({ trigger: w, start: 'top 78%' }, light(w))); });
      }
    }
  }

  /* ---------- Case studies: the live site plays inside its frame on hover ---------- */
  if (finePointer && !reduce) {
    $$('.case').forEach(function (c) {
      var fig = $('[data-clip]', c), v = fig && $('.case__clip', fig);
      if (!v) return;
      var key = fig.getAttribute('data-clip');
      c.addEventListener('pointerenter', function () {
        if (!v.childElementCount) {
          [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (f) {
            var s = document.createElement('source');
            s.src = '/assets/videos/home/' + key + '.' + f[0];
            s.type = f[1];
            v.appendChild(s);
          });
          v.load();
        }
        var pr = v.play(); if (pr) pr.catch(function () {});
      });
      v.addEventListener('playing', function () { if (c.matches(':hover')) c.classList.add('is-playing'); });
      c.addEventListener('pointerleave', function () { c.classList.remove('is-playing'); v.pause(); });
    });
  }

  /* ---------- Chat button steps aside over the hero and the contact finale ---------- */
  /* Computed from positions on every scroll and refresh, so a jump (End key, deep link,
     reload mid-page) can never leave it stuck in the wrong state. */
  if (hasGsap) {
    var heroEl = $('.hero'), finaleEl = $('.finale');
    var applyTuck = function () {
      var vh = window.innerHeight, t = false;
      if (heroEl && heroEl.getBoundingClientRect().bottom > vh * 0.4) t = true;
      if (finaleEl) { var fr = finaleEl.getBoundingClientRect(); if (fr.top < vh * 0.85 && fr.bottom > 0) t = true; }
      document.body.classList.toggle('chat-tucked', t);
    };
    ST.create({ start: 0, end: 'max', onUpdate: applyTuck, onRefresh: applyTuck });
    applyTuck();
  }

  /* ---------- Statement: the paragraph arrives word by word, like requests resolving ---------- */
  var body = $('.statement__body');
  if (body && hasGsap && !reduce && finePointer) {
    var words = body.textContent.trim().split(/\s+/);
    body.textContent = '';
    words.forEach(function (w, i) {
      var sp = document.createElement('span');
      sp.className = 'word';
      sp.textContent = w;
      body.appendChild(sp);
      if (i < words.length - 1) body.appendChild(document.createTextNode(' '));
    });
    gsap.fromTo($$('.word', body), { opacity: 0.22 }, {
      opacity: 1, ease: 'none', stagger: 0.08,
      scrollTrigger: { trigger: body, start: 'top 82%', end: 'bottom 52%', scrub: 0.5 }
    });
  }

  /* ---------- Header CTA appears once the hero's own CTA is gone ---------- */
  var heroActions = $('.hero__actions');
  if (header && heroActions && hasGsap) {
    ST.create({
      trigger: heroActions, start: 'bottom top+=80', end: 'max',
      onToggle: function (s) { header.classList.toggle('past-hero', s.isActive); }
    });
  } else if (header) {
    header.classList.add('past-hero');
  }

  /* ---------- Process: the red path runs through six stages ---------- */
  var steps = $('[data-steps]');
  if (steps && hasGsap && !reduce) {
    var path = $('.steps__path', steps);
    var stepEls = $$('.step', steps);
    steps.classList.add('steps--live');
    gsap.fromTo(path, { '--p': 0 }, {
      '--p': 1, ease: 'none',
      scrollTrigger: {
        trigger: steps, start: 'top 72%', end: 'bottom 60%', scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: function (s) {
          stepEls.forEach(function (el, i) { el.classList.toggle('is-on', s.progress >= i / (stepEls.length - 1) - 0.02); });
        }
      }
    });
  }

  /* ---------- FAQ: all open without JS; with JS, the first stays open ---------- */
  $$('.faq__q button').forEach(function (b, i) {
    var panel = document.getElementById(b.getAttribute('aria-controls'));
    if (!panel) return;
    if (i > 0) { b.setAttribute('aria-expanded', 'false'); panel.hidden = true; }
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (!open && hasGsap && !reduce) {
        gsap.fromTo(panel, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'expo.out' });
      }
      if (hasGsap) ST.refresh();
    });
  });
  if (hasGsap) ST.refresh();

  /* ---------- Leaving the page: the red path draws across the top ---------- */
  var bar = $('.pathbar span');
  if (bar && hasGsap) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 0.88, duration: reduce ? 0 : 1.6, ease: 'power2.out' });
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) gsap.set(bar, { scaleX: 0 }); });
  }

  /* ---------- Studio time in New Delhi ---------- */
  var clock = document.getElementById('studioTime');
  if (clock && window.Intl) {
    var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    var setTime = function () { clock.textContent = f.format(new Date()); };
    setTime();
    setInterval(setTime, 20000);
  }

  /* ---------- Contact: the brief form posts to /api/contact ---------- */
  var brief = $('[data-brief-form]');
  if (brief) {
    var fields = brief.elements;
    var get = function (n) { return fields.namedItem(n); };
    var fromLink = new URLSearchParams(location.search).get('service');
    var SERVICE = {
      'custom-web-development': 'Custom website', 'web-application-development': 'Web application', 'website-redesign': 'Custom website',
      'shopify-development': 'Shopify store', 'mobile-app-development': 'Mobile app', 'ai-automation': 'AI automation',
      'ai-search-optimization': 'AI search or SEO', 'wordpress-malware-removal': 'Hacked site cleanup'
    };
    if (fromLink && SERVICE[fromLink]) get('service').value = SERVICE[fromLink];
    var status = $('[data-brief-status]', brief);
    var label = $('[data-brief-label]', brief);
    var fail = function (msg, field) {
      status.textContent = msg; status.hidden = false;
      if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
    };
    brief.addEventListener('input', function (e) { if (e.target.removeAttribute) e.target.removeAttribute('aria-invalid'); status.hidden = true; });
    brief.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = get('name').value.trim(), email = get('email').value.trim(), contact = get('contact').value.trim(), notes = get('notes').value.trim();
      if (!name) return fail('Please add your name.', get('name'));
      if (!email && contact.replace(/\D/g, '').length < 8) return fail('Please add an email address, or a phone number with its country code.', get('email'));
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('That email address does not look complete.', get('email'));
      if (!notes) return fail('A line or two about the project helps us reply properly.', get('notes'));
      var btn = brief.querySelector('button[type="submit"]');
      btn.disabled = true; label.textContent = 'Sending…';
      fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, email: email, contact: contact, service: get('service').value, budget: get('budget').value,
          stage: 'Contact form', slot_date: '', slot_time: get('when').value,
          notes: notes + '\n\nPage: ' + location.pathname + (fromLink ? '\nCame from: /services/' + fromLink : '')
        })
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json().catch(function () { return {}; }); })
        .then(function () {
          var done = $('[data-brief-done]');
          $('[data-brief-name]', done).textContent = name.split(' ')[0];
          brief.hidden = true; done.hidden = false; done.focus();
          try { localStorage.setItem('kc_brief_sent', String(Date.now())); } catch (err) { /* storage unavailable */ }
        })
        .catch(function () {
          btn.disabled = false; label.textContent = 'Send brief';
          status.innerHTML = 'That did not send. Please message us on <a href="https://wa.me/917678123943" target="_blank" rel="noopener">WhatsApp at +91 76781 23943</a> or email <a href="mailto:hello@kawaki.co.in">hello@kawaki.co.in</a>.';
          status.hidden = false;
        });
    });
  }

  if (hasGsap && document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
})();
