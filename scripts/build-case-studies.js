/* Kawaki Studios: case study pages and the /case-studies index, from data/case-studies.json,
   on the shared shell. Run: node scripts/build-case-studies.js */
const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');
const S = shell;

const cases = JSON.parse(fs.readFileSync(path.join(S.ROOT, 'data', 'case-studies.json'), 'utf8'));
const reviewsFile = path.join(S.ROOT, 'data', 'reviews.json');
const reviews = fs.existsSync(reviewsFile) ? JSON.parse(fs.readFileSync(reviewsFile, 'utf8')) : [];
/* A client's own words on their case study, when they have approved a quote. */
function quoteBlock(slug) {
  const r = reviews.find(x => x.caseStudy === slug);
  if (!r) return '';
  return `
        <section class="sec wrap" aria-label="What the client said" style="margin-top: var(--space-sec);">
            <figure class="pull">
                <blockquote class="pull__quote">${S.esc(r.quote)}</blockquote>
                <figcaption class="pull__by"><span class="pull__name">${S.esc(r.name || r.company)}</span><span class="pull__meta">${S.esc(r.name ? [r.role, r.company].filter(Boolean).join(', ') : (r.source || ''))}</span></figcaption>
            </figure>
        </section>`;
}
const OUT = path.join(S.PUB, 'case-studies');
const EXT = '<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const row = (href, name, desc) => `<li><a class="row svc" href="${href}"><h3 class="row__name">${S.esc(name)}</h3><span class="svc__desc">${S.esc(desc)}</span>${S.ROW_GO}</a></li>`;

function frame(c, eager) {
  if (!c.frame) return '';
  return `<figure class="case__media browser"${c.clip ? ` data-clip="${c.clip}"` : ''}>
                        <div class="browser__bar"><span class="browser__addr">${S.LOCK}<span>${S.esc(c.domain)}</span></span><span class="browser__load" aria-hidden="true"></span></div>
                        <div class="browser__view">
                            <img src="${c.frame.src}" alt="${S.esc(c.name)}: ${S.esc(c.lede.replace(/\.$/, ''))}" width="${c.frame.w}" height="${c.frame.h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />${c.clip ? '\n                            <video class="case__clip" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>' : ''}
                        </div>
                    </figure>`;
}

function casePage(c, i) {
  const pagePath = `/case-studies/${c.slug}`;
  const url = S.SITE + pagePath;
  const next = cases.slice(i + 1).concat(cases.slice(0, i)).slice(0, 3);
  const specs = [['Client', c.category], c.year && ['Year', c.year], c.stack && ['Built with', c.stack], c.status && ['Status', c.status]].filter(Boolean);
  const actions = (c.live ? `<a class="btn" href="${c.live}" target="_blank" rel="noopener">Visit the live site${EXT}</a>` : '') +
    `<a class="${c.live ? 'draw' : 'btn'}" href="/contact">Start a project${S.ARROW}</a>`;
  const gallery = (c.gallery || []).length ? `
        <section class="sec sec--line wrap" aria-labelledby="gallery-title" style="margin-top: 0;">
            <div class="sec-head grid"><h2 class="h2" id="gallery-title" data-reveal>From the site</h2></div>
            <div class="gallery gallery--${Math.min(c.gallery.length, 3)}">
                ${c.gallery.map(g => `<figure class="gallery__item"><img src="${g.src}" alt="${S.esc(g.caption)}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async" /><figcaption>${S.esc(g.caption)}</figcaption></figure>`).join('\n                ')}
            </div>
        </section>` : '';

  const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([['Case studies', '/case-studies'], [c.name, pagePath]])}
                <div class="phero__row grid">
                    <h1 class="phero__title${c.name.length > 16 ? ' phero__title--long' : ''}" id="page-title">${S.esc(c.name)}<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></h1>
                    <div class="phero__side">
                        <p class="phero__lede">${S.esc(c.lede)}</p>
                        <div class="phero__actions">${actions}</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="wrap case-hero" aria-label="${S.esc(c.name)}">
            ${frame(c, true)}
            <dl class="spec case-hero__spec">
                ${specs.map(([k, v]) => `<div class="spec__row"><dt>${k}</dt><dd class="spec__val">${S.esc(v)}</dd></div>`).join('\n                ')}
            </dl>
        </section>

        <section class="sec sec--line wrap" aria-labelledby="context-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="context-title" data-reveal>The project</h2></div>
            <div class="duo">
                <div class="duo__col"><h3 class="duo__title">The client</h3><p class="duo__text">${S.esc(c.client)}</p></div>
                <div class="duo__col"><h3 class="duo__title">The brief</h3><p class="duo__text">${S.esc(c.brief)}</p></div>
            </div>
        </section>

        <section class="sec sec--line wrap" aria-labelledby="built-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="built-title" data-reveal>What we built</h2></div>
            <ul class="dash dash--cols">
                ${c.built.map(b => `<li>${S.esc(b)}</li>`).join('\n                ')}
            </ul>
        </section>
