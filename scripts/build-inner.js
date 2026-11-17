/* Kawaki Studios: builds hand-designed inner pages from templates/pages/**.html.
   The head, header, menu, closing section and footer come from scripts/lib/shell.js.

   Template format:
     <!-- @meta { JSON: path, title, description, crumbs, service?, ogImage?, bodyClass? } -->
     <!-- @faq [ { "q": "...", "a": "...", "aHtml"?: "..." } ] -->   optional; rendered at {{FAQ}}
     <!-- @body -->
     ...sections (placed inside <main>, before the shared closing section)...
   Placeholders: {{FAQ}}, {{ARROW}}.

   Usage: node scripts/build-inner.js            (all templates)
          node scripts/build-inner.js services/custom-web-development
*/
const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');

const TPL_DIR = path.join(shell.ROOT, 'templates', 'pages');

function jsonLd(meta, faq) {
  const url = shell.SITE + meta.path;
  const graph = [];
  if (meta.service) {
    graph.push({
      '@type': 'Service', '@id': url + '#service', name: meta.service.name, url,
      description: meta.service.description, serviceType: meta.service.name,
      areaServed: meta.service.areaServed || ['IN', 'Worldwide'],
      provider: { '@type': 'Organization', '@id': shell.SITE + '/#organization', name: 'Kawaki Studios', url: shell.SITE, logo: shell.SITE + '/assets/images/kawaki-logo.png' }
    });
  }
  graph.push(shell.breadcrumbLd(meta.path, meta.crumbs));
  // Extra schema nodes declared in a template's @meta (the About page uses it for the founder).
  if (Array.isArray(meta.ld)) meta.ld.forEach(node => graph.push(node));
  if (faq && faq.length) {
    graph.push({
      '@type': 'FAQPage', '@id': url + '#faq',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/* Client reviews from data/reviews.json: real quotes only, each with where it was posted.
   Entry: { "quote", "name", "role", "company", "source", "sourceUrl" }. Nothing renders while empty. */
function reviewsHtml() {
  const file = path.join(shell.ROOT, 'data', 'reviews.json');
  const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  if (!list.length) return '';
  const e = shell.esc;
  const n = list.length;
  const pad = i => String(i).padStart(2, '0');
  const ARROW_L = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13 8H3.5M7.5 4l-4 4 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ARROW_R = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return `<section class="sec sec--line wrap" aria-labelledby="reviews-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="reviews-title" data-reveal>What clients say</h2>
                <div class="sec-head__aside">
                    <div class="slider__nav">
                        <button type="button" class="slider__btn" data-slider-prev aria-label="Previous review">${ARROW_L}</button>
                        <span class="slider__count" aria-hidden="true"><span data-slider-index>01</span> / ${pad(n)}</span>
                        <button type="button" class="slider__btn" data-slider-next aria-label="Next review">${ARROW_R}</button>
                    </div>
                </div>
            </div>
            <div class="slider" data-slider>
                <ul class="slider__track" data-slider-track data-lenis-prevent-wheel tabindex="0" aria-label="Client reviews, ${n} in total. Use the arrow keys to move between them.">
                ${list.map((r, i) => `<li class="review slide" aria-label="${i + 1} of ${n}">
                    <blockquote class="review__quote"><p>${e(r.quote)}</p></blockquote>
                    <p class="review__by"><span class="review__name">${e(r.name || r.company)}</span><span class="review__meta">${[r.name ? [r.role, r.company].filter(Boolean).join(', ') : '', r.source ? (r.sourceUrl ? `<a href="${e(r.sourceUrl)}" target="_blank" rel="noopener">${e(r.source)}</a>` : e(r.source)) : ''].filter(Boolean).map((x, j) => j === 0 && r.name ? e(x) : x).join(' &middot; ')}</span></p>
                </li>`).join('\n                ')}
                </ul>
                <div class="slider__bar" aria-hidden="true"><span data-slider-bar></span></div>
            </div>
        </section>`;
}

function build(rel) {
  const src = fs.readFileSync(path.join(TPL_DIR, rel + '.html'), 'utf8');
  const metaM = src.match(/<!-- @meta\s*([\s\S]*?)-->/);
  if (!metaM) throw new Error(rel + ': missing @meta');
  const meta = JSON.parse(metaM[1]);
  const faqM = src.match(/<!-- @faq\s*([\s\S]*?)-->/);
  const faq = faqM ? JSON.parse(faqM[1]) : null;
  let main = src.slice(src.indexOf('<!-- @body -->') + '<!-- @body -->'.length);
  if (faq) main = main.replace('{{FAQ}}', shell.faqHtml(faq));
  main = main.replace(/\{\{ARROW\}\}/g, shell.ARROW).replace(/\{\{ROW_GO\}\}/g, shell.ROW_GO);
  if (main.includes('{{REVIEWS}}')) main = main.replace('{{REVIEWS}}', reviewsHtml());
  const left = main.match(/\{\{[A-Z]+\}\}/);
  if (left) throw new Error(rel + ': unfilled placeholder ' + left[0]);

  const v = shell.versions();
  const html = shell.head({ title: meta.title, description: meta.description, path: meta.path, ogImage: meta.ogImage, robots: meta.robots, jsonLd: meta.robots && /noindex/.test(meta.robots) ? null : jsonLd(meta, faq) }, v) +
    shell.body({ path: meta.path, bodyClass: meta.bodyClass, main }, v);

  const visible = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  if (/[—–]/.test(visible)) console.warn(`  ! ${rel}: em or en dash in visible text`);
  const out = path.join(shell.PUB, meta.path.replace(/^\//, '') + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  console.log('  built ' + meta.path);
}

const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(x => x.isDirectory() ? walk(path.join(d, x.name)) : x.name.endsWith('.html') ? [path.join(d, x.name)] : []) : [];
const only = process.argv[2];
const targets = only ? [only] : walk(TPL_DIR).map(f => path.relative(TPL_DIR, f).replace(/\\/g, '/').replace(/\.html$/, ''));
console.log('[build-inner] ' + targets.length + ' page(s)');
targets.forEach(build);
