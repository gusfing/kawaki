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
  return `<section class="sec sec--line wrap" aria-labelledby="reviews-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="reviews-title" data-reveal>What clients say</h2></div>
            <ul class="reviews">
                ${list.map(r => `<li class="review">
                    <blockquote class="review__quote"><p>${e(r.quote)}</p></blockquote>
                    <p class="review__by"><span class="review__name">${e(r.name)}</span><span class="review__meta">${e([r.role, r.company].filter(Boolean).join(', '))}${r.source ? ` &middot; ${r.sourceUrl ? `<a href="${e(r.sourceUrl)}" target="_blank" rel="noopener">${e(r.source)}</a>` : e(r.source)}` : ''}</span></p>
                </li>`).join('\n                ')}
            </ul>
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
  main = main.replace(/\{\{ARROW\}\}/g, shell.ARROW);
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
