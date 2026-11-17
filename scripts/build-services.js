/* Kawaki Studios: the main service pages under /services/, from data/services.json,
   in the layout approved on /services/custom-web-development (which has its own template).
   Run: node scripts/build-services.js */
const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');
const { glance } = require('./lib/glance');
const S = shell;

const services = JSON.parse(fs.readFileSync(path.join(S.ROOT, 'data', 'services.json'), 'utf8'));
const cases = JSON.parse(fs.readFileSync(path.join(S.ROOT, 'data', 'case-studies.json'), 'utf8'));
const caseBy = Object.fromEntries(cases.map(c => [c.slug, c]));
const e = S.esc;

const row = (href, name, desc) => `<li><a class="row svc" href="${href}"><h3 class="row__name">${e(name)}</h3><span class="svc__desc">${e(desc)}</span>${S.ROW_GO}</a></li>`;

function caseItem(c, i) {
  const frame = c.frame ? `<figure class="case__media browser"${c.clip ? ` data-clip="${c.clip}"` : ''}>
                        <div class="browser__bar"><span class="browser__addr">${S.LOCK}<span>${e(c.domain)}</span></span><span class="browser__load" aria-hidden="true"></span></div>
                        <div class="browser__view">
                            <img src="${c.frame.src}" alt="${e(c.name)}: ${e(c.lede.replace(/\.$/, ''))}" width="${c.frame.w}" height="${c.frame.h}" loading="lazy" decoding="async" />${c.clip ? '\n                            <video class="case__clip" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>' : ''}
                        </div>
                    </figure>` : '';
  return `<li class="case${i % 2 ? ' case--flip' : ''} grid">
                    ${frame}
                    <div class="case__body">
                        <p class="case__meta"><span>${e(c.category)}</span></p>
                        <h3 class="case__title"><a href="/case-studies/${c.slug}">${e(c.name)}</a></h3>
                        <p class="case__desc">${e(c.lede)}</p>
                        <span class="case__cta" aria-hidden="true">Read the case study<svg viewBox="0 0 16 16"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    </div>
                </li>`;
}

function page(s) {
  const pagePath = `/services/${s.slug}`;
  const url = S.SITE + pagePath;
  const words = s.name.split(' ');
  const cut = Math.ceil(words.length / 2);
  const h1 = `<span class="hl">${e(words.slice(0, cut).join(' '))}</span>
                        <span class="hl">${e(words.slice(cut).join(' '))}<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></span>`;
  const work = (s.work || []).map(slug => caseBy[slug]).filter(Boolean);
  const faq = s.faq.map(([q, a]) => ({ q, a }));
  const n = Math.min(6, Math.max(3, s.steps.length));

  const at = glance({ name: s.name.toLowerCase(), slug: s.slug });
  const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([['Services', '/services'], [s.name, pagePath]])}
                <div class="phero__row grid">
                    <h1 class="phero__title${s.name.length > 26 ? ' phero__title--long' : ''}" id="page-title">
                        ${h1}
                    </h1>
                    <div class="phero__side">
                        <p class="phero__lede">${e(s.lede)}</p>
                        <div class="phero__actions">
                            <a class="btn" href="/contact?service=${s.slug}">Start a project${S.ARROW}</a>
                            <a class="draw" href="${work.length ? '#work' : '#process'}">${work.length ? 'See the work' : 'How it works'}${S.ARROW_DOWN}</a>
                        </div>
                    </div>
                </div>
            </div>
            ${S.strip(s.strip, `${s.name}. What goes in: ${s.strip.filter(x => x[0] === 'kept').map(x => x[1]).join(', ')}. What stays out: ${s.strip.filter(x => x[0] === 'cut').map(x => x[1]).join(', ')}.`)}
        </section>

        ${at.html}

        <section class="sec wrap" id="scope" aria-labelledby="scope-title">
            <div class="sec-head grid">
                <h2 class="h2" id="scope-title" data-reveal>${e(s.intro.title)}</h2>
                <div class="sec-head__aside"><p>${e(s.intro.aside)}</p></div>
            </div>
            <div class="duo">
                ${s.intro.cols.map(c => `<div class="duo__col">
                    <h3 class="duo__title">${e(c.title)}</h3>
                    <p class="duo__note">${e(c.note)}</p>
                    <ul class="dash">
                        ${c.items.map(it => `<li>${e(it)}</li>`).join('\n                        ')}
                    </ul>
                </div>`).join('\n                ')}
            </div>
        </section>
