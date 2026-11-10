const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { DatabaseSync } = require('node:sqlite');
const {
  rootDir,
  contentDir,
  publicDir,
  blogHtmlDir,
  queueFile,
  historyFile,
  dbCandidates
} = require('./config.js');
const { parseFrontmatter, auditArticle } = require('./quality-gate.js');
const { publishToGoogleBusinessProfile } = require('./gbp-publisher.js');

function logHistory(entry) {
  let history = [];
  if (fs.existsSync(historyFile)) {
    try {
      history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    } catch (e) {
      history = [];
    }
  }
  history.unshift(entry);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), 'utf8');
}

function updateDatabases(article) {
  const insertSql = `
    INSERT INTO blogs (id, title, slug, content, excerpt, status, author, featured_image, tags, seo_keywords, seo_description, views, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title,
      slug=excluded.slug,
      content=excluded.content,
      excerpt=excluded.excerpt,
      status=excluded.status,
      author=excluded.author,
      featured_image=excluded.featured_image,
      tags=excluded.tags,
      seo_keywords=excluded.seo_keywords,
      seo_description=excluded.seo_description,
      views=excluded.views,
      created_at=excluded.created_at,
      updated_at=excluded.updated_at
  `;

  let updatedCount = 0;
  const createdAtUnix = Math.floor(new Date().getTime() / 1000);
  const updatedAtUnix = createdAtUnix;

  for (const dbPath of dbCandidates) {
    if (fs.existsSync(dbPath)) {
      try {
        const db = new DatabaseSync(dbPath);
        // Find existing ID by slug if already present
        let targetId = article.id;
        try {
          const existing = db.prepare('SELECT id FROM blogs WHERE slug = ?').get(article.slug);
          if (existing && existing.id) {
            targetId = existing.id;
          }
        } catch (e) {}

        if (!targetId) {
          targetId = `art_${article.slug.replace(/[^a-z0-9]/gi, '_')}`;
        }

        const stmt = db.prepare(insertSql);
        stmt.run(
          targetId,
          article.title,
          article.slug,
          article.content,
          article.excerpt || '',
          'published',
          article.author || 'Kunal Sharma',
          article.featuredImage || '/assets/images/about_hero_bg.jpg',
          JSON.stringify(article.tags || ['Web Development']),
          article.seoKeywords || '',
          article.seoDescription || '',
          article.views || 0,
          createdAtUnix,
          updatedAtUnix
        );
        updatedCount++;
        console.log(`   ✓ Updated SQLite database: ${path.relative(rootDir, dbPath)} (ID: ${targetId})`);
      } catch (err) {
        console.warn(`   ⚠️ SQLite update note on ${dbPath}: ${err.message}`);
      }
    }
  }
  return updatedCount;
}

function updateQueueStatus(slug) {
  if (!fs.existsSync(queueFile)) return;
  try {
    const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
    const item = queue.find(q => q.slug === slug);
    if (item) {
      item.status = 'published';
      item.publishedAt = new Date().toISOString();
      fs.writeFileSync(queueFile, JSON.stringify(queue, null, 2), 'utf8');
      console.log(`   ✓ Marked queue item "${slug}" as published in content-queue.json`);
    }
  } catch (e) {
    console.warn('   ⚠️ Could not update queueFile:', e.message);
  }
}

