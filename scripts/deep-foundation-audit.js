const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const pages = [
  { name: 'Home', file: 'index.html', url: 'https://www.kawaki.co.in/' },
  { name: 'About', file: 'about.html', url: 'https://www.kawaki.co.in/about' },
  { name: 'Services Hub', file: 'services.html', url: 'https://www.kawaki.co.in/services' },
  { name: 'Custom Web Dev', file: 'services/custom-web-development.html', url: 'https://www.kawaki.co.in/services/custom-web-development' },
  { name: 'Web App Dev', file: 'services/web-application-development.html', url: 'https://www.kawaki.co.in/services/web-application-development' },
  { name: 'Website Redesign', file: 'services/website-redesign.html', url: 'https://www.kawaki.co.in/services/website-redesign' },
  { name: 'Performance Optimization', file: 'services/website-performance-optimization.html', url: 'https://www.kawaki.co.in/services/website-performance-optimization' },
  { name: 'WordPress Dev', file: 'services/wordpress-development.html', url: 'https://www.kawaki.co.in/services/wordpress-development' },
  { name: 'Shopify Dev', file: 'services/shopify-development.html', url: 'https://www.kawaki.co.in/services/shopify-development' },
  { name: 'AI Automation', file: 'services/ai-automation.html', url: 'https://www.kawaki.co.in/services/ai-automation' },
  { name: 'AI Search Optimization', file: 'services/ai-search-optimization.html', url: 'https://www.kawaki.co.in/services/ai-search-optimization' },
  { name: 'WordPress Malware Removal', file: 'services/wordpress-malware-removal.html', url: 'https://www.kawaki.co.in/services/wordpress-malware-removal' },
  { name: 'Malicious Redirect Removal', file: 'services/malicious-redirect-removal.html', url: 'https://www.kawaki.co.in/services/malicious-redirect-removal' },
  { name: 'WordPress Backdoor Removal', file: 'services/wordpress-backdoor-removal.html', url: 'https://www.kawaki.co.in/services/wordpress-backdoor-removal' },
  { name: 'SEO Spam Removal', file: 'services/seo-spam-removal.html', url: 'https://www.kawaki.co.in/services/seo-spam-removal' },
  { name: 'Security Hardening', file: 'services/website-security-hardening.html', url: 'https://www.kawaki.co.in/services/website-security-hardening' },
  { name: 'WordPress Security Audit', file: 'services/wordpress-security-audit.html', url: 'https://www.kawaki.co.in/services/wordpress-security-audit' },
  { name: 'Case Studies Hub', file: 'case-studies.html', url: 'https://www.kawaki.co.in/case-studies' },
  { name: 'Acme Case Study', file: 'case-studies/acme-headless-ecommerce.html', url: 'https://www.kawaki.co.in/case-studies/acme-headless-ecommerce' },
  { name: 'Fintech Case Study', file: 'case-studies/fintech-roi-calculator.html', url: 'https://www.kawaki.co.in/case-studies/fintech-roi-calculator' },
  { name: 'Blog Hub', file: 'blog.html', url: 'https://www.kawaki.co.in/blog' },
  { name: 'Contact', file: 'contact.html', url: 'https://www.kawaki.co.in/contact' },
  { name: 'Blog: editorial-engineering', file: 'blog/what-is-editorial-engineering.html', url: 'https://www.kawaki.co.in/blog/what-is-editorial-engineering' },
  { name: 'Blog: headless-shopify', file: 'blog/headless-shopify-development-guide.html', url: 'https://www.kawaki.co.in/blog/headless-shopify-development-guide' },
  { name: 'Blog: webflow-vs-custom', file: 'blog/webflow-vs-custom-development.html', url: 'https://www.kawaki.co.in/blog/webflow-vs-custom-development' },
  { name: 'Blog: nextjs-perf', file: 'blog/nextjs-performance-architecture.html', url: 'https://www.kawaki.co.in/blog/nextjs-performance-architecture' },
  { name: 'Blog: nextjs-server-client', file: 'blog/nextjs-server-vs-client-components.html', url: 'https://www.kawaki.co.in/blog/nextjs-server-vs-client-components' },
  { name: 'Blog: nextjs-state-api', file: 'blog/nextjs-state-management-api-boundaries.html', url: 'https://www.kawaki.co.in/blog/nextjs-state-management-api-boundaries' },
  { name: 'Blog: ai-automation-arch', file: 'blog/ai-automation-architecture.html', url: 'https://www.kawaki.co.in/blog/ai-automation-architecture' },
  { name: 'Blog: ai-agent-reliability', file: 'blog/ai-agent-reliability-evaluation.html', url: 'https://www.kawaki.co.in/blog/ai-agent-reliability-evaluation' }
];