${work.length ? `
        <section class="work wrap" id="work" aria-labelledby="work-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="work-title" data-reveal>${e(s.workTitle)}</h2>
                <div class="sec-head__aside"><p>${e(s.workAside)}</p><a class="draw" href="/case-studies">All case studies${S.ARROW}</a></div>
            </div>
            <ul class="cases">
                ${work.map(caseItem).join('\n                ')}
            </ul>
        </section>
` : ''}
        <section class="process wrap" id="process" aria-labelledby="process-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="process-title" data-reveal>${e(s.stepsTitle)}</h2>
                <div class="sec-head__aside"><p>${e(s.stepsAside)}</p></div>
            </div>
            <ol class="steps steps--${n}" data-steps>
                ${s.steps.map(([t, d], i) => `<li class="step"><span class="step__n">${String(i + 1).padStart(2, '0')}</span><h3>${e(t)}</h3><p>${e(d)}</p></li>`).join('\n                ')}
                <li class="steps__path" aria-hidden="true" role="presentation"></li>
            </ol>
        </section>

        <section class="sec sec--line wrap" id="stack" aria-labelledby="stack-title" style="margin-top: 0;">
            <div class="sec-head grid">
                <h2 class="h2" id="stack-title" data-reveal>${e(s.specTitle)}</h2>
                <div class="sec-head__aside"><p>${e(s.specAside)}</p></div>
            </div>
            <dl class="spec">
                ${s.spec.map(([k, v, note]) => `<div class="spec__row"><dt>${e(k)}</dt><dd class="spec__val">${e(v)}</dd><dd class="spec__note">${e(note)}</dd></div>`).join('\n                ')}
            </dl>
        </section>

        <section class="faq wrap" id="faq" aria-labelledby="faq-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="faq-title" data-reveal>${e(s.name)} questions</h2>
                <div class="sec-head__aside">
                    <p>Something else? Ask the developers who would do the work.</p>
                    <a class="draw" href="https://wa.me/917678123943?text=${encodeURIComponent('Hi Kunal, I have a question about ' + s.name.toLowerCase())}" target="_blank" rel="noopener">WhatsApp the studio</a>
                </div>
            </div>
            <div class="faq__list">
                ${S.faqHtml(faq)}
            </div>
        </section>

        <section class="sec wrap related" aria-labelledby="related-title" style="padding-bottom: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="related-title" data-reveal>Related services</h2>
                <div class="sec-head__aside"><a class="draw" href="/services">All services${S.ARROW}</a></div>
            </div>
            <ul class="rows">
                ${s.related.map(([href, name, desc]) => row(href, name, desc)).join('\n                ')}
            </ul>
        </section>`;

  const graph = [
    { '@type': 'Service', '@id': url + '#service', name: s.name, url, description: s.description, serviceType: s.name, areaServed: at.ld.areaServed, ...(at.ld.offers ? { offers: at.ld.offers } : {}),
      provider: { '@type': 'Organization', '@id': S.SITE + '/#organization', name: 'Kawaki Studios', url: S.SITE, logo: S.SITE + '/assets/images/kawaki-logo.png' } },
    S.breadcrumbLd(pagePath, [['Services', '/services'], [s.name, pagePath]]),
    { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  ];
  const v = S.versions();
  return S.head({ title: s.title, description: s.description, path: pagePath, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, v) +
    S.body({ path: pagePath, main }, v);
}

for (const s of services) {
  const html = page(s);
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '');
  if (/[—–]/.test(visible)) console.warn('  ! ' + s.slug + ': em or en dash in visible text');
  fs.writeFileSync(path.join(S.PUB, 'services', s.slug + '.html'), html, 'utf8');
}
console.log(`[build-services] ${services.length} service pages`);
