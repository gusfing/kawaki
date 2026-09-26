const fs = require('fs');

const files = ['public/index.html', 'public/about.html', 'public/contact.html'];
let hasError = false;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const scripts = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  
  scripts.forEach((s) => {
    const raw = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
    try {
      const json = JSON.parse(raw);
      
      const checkNode = (node) => {
        if (!node || typeof node !== 'object') return;
        
        // Check founder / Person
        if (node['@type'] === 'Person') {
          if (node.sameAs) {
            console.error(`❌ FAIL: Person entity has sameAs in ${f}:`, node.sameAs);
            hasError = true;
          } else {
            console.log(`✅ PASS: Person entity (${node.name || 'unnamed'}) has NO sameAs in ${f}`);
          }
        }
        if (node.founder && typeof node.founder === 'object') {
          if (node.founder.sameAs) {
            console.error(`❌ FAIL: Founder object has sameAs in ${f}:`, node.founder.sameAs);
            hasError = true;
          } else {
            console.log(`✅ PASS: Founder object (${node.founder.name || 'unnamed'}) has NO sameAs in ${f}`);
          }
        }
        
        // Check Organization / LocalBusiness (main definitions)
        if ((node['@type'] === 'Organization' && node.url) || node['@type'] === 'LocalBusiness') {
          if (Array.isArray(node.sameAs) && node.sameAs.includes('https://instagram.com/kawaki.agency')) {
            console.log(`✅ PASS: ${node['@type']}.sameAs includes https://instagram.com/kawaki.agency in ${f}`);
          } else {
            console.error(`❌ FAIL: ${node['@type']}.sameAs MISSING Kawaki Instagram in ${f}`);
            hasError = true;
          }
        }
        
        Object.values(node).forEach(v => {
          if (typeof v === 'object') checkNode(v);
        });
      };
      
      checkNode(json);
    } catch (e) {
      console.error(`❌ JSON parse error in ${f}:`, e.message);
      hasError = true;
    }
  });
});

if (hasError) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL CHECKS PASSED: Organization.sameAs contains Kawaki Instagram; Founder/Person does NOT.');
}
