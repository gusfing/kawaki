#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../public');
const INDEX_HTML = path.join(ROOT, 'index.html');

console.log('🔍 Collecting asset URLs from index.html...\n');

const html = fs.readFileSync(INDEX_HTML, 'utf-8');

// Patterns to extract: /domain/path, //domain/path, and https://domain/path
const patterns = [
  // Local form: /cdn.shopify.com/path
  /\/(?:cdn\.shopify\.com|www\.gstatic\.com|embed-ssl\.wistia\.com|editions-winter-2026\.myshopify\.com)\/[^\s"'\\)}<>]+/g,
  // Protocol-relative form: //domain/path
  /\/\/(?:cdn\.shopify\.com|www\.gstatic\.com|embed-ssl\.wistia\.com|editions-winter-2026\.myshopify\.com)\/[^\s"'\\)}<>]+/g,
  // Absolute HTTPS form: https://domain/path
  /https:\/\/(?:cdn\.shopify\.com|www\.gstatic\.com|embed-ssl\.wistia\.com|editions-winter-2026\.myshopify\.com)\/[^\s"'\\)}<>]+/g,
];

const assets = new Set();
const metadata = {};

for (const pattern of patterns) {
  const matches = html.matchAll(pattern);
  for (const match of matches) {
    let url = match[0];
    // Normalize to /domain/path form
    if (url.startsWith('//')) {
      url = url.substring(1); // //domain/path → /domain/path
    } else if (url.startsWith('https://')) {
      url = '/' + url.substring(8); // https://domain/path → /domain/path
    }
    // Extract domain and path
    const domainMatch = url.match(/^\/([^\/]+)(\/.*)/);
    if (domainMatch) {
      const domain = domainMatch[1];
      const pathPart = domainMatch[2];
      const [pathname, search] = pathPart.split('?');
      assets.add(JSON.stringify({ domain, path: pathname, search: search ? '?' + search : '' }));
    }
  }
}

// Parse recursively from JS bundles for draco/wistia references
console.log('🔎 Scanning cached JS bundles for dynamic URL patterns...\n');
const jsDir = path.join(ROOT, 'cdn.shopify.com');
if (fs.existsSync(jsDir)) {
  const scanDirRecursive = (dir) => {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          scanDirRecursive(filePath);
        } else if (file.endsWith('.js') && stat.size < 5 * 1024 * 1024) { // Only small-ish JS files
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            // Look for gstatic draco decoder patterns
            const dracoMatches = content.match(/https:\/\/www\.gstatic\.com\/draco\/versioned\/decoders\/[^"'`\s]+/g);
            if (dracoMatches) {
              for (const url of dracoMatches) {
                const pathPart = url.substring('https://www.gstatic.com'.length);
                assets.add(JSON.stringify({ domain: 'www.gstatic.com', path: pathPart, search: '' }));
              }
            }
            // Look for wistia references
            if (content.includes('wistia')) {
              metadata.wistiaFound = true;
            }
          } catch (e) {
            // Skip files we can't read
          }
        }
      }
    } catch (e) {
      // Skip on errors
    }
  };
  scanDirRecursive(jsDir);
}

// Convert to array and sort
const assetList = Array.from(assets).map(a => JSON.parse(a)).sort((a, b) => {
  if (a.domain !== b.domain) return a.domain.localeCompare(b.domain);
  return a.path.localeCompare(b.path);
});

// Write manifest
const manifestPath = path.join(__dirname, 'asset-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(assetList, null, 2));

// Print summary by domain and extension
const summary = {};
for (const asset of assetList) {
  if (!summary[asset.domain]) summary[asset.domain] = {};
  const ext = path.extname(asset.path).substring(1) || '(no ext)';
  summary[asset.domain][ext] = (summary[asset.domain][ext] || 0) + 1;
}

console.log('📊 Asset Summary by Domain & Extension:');
console.log('─'.repeat(60));
for (const domain of Object.keys(summary).sort()) {
  console.log(`\n${domain}:`);
  const exts = Object.entries(summary[domain]).sort((a, b) => b[1] - a[1]);
  for (const [ext, count] of exts) {
    console.log(`  .${ext}${ext === '(no ext)' ? '' : '  '} → ${count}`);
  }
}

console.log('\n' + '─'.repeat(60));
console.log(`✓ Total distinct assets: ${assetList.length}`);
console.log(`✓ Manifest written to: ${manifestPath}`);
if (metadata.wistiaFound) console.log('ℹ️  Wistia references detected (may be dead code)');
