/* Kawaki Studios: the HTML site directory (/directory), on the shared shell.
   Lists every page: studio pages, services by subject, industries, solutions, guides,
   cities, case studies and articles. /sitemap redirects here (vercel.json). */
const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');
const { groupOf } = require('./lib/service-copy');
const S = shell;

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const seoPages = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'seo-pages.json'), 'utf8'));

console.log('⚡ [Build Directory] Writing the site directory...');

const short = d => {
  const s = String(d || '').replace(/\s+/g, ' ').trim().split(/(?<=\.)\s/)[0];
  return s.length > 110 ? s.slice(0, s.lastIndexOf(' ', 104)) + '…' : s;
};
const titleOf = file => {
  const html = fs.readFileSync(file, 'utf8');
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
  const t = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const clean = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/&amp;/g, '&').trim();
  const fromTitle = clean(t).replace(/\s*[|—-]\s*Kawaki Studios.*$/i, '');
  const fromH1 = h1 ? clean(h1) : '';
  return { title: fromTitle || fromH1, desc: (html.match(/<meta name="description"\s+content="([^"]*)"/i) || [])[1] || '' };
};

/* Studio pages */
const studio = [
  ['/', 'Home', 'Custom websites and web apps, designed and coded in New Delhi.'],
  ['/about', 'About the studio', 'Who we are and how we work.'],
  ['/services', 'Services', 'Everything we design, build and fix.'],
  ['/case-studies', 'Case studies', 'Live sites and web apps we built, with the details.'],
  ['/pricing', 'Pricing', 'Typical ranges and how milestone billing works.'],
  ['/blog', 'Blog', 'Engineering notes from the studio.'],
  ['/contact', 'Contact', 'Send a brief, message on WhatsApp or book a call.'],
  ['/locations', 'Where we work', 'Cities we work with, from New Delhi.'],
  ['/industries', 'Industries', 'The industries we build for.'],
  ['/resources', 'Guides', 'Longer guides on SEO, AI search and web projects.'],
  ['/privacy-policy', 'Privacy policy', 'What we collect and how to have it changed or deleted.'],
  ['/terms-of-service', 'Terms of service', 'The rules for using this website.']
].map(([url, title, desc]) => ({ url, title, desc }));

/* Flagship service pages (hand-built, under /services/) */
const flagship = fs.readdirSync(path.join(publicDir, 'services')).filter(f => f.endsWith('.html')).sort()
  .map(f => ({ url: '/services/' + f.replace(/\.html$/, ''), ...titleOf(path.join(publicDir, 'services', f)) }))
  .map(p => ({ url: p.url, title: p.title, desc: short(p.desc) }));

