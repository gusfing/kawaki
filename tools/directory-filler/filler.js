/* Kawaki Directory Filler: the page-filling function.
   fillPage() is injected into the open page (every frame) by the popup or the keyboard shortcut. It must stay
   self-contained: it runs in the page, so it cannot use anything outside this function.

   What it does: fills text fields and dropdowns whose label, name, placeholder or autocomplete text matches a profile field.
   What it never does: touch passwords, CAPTCHAs, verification codes, checkboxes, radio buttons, file inputs or buttons,
   and it never submits a form. You check the page and press submit yourself. */
function fillPage(profile, options) {
  options = options || {};
  const overwrite = !!options.overwrite;
  const filled = [];
  const skipped = [];

  const visible = el => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const clean = s => String(s || '').replace(/\s+/g, ' ').trim();

  function labelText(el) {
    const parts = [];
    if (el.labels && el.labels.length) Array.from(el.labels).forEach(l => parts.push(l.innerText));
    const by = el.getAttribute('aria-labelledby');
    if (by) by.split(/\s+/).forEach(id => { const n = document.getElementById(id); if (n) parts.push(n.innerText); });
    parts.push(el.getAttribute('aria-label'), el.placeholder, el.name, el.id, el.title, el.getAttribute('autocomplete'), el.getAttribute('data-label'));
    // Text just before the field, for forms that use a plain heading or div instead of a label.
    // Only when the field says nothing about itself, and never text that belongs to another field.
    const selfDescribed = (el.labels && el.labels.length) || el.placeholder || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
    if (!selfDescribed) {
      const prev = el.previousElementSibling;
      if (prev && !/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(prev.tagName) && !prev.querySelector('input,select,textarea') && prev.innerText && prev.innerText.length < 80) parts.push(prev.innerText);
      const wrap = el.closest('div,p,li,td,fieldset');
      if (wrap && wrap.querySelectorAll('input,select,textarea').length === 1) {
        const first = wrap.querySelector('label,legend,.label,[class*=label],[class*=Label]');
        if (first && first.innerText && first.innerText.length < 80) parts.push(first.innerText);
      }
    }
    return clean(parts.filter(Boolean).join(' ')).toLowerCase();
  }

  // Never touched: secrets, anti-bot fields, codes.
  const FORBIDDEN = /password|passwd|captcha|recaptcha|turnstile|altcha|hcaptcha|\botp\b|verification|verify|security code|one[- ]time|confirm (email|password)|username|user name|login|coupon|promo|referr/;

  // Order matters: the first rule that matches wins, so specific rules come before general ones.
  const RULES = [
    ['linkedin', /linkedin/], ['instagram', /instagram/], ['twitter', /twitter|\bx\.com|x profile/], ['facebook', /facebook|\bfb\b/],
    ['logoUrl', /logo|image url|photo url|banner/],
    ['googleMaps', /google (maps|business|my business)|maps url|map link/],
    ['email', /e-?mail/],
    ['postcode', /zip|pin ?code|postal|post code/],
    ['phone', /phone|mobile|whatsapp|telephone|contact (no|number)|\btel\b/],
    ['website', /web ?site|\burl\b|site address|homepage|web address|\blink\b/],
    ['firstName', /first ?name|fname|given name/],
    ['lastName', /last ?name|surname|lname|family name/],
    ['legalName', /legal name|registered name|registered company/],
    ['businessName', /(business|company|organi[sz]ation|firm|agency|studio|listing|brand|store|shop) ?name|name of (the )?(business|company|organi[sz]ation)|^company$|^business$/],
    ['contactName', /(contact|owner|your|full|person|author|submitter|applicant|representative)( person)? ?name|^name$|^name\b/],
    ['jobTitle', /job title|designation|position|role/],
    ['city', /\bcity\b|town|locality/],
    ['state', /\bstate\b|province|region/],
    ['country', /country|nation/],
    ['street', /address|street|location/],
    ['founded', /year (founded|established|started|of establishment)|established|founded|\bsince\b/],
    ['hours', /hours|timings?|opening/],
    ['tagline', /tagline|slogan|headline|short title/],
    ['keywords', /keyword|\btags?\b|meta/],
    ['category', /categor|industry|business type|type of business|service type|sector|niche/],
    ['description', /description|about|summary|details|overview|bio\b|profile text|company profile|tell us|message|services? offered|what you do/]
  ];

  function pickDescription(el) {
    const max = el.maxLength > 0 ? el.maxLength : 0;
    if (max && max <= 170) return profile.descriptionShort;
    if (max && max <= 340) return profile.descriptionMedium;
    if (el.tagName === 'TEXTAREA' || max > 340 || !max && el.tagName === 'TEXTAREA') return profile.descriptionLong;
    return profile.descriptionShort;
  }
  function fit(value, el) {
    const max = el.maxLength > 0 ? el.maxLength : 0;
    return max && value.length > max ? value.slice(0, max - 1).replace(/\s+\S*$/, '') : value;
  }

  function setValue(el, value) {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    el.focus();
    setter.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  }
  function setSelect(el, wanted) {
    const words = clean(wanted).toLowerCase().split(/[,;]| and /).map(s => s.trim()).filter(Boolean);
    let best = null, bestScore = 0;
    Array.from(el.options).forEach(o => {
      const t = clean(o.text).toLowerCase();
      if (!t || /^(select|choose|please|--)/.test(t) || o.disabled) return;
      let score = 0;
      words.forEach(w => { if (t === w) score += 5; else if (t.includes(w)) score += 3; else if (w.includes(t) && t.length > 3) score += 2; });
      if (score > bestScore) { bestScore = score; best = o; }
    });
    if (!best) return false;
    el.value = best.value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return clean(best.text);
  }
  function mark(el) {
    el.style.outline = '2px solid #F94500';
    el.style.outlineOffset = '2px';
  }

  /* ---------- Content mode: an article or a project instead of the business profile ---------- */
  if (options.content) {
    const { kind, item } = options.content;
    const CRULES = [
      ['canonical', /canonical|original (url|link|source|post)|source (url|link)|republish|originally/],
      ['cover', /cover|thumbnail|featured image|header image|banner|image url/],
      ['summary', /sub-?title|excerpt|summary|short description|tagline|teaser|one[- ]line|standfirst|\blede\b|seo description|meta description/],
      ['tags', /\btags?\b|keywords?|skills?|\btools?\b|technolog|\bstack\b/],
      ['category', /categor|industry|\bfield\b|type of project|project type|topic|niche|sector/],
      ['year', /\byear\b|completed|completion|project date/],
      ['link', /project (url|link)|live (url|link|site)|website|\burl\b|\blink\b|demo/],
      ['role', /\brole\b|your role|contribution|services provided/],
      ['client', /\bclient\b|brand name|company name/],
      ['title', /title|headline|project name|^name$/],
      ['body', /description|body|content|story|about|details|write|article|\btext\b|overview|what you did|process|challenge/]
    ];
    const sourceLine = options.sourceLine !== false && kind === 'article' ? '\n\nOriginally published on kawaki.co.in: ' + item.url : '';
    const values = kind === 'article'
      ? { title: item.title, summary: item.excerpt, tags: (item.tags || []).slice(0, 5).join(', '), category: (item.tags || [])[0] || '', canonical: item.url, link: item.url, cover: item.cover, year: (item.date || '').slice(0, 4) }
      : { title: item.name, summary: item.summary, tags: (item.tags || []).join(', '), category: item.category, year: item.year, link: item.liveUrl || item.pageUrl, canonical: item.pageUrl, cover: (item.images || [])[0] || '', role: 'Design and development', client: item.name };
    const rich = el => el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA';
    const cands = Array.from(document.querySelectorAll('input,textarea,[contenteditable=""],[contenteditable="true"]')).filter(el => {
      if (el.disabled || el.readOnly || !visible(el)) return false;
      if (el.tagName === 'INPUT' && !/^(text|url|search|)$/i.test(el.type)) return false;
      if (rich(el) && el.parentElement && el.parentElement.isContentEditable) return false; // only the outermost editor
      return true;
    });
    const used = new Set();
    let bodyBest = null, bodyArea = 0;
    cands.forEach(el => {
      const label = (rich(el) ? clean([el.getAttribute('data-placeholder'), el.getAttribute('placeholder'), el.getAttribute('aria-label'), el.getAttribute('aria-placeholder'), el.getAttribute('data-label')].filter(Boolean).join(' ')).toLowerCase() : '') || labelText(el);
      if (FORBIDDEN.test(label)) return;
      const rule = CRULES.find(r => r[1].test(label));
      const shown = clean(label).slice(0, 40) || 'editor';
      if (!rule) { if (el.tagName === 'TEXTAREA' || rich(el)) { const r = el.getBoundingClientRect(); if (r.width * r.height > bodyArea && !/^(comment|message)/.test(label)) { /* unlabelled big box: a body candidate */ } } return; }
      if (rule[0] === 'body') {
        const r = el.getBoundingClientRect();
        if ((el.tagName === 'TEXTAREA' || rich(el) || el.maxLength > 340) && r.width * r.height > bodyArea) { bodyArea = r.width * r.height; bodyBest = { el, shown }; }
        return;
      }
      const v = values[rule[0]];
      if (!v) return;
      if (!overwrite && !rich(el) && clean(el.value)) return;
      if (rich(el)) { el.focus(); document.execCommand('selectAll', false); document.execCommand('insertText', false, String(v)); }
      else setValue(el, fit(String(v), el));
      mark(el); used.add(el); filled.push(shown + ' (' + rule[0] + ')');
    });
    // The biggest text area or editor that was not used for anything else takes the body, even when it has no label.
    if (!bodyBest) {
      let best = null, area = 0;
      cands.forEach(el => { if (used.has(el)) return; if (!(el.tagName === 'TEXTAREA' || rich(el))) return; const r = el.getBoundingClientRect(); if (r.width * r.height > area && r.height > 90) { area = r.width * r.height; best = el; } });
      if (best) bodyBest = { el: best, shown: 'main text box' };
    }
    if (bodyBest) {
      const el = bodyBest.el;
      if (rich(el)) {
        el.focus();
        document.execCommand('selectAll', false);
        if (kind === 'article' && item.html && options.format !== 'text') document.execCommand('insertHTML', false, item.html + (sourceLine ? '<p>Originally published on kawaki.co.in: <a href="' + item.url + '">' + item.url + '</a></p>' : ''));
        else document.execCommand('insertText', false, (kind === 'article' ? item.plain : item.description) + sourceLine);
      } else {
        const text = kind === 'article' ? (options.format === 'text' ? item.plain : item.markdown) + sourceLine : item.description;
        setValue(el, fit(text, el));
      }
      mark(el);
      filled.push(bodyBest.shown + ' (' + (kind === 'article' ? 'article text' : 'description') + ')');
    } else skipped.push('No large text box found. Use Copy.');
    return { filled, skipped, url: location.href, frame: window === window.top ? 'page' : 'frame' };
  }

  const fields = Array.from(document.querySelectorAll('input,textarea,select')).filter(el => {
    if (el.disabled || el.readOnly) return false;
    if (el.tagName === 'INPUT' && /^(hidden|password|checkbox|radio|file|submit|button|reset|image|range|color|date|datetime-local|month|week|time|number)$/i.test(el.type)) return false;
    return visible(el);
  });

  fields.forEach(el => {
    const label = labelText(el);
    const shown = clean((el.labels && el.labels[0] && el.labels[0].innerText) || el.placeholder || el.name || el.id || el.getAttribute('aria-label') || 'field').slice(0, 40);
    if (FORBIDDEN.test(label)) { skipped.push(shown + ' (left alone)'); return; }
    if (!overwrite && el.tagName !== 'SELECT' && clean(el.value)) return; // already has something
    const type = (el.type || '').toLowerCase();
    let key = null;
    if (type === 'email') key = 'email';
    else if (type === 'tel') key = 'phone';
    else if (type === 'url') key = RULES.slice(0, 4).find(r => r[1].test(label)) ? RULES.find(r => r[1].test(label))[0] : 'website';
    else {
      const rule = RULES.find(r => r[1].test(label));
      key = rule ? rule[0] : null;
    }
    if (!key) { if (el.tagName !== 'SELECT' || !clean(el.value)) skipped.push(shown); return; }

    if (el.tagName === 'SELECT') {
      const source = key === 'category' ? (profile.categoryKeywords + ',' + profile.category) : key === 'country' ? profile.country : key === 'state' ? profile.state : key === 'city' ? profile.city : key === 'founded' ? profile.founded : null;
      if (!source) { skipped.push(shown); return; }
      const picked = setSelect(el, source);
      if (picked) { mark(el); filled.push(shown + ' = ' + picked); } else skipped.push(shown + ' (no matching option)');
      return;
    }
    let value = key === 'description' ? pickDescription(el) : profile[key];
    if (key === 'phone' && /\+91|country code|international/.test(label)) value = profile.phone;
    else if (key === 'phone') value = el.maxLength > 0 && el.maxLength <= 11 ? profile.phoneLocal.replace(/\D/g, '').slice(-10) : profile.phone;
    if (!value) { skipped.push(shown + ' (profile is empty)'); return; }
    setValue(el, fit(String(value), el));
    mark(el);
    filled.push(shown);
  });

  return { filled, skipped, url: location.href, frame: window === window.top ? 'page' : 'frame' };
}

/* Attaches images to the first file input on the page (or a drop zone's hidden input). Used by "Attach images".
   files: [{ name, type, b64 }]. Self-contained. It only sets the files; you still press upload or submit. */
function attachImages(files) {
  const inputs = Array.from(document.querySelectorAll('input[type=file]')).filter(i => !i.disabled && (!i.accept || /image|\*/.test(i.accept) || !i.accept));
  if (!inputs.length) return { attached: 0, error: 'No file upload box found on this page. Click the site\'s upload area first, then try again.' };
  const input = inputs.find(i => i.getBoundingClientRect().width > 0) || inputs[0];
  const dt = new DataTransfer();
  const list = input.multiple ? files : files.slice(0, 1);
  list.forEach(f => {
    const bin = atob(f.b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    dt.items.add(new File([bytes], f.name, { type: f.type }));
  });
  input.files = dt.files;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return { attached: list.length, multiple: input.multiple };
}
