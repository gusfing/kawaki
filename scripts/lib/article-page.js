/* Kawaki Studios: blog article page and blog index, on the shared shell.
   Used by scripts/render-article.js (articles) and scripts/build-blog.js (index). */
const shell = require('./shell');
const S = shell;

const SEO_TITLES = {
  'what-to-prepare-before-hiring-web-development-agency': 'What to Prepare Before Hiring a Web Agency',
  'ai-automation-architecture': 'AI Automation Architecture and Workflows',
  'ai-agent-reliability-evaluation': 'AI Agent Reliability and Evaluation',
  'ai-automation-vs-ai-agents': 'AI Automation vs AI Agents',
  'custom-web-development-vs-no-code': 'Custom Web Development vs No-Code',
  'what-is-editorial-engineering': 'What Is Editorial Engineering?',
  'headless-shopify-development-guide': 'Headless Shopify Development Guide',
  'how-ai-search-engines-cite-sources': 'How AI Search Engines Cite Sources',
  'japanese-keyword-hack-wordpress': 'Japanese Keyword Hack Cleanup Guide',
  'nextjs-performance-architecture': 'Next.js Performance Architecture Guide',
  'nextjs-server-vs-client-components': 'Next.js Server vs Client Components',
  'nextjs-state-management-api-boundaries': 'Next.js State Management and API Flow',
  'shopify-liquid-vs-headless': 'Shopify Liquid vs Headless Shopify',
  'webflow-vs-custom-development': 'Webflow vs Custom Web Development',
  'wordpress-backdoors-stealth-web-shells': 'WordPress Backdoor and Web Shell Removal',
  'wordpress-malicious-redirects-cleanup': 'WordPress Malicious Redirect Cleanup',
  'how-to-evaluate-a-web-development-proposal-beyond-price': 'How to Evaluate a Web Development Proposal',
  'how-much-does-a-custom-website-cost': 'Custom Website Cost in India and Abroad',
  'shopify-apps-vs-custom-integrations': 'Shopify Apps vs Custom Integrations',
  'website-redesign-brief-goals-scope-integrations': 'How to Write a Website Redesign Brief',
  'decoupled-commerce-architecture-native-middleware-headless': 'Decoupled Commerce Architecture Guide',
  'generative-engine-optimization-guide-for-business-websites': 'Generative Engine Optimization (GEO) Guide',
  'shopify-migration-checklist-data-urls-redirects': 'Shopify Migration Checklist and Redirects',
  'website-launch-qa-checklist-before-going-live': 'Website Launch QA Checklist Before Going Live',
  'website-maintenance-services-what-they-include-and-cost': 'Website Maintenance Services and Costs',
  'what-should-website-maintenance-agreement-include': 'Website Maintenance Agreement SLA Guide',
  'what-is-ai-automation-examples-for-small-businesses': 'What Is AI Automation? Small Business Guide',
  'white-label-web-development-agency-partnerships': 'White-Label Web Development for Agencies',
  'enterprise-ai-agents-walmart-meta': 'Enterprise AI Agents: Walmart and Meta Case Study',
  'google-project-mariner-autonomous-agents': 'Google Project Mariner & Autonomous Agents Analysis',
  'hardware-ai-agents-safety-and-architecture': 'Hardware AI Agents: Safety & Architectural Isolation',
  'how-to-outsource-web-development-to-india': 'How to Outsource Web Development to India'
};

const readTime = a => Math.max(4, Math.ceil(String(a.content || '').split(/\s+/).filter(Boolean).length / 200));
const iso = d => String(d || '2026-09-01T09:00:00.000Z').slice(0, 10);
const fs = require('fs');
const path = require('path');
const FALLBACK_IMG = '/assets/images/blog/website-redesign-brief-hero.jpg';

/* Real change dates from the sitemap builder (data/sitemap-lastmod.json): a post rewritten later shows it. */
let LASTMOD = {};
try { LASTMOD = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'sitemap-lastmod.json'), 'utf8')); } catch (e) { /* first build */ }
const latestDate = (a, b) => (b && String(b) > String(a).slice(0, 10) ? b + 'T09:00:00.000Z' : a);

/* FAQPage data from a post's "Frequently Asked Questions" section (## heading, ### questions).
   Answer engines read question and answer pairs directly; the visible FAQ stays as it is. */
