const fs = require('fs');
const path = require('path');

const serviceFiles = [
  'custom-web-development.html', 'web-application-development.html', 'website-redesign.html',
  'website-performance-optimization.html', 'wordpress-development.html', 'shopify-development.html',
  'ai-automation.html', 'ai-search-optimization.html', 'wordpress-malware-removal.html',
  'malicious-redirect-removal.html', 'wordpress-backdoor-removal.html', 'seo-spam-removal.html',
  'website-security-hardening.html', 'wordpress-security-audit.html'
];

serviceFiles.forEach(f => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'services', f), 'utf8');
  const jsonMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let schemaCount = 0;
  for (const m of jsonMatches) {
    try {
      const data = JSON.parse(m[1]);
      const list = data['@graph'] || [data];
      for (const item of list) {
        if (item['@type'] === 'FAQPage' && item.mainEntity) {
          schemaCount = item.mainEntity.length;
        }
      }
    } catch(e) {}
  }
  const domFaqItems = (html.match(/class="(editorial-faq-item|faq-item)"/g) || []).length;
  console.log(`${f.padEnd(40)} | Schema Questions: ${schemaCount} | DOM Items: ${domFaqItems}`);
});
