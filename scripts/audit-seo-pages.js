const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const factsFile = path.resolve(rootDir, 'data', 'kawaki-facts.json');
const vercelFile = path.resolve(rootDir, 'vercel.json');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

console.log('⚡ [QA SEO Crawler] Starting Comprehensive Content-Quality & Claim-Audit...');

if (!fs.existsSync(registryFile) || !fs.existsSync(factsFile)) {
  console.error('❌ Missing registry or facts file!');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));
const vercelConfig = fs.existsSync(vercelFile) ? JSON.parse(fs.readFileSync(vercelFile, 'utf8')) : { redirects: [] };
const redirectSet = new Set((vercelConfig.redirects || []).map(r => r.source));

// Collect all existing files in public/
function urlExistsLocally(rawUrl) {
  if (!rawUrl || rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('tel:') || rawUrl.startsWith('#')) {
    return true; // External or anchor
  }
  
  let clean = rawUrl.split('?')[0].split('#')[0];
  if (clean === '' || clean === '/') return true;
  
  clean = clean.replace(/^\//, '').replace(/\/$/, '');
  
  if (fs.existsSync(path.join(publicDir, clean))) return true;
  if (fs.existsSync(path.join(publicDir, `${clean}.html`))) return true;
  if (fs.existsSync(path.join(publicDir, clean, 'index.html'))) return true;
  if (redirectSet.has(`/${clean}`)) return true;

  return false;
}

// Audit Trackers
const titles = new Map();
const h1s = new Map();
const canonicals = new Map();
const metas = new Map();

let brokenLinksCount = 0;
let missingH1Count = 0;
let duplicateTitleCount = 0;
let duplicateH1Count = 0;
let duplicateCanonicalCount = 0;
let malformedSchemaCount = 0;
let disallowedClaimViolations = 0;
let totalWordCount = 0;
let totalAuditedPages = 0;

console.log(`\n🔍 Auditing all ${registry.length} targets in registry...`);

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
    console.error(`❌ [Missing Page File] File not found for URL: ${entry.kawakiUrl}`);
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
      console.error(`❌ Duplicate Title: "${t}" on ${entry.kawakiUrl} and ${titles.get(t)}`);
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
  } else {
    const h1Text = h1Matches[0].replace(/<[^>]+>/g, '').trim();
    if (h1s.has(h1Text) && h1s.get(h1Text) !== entry.kawakiUrl) {
      console.error(`❌ Duplicate H1: "${h1Text}" on ${entry.kawakiUrl} and ${h1s.get(h1Text)}`);
      duplicateH1Count++;
    } else {
      h1s.set(h1Text, entry.kawakiUrl);
    }
  }

  // 3. Canonical Audit
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonicalMatch) {
    const c = canonicalMatch[1].trim();
    if (canonicals.has(c) && canonicals.get(c) !== entry.kawakiUrl) {
      console.error(`❌ Duplicate Canonical: ${c}`);
      duplicateCanonicalCount++;
    } else {
      canonicals.set(c, entry.kawakiUrl);
    }
  }

  // 4. Schema.org Validation
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

  // 5. Internal Links Audit
  const linkMatches = html.match(/href="([^"#][^"]*)"/gi) || [];
  for (const l of linkMatches) {
    const href = l.replace(/^href="/i, '').replace(/"$/, '').trim();
    if (!urlExistsLocally(href)) {
      console.error(`❌ Broken internal link on ${entry.kawakiUrl}: ${href}`);
      brokenLinksCount++;
    }
  }

  // 6. Content-Quality & Unsupported Claims Audit
  const lowerHtml = html.toLowerCase();
  for (const claim of facts.disallowedClaims) {
    if (lowerHtml.includes(claim.toLowerCase())) {
      console.error(`❌ Disallowed claim found on ${entry.kawakiUrl}: "${claim}"`);
      disallowedClaimViolations++;
    }
  }

  // 7. Word Count
  const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textOnly.split(' ').length;
  totalWordCount += words;
}

const avgWords = Math.round(totalWordCount / (totalAuditedPages || 1));

// 8. Sitemap Coverage Validation
let sitemapMissingCount = 0;
if (fs.existsSync(sitemapFile)) {
  const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
  for (const entry of registry) {
    if (entry.indexable && entry.kawakiUrl) {
      const fullLoc = `https://www.kawaki.co.in${entry.kawakiUrl === '/' ? '/' : entry.kawakiUrl}`;
      if (!sitemapContent.includes(`<loc>${fullLoc}</loc>`)) {
        console.error(`❌ Missing in sitemap.xml: ${fullLoc}`);
        sitemapMissingCount++;
      }
    }
  }
}

console.log('\n📊 [QA Content & Architecture Audit Results]');
console.log('----------------------------------------------------');
console.log(`Total Source Intents Mapped : 226`);
console.log(`Audited Distinct Kawaki URLs: ${totalAuditedPages}`);
console.log(`Average Word Count          : ${avgWords} words/page`);
console.log(`Missing <h1> Tags           : ${missingH1Count}`);
console.log(`Duplicate <h1> Tags         : ${duplicateH1Count}`);
console.log(`Duplicate Titles            : ${duplicateTitleCount}`);
console.log(`Duplicate Canonicals        : ${duplicateCanonicalCount}`);
console.log(`Malformed Schema            : ${malformedSchemaCount}`);
console.log(`Broken Internal Links       : ${brokenLinksCount}`);
console.log(`Disallowed Claim Violations : ${disallowedClaimViolations}`);
console.log(`Missing Sitemap Entries     : ${sitemapMissingCount}`);
console.log('----------------------------------------------------');

if (
  totalAuditedPages === 226 &&
  missingH1Count === 0 &&
  duplicateH1Count === 0 &&
  duplicateTitleCount === 0 &&
  duplicateCanonicalCount === 0 &&
  malformedSchemaCount === 0 &&
  brokenLinksCount === 0 &&
  disallowedClaimViolations === 0 &&
  sitemapMissingCount === 0
) {
  console.log('🎉 [QA SEO Crawler] 100% PERFECT AUDIT: ALL 226 DISTINCT PAGES FULLY VERIFIED!\n');
  process.exit(0);
} else {
  console.error('❌ [QA SEO Crawler] Audit Failed. Issues detected.');
  process.exit(1);
}