function normalizeLink(href) {
  if (!href) return null;
  href = href.trim();
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('javascript:')) return null;
  if (href.startsWith('https://www.kawaki.co.in')) {
    href = href.replace('https://www.kawaki.co.in', '');
  }
  if (href === '') href = '/';
  // Strip trailing slash if not root
  if (href.length > 1 && href.endsWith('/')) {
    href = href.slice(0, -1);
  }
  // Strip hash or query
  href = href.split('#')[0].split('?')[0];
  if (!href.startsWith('/')) return null; // external or relative
  return href;
}

const auditData = [];

// First pass: extract on-page data and outbound links
for (const p of pages) {
  const filePath = path.join(publicDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.error('Missing file:', filePath);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // H2s
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  // JSON-LD schemas
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes = [];
  let hasFaqSchema = false;
  let hasOrgSchema = false;
  let hasLocalBusinessSchema = false;
  let hasServiceSchema = false;
  let hasArticleSchema = false;

  for (const sm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(sm[1]);
      const checkNode = (node) => {
        if (!node) return;
        if (Array.isArray(node)) {
          node.forEach(checkNode);
          return;
        }
        if (node['@type']) {
          schemaTypes.push(node['@type']);
          if (node['@type'] === 'FAQPage') hasFaqSchema = true;
          if (node['@type'] === 'Organization') hasOrgSchema = true;
          if (node['@type'] === 'LocalBusiness' || node['@type'] === 'ProfessionalService') hasLocalBusinessSchema = true;
          if (node['@type'] === 'Service') hasServiceSchema = true;
          if (node['@type'] === 'BlogPosting' || node['@type'] === 'Article') hasArticleSchema = true;
        }
        if (node['@graph']) checkNode(node['@graph']);
      };
      checkNode(parsed);
    } catch (e) {}
  }

  // Word count (strip script, style, tags)
  const cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = cleanText.split(/\s+/).length;

  // Geography checks
  const hasNewDelhi = /new delhi/i.test(cleanText);
  const hasIndia = /\bindia\b/i.test(cleanText);

  // FAQ detection in DOM
  const hasFaqInDom = /faq|frequently asked/i.test(html) && (/<details/i.test(html) || /class="[^"]*faq/i.test(html) || /id="[^"]*faq/i.test(html));

  // Direct Definition blocks (e.g. "What is...", "X is a...", "<dt>")
  const hasDirectDefinition = /what is [a-z0-9\s-]+/i.test(html) || /<dl[\s\S]*?<\/dl>/i.test(html);

  // Outbound internal links
  const hrefMatches = [...html.matchAll(/href=["']([^"']*)["']/gi)];
  const internalOutlinks = new Set();
  for (const m of hrefMatches) {
    const norm = normalizeLink(m[1]);
    if (norm) {
      internalOutlinks.add(norm);
    }
  }

  const pagePath = p.url.replace('https://www.kawaki.co.in', '') || '/';

  auditData.push({
    name: p.name,
    file: p.file,
    url: p.url,
    path: pagePath,
    title,
    titleLength: title.length,
    metaDesc,
    metaDescLength: metaDesc.length,
    h1,
    h2Count: h2Matches.length,
    h2s: h2Matches.slice(0, 8),
    wordCount,
    schemaTypes: [...new Set(schemaTypes)],
    hasFaqSchema,
    hasOrgSchema,
    hasLocalBusinessSchema,
    hasServiceSchema,
    hasArticleSchema,
    hasNewDelhi,
    hasIndia,
    hasFaqInDom,
    hasDirectDefinition,
    outlinks: Array.from(internalOutlinks),
    inlinks: []
  });
}

// Second pass: compute inlinks
for (const source of auditData) {
  for (const targetPath of source.outlinks) {
    const targetPage = auditData.find(p => p.path === targetPath);
    if (targetPage && targetPage.path !== source.path) {
      if (!targetPage.inlinks.includes(source.path)) {
        targetPage.inlinks.push(source.path);
      }
    }
  }
}

// Summary Output
console.log('=== AUDIT COMPLETE: 30 CANONICAL PAGES SCANNED ===\n');

auditData.forEach(p => {
  console.log(`PAGE: ${p.path} [${p.name}]`);
  console.log(`  Title: ${p.title} (${p.titleLength} ch)`);
  console.log(`  H1: ${p.h1}`);
  console.log(`  Words: ${p.wordCount} | H2s: ${p.h2Count}`);
  console.log(`  Inlinks (${p.inlinks.length}): ${p.inlinks.join(', ')}`);
  console.log(`  Outlinks (${p.outlinks.length})`);
  console.log(`  Schema: [${p.schemaTypes.join(', ')}] | FAQ Schema: ${p.hasFaqSchema} | FAQ DOM: ${p.hasFaqInDom}`);
  console.log(`  Geo: New Delhi=${p.hasNewDelhi}, India=${p.hasIndia}`);
  console.log('--------------------------------------------------');
});

fs.writeFileSync(path.join(__dirname, '..', 'audit_full_30_urls.json'), JSON.stringify(auditData, null, 2));
console.log('Saved detailed audit to audit_full_30_urls.json');
