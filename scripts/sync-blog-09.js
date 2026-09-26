const fs = require('fs');
const path = require('path');
const { getDb } = require('../lib/db-api-handler.js');

const articleMdPath = path.join(__dirname, '../content/japanese-keyword-hack-wordpress.md');
const content = fs.readFileSync(articleMdPath, 'utf8');

const articleData = {
  id: 'art_japanese_keyword_hack_09',
  title: 'The Japanese Keyword Hack: Forensic Root-Cause Analysis, Cloaking Detection, and HTTP 410 Remediation on WordPress',
  slug: 'japanese-keyword-hack-wordpress',
  author: 'Kunal Sharma',
  featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  tags: ['WordPress Security', 'Malware Removal', 'SEO Spam', 'Forensics'],
  seoKeywords: 'japanese keyword hack wordpress, japanese keyword hack removal, wordpress japanese spam pages, wordpress seo spam cleanup, wordpress cloaking detection, http 410 hacked spam pages, wordpress malware remediation',
  seoDescription: 'Learn how Japanese keyword hacks compromise WordPress sites, generate spam URLs, hide through cloaking, and complicate cleanup. A forensic guide to detection, remediation, HTTP 410 handling, and recovery.',
  excerpt: 'A forensic engineering guide to detecting, isolating, and eradicating the WordPress Japanese Keyword Hack. Covers server-side cloaking detection, database sanitization, and permanent HTTP 410 deindexing.',
  status: 'published',
  views: 214,
  createdAt: '2026-09-24T10:00:00.000Z',
  updatedAt: '2026-09-24T10:00:00.000Z',
  content: content
};

// 1. Insert or Replace in data.db
try {
  const db = getDb();
  if (db) {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO blogs (
        id, title, slug, content, excerpt, status, author, 
        featured_image, tags, seo_keywords, seo_description, 
        views, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, 
        ?, ?, ?
      )
    `);

    const createdAtTs = Math.floor(new Date(articleData.createdAt).getTime() / 1000);
    const updatedAtTs = Math.floor(new Date(articleData.updatedAt).getTime() / 1000);

    stmt.run(
      articleData.id,
      articleData.title,
      articleData.slug,
      articleData.content,
      articleData.excerpt,
      articleData.status,
      articleData.author,
      articleData.featuredImage,
      JSON.stringify(articleData.tags),
      articleData.seoKeywords,
      articleData.seoDescription,
      articleData.views,
      createdAtTs,
      updatedAtTs
    );
    console.log('[PASS] Successfully synced Blog #09 to data.db');
  }
} catch (err) {
  console.error('[FAIL] Error syncing to data.db:', err.message);
}

// 2. Add to FALLBACK_BLOGS in lib/db-api-handler.js if not present
const dbHandlerPath = path.join(__dirname, '../lib/db-api-handler.js');
let dbHandlerContent = fs.readFileSync(dbHandlerPath, 'utf8');

if (!dbHandlerContent.includes('japanese-keyword-hack-wordpress')) {
  // Find the end of FALLBACK_BLOGS array
  const lastArticleMarker = '  {\n    "id": "art_ai_agent_reliability_08"';
  // Let's inspect where FALLBACK_BLOGS ends:
  const fallbackEndMarker = '];\n\nmodule.exports = {';
  const fallbackEndMarkerCRLF = '];\r\n\r\nmodule.exports = {';

  const entryJson = JSON.stringify(articleData, null, 2);
  const formattedEntry = `,\n  ${entryJson.split('\n').join('\n  ')}\n];`;

  if (dbHandlerContent.includes('];\n\nmodule.exports = {')) {
    dbHandlerContent = dbHandlerContent.replace('];\n\nmodule.exports = {', formattedEntry + '\n\nmodule.exports = {');
    fs.writeFileSync(dbHandlerPath, dbHandlerContent, 'utf8');
    console.log('[PASS] Added Blog #09 to FALLBACK_BLOGS in lib/db-api-handler.js');
  } else if (dbHandlerContent.includes('];\r\n\r\nmodule.exports = {')) {
    dbHandlerContent = dbHandlerContent.replace('];\r\n\r\nmodule.exports = {', formattedEntry.replace(/\n/g, '\r\n') + '\r\n\r\nmodule.exports = {');
    fs.writeFileSync(dbHandlerPath, dbHandlerContent, 'utf8');
    console.log('[PASS] Added Blog #09 to FALLBACK_BLOGS (CRLF) in lib/db-api-handler.js');
  } else {
    console.warn('[WARN] Could not find fallbackEndMarker in lib/db-api-handler.js');
  }
} else {
  console.log('[INFO] Blog #09 already in lib/db-api-handler.js');
}

console.log('Finished Blog #09 sync.');
