const fs = require('fs');
const path = require('path');

const auditData = require('../audit_full_30_urls.json');

console.log('=== FORENSIC QUERY & CONTENT OVERLAP ANALYSIS ===\n');

// 1. Check FAQ schema vs DOM match
console.log('--- 1. FAQ SCHEMA VS DOM VERIFICATION ---');
auditData.filter(p => p.hasFaqSchema).forEach(p => {
  const filePath = path.join(__dirname, '..', 'public', p.file);
  const html = fs.readFileSync(filePath, 'utf8');
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let faqSchemaQuestions = [];
  for (const sm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(sm[1]);
      if (parsed['@type'] === 'FAQPage' && parsed.mainEntity) {
        faqSchemaQuestions = parsed.mainEntity.map(q => q.name);
      }
    } catch(e) {}
  }
  
  // Check if each schema question exists in DOM
  let matchCount = 0;
  for (const q of faqSchemaQuestions) {
    if (html.includes(q)) matchCount++;
  }
  console.log(`${p.path}: Schema FAQs: ${faqSchemaQuestions.length} | In DOM: ${matchCount}/${faqSchemaQuestions.length}`);
});

// 2. Geo presence analysis
console.log('\n--- 2. GEOGRAPHIC SIGNALS ACROSS SITE ---');
auditData.forEach(p => {
  const filePath = path.join(__dirname, '..', 'public', p.file);
  const html = fs.readFileSync(filePath, 'utf8');
  const hasNewDelhi = /new delhi/i.test(html);
  const hasDelhi = /\bdelhi\b/i.test(html);
  const hasIndia = /\bindia\b/i.test(html);
  const hasGlobal = /global/i.test(html);
  console.log(`${p.path.padEnd(45)} | New Delhi: ${hasNewDelhi} | India: ${hasIndia} | Global: ${hasGlobal}`);
});
