/**
 * Kawaki Studios - Automated RSS 2.0 & Atom Feed Generator
 * Generates public/rss.xml and public/feed.xml from published articles, case studies, and core pages.
 */

const fs = require('fs');
const path = require('path');
const { FALLBACK_BLOGS, getDb, formatBlogRow } = require('../lib/db-api-handler.js');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const rssFile = path.join(publicDir, 'rss.xml');
const feedFile = path.join(publicDir, 'feed.xml');

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getArticles() {
  const articlesMap = new Map();

  if (Array.isArray(FALLBACK_BLOGS)) {
    for (const b of FALLBACK_BLOGS) {
      if (b.status === 'published' && b.slug) {
        articlesMap.set(b.slug, { ...b });
      }
    }
  }

  try {
    const db = getDb();
    if (db) {
      const rows = db.prepare("SELECT * FROM blogs WHERE status = 'published'").all();
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const formatted = formatBlogRow(row);
          if (formatted && formatted.slug) {
            articlesMap.set(formatted.slug, formatted);
          }
        }
      }
    }
  } catch (err) {
    // fallback is already loaded
  }

  return Array.from(articlesMap.values()).sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function buildRssXml() {
  const articles = getArticles();
  const buildDate = new Date().toUTCString();

  const itemsXml = articles.map(art => {
    const url = `https://kawaki.co.in/blog/${art.slug}`;
    const pubDate = art.createdAt ? new Date(art.createdAt).toUTCString() : buildDate;
    const author = art.author || 'Kunal Sharma';
    const description = art.excerpt || art.seoDescription || art.title;

    return `    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <author>studio@kawaki.co.in (${escapeXml(author)})</author>
      <pubDate>${pubDate}</pubDate>
      ${(art.tags || []).map(t => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kawaki Studios Insights &amp; Engineering</title>
    <link>https://kawaki.co.in/blog</link>
    <description>Custom web engineering, headless commerce, performance architecture, and AI automation insights from Kawaki Studios.</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://kawaki.co.in/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>
`;

  fs.writeFileSync(rssFile, xml, 'utf8');
  fs.writeFileSync(feedFile, xml, 'utf8');
  console.log(`✓ [Build RSS] Wrote public/rss.xml and public/feed.xml (${articles.length} items)`);
}

if (require.main === module) {
  buildRssXml();
}

module.exports = { buildRssXml };
