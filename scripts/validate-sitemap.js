const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
const registryPath = path.resolve(rootDir, 'data', 'seo-pages.json');
const vercelPath = path.resolve(rootDir, 'vercel.json');

console.log('⚡ [Sitemap Validator] Verifying public/sitemap.xml integrity and consistency...');

// 1. Ensure required files exist
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ [Sitemap Validator Error] public/sitemap.xml does not exist!');
  process.exit(1);
}
if (!fs.existsSync(registryPath)) {
  console.error('❌ [Sitemap Validator Error] data/seo-pages.json does not exist!');
  process.exit(1);
}
if (!fs.existsSync(vercelPath)) {
  console.error('❌ [Sitemap Validator Error] vercel.json does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(sitemapPath, 'utf8');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

// 2. Strict XML Tag Balancing Check
const openUrlset = (content.match(/<urlset\b[^>]*>/g) || []).length;
const closeUrlset = (content.match(/<\/urlset>/g) || []).length;
const openUrls = (content.match(/<url>/g) || []).length;
const closeUrls = (content.match(/<\/url>/g) || []).length;
const openLocs = (content.match(/<loc>/g) || []).length;
const closeLocs = (content.match(/<\/loc>/g) || []).length;

if (openUrlset !== 1 || closeUrlset !== 1) {
  console.error(`❌ [Sitemap Validator Error] <urlset> mismatch: ${openUrlset} opening, ${closeUrlset} closing.`);
  process.exit(1);
}

if (openUrls !== closeUrls) {
  console.error(`❌ [Sitemap Validator Error] <url> tag mismatch: ${openUrls} opening vs ${closeUrls} closing tags!`);
  process.exit(1);
}

if (openLocs !== closeLocs) {
  console.error(`❌ [Sitemap Validator Error] <loc> tag mismatch: ${openLocs} opening vs ${closeLocs} closing tags!`);
  process.exit(1);
}

if (openUrls !== openLocs) {
  console.error(`❌ [Sitemap Validator Error] URL count mismatch: ${openUrls} <url> tags vs ${openLocs} <loc> tags!`);
  process.exit(1);
}

// 3. Extract all <loc> entries
const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
let match;
let count = 0;
const seenUrls = new Set();
const duplicates = [];
const malformedUrls = [];
const sitemapUrls = [];

while ((match = urlBlockRegex.exec(content)) !== null) {
  count++;
  const block = match[1];
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) {
    console.error(`❌ [Sitemap Validator Error] Entry #${count} is missing <loc>! Block snippet:\n${block}`);
    process.exit(1);
  }
  const locUrl = locMatch[1].trim();

  // Validate canonical URL format
  if (!locUrl.startsWith('https://kawaki.co.in/')) {
    malformedUrls.push(`${locUrl} (must start with https://kawaki.co.in/)`);
  } else if (locUrl.includes('?') || locUrl.includes('#') || locUrl.includes(' ') || locUrl.includes('.html')) {
    malformedUrls.push(`${locUrl} (contains query, fragment, space, or .html extension)`);
  } else if (locUrl !== 'https://kawaki.co.in/' && locUrl.endsWith('/')) {
    malformedUrls.push(`${locUrl} (trailing slash on non-root URL)`);
  }

  if (seenUrls.has(locUrl)) {
    duplicates.push(locUrl);
  }
  seenUrls.add(locUrl);
  sitemapUrls.push(locUrl);
}

if (count !== openUrls) {
  console.error(`❌ [Sitemap Validator Error] Malformed block detected: parsed ${count} valid <url> blocks out of ${openUrls} tags!`);
  process.exit(1);
}

if (duplicates.length > 0) {
  console.error(`❌ [Sitemap Validator Error] Found ${duplicates.length} duplicate URLs in sitemap:\n${duplicates.join('\n')}`);
  process.exit(1);
}

if (malformedUrls.length > 0) {
  console.error(`❌ [Sitemap Validator Error] Found ${malformedUrls.length} malformed URLs:\n${malformedUrls.join('\n')}`);
  process.exit(1);
}

// 4. Check for Vercel Redirect Conflicts
const redirectSources = new Map();
(vercel.redirects || []).forEach(r => redirectSources.set(r.source, r.destination));

const sitemapRedirectConflicts = [];
sitemapUrls.forEach(locUrl => {
  const route = locUrl.replace('https://kawaki.co.in', '') || '/';
  if (redirectSources.has(route)) {
    sitemapRedirectConflicts.push({
      locUrl,
      route,
      destination: redirectSources.get(route)
    });
  }
});

if (sitemapRedirectConflicts.length > 0) {
  console.error(`❌ [Sitemap Validator Error] ${sitemapRedirectConflicts.length} sitemap URLs match a redirect source in vercel.json:`);
  console.table(sitemapRedirectConflicts);
  process.exit(1);
}

// 5. Check Registry Integrity
const indexableRegistry = registry.filter(r => r.indexable !== false);
const registryRedirectConflicts = [];
const missingRegistryUrls = [];

indexableRegistry.forEach(entry => {
  const route = entry.kawakiUrl === '' ? '/' : entry.kawakiUrl;
  const expectedLoc = `https://kawaki.co.in${route === '/' ? '/' : route}`;

  if (redirectSources.has(route)) {
    registryRedirectConflicts.push({
      kawakiUrl: route,
      destination: redirectSources.get(route)
    });
  }

  if (!seenUrls.has(expectedLoc)) {
    missingRegistryUrls.push({
      kawakiUrl: route,
      expectedLoc
    });
  }
});

if (registryRedirectConflicts.length > 0) {
  console.error(`❌ [Sitemap Validator Error] ${registryRedirectConflicts.length} indexable registry URLs conflict with a redirect in vercel.json:`);
  console.table(registryRedirectConflicts);
  process.exit(1);
}

if (missingRegistryUrls.length > 0) {
  console.error(`❌ [Sitemap Validator Error] ${missingRegistryUrls.length} indexable registry URLs missing from sitemap.xml:`);
  console.table(missingRegistryUrls);
  process.exit(1);
}

// 6. Canonical URL & Physical File Rules on Disk
const canonicalMismatchErrors = [];

sitemapUrls.forEach(locUrl => {
  const routePath = locUrl.replace('https://kawaki.co.in', '') || '/';
  const relFile = routePath === '/' ? 'index.html' : routePath.replace(/^\//, '') + '.html';
  const physicalPath = path.resolve(publicDir, relFile);

  if (!fs.existsSync(physicalPath)) {
    canonicalMismatchErrors.push({
      locUrl,
      issue: `Physical HTML file missing on disk: public/${relFile}`
    });
    return;
  }

  const html = fs.readFileSync(physicalPath, 'utf8');
  const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                   html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);

  if (!canMatch) {
    canonicalMismatchErrors.push({
      locUrl,
      issue: `Missing <link rel="canonical"> in public/${relFile}`
    });
  } else if (canMatch[1] !== locUrl) {
    canonicalMismatchErrors.push({
      locUrl,
      issue: `Canonical tag mismatch: expected ${locUrl}, found ${canMatch[1]}`
    });
  }
});

if (canonicalMismatchErrors.length > 0) {
  console.error(`❌ [Sitemap Validator Error] ${canonicalMismatchErrors.length} sitemap URLs failed canonical disk checks:`);
  console.table(canonicalMismatchErrors);
  process.exit(1);
}

console.log(`✓ [Sitemap Validator] SUCCESS: ${count} URLs validated.`);
console.log(`  - Exactly 1 <urlset>, 0 tag mismatches`);
console.log(`  - 0 duplicate URLs, 0 malformed URLs`);
console.log(`  - 0 redirect conflicts (zero sitemap URLs match vercel.json redirect sources)`);
console.log(`  - All ${indexableRegistry.length} indexable registry URLs present and verified`);
console.log(`  - 100% self-referencing canonical tags confirmed on disk`);
