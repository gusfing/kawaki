const https = require('https');
const fs = require('fs');
const path = require('path');

const registry = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'seo-pages.json'), 'utf8'));
const indexable = registry.filter(r => r.indexable !== false);

console.log(`⚡ [Live Production Audit] Testing all ${indexable.length} Phase 1 targets against https://kawaki.co.in ...\n`);

async function fetchUrl(route) {
  return new Promise(resolve => {
    https.get('https://kawaki.co.in' + route, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const can = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                    data.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
        resolve({
          route,
          statusCode: res.statusCode,
          destination: res.headers.location || null,
          canonical: can ? can[1] : null
        });
      });
    }).on('error', err => {
      resolve({
        route,
        statusCode: 0,
        destination: null,
        canonical: null,
        error: err.message
      });
    });
  });
}

(async () => {
  const stats = {
    total: indexable.length,
    status200: 0,
    redirects: 0,
    errors: 0,
    canonicalMatch: 0,
    canonicalMismatch: 0
  };

  const issues = [];
  const concurrency = 15;

  for (let i = 0; i < indexable.length; i += concurrency) {
    const chunk = indexable.slice(i, i + concurrency);
    const results = await Promise.all(chunk.map(item => fetchUrl(item.kawakiUrl)));

    for (const res of results) {
      const expectedCanonical = 'https://kawaki.co.in' + (res.route === '/' ? '/' : res.route);

      if (res.statusCode === 200) {
        stats.status200++;
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        stats.redirects++;
        issues.push({ route: res.route, issue: `Unexpected redirect ${res.statusCode} to ${res.destination}` });
      } else {
        stats.errors++;
        issues.push({ route: res.route, issue: `HTTP status ${res.statusCode} (Error)` });
      }

      if (res.canonical === expectedCanonical) {
        stats.canonicalMatch++;
      } else {
        stats.canonicalMismatch++;
        issues.push({ route: res.route, issue: `Canonical mismatch: expected ${expectedCanonical}, got ${res.canonical}` });
      }
    }
  }

  console.log('====================================================');
  console.log('📊 LIVE PRODUCTION AUDIT RESULTS (https://kawaki.co.in)');
  console.log('====================================================');
  console.log(`Total Targets Checked    : ${stats.total}`);
  console.log(`Direct HTTP 200 OK       : ${stats.status200} / ${stats.total} (${stats.status200 === stats.total ? '100% PASS ✓' : 'FAIL ❌'})`);
  console.log(`Unexpected Redirects     : ${stats.redirects} (${stats.redirects === 0 ? '0 PASS ✓' : 'FAIL ❌'})`);
  console.log(`Server / Network Errors  : ${stats.errors} (${stats.errors === 0 ? '0 PASS ✓' : 'FAIL ❌'})`);
  console.log(`Canonical Self-Reference : ${stats.canonicalMatch} / ${stats.total} (${stats.canonicalMatch === stats.total ? '100% PASS ✓' : 'FAIL ❌'})`);
  console.log(`Canonical Mismatches     : ${stats.canonicalMismatch}`);
  console.log('====================================================');

  if (issues.length > 0) {
    console.error(`\n❌ Issues Detected (${issues.length}):`);
    console.table(issues.slice(0, 20));
    process.exit(1);
  } else {
    console.log('\n🎉 ALL 226 PHASE 1 TARGETS SERVE DIRECT HTTP 200 WITH MATCHING SELF-REFERENCING CANONICALS ON LIVE PRODUCTION!\n');
  }
})();