async function publishMarkdownFile(filePath) {
  console.log(`\n======================================================`);
  console.log(`🚀 [Blog Publisher] Processing: ${path.basename(filePath)}`);
  console.log(`======================================================`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { metadata, content } = parseFrontmatter(raw);

  const slug = metadata.slug || path.basename(filePath, '.md');
  const article = {
    id: metadata.id,
    slug: slug,
    title: metadata.title || 'Untitled Post',
    excerpt: metadata.excerpt || '',
    author: metadata.author || 'Kunal Sharma',
    featuredImage: metadata.featuredImage || metadata.featured_image || '/assets/images/about_hero_bg.jpg',
    tags: metadata.tags || ['Web Development'],
    seoKeywords: metadata.seoKeywords || metadata.seo_keywords || '',
    seoDescription: metadata.seoDescription || metadata.seo_description || '',
    views: metadata.views || 0,
    content: content
  };

  // 1. Run Editorial Quality Gate
  console.log(`\n🔍 [Step 1/5] Auditing Editorial & Technical Quality...`);
  const audit = auditArticle(article);

  if (audit.warnings.length > 0) {
    console.log(`   ⚠️ Warnings (${audit.warnings.length}):`);
    audit.warnings.forEach(w => console.log(`      - ${w}`));
  }

  if (!audit.passed) {
    console.error(`\n❌ [Quality Gate REJECTED] Article failed verification:`);
    audit.issues.forEach(iss => console.error(`   - ${iss}`));
    logHistory({
      timestamp: new Date().toISOString(),
      slug: article.slug,
      status: 'failed_quality_gate',
      errors: audit.issues
    });
    return { success: false, errors: audit.issues };
  }

  console.log(`   ✓ Quality Gate Passed: ${audit.wordCount} words, ${audit.h2Count} H2s, ${audit.internalLinksCount} internal links, zero disallowed claims.`);

  // 2. Persist to SQLite Databases
  console.log(`\n💾 [Step 2/5] Ingesting into SQLite Database...`);
  updateDatabases(article);

  // 3. Compile Static HTML & Sitemap via build-blog.js
  console.log(`\n⚡ [Step 3/5] Building Blog Static Artifacts & Sitemap...`);
  try {
    const buildOutput = execSync('node scripts/build-blog.js', { cwd: rootDir, encoding: 'utf8' });
    console.log(buildOutput.split('\n').filter(l => l.startsWith('✓') || l.startsWith('  ->') || l.startsWith('🚀')).join('\n'));
  } catch (err) {
    console.error(`❌ [Build Error] scripts/build-blog.js failed:`, err.message);
    return { success: false, error: err.message };
  }

  // Verify HTML file was generated
  const outputHtml = path.join(blogHtmlDir, `${slug}.html`);
  if (!fs.existsSync(outputHtml)) {
    console.error(`❌ [Verification Error] Expected output file not found: ${outputHtml}`);
    return { success: false, error: `Output HTML ${outputHtml} missing` };
  }
  console.log(`   ✓ Verified public/blog/${slug}.html generated (${(fs.statSync(outputHtml).size / 1024).toFixed(1)} KB)`);

  // 4. Update Queue File
  console.log(`\n📋 [Step 4/5] Updating Topic Queue & Schedule History...`);
  updateQueueStatus(slug);

  // 5. Rapid Search Engine Indexing
  const canonicalUrl = `https://kawaki.co.in/blog/${slug}`;
  console.log(`\n🌐 [Step 5/5] Triggering Rapid Search Engine Indexing...`);
  console.log(`   Target: ${canonicalUrl}`);

  // IndexNow
  try {
    const indexNowOut = execSync(`node scripts/submit-indexnow.js ${canonicalUrl}`, { cwd: rootDir, encoding: 'utf8' });
    const match = indexNowOut.match(/HTTP \d+ \w+/);
    console.log(`   ✓ [IndexNow / Bing] Response: ${match ? match[0] : 'Submitted'}`);
  } catch (e) {
    console.warn(`   ⚠️ [IndexNow] Ping note: ${e.message}`);
  }

  // Google Rapid Indexing API
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(rootDir, 'service-account.json');
  if (fs.existsSync(keyFile)) {
    try {
      const gIndexOut = execSync(`node scripts/speed-index.js ${canonicalUrl}`, { cwd: rootDir, encoding: 'utf8' });
      const okLine = gIndexOut.split('\n').find(l => l.includes('URL_UPDATED') || l.includes('✓'));
      console.log(`   ✓ [Google Indexing API] ${okLine ? okLine.trim() : 'Submitted event to Googlebot'}`);
    } catch (e) {
      console.warn(`   ℹ️ [Google Indexing API] Ping note: ${e.message}`);
    }
  } else {
    console.log(`   ℹ️ [Google Indexing API] service-account.json not active; Googlebot will discover via updated sitemap.xml.`);
  }

  // Google Business Profile (Local Post via Windsor)
  try {
    await publishToGoogleBusinessProfile(article, canonicalUrl);
  } catch (gbpErr) {
    console.warn(`   ⚠️ [GBP Automation] Error posting update:`, gbpErr.message);
  }

  logHistory({
    timestamp: new Date().toISOString(),
    slug: article.slug,
    title: article.title,
    wordCount: audit.wordCount,
    canonicalUrl,
    status: 'published'
  });

  console.log(`\n🎉 [Blog Publisher] Successfully published and indexed "${article.title}"!\n`);
  return { success: true, slug, canonicalUrl };
}

module.exports = {
  publishMarkdownFile,
  updateDatabases
};