function faqFromMarkdown(md) {
  const start = /^##\s+(?:\d+\.\s*)?(?:Frequently Asked Questions|FAQs?)\b[^\n]*$/im.exec(md);
  if (!start) return null;
  const rest = md.slice(start.index + start[0].length);
  const end = rest.search(/^##\s/m);
  const section = end === -1 ? rest : rest.slice(0, end);
  const plain = s => s.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '').replace(/^\s*[-+]\s+/gm, '').replace(/\s+/g, ' ').trim();
  const parts = section.split(/^###\s+/m).slice(1);
  const qa = parts.map(p => {
    const nl = p.indexOf('\n');
    return { q: plain(nl === -1 ? p : p.slice(0, nl)), a: plain(nl === -1 ? '' : p.slice(nl + 1)) };
  }).filter(x => x.q && x.a);
  if (qa.length < 2) return null;
  return { '@type': 'FAQPage', mainEntity: qa.map(x => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) };
}
const imageOf = a => a.featuredImage || FALLBACK_IMG;

/* A post's image: the local WebP pair when it exists, otherwise the original file. */
function pic(src, sizes, { eager = false, alt = '' } = {}) {
  const load = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  const m = /^(\/assets\/images\/blog\/.+)\.(jpe?g|png)$/i.exec(src || '');
  if (m && fs.existsSync(path.join(S.PUB, m[1] + '.webp')) && fs.existsSync(path.join(S.PUB, m[1] + '-720.webp'))) {
    return `<img src="${m[1]}.webp" srcset="${m[1]}-720.webp 720w, ${m[1]}.webp 1376w" sizes="${sizes}" alt="${S.esc(alt)}" width="1376" height="768" ${load} />`;
  }
  return `<img src="${src}" alt="${S.esc(alt)}" width="1200" height="670" ${load} />`;
}

/* An article card with its image, used on the blog index and under each article. */
function bcard(a, h, sizes) {
  const cat = (a.tags && a.tags[0]) || 'Engineering';
  return `<li class="bcard">
                    <a class="bcard__link" href="/blog/${a.slug}">
                        <span class="bimg">${pic(imageOf(a), sizes)}</span>
                        <span class="bcard__meta"><span>${S.esc(cat)}</span><span>${readTime(a)} min read</span></span>
                        <h3 class="bcard__title">${a.title}</h3>
                    </a>
                </li>`;
}

function articlePage(article, allArticles, h) {
  const slug = article.slug;
  const title = article.title;
  const pagePath = `/blog/${slug}`;
  const url = S.SITE + pagePath;
  const seoDesc = article.seoDescription || article.excerpt || `${title}, from the Kawaki Studios blog.`;
  const author = article.author || 'Kunal Sharma';
  const published = article.createdAt || '2026-09-01T09:00:00.000Z';
  const modified = latestDate(article.updatedAt || published, LASTMOD['/blog/' + slug] && LASTMOD['/blog/' + slug].lastmod);
  const faqLd = faqFromMarkdown(article.content || '');
  const image = article.featuredImage || '/assets/images/blog/custom-code-vs-nocode-decision-matrix-chart.webp';
  const absImage = image.startsWith('http') ? image : S.SITE + image;
  const category = (article.tags && article.tags[0]) || 'Engineering';
  const { html: contentHtml, tocItems } = h.extractHeadingsAndInjectIds(h.renderMarkdown(article.content));
  const svc = h.getContextualService(article);
  const related = (allArticles || []).filter(a => a.slug !== slug).slice(0, 4);
  const metaTitle = `${SEO_TITLES[slug] || (title.length > 52 ? title.split(':')[0] : title)} | Kawaki Studios`;
  const crumbName = SEO_TITLES[slug] || title;

  const toc = (tocItems || []).filter(i => Number(i.level) <= 3)
    .map(i => `<li class="art__toc-l${i.level}"><a href="#${i.id}">${i.title}</a></li>`).join('');
  const tags = (article.tags || []).map(t => `<li>${S.esc(t)}</li>`).join('');
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const bio = author === 'Kunal Sharma'
    ? `<strong>Kunal Sharma</strong> founded Kawaki Studios in New Delhi and leads its engineering. He writes about the systems the studio designs and builds for clients.`
    : `<strong>${S.esc(author)}</strong> writes for Kawaki Studios, a web engineering studio in New Delhi.`;

  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': url + '#article',
      headline: title,
      description: seoDesc,
      image: absImage,
      inLanguage: 'en-US',
      datePublished: published,
      dateModified: modified,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#page-title', '.art__lede', '#articleContent > p:first-of-type']
      },
      // The founder's Person node lives on /about (#founder); linking it ties every post to one known author.
      author: author === 'Kunal Sharma'
        ? {
            '@type': 'Person',
            '@id': S.SITE + '/about#founder',
            name: author,
            url: S.SITE + '/about',
            jobTitle: 'Founder & Lead Engineer',
            worksFor: { '@type': 'Organization', '@id': S.SITE + '/#organization', name: 'Kawaki Studios' }
          }
        : { '@type': 'Person', name: author, worksFor: { '@type': 'Organization', '@id': S.SITE + '/#organization', name: 'Kawaki Studios' } },
      publisher: {
        '@type': 'Organization',
        '@id': S.SITE + '/#organization',
        name: 'Kawaki Studios',
        url: S.SITE,
        logo: {
          '@type': 'ImageObject',
          url: S.SITE + '/assets/images/kawaki-logo.png',
          width: 192,
          height: 192
        }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url }
    },
    S.breadcrumbLd(pagePath, [['Blog', '/blog'], [crumbName, pagePath]])
  ];
  if (faqLd) graph.push(Object.assign({ '@id': url + '#faq' }, faqLd));

  const row = (href, name, desc) => `<li><a class="row svc" href="${href}"><h3 class="row__name">${S.esc(name)}</h3><span class="svc__desc">${S.esc(desc)}</span>${S.ROW_GO}</a></li>`;

  const main = `<article class="art" aria-labelledby="page-title">
            <header class="art__head wrap">
                ${S.crumbsHtml([['Blog', '/blog'], [crumbName, pagePath]])}
                <p class="art__meta"><span class="art__cat">${S.esc(category)}</span><span>${readTime(article)} min read</span><time datetime="${iso(published)}">${h.formatDate(published)}</time></p>
                <h1 class="art__title" id="page-title">${title}</h1>
                <p class="art__lede">${seoDesc}</p>
                <p class="art__by">By ${S.esc(author)}</p>
            </header>
            <figure class="art__figure wrap">
                <div class="art__frame">${pic(image, '(max-width: 760px) 100vw, (max-width: 1440px) 92vw, 1376px', { eager: true, alt: title })}</div>
            </figure>
            <div class="art__layout wrap grid">
                <aside class="art__aside" aria-label="On this page">
                    ${toc ? `<p class="art__label">On this page</p>
                    <ol class="art__toc">${toc}</ol>` : ''}
                    <p class="art__label">Share</p>
                    <p class="art__share"><a href="${tweet}" target="_blank" rel="noopener">Share on X</a><a href="${linkedin}" target="_blank" rel="noopener">Share on LinkedIn</a></p>
                </aside>
                <div class="art__body prose" id="articleContent">
                    ${contentHtml}
                    ${tags ? `<ul class="art__tags" aria-label="Topics">${tags}</ul>` : ''}
                    <div class="art__author"><p class="art__label">Written by</p><p>${bio}</p></div>
                </div>
            </div>
        </article>

        <section class="sec sec--line wrap related" aria-labelledby="next-title" style="margin-top: 0; padding-bottom: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="next-title" data-reveal>Keep reading</h2>
                <div class="sec-head__aside"><a class="draw" href="/blog">All articles${S.ARROW}</a></div>
            </div>
            <ul class="bcards">
                ${related.slice(0, 3).map(a => bcard(a, h, '(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw')).join('\n                ')}
            </ul>
            <ul class="rows" style="margin-top: clamp(48px, 6vw, 80px);">
                ${row(svc.url, svc.name, 'The service behind this article')}
            </ul>
        </section>`;

  const v = S.versions();
  return S.head({ title: metaTitle, description: seoDesc, path: pagePath, ogType: 'article', ogImage: absImage, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, v) +
    S.body({ path: pagePath, main }, v);
}

