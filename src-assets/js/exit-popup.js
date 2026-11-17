/* Kawaki Studios: brief popup.
   Shown once per session to visitors who are clearly reading (35 s on the page and a third
   of it scrolled), never on the contact page, never over the open chat or menu, and not again
   for three days after "Not now" or thirty days after a brief was sent. */
(function () {
  'use strict';
  if (window.__kawakiBriefPopup) return;
  window.__kawakiBriefPopup = true;

  var EMAIL = 'hello@kawaki.co.in';
  var DAY = 86400000;
  var path = location.pathname.replace(/\/+$/, '') || '/';
  if (/^\/(contact|admin|thank)/.test(path)) return;

  function get(store, key) { try { return window[store].getItem(key); } catch (e) { return null; } }
  function set(store, key, val) { try { window[store].setItem(key, val); } catch (e) { /* storage unavailable */ } }
  if (get('sessionStorage', 'kc_pop_seen')) return;
  if (Date.now() - Number(get('localStorage', 'kc_pop_dismissed') || 0) < 3 * DAY) return;
  if (Date.now() - Number(get('localStorage', 'kc_brief_sent') || 0) < 30 * DAY) return;

  var started = Date.now();
  var maxDepth = 0;
  function depth() {
    var h = document.documentElement.scrollHeight - innerHeight;
    return h > 0 ? scrollY / h : 1;
  }
  function busy() {
    var a = document.activeElement;
    var typing = a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName);
    var chatOpen = document.querySelector('.kc-root.is-open');
    return typing || chatOpen || document.body.classList.contains('menu-is-open');
  }
  var timer = setInterval(function () {
    maxDepth = Math.max(maxDepth, depth());
    if (Date.now() - started > 35000 && maxDepth > 0.33 && !document.hidden && !busy()) { clearInterval(timer); show(); }
  }, 1500);

  var X = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  function show() {
    set('sessionStorage', 'kc_pop_seen', '1');
    if (!document.querySelector('link[href*="/assets/css/chatbot.css"]')) return;
    var lastFocus = document.activeElement;
    var pop = document.createElement('div');
    pop.className = 'kc-pop kc-enter';
    pop.innerHTML =
      '<div class="kc-pop__scrim" data-dismiss></div>' +
      '<div class="kc-pop__card" role="dialog" aria-modal="true" aria-labelledby="kcPopTitle" aria-describedby="kcPopText">' +
        '<div class="kc-pop__band"></div>' +
        '<button type="button" class="kc-icon-btn kc-pop__close" data-dismiss aria-label="Close">' + X + '</button>' +
        '<div class="kc-pop__body" data-step="form">' +
          '<p class="kc-pop__eyebrow">Kawaki Studios, New Delhi</p>' +
          '<h2 class="kc-pop__title" id="kcPopTitle">Planning a website or web app?</h2>' +
          '<p class="kc-pop__text" id="kcPopText">Send a two-line brief. It goes straight to the developers who would build it, and they reply every day, Monday to Sunday, 10:00 to 19:00 IST.</p>' +
          '<form class="kc-pop__form" novalidate>' +
            '<div class="kc-pop__row">' +
              '<div class="kc-field"><label for="kcPopName">Your name</label><input id="kcPopName" name="who" autocomplete="name" required></div>' +
              '<div class="kc-field"><label for="kcPopContact">Email or WhatsApp number</label><input id="kcPopContact" name="contact" autocomplete="email" required></div>' +
            '</div>' +
            '<div class="kc-field"><label for="kcPopMsg">What are you building? (optional)</label><textarea id="kcPopMsg" name="message" rows="2" placeholder="For example: a Shopify store for our jewellery label, launching in March"></textarea></div>' +
            '<p class="kc-form__error" role="alert" hidden></p>' +
            '<div class="kc-pop__actions">' +
              '<button type="submit" class="kc-btn">Send brief</button>' +
              '<button type="button" class="kc-btn kc-btn--ghost" data-chat>Ask a question first</button>' +
              '<button type="button" class="kc-pop__link" data-dismiss style="background:none;border:0;cursor:pointer;padding:6px 0">Not now</button>' +
            '</div>' +
            '<p class="kc-pop__small">We only use these details to reply to your brief.</p>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(pop);
    requestAnimationFrame(function () { requestAnimationFrame(function () { pop.classList.remove('kc-enter'); }); });

    var others = Array.prototype.filter.call(document.body.children, function (n) { return n !== pop && !n.inert; });
    others.forEach(function (n) { n.inert = true; });
    var card = pop.querySelector('.kc-pop__card');
    var form = pop.querySelector('form');
    var err = pop.querySelector('.kc-form__error');
    setTimeout(function () { pop.querySelector('#kcPopName').focus({ preventScroll: true }); }, 60);

    function close(remember) {
      if (remember) set('localStorage', 'kc_pop_dismissed', String(Date.now()));
      others.forEach(function (n) { n.inert = false; });
      document.removeEventListener('keydown', onKey, true);
      pop.remove();
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(card.querySelectorAll('a[href], button, input, textarea, select'), function (n) { return !n.disabled && n.getClientRects().length; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
    document.addEventListener('keydown', onKey, true);
    Array.prototype.forEach.call(pop.querySelectorAll('[data-dismiss]'), function (b) { b.addEventListener('click', function () { close(true); }); });
    pop.querySelector('[data-chat]').addEventListener('click', function () {
      close(false);
      if (window.KawakiChat) window.KawakiChat.open();
    });

    form.addEventListener('input', function () { err.hidden = true; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.namedItem('who').value.trim();
      var contact = form.elements.namedItem('contact').value.trim();
      var msg = form.elements.namedItem('message').value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
      var isPhone = contact.replace(/\D/g, '').length >= 8;
      form.elements.namedItem('contact').setAttribute('aria-invalid', String(!(isEmail || isPhone)));
      if (!name || !(isEmail || isPhone)) {
        err.textContent = !name ? 'Please add your name.' : 'Please add an email address or a phone number with country code.';
        err.hidden = false;
        (!name ? form.elements.namedItem('who') : form.elements.namedItem('contact')).focus();
        return;
      }
      err.hidden = true;
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending';
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, email: isEmail ? contact : '', contact: contact,
          service: 'Website or web app brief', stage: 'Popup brief',
          notes: (msg || 'No description given.') + '\n\nPage: ' + location.pathname,
          slot_date: new Date().toDateString(), slot_time: new Date().toTimeString().slice(0, 5)
        })
      })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); })
        .then(function () {
          set('localStorage', 'kc_brief_sent', String(Date.now()));
          var body = pop.querySelector('.kc-pop__body');
          body.innerHTML =
            '<div class="kc-pop__done">' +
              '<p class="kc-pop__eyebrow">Brief received</p>' +
              '<h2 class="kc-pop__title" id="kcPopTitle" tabindex="-1">Thanks, ' + name.replace(/[<>&"]/g, '') + '.</h2>' +
              '<p class="kc-pop__text">Your brief is with the studio. If it is urgent, WhatsApp +91 76781 23943 is the quickest way to reach the team.</p>' +
              '<div class="kc-pop__actions"><button type="button" class="kc-btn" data-done>Close</button><a class="kc-pop__link" href="/case-studies">See recent work</a></div>' +
            '</div>';
          body.querySelector('[data-done]').addEventListener('click', function () { close(false); });
          body.querySelector('#kcPopTitle').focus();
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send brief';
          err.innerHTML = 'That did not send. Please email <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> or message +91 76781 23943 on WhatsApp.';
          err.hidden = false;
        });
    });
  }
})();
