/**
 * Automated Test Suite for scripts/newsjacking-radar.js
 * Verifies feed ingestion, scoring engine, writing rules compliance, and fallback mechanism.
 */

const assert = require('assert');
const {
  scanAllFeeds,
  scoreNewsItem,
  getFallbackPayload,
  runRadar,
  auditTextAgainstWritingRules,
  sanitizeText,
  buildNewsjackHeadline,
  SERVICE_TAXONOMY
} = require('../scripts/newsjacking-radar.js');

async function runTests() {
  console.log('🧪 Starting Newsjacking Radar Test Suite...\n');

  // Test 1: Fallback payload structure & writing rules
  console.log('Test 1: Fallback payload generation and compliance...');
  const fallback = getFallbackPayload();
  assert.ok(fallback.title, 'Fallback must have a title');
  assert.ok(fallback.slug, 'Fallback must have a slug');
  assert.ok(fallback.primaryKeyword, 'Fallback must have a primaryKeyword');
  assert.ok(fallback.hookAngle, 'Fallback must have a hookAngle');
  assert.ok(fallback.targetServiceUrl, 'Fallback must have a targetServiceUrl');
  assert.ok(fallback.rawContext, 'Fallback must have rawContext');
  assert.strictEqual(fallback.rawContext.source, 'blog-plan-fallback');
  assert.ok(fallback.title.length <= 60, `Title must be <= 60 chars (got ${fallback.title.length})`);

  const fallbackTitleIssues = auditTextAgainstWritingRules(fallback.title);
  const fallbackAngleIssues = auditTextAgainstWritingRules(fallback.hookAngle);
  assert.strictEqual(fallbackTitleIssues.length, 0, `Fallback title has writing rule issues: ${fallbackTitleIssues.join(', ')}`);
  assert.strictEqual(fallbackAngleIssues.length, 0, `Fallback hook angle has writing rule issues: ${fallbackAngleIssues.join(', ')}`);
  console.log('   ✓ Fallback payload verified.\n');

  // Test 2: Scoring engine with synthetic news items
  console.log('Test 2: Trend scoring engine logic...');
  const mockItemAI = {
    source: 'Hacker News',
    title: 'OpenAI Releases SearchGPT and AI Search Integration for Web Browsers',
    snippet: 'Search engines are being reshaped by generative engine optimization and citations.',
    rawScore: 500,
    publishedAt: new Date().toISOString()
  };

  const scoredAI = scoreNewsItem(mockItemAI);
  assert.ok(scoredAI.totalScore >= 70, `Score should be high for top AI Search news (got ${scoredAI.totalScore})`);
  assert.strictEqual(scoredAI.matchedTaxonomy.targetUrl, '/generative-engine-optimization');
  console.log(`   ✓ High-relevance AI search story scored: ${scoredAI.totalScore}/100 -> matched ${scoredAI.matchedTaxonomy.name}`);

  const mockItemUnrelated = {
    source: 'Google Trends',
    title: 'Celebrity Red Carpet Fashion Highlights',
    snippet: 'Gown designs at film festival.',
    rawScore: 50000,
    publishedAt: new Date().toISOString()
  };

  const scoredUnrelated = scoreNewsItem(mockItemUnrelated);
  assert.strictEqual(scoredUnrelated.totalScore, 0, 'Unrelated non-tech story must score 0');
  console.log('   ✓ Unrelated non-tech story scored 0 (filtered).\n');

  // Test 3: Headline and writing rules sanitization
  console.log('Test 3: Headline generation & writing rules sanitization...');
  const headline = buildNewsjackHeadline('generative engine optimization', 'Search Engine Update');
  assert.ok(headline.length <= 60, `Headline must be <= 60 chars (got ${headline.length})`);
  assert.ok(!headline.includes('—'), 'Headline must not contain em dash');
  assert.ok(!headline.includes('–'), 'Headline must not contain en dash');
  console.log(`   ✓ Sample headline: "${headline}" (${headline.length} chars)\n`);

  // Test 4: Live feeds scan
  console.log('Test 4: Real-time live feeds scanner...');
  const scanResult = await scanAllFeeds();
  assert.ok(scanResult.stats.totalScanned > 0, 'Must have scanned feed items');
  console.log(`   ✓ Live feeds returned ${scanResult.stats.totalScanned} items across HN, TechCrunch, The Verge, and Google Trends.\n`);

  // Test 5: End-to-end radar execution
  console.log('Test 5: End-to-end runRadar execution...');
  const radarResult = await runRadar({ minScore: 50 });
  assert.ok(['success', 'fallback'].includes(radarResult.status));
  assert.ok(radarResult.payload.title);
  assert.ok(radarResult.payload.slug);
  assert.ok(radarResult.payload.primaryKeyword);
  assert.ok(radarResult.payload.targetServiceUrl);
  assert.ok(radarResult.payload.rawContext);
  assert.ok(radarResult.payload.title.length <= 60);

  const titleIssues = auditTextAgainstWritingRules(radarResult.payload.title);
  const angleIssues = auditTextAgainstWritingRules(radarResult.payload.hookAngle);
  assert.strictEqual(titleIssues.length, 0, `Title has writing rule issues: ${titleIssues.join(', ')}`);
  assert.strictEqual(angleIssues.length, 0, `Hook angle has writing rule issues: ${angleIssues.join(', ')}`);
  console.log(`   ✓ End-to-end radar returned status: ${radarResult.status}`);
  console.log(`   ✓ Payload title: "${radarResult.payload.title}" (${radarResult.payload.title.length} chars)`);
  console.log(`   ✓ Target service: ${radarResult.payload.targetServiceUrl}`);
  console.log('\n🎉 ALL TESTS PASSED!\n');
}

runTests().catch(err => {
  console.error('\n❌ Test failure:', err);
  process.exit(1);
});
