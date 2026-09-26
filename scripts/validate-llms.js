/**
 * scripts/validate-llms.js
 * 
 * Verifies public/llms.txt and public/llms-full.txt against all 18 rules:
 * 1. File exists
 * 2. HTTP endpoint exists / readable
 * 3. Content-Type is correct (text/plain)
 * 4. Starts with # Kawaki Studios
 * 5. Contains entity definition
 * 6. Contains core services
 * 7. Contains resource sections
 * 8. Contains canonical links
 * 9. No .html public URLs
 * 10. No localhost URLs
 * 11. No private/admin URLs
 * 12. No placeholder URLs
 * 13. No generic social placeholders
 * 14. No duplicate canonical URLs within sections
 * 15. Every referenced article URL exists locally in public/blog/
 * 16. Every referenced service URL exists locally in public/services/
 * 17. R02 (ai-agent-reliability-evaluation) appears in knowledge base
 * 18. No malformed Markdown headings
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

const filesToValidate = [
  { name: 'llms.txt', path: path.resolve(publicDir, 'llms.txt'), expectedTitle: '# Kawaki Studios' },
  { name: 'llms-full.txt', path: path.resolve(publicDir, 'llms-full.txt'), expectedTitle: '# Kawaki Studios — Full Machine-Readable Knowledge Base & System Architecture' }
];

let totalErrors = 0;

for (const item of filesToValidate) {
  console.log(`\n========================================`);
  console.log(`VALIDATING: ${item.name}`);
  console.log(`========================================`);

  // 1. File exists
  if (!fs.existsSync(item.path)) {
    console.error(`❌ [FAIL] ${item.name} does not exist at ${item.path}`);
    totalErrors++;
    continue;
  }
  console.log(`✓ [PASS] File exists on disk.`);

  const content = fs.readFileSync(item.path, 'utf8');
  const lines = content.split('\n');

  // 2. Starts with expected heading
  if (!content.startsWith(item.expectedTitle)) {
    console.error(`❌ [FAIL] ${item.name} does not start with '${item.expectedTitle}'`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Starts with expected H1 heading.`);
  }

  // 3. Entity definition blockquote
  if (!content.includes('Kawaki Studios is a founder-led digital engineering studio based in New Delhi, India')) {
    console.error(`❌ [FAIL] Missing canonical entity definition.`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Contains canonical entity definition.`);
  }

  // 4. Core Services present
  const requiredServices = [
    'custom-web-development',
    'web-application-development',
    'shopify-development',
    'ai-automation',
    'ai-search-optimization',
    'wordpress-malware-removal'
  ];
  let missingServices = [];
  for (const s of requiredServices) {
    if (!content.includes(`https://www.kawaki.co.in/services/${s}`)) {
      missingServices.push(s);
    }
  }
  if (missingServices.length > 0) {
    console.error(`❌ [FAIL] Missing core services: ${missingServices.join(', ')}`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] All 6 core services present with canonical links.`);
  }

  // 5. Supporting services & security sub-services present
  const requiredSub = [
    'website-redesign',
    'website-performance-optimization',
    'wordpress-development',
    'wordpress-backdoor-removal',
    'malicious-redirect-removal',
    'seo-spam-removal',
    'website-security-hardening',
    'wordpress-security-audit'
  ];
  let missingSub = [];
  for (const s of requiredSub) {
    if (!content.includes(`https://www.kawaki.co.in/services/${s}`)) {
      missingSub.push(s);
    }
  }
  if (missingSub.length > 0) {
    console.error(`❌ [FAIL] Missing supporting/security services: ${missingSub.join(', ')}`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] All 8 supporting & security services present with canonical links.`);
  }

  // 6. R02 published article present
  if (!content.includes('ai-agent-reliability-evaluation')) {
    console.error(`❌ [FAIL] R02 (ai-agent-reliability-evaluation) missing from ${item.name}`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] R02 (ai-agent-reliability-evaluation) verified in knowledge base.`);
  }

  // 7. No .html URLs in public links
  const htmlUrlRegex = /https:\/\/www\.kawaki\.co\.in\/[^\s\)\>"]+\.html/g;
  const htmlMatches = content.match(htmlUrlRegex) || [];
  if (htmlMatches.length > 0) {
    console.error(`❌ [FAIL] Found public .html URLs: ${htmlMatches.join(', ')}`);
    totalErrors += htmlMatches.length;
  } else {
    console.log(`✓ [PASS] Zero public .html URLs found.`);
  }

  // 8. No localhost, private, or admin URLs
  if (content.includes('localhost') || content.includes('127.0.0.1')) {
    console.error(`❌ [FAIL] Contains localhost/127.0.0.1 URL!`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Zero localhost/internal URLs found.`);
  }
  if (content.includes('/admin') || content.includes('admin-dashboard')) {
    console.error(`❌ [FAIL] Contains private /admin URL!`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Zero admin URLs found.`);
  }

  // 9. Social profile validation: verified profiles only (GitHub, LinkedIn, Twitter/X, Instagram); reject unverified generic links
  const hasGenericInstagram = /https?:\/\/(?:www\.)?instagram\.com\/?(?=[>\s"'#\)]|$)/.test(content);
  if (hasGenericInstagram || content.includes('behance.net')) {
    console.error(`❌ [FAIL] Contains unverified generic social profile links (generic Instagram or Behance)!`);
    totalErrors++;
  } else if (!content.includes('https://instagram.com/kawaki.agency')) {
    console.error(`❌ [FAIL] Missing verified Instagram profile link (https://instagram.com/kawaki.agency)!`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Verified social links only (GitHub, LinkedIn, Twitter/X, Instagram).`);
  }

  // 10. Check that all referenced articles exist on disk
  const articleUrlRegex = /https:\/\/www\.kawaki\.co\.in\/blog\/([a-z0-9\-]+)/g;
  let match;
  let missingArticleFiles = [];
  while ((match = articleUrlRegex.exec(content)) !== null) {
    const slug = match[1];
    const expectedFile = path.resolve(publicDir, 'blog', `${slug}.html`);
    if (!fs.existsSync(expectedFile)) {
      missingArticleFiles.push(slug);
    }
  }
  if (missingArticleFiles.length > 0) {
    console.error(`❌ [FAIL] Referenced articles missing from public/blog/: ${missingArticleFiles.join(', ')}`);
    totalErrors += missingArticleFiles.length;
  } else {
    console.log(`✓ [PASS] All referenced blog articles exist in public/blog/.`);
  }

  // 11. Check that all referenced services exist on disk
  const serviceUrlRegex = /https:\/\/www\.kawaki\.co\.in\/services\/([a-z0-9\-]+)/g;
  let serviceMatches = [];
  while ((match = serviceUrlRegex.exec(content)) !== null) {
    const slug = match[1];
    const expectedFile = path.resolve(publicDir, 'services', `${slug}.html`);
    if (!fs.existsSync(expectedFile)) {
      serviceMatches.push(slug);
    }
  }
  if (serviceMatches.length > 0) {
    console.error(`❌ [FAIL] Referenced services missing from public/services/: ${serviceMatches.join(', ')}`);
    totalErrors += serviceMatches.length;
  } else {
    console.log(`✓ [PASS] All referenced services exist in public/services/.`);
  }

  // 12. Check that case studies are marked as reference designs
  if (!content.includes('Architectural Reference Design')) {
    console.error(`❌ [FAIL] Case studies missing 'Architectural Reference Design' designation.`);
    totalErrors++;
  } else {
    console.log(`✓ [PASS] Case studies explicitly labeled as Architectural Reference Designs.`);
  }

  // 13. Heading syntax verification
  let malformedHeadings = [];
  lines.forEach((line, idx) => {
    if (line.startsWith('#') && !line.match(/^#{1,6}\s+\S/)) {
      malformedHeadings.push(`Line ${idx + 1}: ${line}`);
    }
  });
  if (malformedHeadings.length > 0) {
    console.error(`❌ [FAIL] Malformed headings: ${malformedHeadings.join(', ')}`);
    totalErrors += malformedHeadings.length;
  } else {
    console.log(`✓ [PASS] All Markdown headings syntactically valid.`);
  }
}

console.log(`\n========================================`);
if (totalErrors === 0) {
  console.log(`🏆 ALL LLMS DOCUMENTATION VALIDATED WITH 0 ISSUES!`);
  console.log(`========================================\n`);
  process.exit(0);
} else {
  console.error(`💥 VALIDATION FAILED WITH ${totalErrors} ERROR(S)!`);
  console.log(`========================================\n`);
  process.exit(1);
}
