const https = require('https');

const auditUrls = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/services/custom-web-development',
  '/services/web-application-development',
  '/contact',
  // 10 representative registry URLs
  '/ahmedabad/seo-company',
  '/ai-automation-consulting',
  '/bangalore/seo-company',
  '/delhi/seo-company',
  '/dubai',
  '/pune/seo-company',
  '/portfolio',
  '/website-development',
  '/custom-web-applications',
  '/lead-generation-automation'
];

async function followAndInspect(initialHost, path) {
  const url = `https://${initialHost}${path}`;
  const hops = [];
  let currentUrl = url;
  let finalBody = '';
  let finalStatus = 0;
  let finalHeaders = {};

  for (let i = 0; i < 5; i++) {
    const res = await new Promise((resolve, reject) => {
      https.get(currentUrl, response => {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => resolve({
          status: response.statusCode,
          headers: response.headers,
          body
        }));
      }).on('error', err => reject(err));
    });

    hops.push({ url: currentUrl, status: res.status, location: res.headers.location || null });
    finalStatus = res.status;
    finalHeaders = res.headers;
    finalBody = res.body;

    if (res.status >= 300 && res.status < 400 && res.headers.location) {
      let loc = res.headers.location;
      if (loc.startsWith('/')) {
        const u = new URL(currentUrl);
        loc = `${u.protocol}//${u.host}${loc}`;
      }
      currentUrl = loc;
    } else {
      break;
    }
  }

  const canMatch = finalBody.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                   finalBody.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const titleMatch = finalBody.match(/<title>([^<]*)<\/title>/i);

  const initialStatus = hops[0].status;
  const redirects = hops.length > 1 ? hops.slice(0, -1).map(h => `${h.status} -> ${h.location}`).join(' ; ') : 'None';
  const finalUrl = hops[hops.length - 1].url;
  const canonical = canMatch ? canMatch[1] : (path.endsWith('.txt') || path.endsWith('.xml') ? 'N/A' : 'MISSING');
  const title = titleMatch ? titleMatch[1].trim() : (path.endsWith('.txt') || path.endsWith('.xml') ? 'N/A' : 'MISSING');
  const success = finalStatus === 200;

  return {
    testHost: initialHost,
    path,
    initialStatus,
    redirects,
    finalUrl,
    finalStatus,
    canonical,
    title: title.length > 35 ? title.slice(0, 32) + '...' : title,
    success
  };
}

(async () => {
  console.log('⚡ [Host Audit] Testing both www.kawaki.co.in and kawaki.co.in ...\n');
  const allResults = [];

  for (const p of auditUrls) {
    const wwwRes = await followAndInspect('www.kawaki.co.in', p);
    allResults.push(wwwRes);
  }

  for (const p of auditUrls) {
    const apexRes = await followAndInspect('kawaki.co.in', p);
    allResults.push(apexRes);
  }

  console.log('=== AUDIT RESULTS TABLE ===');
  console.table(allResults);
})();
