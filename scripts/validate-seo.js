const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const sitemapFile = path.join(publicDir, 'sitemap.xml');
const blogIndexFile = path.join(publicDir, 'blog.html');

// Standard static pages
const pages = [
  { name: 'Home', file: 'index.html', path: '/' },
  { name: 'About', file: 'about.html', path: '/about' },
  { name: 'Services', file: 'services.html', path: '/services' },
  { name: 'Custom Web Dev', file: 'services/custom-web-development.html', path: '/services/custom-web-development' },
  { name: 'Web App Dev', file: 'services/web-application-development.html', path: '/services/web-application-development' },
  { name: 'Website Redesign', file: 'services/website-redesign.html', path: '/services/website-redesign' },
  { name: 'Performance Optimization', file: 'services/website-performance-optimization.html', path: '/services/website-performance-optimization' },
  { name: 'WordPress Dev', file: 'services/wordpress-development.html', path: '/services/wordpress-development' },
  { name: 'Shopify Development', file: 'services/shopify-development.html', path: '/services/shopify-development' },
  { name: 'AI Automation', file: 'services/ai-automation.html', path: '/services/ai-automation' },
  { name: 'AI Search Optimization', file: 'services/ai-search-optimization.html', path: '/services/ai-search-optimization' },
  { name: 'WordPress Malware Removal', file: 'services/wordpress-malware-removal.html', path: '/services/wordpress-malware-removal' },
  { name: 'Malicious Redirect Removal', file: 'services/malicious-redirect-removal.html', path: '/services/malicious-redirect-removal' },
  { name: 'WordPress Backdoor Removal', file: 'services/wordpress-backdoor-removal.html', path: '/services/wordpress-backdoor-removal' },
  { name: 'SEO Spam Removal', file: 'services/seo-spam-removal.html', path: '/services/seo-spam-removal' },
  { name: 'Security Hardening', file: 'services/website-security-hardening.html', path: '/services/website-security-hardening' },
  { name: 'WordPress Security Audit', file: 'services/wordpress-security-audit.html', path: '/services/wordpress-security-audit' },
  { name: 'Case Studies', file: 'case-studies.html', path: '/case-studies' },
  { name: 'Acme Case Study', file: 'case-studies/acme-headless-ecommerce.html', path: '/case-studies/acme-headless-ecommerce' },
  { name: 'Fintech Case Study', file: 'case-studies/fintech-roi-calculator.html', path: '/case-studies/fintech-roi-calculator' },
  { name: 'Blog Index', file: 'blog.html', path: '/blog' },
  { name: 'Contact', file: 'contact.html', path: '/contact' }
];

// Expected published blog slugs
const blogSlugs = [
  'what-is-editorial-engineering',
  'headless-shopify-development-guide',
  'webflow-vs-custom-development',
  'core-web-vitals-checklist',
  'the-architecture-of-modern-digital-luxury',
  'nextjs-server-vs-client-components'
];

for (const slug of blogSlugs) {
  pages.push({
    name: `Blog: ${slug}`,
    file: path.join('blog', `${slug}.html`),
    path: `/blog/${slug}`,
    isBlogArticle: true,
    slug: slug
  });
}

function extractAttr(html, tagRegex, attrName) {
  const match = html.match(tagRegex);
  if (!match) return null;
  const tag = match[0];
  const doubleMatch = tag.match(new RegExp(`${attrName}="([^"]*)"`, 'i'));
  if (doubleMatch) return doubleMatch[1];
  const singleMatch = tag.match(new RegExp(`${attrName}='([^']*)'`, 'i'));
  if (singleMatch) return singleMatch[1];
  return null;
}

let totalIssues = 0;
const seenTitles = new Map();
const seenDescriptions = new Map();

// Read sitemap for cross-referencing
let sitemapContent = '';
if (fs.existsSync(sitemapFile)) {
  sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
} else {
  console.error(`[FAIL] Missing sitemap.xml!`);
  totalIssues++;
}