function blogIndexPage(articles, h) {
  const pagePath = '/blog';
  const title = 'Blog | Kawaki Studios';
  const description = 'Engineering notes from Kawaki Studios on custom web development, Shopify, AI automation, AI search and website security, written by the developers.';
  const [first, ...rest] = articles;
  const graph = [
    { '@type': 'Blog', '@id': S.SITE + '/blog#blog', name: 'Kawaki Studios blog', url: S.SITE + '/blog', publisher: { '@id': S.SITE + '/#organization' },
      blogPost: articles.map(a => ({ '@type': 'BlogPosting', headline: a.title, url: S.SITE + '/blog/' + a.slug, datePublished: a.createdAt })) },
    S.breadcrumbLd(pagePath, [['Blog', '/blog']])
  ];
  const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([['Blog', '/blog']])}
                <div class="phero__row grid">
                    <h1 class="phero__title" id="page-title"><span class="hl">Blog<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></span></h1>
                    <div class="phero__side"><p class="phero__lede"><b>Engineering notes from the studio:</b> web builds, Shopify, automation, AI search and security, written by the developers who do the work.</p></div>
                </div>
            </div>
        </section>

        <section class="wrap blog-latest" aria-labelledby="latest-title">
            <h2 class="sr-only" id="latest-title">Latest article</h2>
            ${first ? `<a class="bfeature" href="/blog/${first.slug}">
                <span class="bimg bfeature__img">${pic(imageOf(first), '(max-width: 900px) 100vw, 58vw', { eager: true })}</span>
                <span class="bfeature__body">
                    <span class="bcard__meta"><span>Latest</span><span>${S.esc((first.tags && first.tags[0]) || 'Engineering')}</span><span>${readTime(first)} min read</span></span>
                    <span class="bfeature__title">${first.title}</span>
                    <span class="bfeature__excerpt">${S.esc(first.excerpt || first.seoDescription || '')}</span>
                    <span class="bfeature__cta">Read the article${S.ARROW}</span>
                </span>
            </a>` : ''}
        </section>

        <section class="sec wrap" aria-labelledby="all-title" style="padding-bottom: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="all-title" data-reveal>Every article</h2><div class="sec-head__aside"><p>${articles.length} articles</p></div></div>
            <ul class="bcards">
                ${rest.map(a => bcard(a, h, '(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw')).join('\n                ')}
            </ul>
        </section>`;
  const v = S.versions();
  return S.head({ title, description, path: pagePath, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, v) + S.body({ path: pagePath, main }, v);
}

module.exports = { articlePage, blogIndexPage, SEO_TITLES };
