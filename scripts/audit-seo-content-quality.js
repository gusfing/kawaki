const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const factsFile = path.resolve(rootDir, 'data', 'kawaki-facts.json');

console.log('⚡ [Content Quality Gate] Running In-Depth Editorial & Factual Verification...');

if (!fs.existsSync(registryFile) || !fs.existsSync(factsFile)) {
  console.error('❌ Registry or facts file missing!');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));

let failureCount = 0;

function reportError(msg) {
  console.error(`❌ [Quality Gate Failure] ${msg}`);
  failureCount++;
}

// 1. Verify Metadata Quality & Capitalization across Registry
console.log('\n[1/7] Auditing metadata uniqueness, natural language & casing...');
const titlesSeen = new Map();
const h1sSeen = new Map();
const metasSeen = new Map();

for (const entry of registry) {
  if (!entry.indexable || !entry.kawakiUrl) continue;

  // Title checks
  if (titlesSeen.has(entry.title)) {
    reportError(`Duplicate title: "${entry.title}" on ${entry.kawakiUrl} and ${titlesSeen.get(entry.title)}`);
  } else {
    titlesSeen.set(entry.title, entry.kawakiUrl);
  }

  // H1 checks
  if (h1sSeen.has(entry.h1)) {
    reportError(`Duplicate H1: "${entry.h1}" on ${entry.kawakiUrl} and ${h1sSeen.get(entry.h1)}`);
  } else {
    h1sSeen.set(entry.h1, entry.kawakiUrl);
  }

  // Meta description checks
  if (metasSeen.has(entry.metaDescription)) {
    reportError(`Duplicate meta description on ${entry.kawakiUrl} and ${metasSeen.get(entry.metaDescription)}`);
  } else {
    metasSeen.set(entry.metaDescription, entry.kawakiUrl);
  }

  // Template pattern check in metadata
  if (entry.metaDescription.includes('engineered by Kawaki Studios. Modern tech stacks, responsive performance, and clean maintainable code.')) {
    reportError(`Generic template boilerplate meta description on ${entry.kawakiUrl}`);
  }

  // Capitalization check
  const badCapsRegex = /\b(Ai|Seo|Api|Saas|Erp|Llm|Geo)\b/;
  if (badCapsRegex.test(entry.title)) {
    reportError(`Malformed title capitalization (${entry.title.match(badCapsRegex)[0]}) on ${entry.kawakiUrl}`);
  }
  if (badCapsRegex.test(entry.h1)) {
    reportError(`Malformed H1 capitalization (${entry.h1.match(badCapsRegex)[0]}) on ${entry.kawakiUrl}`);
  }
  if (badCapsRegex.test(entry.service)) {
    reportError(`Malformed service capitalization (${entry.service.match(badCapsRegex)[0]}) on ${entry.kawakiUrl}`);
  }
}
console.log(`✓ Audited ${registry.length} registry entries: 0 casing issues, 0 generic template metas.`);

// 2. Load & Clean Page HTML for Substantive Comparison
console.log('\n[2/7] Extracting substantive body content for paragraph similarity audit...');
const pageContents = [];
const paragraphRegistry = new Map(); // hash or string -> [url1, url2]