// Read blog index for link cross-referencing
let blogIndexContent = '';
if (fs.existsSync(blogIndexFile)) {
  blogIndexContent = fs.readFileSync(blogIndexFile, 'utf8');
} else {
  console.error(`[FAIL] Missing blog.html!`);
  totalIssues++;
}

// 1. Check sitemap hygiene
console.log(`\n========================================`);
console.log(`GLOBAL SITEMAP AUDIT`);
console.log(`========================================`);
if (sitemapContent.includes('/blog-post?slug=')) {
  console.error(`[FAIL] Sitemap contains legacy query-string URLs (/blog-post?slug=)!`);
  totalIssues++;
} else {
  console.log(`[PASS] Zero query-string article URLs in sitemap.`);
}

if (sitemapContent.includes('<loc>https://www.kawaki.co.in/blog-post</loc>')) {
  console.error(`[FAIL] Sitemap contains legacy /blog-post root!`);
  totalIssues++;
} else {
  console.log(`[PASS] Legacy /blog-post root excluded from sitemap.`);
}

// 2. Phase 3.3D Legacy Redirect Routing Audit
console.log(`\n========================================`);
console.log(`PHASE 3.3D LEGACY REDIRECT ROUTING AUDIT`);
console.log(`========================================`);

// Check that public/blog-post.html does not exist (so static files don't shadow the edge redirect)
const legacyHtmlShim = path.join(publicDir, 'blog-post.html');
if (fs.existsSync(legacyHtmlShim)) {
  console.error(`[FAIL] public/blog-post.html exists! It will shadow the Vercel rewrite.`);
  totalIssues++;
} else {
  console.log(`[PASS] public/blog-post.html does not exist (no static route shadowing).`);
}

// Check api/legacy-blog-redirect.js exists
const redirectHandlerPath = path.join(__dirname, '..', 'api', 'legacy-blog-redirect.js');
if (!fs.existsSync(redirectHandlerPath)) {
  console.error(`[FAIL] Missing api/legacy-blog-redirect.js!`);
  totalIssues++;
} else {
  console.log(`[PASS] api/legacy-blog-redirect.js exists.`);
}

// Check vercel.json configuration
const vercelJsonPath = path.join(__dirname, '..', 'vercel.json');
try {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
  const hasRewrite = (vercelConfig.rewrites || []).some(
    r => r.source === '/blog-post' && r.destination === '/api/legacy-blog-redirect'
  );
  if (!hasRewrite) {
    console.error(`[FAIL] vercel.json missing /blog-post -> /api/legacy-blog-redirect rewrite!`);
    totalIssues++;
  } else {
    console.log(`[PASS] vercel.json rewrite verified: /blog-post -> /api/legacy-blog-redirect.`);
  }
} catch (err) {
  console.error(`[FAIL] Could not parse vercel.json:`, err.message);
  totalIssues++;
}

// Test redirect handler programmatic outputs
try {
  const redirectHandler = require(redirectHandlerPath);
  function testRedirect(url) {
    let statusCode = null;
    let headers = {};
    const req = { url, headers: { host: 'www.kawaki.co.in' } };
    const res = {
      writeHead: (code, h) => { statusCode = code; headers = h; },
      end: () => {}
    };
    redirectHandler(req, res);
    return { statusCode, location: headers['Location'] };
  }

  const cases = [
    { in: '/blog-post?slug=what-is-editorial-engineering', out: '/blog/what-is-editorial-engineering' },
    { in: '/blog-post?slug=headless-shopify-development-guide', out: '/blog/headless-shopify-development-guide' },
    { in: '/blog-post?slug=webflow-vs-custom-development&utm_source=test', out: '/blog/webflow-vs-custom-development?utm_source=test' },
    { in: '/blog-post?slug=does-not-exist', out: '/blog/does-not-exist' },
    { in: '/blog-post', out: '/blog' }
  ];

  for (const c of cases) {
    const res = testRedirect(c.in);
    if (res.statusCode !== 308 || res.location !== c.out) {
      console.error(`[FAIL] Redirect test failed for ${c.in}: expected 308 -> "${c.out}", got ${res.statusCode} -> "${res.location}"`);
      totalIssues++;
    } else {
      console.log(`[PASS] ${c.in} => ${res.statusCode} ${res.location}`);
    }
  }
} catch (testErr) {
  console.error(`[FAIL] Error executing redirect handler test:`, testErr.message);
  totalIssues++;
}