/* Registry pages, grouped */
const LABELS = { webdev: 'Web builds', automation: 'Automation', agents: 'AI agents', aisearch: 'AI search', seo: 'SEO', local: 'Local SEO', security: 'Security and recovery', marketing: 'Content and growth', reddit: 'Reddit' };
const serviceGroups = {};
const industries = [], solutions = [], guides = [], cities = {};
const item = e => ({ url: e.kawakiUrl, title: e.h1 || e.title, desc: short(e.metaDescription) });
for (const e of seoPages) {
  const u = e.kawakiUrl;
  if (studio.some(s => s.url === u) || u.startsWith('/services/') || u.startsWith('/case-studies/')) continue;
  if (e.pageType === 'industry') industries.push(item(e));
  else if (e.pageType === 'solution') solutions.push(item(e));
  else if (e.pageType === 'resource') guides.push(item(e));
  else if (e.location) (cities[e.location] = cities[e.location] || []).push(item(e));
  else if (['service', 'technology'].includes(e.pageType)) {
    const g = LABELS[groupOf(u.replace(/^\//, ''))] || 'Other services';
    (serviceGroups[g] = serviceGroups[g] || []).push(item(e));
  }
}
/* Mobile app city pages (built by generate-mobile-app-regional.js) */
for (const [city, slug] of [['Delhi', 'delhi'], ['Bangalore', 'bangalore'], ['Gurgaon', 'gurgaon'], ['Mumbai', 'mumbai']]) {
  const f = path.join(publicDir, slug, 'mobile-app-development-company.html');
  if (!fs.existsSync(f)) continue;
  const t = titleOf(f);
  (cities[city] = cities[city] || []).push({ url: `/${slug}/mobile-app-development-company`, title: t.title, desc: short(t.desc) });
}

/* Case studies, from the files that exist */
const caseStudies = fs.readdirSync(path.join(publicDir, 'case-studies')).filter(f => f.endsWith('.html')).sort()
  .map(f => { const t = titleOf(path.join(publicDir, 'case-studies', f)); return { url: '/case-studies/' + f.replace(/\.html$/, ''), title: t.title, desc: short(t.desc) }; });

/* Articles, from the blog index */
const blogHtml = fs.existsSync(path.join(publicDir, 'blog.html')) ? fs.readFileSync(path.join(publicDir, 'blog.html'), 'utf8') : '';
const articles = [];
const strip = t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const m of blogHtml.matchAll(/<a class="(?:bcard__link|bfeature)" href="(\/blog\/[^"]+)">[\s\S]*?<span class="bcard__meta">([\s\S]*?)<\/span>\s*<(?:h3|span) class="(?:bcard__title|bfeature__title)">([\s\S]*?)<\/(?:h3|span)>/g)) {
  articles.push({ url: m[1], title: strip(m[3]), desc: strip(m[2].replace(/<\/span><span>/g, ', ')).replace(/^Latest, /, '') });
}

/* Render */
const row = p => `<li><a class="row svc" href="${p.url}"><h3 class="row__name">${p.title}</h3><span class="svc__desc">${p.desc}</span>${S.ROW_GO}</a></li>`;
let n = 0;
const block = (id, heading, list, aside) => {
  if (!list.length) return '';
  n += list.length;
  return `<section class="sec sec--line wrap" id="${id}" aria-labelledby="${id}-title" style="margin-top: 0;">
            <div class="sec-head grid"><h2 class="h2" id="${id}-title" data-reveal>${heading}</h2><div class="sec-head__aside"><p>${aside || list.length + ' pages'}</p></div></div>
            <ul class="rows">
                ${list.map(row).join('\n                ')}
            </ul>
        </section>`;
};
const groupedBlock = (id, heading, groups) => {
  const keys = Object.keys(groups).sort();
  if (!keys.length) return '';
  const count = keys.reduce((a, k) => a + groups[k].length, 0);
  n += count;
  return `<section class="sec sec--line wrap" id="${id}" aria-labelledby="${id}-title" style="margin-top: 0;">
            <div class="sec-head grid"><h2 class="h2" id="${id}-title" data-reveal>${heading}</h2><div class="sec-head__aside"><p>${count} pages</p></div></div>
            ${keys.map(k => `<h3 class="dir-group">${k}</h3>
            <ul class="rows">
                ${groups[k].map(row).join('\n                ')}
            </ul>`).join('\n            ')}
        </section>`;
};

const sections = [
  block('studio', 'The studio', studio),
  block('flagship', 'Main services', flagship),
  groupedBlock('services', 'Services by subject', serviceGroups),
  block('industries', 'Industries', industries),
  block('solutions', 'Solutions', solutions),
  block('work', 'Case studies', caseStudies),
  groupedBlock('cities', 'Cities', cities),
  block('guides', 'Guides', guides),
  block('articles', 'Articles', articles)
].join('\n\n        ');

const pagePath = '/directory';
const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([['Directory', pagePath]])}
                <div class="phero__row grid">
                    <h1 class="phero__title" id="page-title"><span class="hl">Directory<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></span></h1>
                    <div class="phero__side"><p class="phero__lede"><b>Every page on the site,</b> grouped: services, cities, industries, guides, case studies and articles. ${n} pages in all.</p></div>
                </div>
            </div>
        </section>

        ${sections}
        <div style="height: var(--space-sec);"></div>`;

const v = S.versions();
const html = S.head({
  title: 'Site Directory | Kawaki Studios',
  description: 'Every page on the Kawaki Studios website in one index: services, cities, industries, guides, case studies and articles.',
  path: pagePath,
  jsonLd: { '@context': 'https://schema.org', '@graph': [S.breadcrumbLd(pagePath, [['Directory', pagePath]])] }
}, v) + S.body({ path: pagePath, main }, v);

fs.writeFileSync(path.join(publicDir, 'directory.html'), html, 'utf8');
const stale = path.join(publicDir, 'sitemap.html');
if (fs.existsSync(stale)) fs.unlinkSync(stale);
console.log(`✓ Wrote public/directory.html (${n} links)`);