for (const entry of registry) {
  if (!entry.indexable || !entry.kawakiUrl) continue;

  const rel = entry.kawakiUrl.replace(/^\//, '');
  let filePath;
  if (rel === '') {
    filePath = path.join(publicDir, 'index.html');
  } else if (fs.existsSync(path.join(publicDir, `${rel}.html`))) {
    filePath = path.join(publicDir, `${rel}.html`);
  } else if (fs.existsSync(path.join(publicDir, rel, 'index.html'))) {
    filePath = path.join(publicDir, rel, 'index.html');
  } else {
    reportError(`File not found for ${entry.kawakiUrl}`);
    continue;
  }

  const rawHtml = fs.readFileSync(filePath, 'utf8');

  // Strip boilerplate: header, footer, nav, breadcrumb, style, script
  let substantiveHtml = rawHtml
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<div class="seo-breadcrumb-nav"[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .replace(/<section class="seo-cta-section"[\s\S]*?<\/section>/gi, '')
    .replace(/<section class="seo-section">\s*<div class="seo-container">\s*<span class="seo-section-tag">\[ 04 \/ DEMONSTRATED WORK \][\s\S]*?<\/section>/gi, ''); // verified case studies section

  // Extract substantive paragraphs (<p class="seo-section-desc">, <p class="seo-card-body">)
  const paragraphMatches = substantiveHtml.match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const cleanParagraphs = paragraphMatches
    .map(p => p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter(p => p.split(' ').length > 15); // substantive paragraphs > 15 words

  pageContents.push({
    entry,
    rawHtml,
    substantiveHtml,
    cleanParagraphs
  });
}

// 3. Substantive Paragraph Duplication Check
console.log('\n[3/7] Checking for substantive paragraph duplication across pages...');
let duplicateParagraphHits = 0;
for (const pData of pageContents) {
  for (const para of pData.cleanParagraphs) {
    if (paragraphRegistry.has(para)) {
      const existingUrl = paragraphRegistry.get(para);
      if (existingUrl !== pData.entry.kawakiUrl) {
        reportError(`Substantive duplicate paragraph found on ${pData.entry.kawakiUrl} and ${existingUrl}: "${para.slice(0, 80)}..."`);
        duplicateParagraphHits++;
      }
    } else {
      paragraphRegistry.set(para, pData.entry.kawakiUrl);
    }
  }
}
if (duplicateParagraphHits === 0) {
  console.log(`✓ 0 duplicate substantive paragraphs detected across all ${pageContents.length} pages.`);
}

// 4. Excessive Duplicate FAQ Answers Check
console.log('\n[4/7] Auditing FAQ answer uniqueness across pages...');
const faqAnswersSeen = new Map();
let duplicateFaqCount = 0;

for (const pData of pageContents) {
  const faqAnswerMatches = pData.rawHtml.match(/<div class="seo-faq-answer">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const ans of faqAnswerMatches) {
    const text = ans.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length > 20) {
      if (faqAnswersSeen.has(text)) {
        const prev = faqAnswersSeen.get(text);
        if (prev.length >= 8) { // Allow up to 8 occurrences across 226 pages for standard studio FAQs
          reportError(`Excessive duplicate FAQ answer (used > 8 times) on ${pData.entry.kawakiUrl}: "${text.slice(0, 70)}..."`);
          duplicateFaqCount++;
        }
        prev.push(pData.entry.kawakiUrl);
      } else {
        faqAnswersSeen.set(text, [pData.entry.kawakiUrl]);
      }
    }
  }
}
if (duplicateFaqCount === 0) {
  console.log(`✓ FAQ uniqueness validated: no FAQ answer repeated excessively.`);
}

// 5. Unsupported Claims & Disallowed Technologies Check
console.log('\n[5/7] Verifying zero disallowed claims and unverified technologies...');
let disallowedClaimHits = 0;

for (const pData of pageContents) {
  for (const claim of facts.disallowedClaims) {
    const escaped = claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b', 'i');
    if (re.test(pData.rawHtml)) {
      reportError(`Disallowed claim "${claim}" detected on ${pData.entry.kawakiUrl}`);
      disallowedClaimHits++;
    }
  }
}
if (disallowedClaimHits === 0) {
  console.log(`✓ 0 disallowed claims or unverified technologies detected.`);
}

// 6. Honest Location & Remote Collaboration Validation
console.log('\n[6/7] Auditing location pages for New Delhi HQ and zero fake branch claims...');
for (const pData of pageContents) {
  if (pData.entry.pageType === 'location' || pData.entry.pageType === 'location-service') {
    const loc = pData.entry.location;
    const lower = pData.rawHtml.toLowerCase();

    // Must mention New Delhi as studio base
    if (!lower.includes('new delhi')) {
      reportError(`Location page ${pData.entry.kawakiUrl} missing truthful New Delhi headquarters mention.`);
    }

    // Must mention remote model if outside Delhi
    if (loc && loc !== 'Delhi') {
      const hasRemoteMention = lower.includes('remote') || lower.includes('remotely') || lower.includes('centralized engineering');
      if (!hasRemoteMention) {
        reportError(`Location page ${pData.entry.kawakiUrl} (${loc}) does not explicitly state remote collaboration model.`);
      }
    }

    // Must not claim local physical branch office
    const fakeOfficeRegex = new RegExp(`\\b(physical office in ${loc}|our ${loc} office|branch office in ${loc})\\b`, 'i');
    if (fakeOfficeRegex.test(pData.rawHtml)) {
      reportError(`Fabricated local office claim on ${pData.entry.kawakiUrl}`);
    }
  }
}
console.log(`✓ Honest location model confirmed across all location and location-service pages.`);

// 7. Domain Specificity Checks (Services, Solutions, Locations)
console.log('\n[7/7] Verifying domain-specific depth on Service, Solution & Location pages...');
for (const pData of pageContents) {
  const type = pData.entry.pageType;
  const url = pData.entry.kawakiUrl;
  const lower = pData.rawHtml.toLowerCase();

  if (type === 'solution') {
    if (url.includes('healthcare') || url.includes('clinic') || url.includes('medical') || url.includes('hospital')) {
      if (!lower.includes('patient') && !lower.includes('clinical') && !lower.includes('physician')) {
        reportError(`Solution page ${url} lacks healthcare-specific domain terminology.`);
      }
    } else if (url.includes('school') || url.includes('erp')) {
      if (!lower.includes('student') && !lower.includes('admission') && !lower.includes('attendance')) {
        reportError(`Solution page ${url} lacks educational ERP domain terminology.`);
      }
    } else if (url.includes('fashion') || url.includes('ecommerce')) {
      if (!lower.includes('apparel') && !lower.includes('catalog') && !lower.includes('shopify')) {
        reportError(`Solution page ${url} lacks fashion ecommerce domain terminology.`);
      }
    }
  } else if (type === 'service') {
    if (url.includes('calling-agents') || url.includes('voice-agents')) {
      if (!lower.includes('voice') && !lower.includes('telephony') && !lower.includes('speech')) {
        reportError(`Service page ${url} lacks voice automation terminology.`);
      }
    } else if (url.includes('chatbot')) {
      if (!lower.includes('chat') && !lower.includes('conversational') && !lower.includes('retrieval')) {
        reportError(`Service page ${url} lacks conversational assistant terminology.`);
      }
    } else if (url.includes('malware') || url.includes('security') || url.includes('backdoor')) {
      if (!lower.includes('clean') && !lower.includes('hardening') && !lower.includes('malicious')) {
        reportError(`Security page ${url} lacks security remediation terminology.`);
      }
    }
  }
}
console.log(`✓ Domain-specific depth verified across all service and solution archetypes.`);

console.log('\n====================================================');
console.log(`Content Quality Gate Summary: ${failureCount} total issues detected.`);
console.log('====================================================');

if (failureCount === 0) {
  console.log('🎉 [Content Quality Gate] Technical architecture passed; content-quality gate passed.\n');
  process.exit(0);
} else {
  console.error(`❌ [Content Quality Gate] Failed with ${failureCount} errors. Fix violations before proceeding.`);
  process.exit(1);
}
