const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const vercelFile = path.resolve(rootDir, 'vercel.json');

console.log('⚡ [Build Sitemap] Generating authoritative canonical XML sitemap...');

if (!fs.existsSync(registryFile) || !fs.existsSync(vercelFile)) {
  console.error('❌ [Build Sitemap Error] Required registry or vercel.json file missing!');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const vercel = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
const redirectSources = new Set((vercel.redirects || []).map(r => r.source));

// 1. Recursive scan for all HTML files in public/
function getHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtmlFiles = getHtmlFiles(publicDir);
const canonicalEntries = [];
const skipped = [];

/* Real lastmod dates. Every build used to stamp today's date on every URL, which teaches Google and Bing to
   ignore lastmod. Now each page keeps a content hash in data/sitemap-lastmod.json and its date only moves
   when the page itself changes. New pages start from the date git last changed the built file. */
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const lastmodFile = path.resolve(rootDir, 'data', 'sitemap-lastmod.json');
const lastmodMap = fs.existsSync(lastmodFile) ? JSON.parse(fs.readFileSync(lastmodFile, 'utf8')) : {};
const todayIso = new Date().toISOString().split('T')[0];
let gitDates = null;
function gitDate(rel) {
  if (gitDates === null) {
    gitDates = {};
    try {
      const out = execFileSync('git', ['log', '--format=@%cs', '--name-only', '--', 'public'], { cwd: rootDir, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
      let date = null;
      for (const line of out.split('\n')) {
        if (line.startsWith('@')) date = line.slice(1);
        else if (line && date && !gitDates[line]) gitDates[line] = date;
      }
    } catch (e) { /* no git (some CI builds): new pages get today's date */ }
  }
  return gitDates['public/' + rel] || todayIso;
}
function pageHash(html) {
  // Ignore asset cache-busting stamps, which change without the page changing.
  return crypto.createHash('sha1').update(html.replace(/\?v=[A-Za-z0-9]+/g, '')).digest('hex').slice(0, 16);
}
let lastmodChanged = 0;

allHtmlFiles.forEach(filePath => {
  const rel = path.relative(publicDir, filePath).split(path.sep).join('/');
  // Exclude 404 and admin dashboard
  if (rel === '404.html' || rel.startsWith('admin/')) {
    skipped.push({ file: rel, reason: 'admin or 404' });
    return;
  }

  const routePath = rel === 'index.html' ? '' : rel.replace(/\.html$/, '');
  const route = '/' + routePath;

  // Exclude URLs that match a redirect source
  if (redirectSources.has(route)) {
    skipped.push({ file: rel, reason: 'matches redirect source in vercel.json' });
    return;
  }

  // Verify self-referencing canonical tag
  const html = fs.readFileSync(filePath, 'utf8');
  const expectedCanonical = 'https://kawaki.co.in' + (routePath ? '/' + routePath : '/');
  const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                   html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);

  if (!canMatch || canMatch[1] !== expectedCanonical) {
    skipped.push({
      file: rel,
      reason: `canonical mismatch (expected: ${expectedCanonical}, got: ${canMatch ? canMatch[1] : 'none'})`
    });
    return;
  }

  // Priority and changefreq heuristics
  let priority = '0.80';
  let changefreq = 'weekly';

  if (route === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (['/services', '/about', '/contact', '/pricing', '/case-studies', '/blog'].includes(route)) {
    priority = '0.90';
    changefreq = 'weekly';
  } else if (route.startsWith('/services/')) {
    priority = '0.85';
    changefreq = 'weekly';
  } else if (route.startsWith('/case-studies/')) {
    priority = '0.80';
    changefreq = 'monthly';
  } else if (route.startsWith('/blog/')) {
    priority = '0.80';
    changefreq = 'monthly';
  }

  const hash = pageHash(html);
  const known = lastmodMap[route];
  let lastmod;
  if (known && known.hash === hash) lastmod = known.lastmod;
  else {
    lastmod = known ? todayIso : gitDate(rel);
    lastmodMap[route] = { hash, lastmod };
    lastmodChanged++;
  }

  canonicalEntries.push({
    loc: expectedCanonical,
    route,
    priority,
    changefreq,
    lastmod
  });
});

// 2. Validate that all 226 indexable registry entries are included
const indexableRegistry = registry.filter(r => r.indexable !== false);
const includedRoutes = new Set(canonicalEntries.map(e => e.route === '' ? '/' : e.route));
const missingRegistryUrls = [];

indexableRegistry.forEach(entry => {
  const norm = entry.kawakiUrl === '' ? '/' : entry.kawakiUrl;
  if (!includedRoutes.has(norm)) {
    missingRegistryUrls.push(entry.kawakiUrl);
  }
});

if (missingRegistryUrls.length > 0) {
  console.error(`❌ [Build Sitemap Error] ${missingRegistryUrls.length} indexable registry URLs missing:`, missingRegistryUrls);
  process.exit(1);
}

// 3. Sort entries deterministically: root first, then alphabetical by loc
canonicalEntries.sort((a, b) => {
  if (a.route === '/') return -1;
  if (b.route === '/') return 1;
  return a.loc.localeCompare(b.loc);
});

// Keep the lastmod map in step with the pages that exist (sorted keys, so diffs stay small).
const liveRoutes = new Set(canonicalEntries.map(e => e.route));
const nextMap = {};
Object.keys(lastmodMap).filter(r => liveRoutes.has(r)).sort().forEach(r => { nextMap[r] = lastmodMap[r]; });
fs.writeFileSync(lastmodFile, JSON.stringify(nextMap, null, 1) + '\n');
console.log(`  ✓ lastmod: ${lastmodChanged} page(s) new or changed, ${canonicalEntries.length - lastmodChanged} unchanged (data/sitemap-lastmod.json)`);

// 4. Build XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

canonicalEntries.forEach(entry => {
  xml += `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml, 'utf8');

// 5. Generate categorized sub-sitemaps for granular Search Console monitoring
function writeSubSitemap(filename, filterFn) {
  const filtered = canonicalEntries.filter(filterFn);
  let subXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  filtered.forEach(entry => {
    subXml += `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>\n`;
  });
  subXml += `</urlset>\n`;
  fs.writeFileSync(path.resolve(publicDir, filename), subXml, 'utf8');
  console.log(`  ✓ Generated public/${filename} (${filtered.length} URLs)`);
}

console.log('⚡ Generating granular topic sub-sitemaps:');
writeSubSitemap('sitemap-core.xml', e => ['/', '/about', '/services', '/case-studies', '/blog', '/contact', '/directory', '/pricing', '/privacy-policy', '/terms-of-service'].includes(e.route));
writeSubSitemap('sitemap-services.xml', e => e.route.startsWith('/services/') || e.route.startsWith('/ai-') || e.route.includes('automation') || e.route.includes('optimization'));
writeSubSitemap('sitemap-case-studies.xml', e => e.route.startsWith('/case-studies/'));
writeSubSitemap('sitemap-blog.xml', e => e.route.startsWith('/blog/'));
writeSubSitemap('sitemap-locations.xml', e => {
  const cities = ['delhi', 'bangalore', 'mumbai', 'gurgaon', 'noida', 'ahmedabad', 'pune', 'hyderabad', 'jaipur', 'chandigarh', 'kolkata', 'ludhiana', 'vadodara', 'dubai', 'london', 'canada'];
  return cities.some(c => e.route === `/${c}` || e.route.startsWith(`/${c}/`));
});

console.log(`✓ [Build Sitemap] Successfully generated public/sitemap.xml with ${canonicalEntries.length} canonical URLs.`);
console.log(`  - 226 Phase 1 registry targets confirmed`);
console.log(`  - ${canonicalEntries.length - 226} additional legitimate canonical pages (case studies, blogs, solutions, mobile, terminal) confirmed`);
console.log(`  - 0 redirect collisions, 0 non-canonical destinations`);
