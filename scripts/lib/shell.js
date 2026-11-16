/* Kawaki Studios: the shared page shell.
   One source for the <head>, header, menu, closing section, footer and scripts of every
   page on the new design. The header, menu, closing section and footer are cut from the
   homepage template (templates/home/home-body.html), so a change there reaches every page
   on the next build. Used by scripts/build-inner.js and scripts/build-seo-pages.js. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const PUB = path.join(ROOT, 'public');
const SITE = 'https://kawaki.co.in';
const HOME = fs.readFileSync(path.join(ROOT, 'templates', 'home', 'home-body.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const between = (s, a, b, inclusive = true) => {
  const i = s.indexOf(a); if (i < 0) throw new Error('shell: start not found: ' + a.slice(0, 40));
  const j = s.indexOf(b, i); if (j < 0) throw new Error('shell: end not found: ' + b.slice(0, 40));
  return inclusive ? s.slice(i, j + b.length) : s.slice(i, j);
};
const ver = rel => crypto.createHash('sha1').update(fs.readFileSync(path.join(PUB, rel))).digest('hex').slice(0, 10);
const versions = () => ({ siteCss: ver('assets/css/site.css'), siteJs: ver('assets/js/site.js'), chatCss: ver('assets/css/chatbot.css'), chatJs: ver('assets/js/chatbot.js') });

const SHELL_TOP = between(HOME, '<a class="skip"', '<main id="main"', false).trimEnd();
const FINALE = between(HOME, '<section class="finale"', '</section>');
const FOOTER = between(HOME, '<footer class="site-foot wrap">', '</footer>');
const ARROW = '<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW_DOWN = '<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 4.5l7 7M11.5 5.5v6h-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ROW_GO = '<svg class="row__go" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const LOCK = '<svg class="browser__lock" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 7V5.2a3.5 3.5 0 0 1 7 0V7M3.5 7h9v6.5h-9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const ASTERISK = '<svg viewBox="0 0 40 40" focusable="false"><path d="M20 6v28M8 13l24 14M8 27l24-14" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>';

const CLARITY = `<script>
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "yyqy7vt939");
    </script>`;

/* The menu marks the section this page belongs to. */
function shellTop(pagePath) {
  let s = SHELL_TOP.replace(' aria-current="page"', '');
  const section = '/' + (pagePath.split('/')[1] || '');
  if (section !== '/') {
    const re = new RegExp('<a href="' + section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '">(<span class="menu-text">)');
    s = s.replace(re, '<a href="' + section + '" aria-current="page">$1');
  }
  return s;
}

/* Full <head>. jsonLd is an object (rendered as an @graph) or null. */
function head({ title, description, path: pagePath, ogType = 'website', ogImage, jsonLd, robots }, v) {
  const url = SITE + (pagePath === '/' ? '' : pagePath);
  const og = ogImage || SITE + '/assets/images/og-home.jpg';
  const ld = jsonLd ? `\n    <script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2).replace(/\n/g, '\n    ')}\n    </script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="${robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="Kawaki Studios" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:image" content="${og}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${og}" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />${ld}
    <meta name="theme-color" content="#23003F" />
    <link rel="preload" href="/assets/fonts/bricolage-display.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/fonts/bricolage-text.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/assets/css/site.css?v=${v.siteCss}" />
    <script>document.documentElement.classList.add('js');</script>
    ${CLARITY}
</head>
`;
}

/* <body> through </html>, around the page's own sections. */
function body({ path: pagePath, bodyClass = 'inner', main }, v) {
  return `<body class="${bodyClass}">
    ${shellTop(pagePath)}

    <main id="main" tabindex="-1">
        ${main.trim()}

        ${FINALE}
    </main>

    ${FOOTER}

    <script src="/assets/js/vendor/gsap-3.15.0.min.js" defer></script>
    <script src="/assets/js/vendor/ScrollTrigger-3.15.0.min.js" defer></script>
    <script src="/assets/js/vendor/lenis-1.3.25.min.js" defer></script>
    <script src="/assets/js/main.js?v=20260902_luxury_v6" defer></script>
    <script src="/assets/js/chatbot.js?v=${v.chatJs}" data-css-v="${v.chatCss}" defer></script>
    <script src="/assets/js/site.js?v=${v.siteJs}" defer></script>
</body>
</html>
`;
}

function faqHtml(faq) {
  return faq.map((f, i) => {
    const n = i + 1;
    return `<div class="faq__item"><h3 class="faq__q"><button type="button" id="faq-q${n}" aria-expanded="true" aria-controls="faq-a${n}">` +
      `<span class="faq__q-text">${esc(f.q)}</span><span class="faq__icon" aria-hidden="true"></span></button></h3>` +
      `<div class="faq__a" id="faq-a${n}" role="region" aria-labelledby="faq-q${n}"><p>${f.aHtml || esc(f.a)}</p></div></div>`;
  }).join('\n                ');
}

function crumbsHtml(crumbs) {
  const items = [['Home', '/']].concat(crumbs);
  return '<ol class="crumbs" aria-label="Breadcrumb">' + items.map(([name, href], i) =>
    i === items.length - 1 ? `<li><span aria-current="page">${esc(name)}</span></li>` : `<li><a href="${href}">${esc(name)}</a></li>`).join('') + '</ol>';
}

function breadcrumbLd(pagePath, crumbs) {
  const url = SITE + pagePath;
  return {
    '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs',
    itemListElement: [['Home', '/']].concat(crumbs).map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + (p === '/' ? '' : p) }))
  };
}

/* The struck/kept keyword strip from the homepage, with any items. */
function strip(items, srText) {
  const group = items.map(([kind, text]) => kind === 'cut'
    ? `<span class="strip__item strip__item--cut">${esc(text)}</span><span class="strip__sep"><span class="strip__arrow"></span></span>`
    : `<span class="strip__item">${esc(text)}</span><span class="strip__sep">&#10035;</span>`).join('');
  return `<div class="ticker ticker--strip" data-ticker>
                <span class="sr-only">${esc(srText)}</span>
                <div class="ticker__viewport"><div class="ticker__track" data-track aria-hidden="true"><div class="ticker__group">${group}</div><div class="ticker__group">${group}</div></div></div>
                <button type="button" class="ticker__toggle" data-ticker-toggle aria-pressed="false" aria-label="Pause ticker" hidden>Pause</button>
            </div>`;
}

module.exports = { SITE, ROOT, PUB, esc, ver, versions, head, body, shellTop, faqHtml, crumbsHtml, breadcrumbLd, strip, ARROW, ARROW_DOWN, ROW_GO, LOCK, ASTERISK, FINALE, FOOTER };
