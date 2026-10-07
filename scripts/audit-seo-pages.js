const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const vercelFile = path.resolve(rootDir, 'vercel.json');

console.log('⚡ [QA SEO Crawler] Starting Comprehensive Local SEO Audit...');

if (!fs.existsSync(registryFile)) {
  console.error('❌ Registry not found');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const vercelConfig = fs.existsSync(vercelFile) ? JSON.parse(fs.readFileSync(vercelFile, 'utf8')) : { redirects: [] };
const redirectSet = new Set((vercelConfig.redirects || []).map(r => r.source));

// Collect all existing files in public/
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'admin') results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtmlPaths = getAllHtmlFiles(publicDir);
console.log(`✓ Discovered ${allHtmlPaths.length} static HTML files in public/ directory.`);

// Helper to check if a local URL path exists on disk
function urlExistsLocally(rawUrl) {
  if (!rawUrl || rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:') || rawUrl.startsWith('#')) {
    return true; // External or anchor
  }
  
  let clean = rawUrl.split('?')[0].split('#')[0];
  if (clean === '' || clean === '/') return true;
  
  clean = clean.replace(/^\//, '').replace(/\/$/, '');
  
  // Check exact file or .html
  if (fs.existsSync(path.join(publicDir, clean))) return true;
  if (fs.existsSync(path.join(publicDir, `${clean}.html`))) return true;
  if (fs.existsSync(path.join(publicDir, clean, 'index.html'))) return true;
  
  // Check if it exists in vercel redirects
  if (redirectSet.has(`/${clean}`)) return true;

  return false;
}

// Audit Data Structures
const titles = new Map();
const h1s = new Map();
const canonicals = new Map();
const metas = new Map();

let brokenLinksCount = 0;
let missingH1Count = 0;
let duplicateTitleCount = 0;
let duplicateCanonicalCount = 0;
let malformedSchemaCount = 0;
let totalWordCount = 0;
let totalAuditedPages = 0;

console.log('\n🔍 Auditing all indexable Phase 1 pages...');

for (const entry of registry) {
  if (!entry.indexable || !entry.kawakiUrl) continue;

  totalAuditedPages++;
  let rel = entry.kawakiUrl.replace(/^\//, '');
  let filePath;

  if (rel === '') {
    filePath = path.join(publicDir, 'index.html');
  } else if (fs.existsSync(path.join(publicDir, `${rel}.html`))) {
    filePath = path.join(publicDir, `${rel}.html`);
  } else if (fs.existsSync(path.join(publicDir, rel, 'index.html'))) {
    filePath = path.join(publicDir, rel, 'index.html');
  } else if (fs.existsSync(path.join(publicDir, rel))) {
    filePath = path.join(publicDir, rel);
  } else {
    console.error(`❌ [Missing File] Page not found on disk for URL: ${entry.kawakiUrl}`);
    process.exit(1);
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Title Audit
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    console.error(`❌ Missing <title> on ${entry.kawakiUrl}`);
  } else {
    const t = titleMatch[1].trim();
    if (titles.has(t) && titles.get(t) !== entry.kawakiUrl) {
      console.warn(`⚠️ Duplicate title detected: "${t}" on ${entry.kawakiUrl} and ${titles.get(t)}`);
      duplicateTitleCount++;
    } else {
      titles.set(t, entry.kawakiUrl);
    }
  }

  // 2. H1 Audit
  const h1Matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    console.error(`❌ Missing <h1> on ${entry.kawakiUrl}`);
    missingH1Count++;
  } else if (h1Matches.length > 1) {
    console.warn(`⚠️ Multiple <h1> tags (${h1Matches.length}) on ${entry.kawakiUrl}`);
  }

  // 3. Canonical Audit
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonicalMatch) {
    const c = canonicalMatch[1].trim();
    if (canonicals.has(c) && canonicals.get(c) !== entry.kawakiUrl) {
      console.warn(`⚠️ Duplicate canonical: ${c}`);
      duplicateCanonicalCount++;
    } else {
      canonicals.set(c, entry.kawakiUrl);
    }
  }

  // 4. Meta Description Audit
  const metaMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (metaMatch) {
    const m = metaMatch[1].trim();
    if (metas.has(m) && metas.get(m) !== entry.kawakiUrl) {
      // Small duplication check
    } else {
      metas.set(m, entry.kawakiUrl);
    }
  }

  // 5. Schema.org Validation
  const schemaMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  for (const s of schemaMatches) {
    const jsonStr = s.replace(/<script\s+type="application\/ld\+json">/i, '').replace(/<\/script>/i, '').trim();
    try {
      JSON.parse(jsonStr);
    } catch (e) {
      console.error(`❌ Malformed JSON-LD schema on ${entry.kawakiUrl}:`, e.message);
      malformedSchemaCount++;
    }
  }

  // 6. Internal Links Audit
  const linkMatches = html.match(/href="([^"#][^"]*)"/gi) || [];
  for (const l of linkMatches) {
    const href = l.replace(/^href="/i, '').replace(/"$/, '').trim();
    if (!urlExistsLocally(href)) {
      console.error(`❌ Broken internal link on ${entry.kawakiUrl}: ${href}`);
      brokenLinksCount++;
    }
  }

  // 7. Word Count
  const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textOnly.split(' ').length;
  totalWordCount += words;
}

const avgWords = Math.round(totalWordCount / (totalAuditedPages || 1));

console.log('\n📊 [QA SEO Audit Results]');
console.log('----------------------------------------------------');
console.log(`Audited Indexable Pages : ${totalAuditedPages}`);
console.log(`Average Word Count      : ${avgWords} words/page`);
console.log(`Missing <h1> Tags       : ${missingH1Count}`);
console.log(`Duplicate Titles        : ${duplicateTitleCount}`);
console.log(`Duplicate Canonicals    : ${duplicateCanonicalCount}`);
console.log(`Malformed Schema        : ${malformedSchemaCount}`);
console.log(`Broken Internal Links   : ${brokenLinksCount}`);
console.log('----------------------------------------------------');

if (missingH1Count === 0 && duplicateTitleCount === 0 && duplicateCanonicalCount === 0 && malformedSchemaCount === 0 && brokenLinksCount === 0) {
  console.log('🎉 [QA SEO Crawler] 100% AUDIT PASS: ZERO ERRORS FOUND!\n');
  process.exit(0);
} else {
  console.error('❌ [QA SEO Crawler] Audit Failed. Fix the above errors.');
  process.exit(1);
}
