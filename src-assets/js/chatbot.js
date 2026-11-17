/* Kawaki Studios: studio assistant.
   A scripted assistant (no AI calls): answers come only from the studio's verified facts,
   and anything it cannot answer goes to a person through WhatsApp, email or the brief form.
   Briefs post to /api/leads, the same endpoint as the contact form. */
(function () {
  'use strict';
  if (window.__kawakiChat) return;
  window.__kawakiChat = true;

  var ASSET_VER = '95bb99f1fa';
  var WHATSAPP = '917678123943';
  var EMAIL = 'hello@kawaki.co.in';
  var STORE = 'kc_conversation_v3';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The stylesheet stays off the critical path: pages built on the new shell do not link it,
     so it is injected here and the launcher only appears once it has loaded. */
  var me = document.currentScript;
  var CSS_VER = (me && me.getAttribute('data-css-v')) || ASSET_VER;
  var cssReady = true, pendingMount = null;
  if (!document.querySelector('link[href*="/assets/css/chatbot.css"]')) {
    cssReady = false;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/css/chatbot.css?v=' + CSS_VER;
    css.onload = css.onerror = function () { cssReady = true; if (pendingMount) { var m = pendingMount; pendingMount = null; m(); } };
    document.head.appendChild(css);
  }

  /* ---------- Small helpers ---------- */
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  /* Tiny formatter for scripted answers: **bold**, [label](/link), "- " bullets, blank-line paragraphs. */
  function format(src) {
    return src.split(/\n\n+/).map(function (block) {
      var lines = block.split('\n');
      var inline = function (t) {
        return esc(t)
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.+?)\]\(((?:\/|https:\/\/|mailto:)[^)\s]*)\)/g, function (m, label, href) {
            var ext = /^https:/.test(href);
            return '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
          });
      };
      if (lines.every(function (l) { return /^- /.test(l); })) {
        return '<ul>' + lines.map(function (l) { return '<li>' + inline(l.slice(2)) + '</li>'; }).join('') + '</ul>';
      }
      return '<p>' + lines.map(inline).join('<br>') + '</p>';
    }).join('');
  }
  var waLink = function (text) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text || 'Hi Kunal, I would like to discuss a project with Kawaki Studios.'); };
  var ICON = {
    ast: '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path d="M20 6v28M8 13l24 14M8 27l24-14" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    send: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 13L13 3M6 3h7v7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wa: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 1.6a6.4 6.4 0 0 0-5.5 9.7L1.7 14.4l3.2-.8A6.4 6.4 0 1 0 8 1.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M5.8 5.2c.2-.4.6-.4.8 0l.5 1.1c.1.2 0 .4-.1.6l-.3.4c.4.9 1.1 1.6 2 2l.4-.3c.2-.1.4-.2.6-.1l1.1.5c.4.2.4.6 0 .8-.6.5-1.4.6-2.2.3a5.6 5.6 0 0 1-3.2-3.2c-.2-.8-.1-1.6.4-2.1z" fill="currentColor"/></svg>',
    mail: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.5h12v9H2z M2 4l6 4.5L14 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    call: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 2.5h10v11H3z M3 6h10 M6 1.5v2M10 1.5v2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- Studio hours: Monday to Sunday, 10:00 to 19:00 IST ---------- */
  function studio() {
    var now = new Date(), wd = 'Mon', h = 12, m = 0;
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
      parts.forEach(function (p) { if (p.type === 'weekday') wd = p.value; if (p.type === 'hour') h = +p.value % 24; if (p.type === 'minute') m = +p.value; });
    } catch (e) { /* Intl without time zones: assume open hours */ }
    var t = h * 60 + m;
    var day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(wd);
    var weekday = day > -1; // open every day
    var open = weekday && t >= 600 && t < 1140;
    var time = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    var back;
    if (open) back = 'Replies until 19:00';
    else if (weekday && t < 600) back = 'Back today at 10:00';
    else back = 'Back tomorrow at 10:00';
    return { open: open, time: time, flag: open ? 'Open' : 'Closed', label: 'New Delhi ' + time + ' IST. ' + back };
  }

  /* ---------- What the assistant knows (from the studio's verified facts) ---------- */
  var KB = [
    { id: 'hello', words: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'yo'],
      answer: 'Hello. I can answer questions about services, pricing, timelines and our work, or pass a brief straight to the developers. What are you planning?',
      chips: ['Start a project', 'What does it cost?', 'How long does it take?', 'See the work'] },
    { id: 'start', words: ['start a project', 'start project', 'new project', 'hire', 'quote', 'estimate', 'proposal', 'work with you', 'get started', 'book', 'brief', 'scope', 'need a website', 'build a website', 'build an app', 'want a website'],
      answer: 'Good. Tell me a little about it in the form below and it goes to the team with this conversation. If you prefer, WhatsApp or email work just as well.', form: true },
    { id: 'pricing', words: ['price', 'pricing', 'cost', 'costs', 'budget', 'how much', 'rate', 'rates', 'fees', 'charges', 'charge', 'expensive', 'cheap', 'affordable', 'inr', 'rupees', 'dollars', 'usd'],
      answer: 'Most custom builds fall between **₹1,50,000 and ₹5,00,000** for Indian startups and growing brands, or between **$2,500 and $10,000** for international founders.\n\nThe final figure depends on scope, interactive complexity and integrations such as headless Shopify, custom APIs or AI automation. Work is billed against fixed milestones, so the price of each stage is agreed before it starts.',
      chips: ['Start a project', 'How long does it take?', 'What do you build?'] },
    { id: 'timeline', words: ['how long', 'timeline', 'time line', 'weeks', 'months', 'deadline', 'turnaround', 'when can', 'how fast', 'how quickly', 'duration', 'launch date'],
      answer: 'A marketing website usually takes **4 to 8 weeks** from discovery to launch. Web applications and larger builds are scoped after discovery, because their timeline depends on the data and integrations involved.',
      chips: ['How do you work?', 'What does it cost?', 'Start a project'] },
    { id: 'process', words: ['process', 'how do you work', 'steps', 'workflow', 'sprint', 'sprints', 'milestone', 'milestones', 'staging', 'methodology', 'approach'],
      answer: 'Every project runs through six stages, in this order:\n\n- **Discovery**: what the site has to do and what it connects to\n- **Architecture**: page structure, data schema and integrations\n- **Interface**: layouts and a type system, reviewed with you\n- **Build**: frontend and backend in milestone sprints\n- **Verification**: performance, security and cross-browser checks\n- **Launch and handoff**: production deployment and the repository\n\nEach milestone lands on a staging link you can open and review, and you talk directly to the developers doing the work.',
      chips: ['What does it cost?', 'Start a project'] },
    { id: 'services', words: ['service', 'services', 'what do you do', 'what do you build', 'what do you offer', 'offer', 'capabilities', 'expertise', 'help with', 'can you build', 'do you do'],
      answer: 'We design and engineer:\n\n- [Custom web development](/services/custom-web-development)\n- [Web application development](/services/web-application-development)\n- [Shopify development](/services/shopify-development)\n- [Mobile app development](/services/mobile-app-development)\n- [AI automation](/services/ai-automation)\n- [AI search optimization](/services/ai-search-optimization)\n- [Technical SEO](/technical-seo)\n- [WordPress development](/services/wordpress-development)\n- [Hacked WordPress cleanup](/services/wordpress-malware-removal)\n\nWhich one is closest to what you need?',
      chips: ['Start a project', 'What does it cost?', 'See the work'] },
    { id: 'work', words: ['work', 'portfolio', 'case study', 'case studies', 'examples', 'example', 'projects', 'clients', 'previous work', 'show me'],
      answer: 'A few recent builds, each with a full write-up:\n\n- [Kala Design Co](/case-studies/kala-design): editorial site for an architecture studio\n- [BAZZARO](/case-studies/bazzaro): our own fashion label on a custom Shopify storefront\n- [NextSchool ERP](/case-studies/nextschool-erp): multi-campus school portal\n- [NursePass](/case-studies/nursepass): course platform for nurses seeking recognition in Germany\n\nEverything else is on the [case studies page](/case-studies).',
      chips: ['Start a project', 'What do you build?'] },
    { id: 'shopify', words: ['shopify', 'ecommerce', 'e-commerce', 'online store', 'store', 'headless', 'liquid', 'storefront', 'woocommerce', 'sell online'],
      answer: 'We build custom Shopify themes in Liquid, or a headless storefront on the Storefront API when the catalogue needs one. [BAZZARO](/case-studies/bazzaro), our own fashion label, runs on a custom Shopify storefront.\n\nMore on the [Shopify development page](/services/shopify-development).',
      chips: ['What does it cost?', 'Start a project'] },
    { id: 'webapp', words: ['web app', 'webapp', 'web application', 'portal', 'dashboard', 'saas', 'erp', 'lms', 'crm', 'internal tool', 'admin panel', 'platform', 'mvp'],
      answer: 'Web applications are portals, dashboards and internal tools with relational data, user roles and REST or webhook integrations. [NextSchool ERP](/case-studies/nextschool-erp) and [NursePass](/case-studies/nursepass) are two we built.\n\nDetails on the [web application page](/services/web-application-development).',
      chips: ['How long does it take?', 'Start a project'] },
    { id: 'mobile', words: ['mobile app', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin', 'app store', 'play store', 'phone app'],
      answer: 'We build iOS and Android apps in Flutter, React Native, Swift or Kotlin. See the [mobile app development page](/services/mobile-app-development).',
      chips: ['What does it cost?', 'Start a project'] },
    { id: 'automation', words: ['automation', 'automate', 'n8n', 'make.com', 'zapier', 'workflow automation', 'ai agent', 'agents', 'chatbot', 'integration', 'integrations', 'api'],
      answer: 'We set up n8n and Make.com workflows and agent integrations that move work between the tools your team already uses, connected through REST and webhook APIs. See [AI automation](/services/ai-automation).',
      chips: ['Start a project', 'What does it cost?'] },
    { id: 'seo', words: ['seo', 'google', 'ranking', 'rank', 'search', 'chatgpt', 'perplexity', 'gemini', 'ai search', 'geo', 'aeo', 'llm', 'visibility', 'traffic'],
      answer: 'Two services cover search:\n\n- [AI search optimization](/services/ai-search-optimization): page structure, schema and content aimed at being read and cited by AI search tools\n- [Technical SEO](/technical-seo): crawlable architecture, clean URLs, internal links and JSON-LD, fixed in the code\n\nWe do not promise rankings; we fix what the code controls.',
      chips: ['Start a project', 'What do you build?'] },
    { id: 'security', words: ['hacked', 'hack', 'malware', 'virus', 'redirect', 'redirects', 'spam', 'japanese keyword', 'backdoor', 'blacklist', 'blacklisted', 'infected', 'security', 'compromised', 'pharma'],
      answer: 'Yes, we clean infected WordPress sites: backdoors, malicious redirects and spam pages are removed, then the site is hardened to close the way the attacker got in.\n\nThe fastest start is to send the site address on WhatsApp. More on the [malware removal page](/services/wordpress-malware-removal).',
      chips: ['Message on WhatsApp', 'Start a project'] },
    { id: 'wordpress', words: ['wordpress', 'wp', 'elementor', 'divi', 'theme', 'plugin', 'plugins'],
      answer: 'We build custom WordPress themes kept lean, without a stack of plugins doing the work. See [WordPress development](/services/wordpress-development). If the site has been hacked, the [malware removal page](/services/wordpress-malware-removal) covers that.',
      chips: ['Start a project', 'What does it cost?'] },
    { id: 'stack', words: ['tech', 'technology', 'stack', 'next.js', 'nextjs', 'react', 'typescript', 'node', 'python', 'postgres', 'postgresql', 'sqlite', 'tailwind', 'framework'],
      answer: 'Typical stack: **Next.js, React and TypeScript** on the frontend, **Node.js or Python** behind it, **PostgreSQL or SQLite** for data, **Shopify Liquid and the Storefront API** for commerce, and **n8n or Make.com** for automation. The choice follows the project, not the other way round.',
      chips: ['How do you work?', 'Start a project'] },
    { id: 'location', words: ['where', 'location', 'located', 'delhi', 'india', 'office', 'address', 'remote', 'usa', 'uk', 'london', 'dubai', 'canada', 'abroad', 'international', 'country'],
      answer: 'Kawaki Studios LLP is based in **New Delhi**. We work with clients across India and abroad remotely, through milestone sprints, a shared Git repository and staging links.',
      chips: ['Studio hours', 'Start a project'] },
    { id: 'hours', words: ['hours', 'open', 'available', 'availability', 'working hours', 'time zone', 'timezone', 'ist', 'weekend'],
      answer: function () { return 'Studio hours are **Monday to Sunday, 10:00 to 19:00 IST** (UTC+05:30). ' + (studio().open ? 'The studio is open right now.' : 'The studio is closed right now; messages are read from 10:00 IST.'); },
      chips: ['Message on WhatsApp', 'Start a project'] },
    { id: 'about', words: ['who are you', 'about', 'founder', 'kunal', 'team', 'company', 'studio', 'llp', 'experience', 'aws'],
      answer: 'Kawaki Studios LLP is an engineering studio in New Delhi, founded by **Kunal Sharma**, an AWS Certified AI Practitioner. You work directly with the developers writing your code. More on the [about page](/about).',
      chips: ['See the work', 'Start a project'] },
    { id: 'code', words: ['source code', 'repository', 'repo', 'git', 'github', 'handover', 'handoff', 'own the code', 'ownership'],
      answer: 'Work runs in a Git repository with a staging link at every milestone, and launch includes a handoff of the repository and how it runs. Contract terms are agreed with the team before work starts.',
      chips: ['How do you work?', 'Talk to a person'] },
    { id: 'human', words: ['human', 'person', 'talk to', 'speak', 'call', 'phone', 'contact', 'whatsapp', 'email', 'mail', 'reach', 'meeting'],
      answer: 'Happy to hand you over. **WhatsApp** is quickest, **email** suits longer briefs, or **book a 15 minute call**. The links sit under the message box.',
      chips: ['Message on WhatsApp', 'Book a call'] },
    { id: 'thanks', words: ['thanks', 'thank you', 'thx', 'great', 'cool', 'ok', 'okay', 'awesome', 'bye', 'goodbye'],
      answer: 'Any time. If anything else comes up, ask here or message the studio directly.',
      chips: ['Start a project', 'See the work'] }
  ];
  var CHIP_TO_TEXT = {
    'Start a project': 'start a project', 'What does it cost?': 'pricing', 'Pricing': 'pricing', 'How long does it take?': 'how long does a project take',
    'See the work': 'show me your work', 'What do you build?': 'what do you build', 'How do you work?': 'how do you work',
    'Studio hours': 'studio hours', 'Talk to a person': 'talk to a person', 'Fix a hacked site': 'my site is hacked'
  };
  var GREETING_CHIPS = ['Start a project', 'What does it cost?', 'How long does it take?', 'See the work', 'Fix a hacked site'];

  function normalize(t) { return ' ' + String(t).toLowerCase().replace(/[^a-z0-9.+#\s-]/g, ' ').replace(/\s+/g, ' ').trim() + ' '; }
  function match(text) {
    var n = normalize(text), best = null, bestScore = 0;
    KB.forEach(function (it) {
      var score = 0;
      it.words.forEach(function (w) { if (n.indexOf(' ' + w + ' ') !== -1 || (w.length > 4 && n.indexOf(w) !== -1)) score += w.split(' ').length; });
      if (it.id === 'hello' || it.id === 'thanks') score *= 0.5;
      if (it.id === 'services' || it.id === 'human' || it.id === 'about') score *= 0.6;
      if (score > bestScore) { bestScore = score; best = it; }
    });
    return bestScore > 0 ? best : null;
  }

  /* ---------- Build the widget ---------- */
  var root = el('div', { class: 'kc-root' });
  var LAUNCH = '<span class="kc-launcher__badge">' + ICON.ast + '</span><span class="kc-launcher__label">Ask the studio</span>';
  var launcher = el('button', { type: 'button', class: 'kc-launcher', 'aria-expanded': 'false', 'aria-controls': 'kcPanel', 'aria-label': 'Open chat with Kawaki Studios' }, LAUNCH);
  var panel = el('section', { class: 'kc-panel', id: 'kcPanel', role: 'dialog', 'aria-label': 'Chat with Kawaki Studios', tabindex: '-1', hidden: '' });
  panel.innerHTML =
    '<header class="kc-head">' +
      '<span class="kc-head__mark" role="img" aria-label="Kawaki Studios"></span>' +
      '<button type="button" class="kc-icon-btn" data-close aria-label="Close chat">' + ICON.close + '</button>' +
    '</header>' +
    '<p class="kc-status"><span class="kc-status__flag" data-flag></span><span data-status></span></p>' +
    '<div class="kc-log" role="log" aria-live="polite" aria-relevant="additions" data-log></div>' +
    '<div class="kc-foot">' +
      '<form class="kc-compose" data-compose>' +
        '<label class="kc-sr" for="kcInput">Your message</label>' +
        '<textarea class="kc-input" id="kcInput" rows="1" placeholder="Type a question" autocomplete="off"></textarea>' +
        '<button type="submit" class="kc-send">Send' + ICON.arrow + '</button>' +
      '</form>' +
      '<p class="kc-direct"><span>Or directly</span>' +
        '<a data-wa target="_blank" rel="noopener" href="' + waLink() + '">WhatsApp</a>' +
        '<a href="mailto:' + EMAIL + '">Email</a>' +
        '<a href="/contact">Book a call</a>' +
      '</p>' +
    '</div>';
  root.appendChild(panel);
  root.appendChild(launcher);

  var log = panel.querySelector('[data-log]');
  var input = panel.querySelector('#kcInput');
  var statusText = panel.querySelector('[data-status]');
  var statusFlag = panel.querySelector('[data-flag]');
  var history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORE) || '[]'); } catch (e) { history = []; }

  function save() { try { sessionStorage.setItem(STORE, JSON.stringify(history.slice(-40))); } catch (e) { /* storage unavailable */ } }
  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function updateStatus() { var s = studio(); statusText.textContent = s.label; statusFlag.textContent = s.flag; statusFlag.classList.toggle('is-open', s.open); }

  function stamp() { var d = new Date(); return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(); }
  function entry(from, html, t) {
    return el('div', { class: 'kc-msg kc-msg--' + from },
      '<p class="kc-msg__by">' + (from === 'user' ? 'You' : 'Kawaki') + (t ? '<time>' + t + '</time>' : '') + '</p>' +
      '<div class="kc-msg__body">' + html + '</div>');
  }
  function addMessage(from, html, persist) {
    var t = stamp();
    var m = entry(from, html, t);
    log.appendChild(m);
    if (persist !== false) { history.push({ from: from, html: html, t: t }); save(); }
    scrollDown();
    return m;
  }
  function clearChips() { Array.prototype.forEach.call(log.querySelectorAll('.kc-chips'), function (c) { c.remove(); }); }
  function addChips(list) {
    if (!list || !list.length) return;
    var wrap = el('div', { class: 'kc-chips', role: 'group', 'aria-label': 'Suggested questions' });
    list.forEach(function (label, i) {
      var b = el('button', { type: 'button', class: 'kc-chip' },
        '<span class="kc-chip__n" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="kc-chip__t">' + esc(label) + '</span>' + ICON.arrow);
      b.addEventListener('click', function () { onChip(label); });
      wrap.appendChild(b);
    });
    log.appendChild(wrap);
    scrollDown();
  }
  function typing(ms, then) {
    var t = el('div', { class: 'kc-typing', 'aria-hidden': 'true' }, '<p class="kc-msg__by">Kawaki</p><span class="kc-typing__bar"></span>');
    log.appendChild(t); scrollDown();
    setTimeout(function () { t.remove(); then(); }, reduce ? 0 : ms);
  }

  function reply(text) {
    clearChips();
    var contact = (text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/) || text.match(/\+?\d[\d\s-]{7,}\d/) || [])[0];
    if (contact) {
      typing(500, function () {
        addMessage('bot', format('Thanks. Shall I send **' + contact + '** to the team along with this conversation? They reply every day, Monday to Sunday, 10:00 to 19:00 IST.'));
        addForm(contact);
      });
      return;
    }
    var hit = match(text);
    if (!hit) {
      typing(450, function () {
        addMessage('bot', format('I don\'t have a reliable answer to that one, and I would rather not guess. The team can answer directly: WhatsApp and email links sit under the message box, or send a brief and they will reply.'));
        addChips(['Start a project', 'Talk to a person', 'What do you build?']);
      });
      return;
    }
    var answer = typeof hit.answer === 'function' ? hit.answer() : hit.answer;
    typing(Math.min(900, 300 + answer.length * 1.5), function () {
      addMessage('bot', format(answer));
      if (hit.form) addForm();
      else addChips(hit.chips);
    });
  }

  function onChip(label) {
    if (label === 'Message on WhatsApp') { window.open(waLink(), '_blank', 'noopener'); return; }
    if (label === 'Book a call') { window.location.href = '/contact'; return; }
    addMessage('user', esc(label));
    reply(CHIP_TO_TEXT[label] || label);
  }

  /* ---------- Brief form inside the conversation ---------- */
  function transcript() {
    var tmp = document.createElement('div');
    return history.slice(-14).map(function (h) {
      tmp.innerHTML = h.html.replace(/<\/p>|<\/li>|<br>/g, '$&\n').replace(/<li>/g, '<li>- ');
      var text = tmp.textContent.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).join('\n');
      return (h.from === 'user' ? 'Visitor: ' : 'Assistant: ') + text;
    }).join('\n\n');
  }
  function addForm(prefill) {
    var id = 'kcf' + Date.now();
    var f = el('form', { class: 'kc-form', novalidate: '' });
    f.innerHTML =
      '<p class="kc-form__title">Send a brief</p><p class="kc-form__sub">It goes to the studio with this conversation.</p>' +
      '<div class="kc-field"><label for="' + id + 'n">Your name</label><input id="' + id + 'n" name="name" autocomplete="name" required></div>' +
      '<div class="kc-field"><label for="' + id + 'c">Email or WhatsApp number</label><input id="' + id + 'c" name="contact" autocomplete="email" required></div>' +
      '<div class="kc-field"><label for="' + id + 's">What do you need?</label><select id="' + id + 's" name="service">' +
        ['Custom website', 'Web application', 'Shopify store', 'Mobile app', 'AI automation', 'AI search or SEO', 'Hacked site cleanup', 'Not sure yet'].map(function (o) { return '<option>' + o + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="kc-field"><label for="' + id + 'b">Budget</label><select id="' + id + 'b" name="budget">' +
        ['Not sure yet', 'Under ₹1,50,000 or $2,500', '₹1,50,000 to ₹5,00,000 or $2,500 to $10,000', 'Above ₹5,00,000 or $10,000'].map(function (o) { return '<option>' + o + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="kc-field"><label for="' + id + 'm">Anything else? (optional)</label><textarea id="' + id + 'm" name="message" rows="2"></textarea></div>' +
      '<p class="kc-form__error" role="alert" hidden></p>' +
      '<button type="submit" class="kc-btn">Send brief' + ICON.arrow + '</button>';
    if (prefill) f.querySelector('[name="contact"]').value = prefill;
    log.appendChild(f);
    scrollDown();
    setTimeout(function () { f.elements.namedItem('name').focus({ preventScroll: true }); }, 50);

    f.addEventListener('input', function () { var er = f.querySelector('.kc-form__error'); er.hidden = true; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = f.querySelector('.kc-form__error');
      var nameField = f.elements.namedItem('name');
      var name = nameField.value.trim(), contact = f.contact.value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
      var isPhone = contact.replace(/\D/g, '').length >= 8;
      f.contact.setAttribute('aria-invalid', String(!(isEmail || isPhone)));
      if (!name || !(isEmail || isPhone)) {
        err.textContent = !name ? 'Please add your name.' : 'Please add an email address or a phone number with country code.';
        err.hidden = false;
        (!name ? nameField : f.contact).focus();
        return;
      }
      err.hidden = true;
      var btn = f.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending\u2026';
      var payload = {
        name: name,
        email: isEmail ? contact : '',
        contact: contact,
        service: f.service.value,
        budget: f.budget.value,
        stage: 'Chat brief',
        notes: (f.message.value.trim() ? f.message.value.trim() + '\n\n' : '') + 'Page: ' + location.pathname + '\n\n' + transcript(),
        slot_date: new Date().toDateString(),
        slot_time: new Date().toTimeString().slice(0, 5)
      };
      fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json().catch(function () { return {}; }); })
        .then(function () {
          f.remove();
          addMessage('bot', format('Thanks, **' + name + '**. Your brief is with the studio. They reply every day, Monday to Sunday, 10:00 to 19:00 IST. If it is urgent, WhatsApp is quickest.'));
          addChips(['See the work', 'How do you work?']);
          try { localStorage.setItem('kc_brief_sent', String(Date.now())); } catch (e2) { /* storage unavailable */ }
        })
        .catch(function () {
          btn.disabled = false; btn.innerHTML = 'Send brief' + ICON.arrow;
          err.innerHTML = 'That did not send. Please use <a href="' + waLink('Hi, my name is ' + name + '. ' + f.message.value.trim()) + '" target="_blank" rel="noopener">WhatsApp</a> or <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> instead.';
          err.hidden = false;
        });
    });
  }

  /* ---------- Open, close, send ---------- */
  var isOpen = false;
  function render() {
    log.innerHTML = '';
    log.appendChild(el('div', { class: 'kc-intro' },
      '<p class="kc-intro__title">What are you building?</p>' +
      '<p class="kc-intro__text">Scripted answers on services, pricing, timelines and our work, taken from the studio\u2019s own notes. Anything else goes to the team.</p>'));
    if (!history.length) {
      addChips(GREETING_CHIPS);
    } else {
      history.forEach(function (h) { log.appendChild(entry(h.from, h.html, h.t)); });
      addChips(['Start a project', 'What does it cost?', 'Talk to a person']);
    }
  }
  function open(text) {
    if (isOpen) { if (text) send(text); return; }
    isOpen = true;
    if (!log.childElementCount) render();
    updateStatus();
    panel.classList.add('kc-enter');
    panel.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { panel.classList.remove('kc-enter'); }); });
    root.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Close chat');
    launcher.innerHTML = '<span class="kc-launcher__badge">' + ICON.close + '</span>';
    if (window.matchMedia('(max-width: 560px)').matches) document.documentElement.style.overflow = 'hidden';
    scrollDown();
    /* Phones: focus the panel, not the box, so the keyboard does not cover the questions. */
    var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    setTimeout(function () { (finePointer ? input : panel).focus({ preventScroll: true }); }, 60);
    if (text) send(text);
    try { sessionStorage.setItem('kc_open', '1'); } catch (e) { /* storage unavailable */ }
  }
  function close() {
    if (!isOpen) return;
    isOpen = false;
    panel.hidden = true;
    root.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Open chat with Kawaki Studios');
    launcher.innerHTML = LAUNCH;
    document.documentElement.style.overflow = '';
    launcher.focus({ preventScroll: true });
    try { sessionStorage.removeItem('kc_open'); } catch (e) { /* storage unavailable */ }
  }
  function send(text) {
    text = String(text || '').trim();
    if (!text) return;
    addMessage('user', esc(text).replace(/\n/g, '<br>'));
    reply(text);
  }
  launcher.addEventListener('click', function () { isOpen ? close() : open(); });
  panel.querySelector('[data-close]').addEventListener('click', close);
  panel.querySelector('[data-compose]').addEventListener('submit', function (e) { e.preventDefault(); send(input.value); input.value = ''; input.style.height = ''; });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); input.value = ''; input.style.height = ''; } });
  input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(120, input.scrollHeight) + 'px'; });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
  setInterval(function () { if (isOpen) updateStatus(); }, 30000);

  window.KawakiChat = { open: open, close: close };

  function mount() {
    document.body.appendChild(root);
    try { if (sessionStorage.getItem('kc_open') === '1' && !window.matchMedia('(max-width: 560px)').matches) open(); } catch (e) { /* storage unavailable */ }
    /* The brief popup loads once the page is idle. */
    var loadPopup = function () {
      if (document.getElementById('kawaki-brief-popup-script')) return;
      var s = document.createElement('script');
      s.id = 'kawaki-brief-popup-script';
      s.src = '/assets/js/exit-popup.js?v=' + ASSET_VER;
      s.defer = true;
      document.body.appendChild(s);
    };
    if ('requestIdleCallback' in window) requestIdleCallback(loadPopup, { timeout: 4000 }); else setTimeout(loadPopup, 2500);
  }
  function whenReady() { if (cssReady) mount(); else pendingMount = mount; }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenReady); else whenReady();
})();
