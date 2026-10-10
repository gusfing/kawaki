const https = require('https');

const testUrls = [
  // 1. URLs that previously conflicted with redirects
  '/ahmedabad/seo-company',
  '/ai-automation-consulting',
  '/bangalore/seo-company',
  '/delhi/seo-company',
  '/dubai',
  '/pune/seo-company',
  '/portfolio',
  '/website-development',
  '/custom-web-applications',
  '/lead-generation-automation',

  // 2. Preserved legacy redirects (should return 308/301)
  '/case-studies/nextschool',
  '/blog/core-web-vitals-checklist',
  '/shopify',
  '/editions',

  // 3. Core canonical pages
  '/',
  '/about',
  '/services',
  '/contact',
  '/case-studies/nextschool-erp',
  '/terminal'
];

async function checkUrl(path) {
  return new Promise(resolve => {
    https.get('https://kawaki.co.in' + path, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const can = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                    data.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
        resolve({
          path,
          status: res.statusCode,
          destination: res.headers.location || 'NONE (Direct 200)',
          canonical: can ? can[1] : (res.statusCode >= 300 ? 'N/A (Redirect)' : 'MISSING')
        });
      });
    });
  });
}

(async () => {
  console.log('⚡ [Live Verification] Querying https://kawaki.co.in ...\n');
  const results = [];
  for (const url of testUrls) {
    results.push(await checkUrl(url));
  }
  console.table(results);
})();
