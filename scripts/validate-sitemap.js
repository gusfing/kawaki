const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

console.log('⚡ [Sitemap Validator] Verifying public/sitemap.xml XML integrity...');

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ [Sitemap Validator Error] public/sitemap.xml does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(sitemapPath, 'utf8');

// 1. Strict Tag Balancing Check
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

// 2. Structural Parsing Check using Regex Parser
const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
let match;
let count = 0;
const seenUrls = new Set();
const duplicates = [];
const malformedUrls = [];

while ((match = urlBlockRegex.exec(content)) !== null) {
  count++;
  const block = match[1];
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) {
    console.error(`❌ [Sitemap Validator Error] Entry #${count} is missing <loc>! Block snippet:\n${block}`);
    process.exit(1);
  }
  const locUrl = locMatch[1].trim();
  if (!locUrl.startsWith('https://www.kawaki.co.in/')) {
    malformedUrls.push(locUrl);
  }
  if (seenUrls.has(locUrl)) {
    duplicates.push(locUrl);
  }
  seenUrls.add(locUrl);
}

if (count !== openUrls) {
  console.error(`❌ [Sitemap Validator Error] Malformed block detected: parsed ${count} valid <url> blocks out of ${openUrls} tags!`);
  process.exit(1);
}

if (duplicates.length > 0) {
  console.error(`❌ [Sitemap Validator Error] Found ${duplicates.length} duplicate URLs:\n${duplicates.join('\n')}`);
  process.exit(1);
}

if (malformedUrls.length > 0) {
  console.error(`❌ [Sitemap Validator Error] Found ${malformedUrls.length} non-canonical URLs:\n${malformedUrls.join('\n')}`);
  process.exit(1);
}

console.log(`✓ [Sitemap Validator] SUCCESS: ${count} URLs validated. Exactly 1 <urlset>, 0 tag mismatches, 0 duplicates, 0 malformed URLs.`);
