const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const pages = [
  { name: 'Home', file: 'index.html', path: '/' },
  { name: 'About', file: 'about.html', path: '/about' },
  { name: 'Services', file: 'services.html', path: '/services' },
  { name: 'Custom Web Dev', file: 'services/custom-web-development.html', path: '/services/custom-web-development' },
  { name: 'Shopify Development', file: 'services/shopify-development.html', path: '/services/shopify-development' },
  { name: 'AI Automation', file: 'services/ai-automation.html', path: '/services/ai-automation' },
  { name: 'AI Search Optimization', file: 'services/ai-search-optimization.html', path: '/services/ai-search-optimization' },
  { name: 'WordPress Malware Removal', file: 'services/wordpress-malware-removal.html', path: '/services/wordpress-malware-removal' },
  { name: 'Case Studies', file: 'case-studies.html', path: '/case-studies' },
  { name: 'Acme Case Study', file: 'case-studies/acme-headless-ecommerce.html', path: '/case-studies/acme-headless-ecommerce' },
  { name: 'Fintech Case Study', file: 'case-studies/fintech-roi-calculator.html', path: '/case-studies/fintech-roi-calculator' },
  { name: 'Blog Index', file: 'blog.html', path: '/blog' },
  { name: 'Blog Post Template', file: 'blog-post.html', path: '/blog-post' },
  { name: 'Contact', file: 'contact.html', path: '/contact' }
];

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

for (const p of pages) {
  const filePath = path.join(publicDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${p.file}`);
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
  if (!title || title.length < 20 || title.length > 75) {
    console.warn(`[WARN] Title length: ${title ? title.length : 0} ("${title}")`);
  } else {
    console.log(`[PASS] Title: "${title}" (${title.length} chars)`);
  }

  // 2. Meta description
  const desc = extractAttr(html, /<meta[^>]*name=["']description["'][^>]*>/i, 'content') ||
               extractAttr(html, /<meta[^>]*content="[^"]*"[^>]*name=["']description["'][^>]*>/i, 'content');
  if (!desc || desc.length < 50 || desc.length > 200) {
    console.warn(`[WARN] Description length: ${desc ? desc.length : 0} ("${desc}")`);
  } else {
    console.log(`[PASS] Description: "${desc}" (${desc.length} chars)`);
  }

  // 3. Canonical
  const canon = extractAttr(html, /<link[^>]*rel=["']canonical["'][^>]*>/i, 'href') ||
                extractAttr(html, /<link[^>]*href="[^"]*"[^>]*rel=["']canonical["'][^>]*>/i, 'href');
  if (!canon || !canon.startsWith('https://www.kawaki.co.in')) {
    console.error(`[FAIL] Canonical tag missing or invalid: ${canon}`);
    totalIssues++;
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

  // 7. JSON-LD
  const jsonLds = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let validJsonLds = 0;
  for (const s of jsonLds) {
    try {
      JSON.parse(s[1]);
      validJsonLds++;
    } catch (err) {
      console.error(`[FAIL] JSON-LD parse error:`, err.message);
      totalIssues++;
    }
  }
  console.log(`[PASS] JSON-LD: ${validJsonLds} valid structured data schemas found.`);

  // 8. Residual .html hrefs
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
  console.log(`🏆 ALL ${pages.length} PAGES PASSED FULL SEO VALIDATION WITH 0 ISSUES!`);
} else {
  console.error(`⚠️ Found ${totalIssues} SEO issue(s). Please review above.`);
}
console.log(`========================================`);
