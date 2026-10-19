const { getDb } = require('../lib/db-api-handler.js');

const db = getDb();
if (!db) {
  console.error('Could not connect to db');
  process.exit(1);
}

const tableInfo = db.prepare('PRAGMA table_info(blogs)').all();
console.log('Columns:', tableInfo.map(c => c.name));

const mapping = {
  'what-is-editorial-engineering': '/assets/images/blog/editorial-engineering-vs-traditional-frontend.webp',
  'headless-shopify-development-guide': '/assets/images/blog/headless-editorial-commerce-architecture.webp',
  'webflow-vs-custom-development': '/assets/images/blog/webflow-vs-custom-development-architecture-spectrum.webp',
  'nextjs-server-vs-client-components': '/assets/images/blog/nextjs-server-client-component-tree-boundary.webp',
  'nextjs-state-management-api-boundaries': '/assets/images/blog/nextjs-server-client-state-flow.webp',
  'nextjs-performance-architecture': '/assets/images/blog/nextjs-critical-rendering-path-waterfall.webp',
  'ai-automation-architecture': '/assets/images/blog/ai-automation-tiered-system-architecture.webp',
  'ai-agent-reliability-evaluation': '/assets/images/blog/ai-agent-reliability-testing-pyramid.webp',
  'japanese-keyword-hack-wordpress': '/assets/images/blog/japanese-keyword-hack-infection-kill-chain.webp',
  'wordpress-backdoors-stealth-web-shells': '/assets/images/blog/wordpress-backdoor-persistence-lifecycle.webp',
  'wordpress-malicious-redirects-cleanup': '/assets/images/blog/wordpress-malicious-redirect-execution-flow.webp',
  'custom-web-development-vs-no-code': '/assets/images/blog/custom-code-vs-nocode-decision-matrix-chart.webp',
  'shopify-liquid-vs-headless': '/assets/images/blog/shopify-theme-vs-headless-architecture-comparison.webp',
  'ai-automation-vs-ai-agents': '/assets/images/blog/ai-automation-vs-ai-agent-decision-matrix.webp',
  'how-ai-search-engines-cite-sources': '/assets/images/blog/deterministic-code-vs-probabilistic-llm-boundary.webp',
  'what-to-prepare-before-hiring-web-development-agency': '/assets/images/blog/what-to-prepare-before-hiring-web-development-agency.webp',
  'how-to-evaluate-a-web-development-proposal-beyond-price': '/assets/images/blog/how-to-evaluate-a-web-development-proposal-beyond-price.webp'
};

const updateStmt = db.prepare('UPDATE blogs SET featured_image = ? WHERE slug = ?');

let updated = 0;
for (const [slug, imgPath] of Object.entries(mapping)) {
  const res = updateStmt.run(imgPath, slug);
  if (res.changes > 0) {
    updated += res.changes;
    console.log(`Updated [${slug}] -> ${imgPath}`);
  }
}

console.log(`Total rows updated in database: ${updated}`);

// Also update FALLBACK_BLOGS in lib/db-api-handler.js
const fs = require('fs');
const handlerPath = require('path').resolve(__dirname, '../lib/db-api-handler.js');
let lines = fs.readFileSync(handlerPath, 'utf8').split('\n');
let handlerUpdated = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const [slug, imgPath] of Object.entries(mapping)) {
    if (line.includes(`"slug": "${slug}"`)) {
      // Check surrounding 10 lines for featuredImage
      for (let j = Math.max(0, i - 8); j < Math.min(lines.length, i + 8); j++) {
        if (lines[j].includes('"featuredImage":')) {
          lines[j] = lines[j].replace(/"featuredImage":\s*"[^"]+"/, `"featuredImage": "${imgPath}"`);
          handlerUpdated++;
          console.log(`Updated FALLBACK_BLOGS [${slug}] -> ${imgPath}`);
          break;
        }
      }
      break;
    }
  }
}

fs.writeFileSync(handlerPath, lines.join('\n'), 'utf8');
console.log(`Updated FALLBACK_BLOGS in lib/db-api-handler.js: ${handlerUpdated}`);