${quoteBlock(c.slug)}
${gallery}
        <section class="sec sec--line wrap related" aria-labelledby="next-title" style="margin-top: var(--space-sec); padding-bottom: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="next-title" data-reveal>More work</h2><div class="sec-head__aside"><a class="draw" href="/case-studies">All case studies${S.ARROW}</a></div></div>
            <ul class="rows">
                ${next.map(n => row('/case-studies/' + n.slug, n.name, n.lede)).join('\n                ')}
            </ul>
        </section>`;

  const graph = [
    { '@type': 'CreativeWork', '@id': url + '#work', name: `${c.name} case study`, headline: `${c.name}: ${c.lede}`, description: c.metaDescription, url,
      creator: { '@type': 'Organization', '@id': S.SITE + '/#organization', name: 'Kawaki Studios', url: S.SITE },
      image: S.SITE + (c.frame ? c.frame.src : '/assets/images/og-home.jpg') },
    S.breadcrumbLd(pagePath, [['Case studies', '/case-studies'], [c.name, pagePath]])
  ];
  const v = S.versions();
  return S.head({ title: `${c.name} Case Study | Kawaki Studios`, description: c.metaDescription, path: pagePath, ogType: 'article', ogImage: c.frame ? S.SITE + c.frame.src : null, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, v) +
    S.body({ path: pagePath, main }, v);
}

function indexPage() {
  const pagePath = '/case-studies';
  const framed = cases.filter(c => c.frame);
  const plain = cases.filter(c => !c.frame);
  const item = (c, i) => `<li class="case${i % 2 ? ' case--flip' : ''} grid">
                    ${frame(c, i === 0)}
                    <div class="case__body">
                        <p class="case__meta"><span>${S.esc(c.category)}</span>${c.status ? `<span>${S.esc(c.status)}</span>` : ''}</p>
                        <h2 class="case__title"><a href="/case-studies/${c.slug}">${S.esc(c.name)}</a></h2>
                        <p class="case__desc">${S.esc(c.lede)}</p>
                        <span class="case__cta" aria-hidden="true">Read the case study<svg viewBox="0 0 16 16"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    </div>
                </li>`;
  const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([['Case studies', pagePath]])}
                <div class="phero__row grid">
                    <h1 class="phero__title" id="page-title"><span class="hl">Case studies<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></span></h1>
                    <div class="phero__side"><p class="phero__lede"><b>${cases.length} projects,</b> from portfolio sites and Shopify stores to school portals, booking apps and our own products. Each one has the brief and what we built.</p></div>
                </div>
            </div>
        </section>

        <section class="work wrap" aria-label="Projects" style="border-top: 0; padding-top: clamp(40px, 6vw, 80px);">
            <ul class="cases">
                ${framed.map(item).join('\n                ')}
            </ul>
        </section>
${plain.length ? `
        <section class="sec sec--line wrap related" aria-labelledby="concepts-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="concepts-title" data-reveal>Concepts</h2></div>
            <ul class="rows">
                ${plain.map(c => row('/case-studies/' + c.slug, c.name, c.lede)).join('\n                ')}
            </ul>
        </section>` : ''}
        <div style="height: var(--space-sec);"></div>`;
  const graph = [
    { '@type': 'CollectionPage', '@id': S.SITE + pagePath + '#page', name: 'Case studies', url: S.SITE + pagePath,
      hasPart: cases.map(c => ({ '@type': 'CreativeWork', name: c.name, url: S.SITE + '/case-studies/' + c.slug })) },
    S.breadcrumbLd(pagePath, [['Case studies', pagePath]])
  ];
  const v = S.versions();
  return S.head({ title: 'Case Studies | Kawaki Studios', description: 'Websites, Shopify stores, web apps and mobile apps built by Kawaki Studios, each with the brief and what we built: Kala Design Co., BAZZARO, NextSchool ERP and more.', path: pagePath, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, v) +
    S.body({ path: pagePath, main }, v);
}

cases.forEach((c, i) => fs.writeFileSync(path.join(OUT, c.slug + '.html'), casePage(c, i), 'utf8'));
fs.writeFileSync(path.join(S.PUB, 'case-studies.html'), indexPage(), 'utf8');
console.log(`[build-case-studies] ${cases.length} case studies and the index`);