// 3. Validate pages
for (const p of pages) {
  const filePath = path.join(publicDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] Missing file: ${p.file}`);
    totalIssues++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n========================================`);
  console.log(`PAGE: ${p.name} (${p.path})`);
  console.log(`========================================`);

  // 1. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) {
    console.error(`[FAIL] Missing title tag!`);
    totalIssues++;
  } else if (title.includes('Loading title...')) {
    console.error(`[FAIL] Page contains placeholder "Loading title..."!`);
    totalIssues++;
  } else if (seenTitles.has(title)) {
    console.error(`[FAIL] Duplicate title tag detected: "${title}" (first seen on ${seenTitles.get(title)})`);
    totalIssues++;
  } else {
    seenTitles.set(title, p.name);
    console.log(`[PASS] Title: "${title}" (${title.length} chars)`);
  }

  // 2. Meta description
  const desc = extractAttr(html, /<meta[^>]*name=["']description["'][^>]*>/i, 'content') ||
               extractAttr(html, /<meta[^>]*content="[^"]*"[^>]*name=["']description["'][^>]*>/i, 'content');
  if (!desc || desc.length < 50 || desc.length > 200) {
    console.warn(`[WARN] Description length: ${desc ? desc.length : 0} ("${desc}")`);
  } else if (seenDescriptions.has(desc)) {
    console.error(`[FAIL] Duplicate meta description detected: "${desc}" (first seen on ${seenDescriptions.get(desc)})`);
    totalIssues++;
  } else {
    seenDescriptions.set(desc, p.name);
    console.log(`[PASS] Description: "${desc}" (${desc.length} chars)`);
  }

  // 3. Canonical
  const canon = extractAttr(html, /<link[^>]*rel=["']canonical["'][^>]*>/i, 'href') ||
                extractAttr(html, /<link[^>]*href="[^"]*"[^>]*rel=["']canonical["'][^>]*>/i, 'href');
  if (!canon || !canon.startsWith('https://www.kawaki.co.in')) {
    console.error(`[FAIL] Canonical tag missing or invalid: ${canon}`);
    totalIssues++;
  } else if (canon.includes('/blog-post')) {
    console.error(`[FAIL] Canonical tag erroneously points to /blog-post: ${canon}`);
    totalIssues++;
  } else if (p.isBlogArticle) {
    const expectedCanon = `https://www.kawaki.co.in/blog/${p.slug}`;
    if (canon !== expectedCanon) {
      console.error(`[FAIL] Article canonical mismatch: got ${canon}, expected ${expectedCanon}`);
      totalIssues++;
    } else {
      console.log(`[PASS] Self-referential article canonical: ${canon}`);
    }
  } else {
    console.log(`[PASS] Canonical: ${canon}`);
  }

  // 4. OpenGraph
  const ogTitle = extractAttr(html, /<meta[^>]*property=["']og:title["'][^>]*>/i, 'content');
  const ogImage = extractAttr(html, /<meta[^>]*property=["']og:image["'][^>]*>/i, 'content');
  const ogUrl = extractAttr(html, /<meta[^>]*property=["']og:url["'][^>]*>/i, 'content');
  if (!ogTitle || !ogImage || !ogUrl) {
    console.error(`[FAIL] Incomplete OpenGraph: title=${ogTitle}, image=${ogImage}, url=${ogUrl}`);
    totalIssues++;
  } else {
    console.log(`[PASS] OpenGraph: Title="${ogTitle}", Image="${ogImage}"`);
  }

  // 5. Twitter Card
  const twCard = extractAttr(html, /<meta[^>]*name=["']twitter:card["'][^>]*>/i, 'content') ||
                 extractAttr(html, /<meta[^>]*property=["']twitter:card["'][^>]*>/i, 'content');
  const twImage = extractAttr(html, /<meta[^>]*name=["']twitter:image["'][^>]*>/i, 'content') ||
                  extractAttr(html, /<meta[^>]*property=["']twitter:image["'][^>]*>/i, 'content');
  if (!twCard || !twImage) {
    console.error(`[FAIL] Incomplete Twitter Cards: card=${twCard}, image=${twImage}`);
    totalIssues++;
  } else {
    console.log(`[PASS] Twitter Card: ${twCard}, Image="${twImage}"`);
  }

  // 6. H1 Count
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  if (h1s.length !== 1) {
    console.error(`[FAIL] Page has ${h1s.length} <h1> tags!`, h1s);
    totalIssues++;
  } else {
    console.log(`[PASS] Single <h1>: "${h1s[0]}"`);
  }

  // 7. JSON-LD Schemas
  const jsonLds = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let validJsonLds = 0;
  let hasBlogPosting = false;
  let hasBreadcrumbs = false;

  for (const s of jsonLds) {
    try {
      const parsed = JSON.parse(s[1]);
      validJsonLds++;
      if (parsed['@type'] === 'BlogPosting' || parsed['@type'] === 'Article') hasBlogPosting = true;
      if (parsed['@type'] === 'BreadcrumbList') hasBreadcrumbs = true;
    } catch (err) {
      console.error(`[FAIL] JSON-LD parse error:`, err.message);
      totalIssues++;
    }
  }

  if (p.isBlogArticle) {
    if (!hasBlogPosting) {
      console.error(`[FAIL] Article is missing BlogPosting or Article schema!`);
      totalIssues++;
    } else {
      console.log(`[PASS] BlogPosting / Article structured data verified.`);
    }
    if (!hasBreadcrumbs) {
      console.error(`[FAIL] Article is missing BreadcrumbList schema!`);
      totalIssues++;
    } else {
      console.log(`[PASS] BreadcrumbList structured data verified.`);
    }
  } else {
    console.log(`[PASS] JSON-LD: ${validJsonLds} valid structured data schemas found.`);
  }

  // 8. Article body & Raw HTML checks
  if (p.isBlogArticle) {
    const articleMatch = html.match(/<div class="article-content"[^>]*>([\s\S]*?)<\/div>/i);
    const bodyContent = articleMatch ? articleMatch[1].trim() : '';
    if (!bodyContent || bodyContent.length < 100) {
      console.error(`[FAIL] Raw HTML article body is empty or too short (${bodyContent.length} chars)!`);
      totalIssues++;
    } else {
      console.log(`[PASS] Raw HTML article body verified (${bodyContent.length} chars).`);
    }

    // Check link in sitemap
    const sitemapUrl = `https://www.kawaki.co.in/blog/${p.slug}`;
    if (!sitemapContent.includes(`<loc>${sitemapUrl}</loc>`)) {
      console.error(`[FAIL] Article URL missing from sitemap: ${sitemapUrl}`);
      totalIssues++;
    } else {
      console.log(`[PASS] Article present in sitemap: ${sitemapUrl}`);
    }

    // Check link from /blog index
    const blogIndexLink = `/blog/${p.slug}`;
    if (!blogIndexContent.includes(`href="${blogIndexLink}"`)) {
      console.error(`[FAIL] Article is not linked from public/blog.html: ${blogIndexLink}`);
      totalIssues++;
    } else {
      console.log(`[PASS] Article link found in public/blog.html index.`);
    }
  }

  // 9. Residual .html hrefs (excluding external or necessary links)
  const htmlHrefs = [...html.matchAll(/href=["']([^"']*\.html[^"']*)["']/gi)].map(m => m[1]);
  if (htmlHrefs.length > 0) {
    console.error(`[FAIL] Residual .html hrefs found:`, htmlHrefs);
    totalIssues++;
  } else {
    console.log(`[PASS] Residual .html links: 0`);
  }
}

console.log(`\n========================================`);
if (totalIssues === 0) {
  console.log(`🏆 ALL ${pages.length} PAGES & ARTICLES PASSED FULL SEO VALIDATION WITH 0 ISSUES!`);
} else {
  console.error(`⚠️ Found ${totalIssues} SEO issue(s). Please review above.`);
}
console.log(`========================================`);
