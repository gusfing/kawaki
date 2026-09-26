const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

console.log('=== SYNCING BLOG #11 ACROSS ALL DATABASE LAYERS & FALLBACK_BLOGS ===');

// 1. Read source markdown files
const blog09Md = fs.readFileSync(path.resolve('content/japanese-keyword-hack-wordpress.md'), 'utf8');
const blog10Md = fs.readFileSync(path.resolve('content/wordpress-backdoors-stealth-web-shells.md'), 'utf8');
const blog11Md = fs.readFileSync(path.resolve('content/wordpress-malicious-redirects-cleanup.md'), 'utf8');

// Blog #11 metadata
const blog11Data = {
  id: 'art_wordpress_malicious_redirects_11',
  title: 'WordPress Malicious Redirects: Forensic Investigation of Injected JavaScript, Conditional .htaccess Hijacks, and Mobile-Only Redirect Remediation',
  slug: 'wordpress-malicious-redirects-cleanup',
  author: 'Kunal Sharma',
  featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  tags: [
    'WordPress Security',
    'Malware Removal',
    'Forensics',
    'Redirects',
    'System Hardening'
  ],
  seoKeywords: 'wordpress malicious redirects, wordpress hacked redirect, wordpress redirects users to another site, wordpress redirect malware, wordpress mobile redirect hack, wordpress redirect only for google users, wordpress conditional redirects, malicious javascript redirects wordpress, htaccess redirect hack wordpress, wordpress redirect malware cleanup, wordpress hacked website redirect removal',
  seoDescription: 'A forensic engineering guide to detecting, diagnosing, and eradicating WordPress malicious redirects, injected JavaScript, conditional .htaccess hijacks, and mobile traffic gating.',
  excerpt: 'A forensic engineering guide to detecting, diagnosing, and eradicating WordPress malicious redirects, covering injected JavaScript, conditional .htaccess rules, and mobile-only gating.',
  status: 'published',
  views: 195,
  created_at: 1790416800, // 2026-09-26T10:00:00.000Z
  updated_at: 1790416800
};

// 2. Sync to all 3 SQLite databases
const targets = [
  'admin-dashboard/backend/data.db',
  'admin-dashboard/data.db',
  'data.db'
];

targets.forEach(p => {
  const full = path.resolve(p);
  if (!fs.existsSync(full)) {
    console.warn(`[Skip] Database not found: ${p}`);
    return;
  }
  const db = new DatabaseSync(full);
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

  // Update Blog 09
  const row09 = db.prepare("SELECT * FROM blogs WHERE slug = 'japanese-keyword-hack-wordpress'").get();
  if (row09) {
    stmt.run(
      row09.id,
      row09.title,
      row09.slug,
      blog09Md,
      row09.excerpt,
      row09.status,
      row09.author,
      row09.featured_image,
      typeof row09.tags === 'string' ? row09.tags : JSON.stringify(row09.tags),
      row09.seo_keywords,
      row09.seo_description,
      row09.views,
      row09.created_at,
      row09.updated_at
    );
  }

  // Update Blog 10
  const row10 = db.prepare("SELECT * FROM blogs WHERE slug = 'wordpress-backdoors-stealth-web-shells'").get();
  if (row10) {
    stmt.run(
      row10.id,
      row10.title,
      row10.slug,
      blog10Md,
      row10.excerpt,
      row10.status,
      row10.author,
      row10.featured_image,
      typeof row10.tags === 'string' ? row10.tags : JSON.stringify(row10.tags),
      row10.seo_keywords,
      row10.seo_description,
      row10.views,
      row10.created_at,
      row10.updated_at
    );
  }

  // Insert/Update Blog 11
  stmt.run(
    blog11Data.id,
    blog11Data.title,
    blog11Data.slug,
    blog11Md,
    blog11Data.excerpt,
    blog11Data.status,
    blog11Data.author,
    blog11Data.featuredImage,
    JSON.stringify(blog11Data.tags),
    blog11Data.seoKeywords,
    blog11Data.seoDescription,
    blog11Data.views,
    blog11Data.created_at,
    blog11Data.updated_at
  );

  const count = db.prepare("SELECT COUNT(*) as c FROM blogs WHERE status = 'published'").get().c;
  console.log(`✓ Synchronized ${p} (Total published blogs: ${count})`);
});

// 3. Update lib/db-api-handler.js FALLBACK_BLOGS
const dbHandlerPath = path.resolve('lib/db-api-handler.js');
let dbHandlerContent = fs.readFileSync(dbHandlerPath, 'utf8');

const blog11FallbackObj = {
  id: blog11Data.id,
  title: blog11Data.title,
  slug: blog11Data.slug,
  author: blog11Data.author,
  featuredImage: blog11Data.featuredImage,
  tags: blog11Data.tags,
  seoKeywords: blog11Data.seoKeywords,
  seoDescription: blog11Data.seoDescription,
  excerpt: blog11Data.excerpt,
  status: blog11Data.status,
  views: blog11Data.views,
  createdAt: new Date(blog11Data.created_at * 1000).toISOString(),
  updatedAt: new Date(blog11Data.updated_at * 1000).toISOString(),
  content: blog11Md
};

// Check if Blog 11 is in FALLBACK_BLOGS
const handlerBeforeFunc = dbHandlerContent.substring(0, dbHandlerContent.indexOf('function handleApiRequest'));

if (!handlerBeforeFunc.includes('wordpress-malicious-redirects-cleanup')) {
  // Find where Blog #10 ends in FALLBACK_BLOGS
  const blog10Marker = '"slug": "wordpress-backdoors-stealth-web-shells"';
  const blog10Idx = dbHandlerContent.indexOf(blog10Marker);
  if (blog10Idx !== -1) {
    const closingBracket = dbHandlerContent.indexOf('  }\n];\n\nfunction handleApiRequest', blog10Idx);
    const closingBracketCRLF = dbHandlerContent.indexOf('  }\r\n];\r\n\r\nfunction handleApiRequest', blog10Idx);

    const entryJson = JSON.stringify(blog11FallbackObj, null, 2);
    const formatted = `  },\n  ${entryJson.split('\n').join('\n  ')}\n];\n\nfunction handleApiRequest`;

    if (closingBracket !== -1) {
      dbHandlerContent = dbHandlerContent.replace('  }\n];\n\nfunction handleApiRequest', formatted);
      console.log('✓ Appended Blog #11 to FALLBACK_BLOGS (LF)');
    } else if (closingBracketCRLF !== -1) {
      dbHandlerContent = dbHandlerContent.replace('  }\r\n];\r\n\r\nfunction handleApiRequest', formatted.replace(/\n/g, '\r\n'));
      console.log('✓ Appended Blog #11 to FALLBACK_BLOGS (CRLF)');
    } else {
      console.error('⚠️ Could not find exact insertion marker for Blog #11 in FALLBACK_BLOGS');
    }
  } else {
    console.error('⚠️ Could not find Blog #10 marker in FALLBACK_BLOGS');
  }
} else {
  console.log('✓ Blog #11 already present in FALLBACK_BLOGS');
}

fs.writeFileSync(dbHandlerPath, dbHandlerContent, 'utf8');
console.log('✓ Saved updated lib/db-api-handler.js');
console.log('=== SYNC COMPLETE ===');
