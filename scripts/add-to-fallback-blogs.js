const fs = require('fs');
const path = require('path');

const dbHandlerPath = path.join(__dirname, '../lib/db-api-handler.js');
let content = fs.readFileSync(dbHandlerPath, 'utf8');

const articleMdPath = path.join(__dirname, '../content/japanese-keyword-hack-wordpress.md');
const articleMd = fs.readFileSync(articleMdPath, 'utf8');

const article09 = {
  id: "art_japanese_keyword_hack_09",
  title: "The Japanese Keyword Hack: Forensic Root-Cause Analysis, Cloaking Detection, and HTTP 410 Remediation on WordPress",
  slug: "japanese-keyword-hack-wordpress",
  author: "Kunal Sharma",
  featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  tags: [
    "WordPress Security",
    "Malware Removal",
    "SEO Spam",
    "Forensics"
  ],
  seoKeywords: "japanese keyword hack wordpress, japanese keyword hack removal, wordpress japanese spam pages, wordpress seo spam cleanup, wordpress cloaking detection, http 410 hacked spam pages, wordpress malware remediation",
  seoDescription: "Learn how Japanese keyword hacks compromise WordPress sites, generate spam URLs, hide through cloaking, and complicate cleanup. A forensic guide to detection, remediation, HTTP 410 handling, and recovery.",
  excerpt: "A forensic engineering guide to detecting, isolating, and eradicating the WordPress Japanese Keyword Hack. Covers server-side cloaking detection, database sanitization, and permanent HTTP 410 deindexing.",
  status: "published",
  views: 214,
  createdAt: "2026-09-24T10:00:00.000Z",
  updatedAt: "2026-09-24T10:00:00.000Z",
  content: articleMd
};

if (content.includes('japanese-keyword-hack-wordpress')) {
  console.log('[INFO] Article already in lib/db-api-handler.js');
} else {
  const targetEnd = `}\r\n];\r\n\r\nfunction handleApiRequest`;
  const targetEndLF = `}\n];\n\nfunction handleApiRequest`;

  const newArticleJson = JSON.stringify(article09, null, 2);
  const indentedJson = newArticleJson.split('\n').map(line => '  ' + line).join('\n');

  if (content.includes(targetEnd)) {
    const replacement = `},\r\n${indentedJson.replace(/\n/g, '\r\n')}\r\n];\r\n\r\nfunction handleApiRequest`;
    content = content.replace(targetEnd, replacement);
    fs.writeFileSync(dbHandlerPath, content, 'utf8');
    console.log('[PASS] Inserted Blog #09 into FALLBACK_BLOGS (CRLF)');
  } else if (content.includes(targetEndLF)) {
    const replacement = `},\n${indentedJson}\n];\n\nfunction handleApiRequest`;
    content = content.replace(targetEndLF, replacement);
    fs.writeFileSync(dbHandlerPath, content, 'utf8');
    console.log('[PASS] Inserted Blog #09 into FALLBACK_BLOGS (LF)');
  } else {
    console.error('[FAIL] Could not find targetEnd in lib/db-api-handler.js');
  }
}
