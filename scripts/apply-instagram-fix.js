const fs = require('fs');
const path = require('path');

const INSTAGRAM_URL = 'https://instagram.com/kawaki.agency';

function updateFile(relPath, fn) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${relPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  content = fn(content);
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Updated: ${relPath}`);
  } else {
    console.log(`- No changes needed: ${relPath}`);
  }
}

// 1. index.html
updateFile('public/index.html', (c) => {
  // Update Organization sameAs
  c = c.replace(
    /"sameAs":\s*\[\s*"https:\/\/linkedin\.com\/company\/kawaki-studios",\s*"https:\/\/twitter\.com\/kawakistudios"\s*\]/,
    `"sameAs": [\n        "https://linkedin.com/company/kawaki-studios",\n        "https://twitter.com/kawakistudios",\n        "${INSTAGRAM_URL}"\n      ]`
  );
  // Update HTML links
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 2. about.html
updateFile('public/about.html', (c) => {
  // Update Organization sameAs
  c = c.replace(
    /"sameAs":\s*\[\s*"https:\/\/linkedin\.com\/company\/kawaki-studios",\s*"https:\/\/twitter\.com\/kawakistudios"\s*\]/,
    `"sameAs": [\n          "https://linkedin.com/company/kawaki-studios",\n          "https://twitter.com/kawakistudios",\n          "${INSTAGRAM_URL}"\n        ]`
  );
  // Update HTML links
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 3. contact.html
updateFile('public/contact.html', (c) => {
  // Add sameAs to LocalBusiness
  if (!c.includes('"sameAs": [\n          "https://linkedin.com/company/kawaki-studios"')) {
    c = c.replace(
      /("mainEntity":\s*\{[\s\S]*?"email":\s*"hello@kawakistudios.com",)/,
      `$1\n        "sameAs": [\n          "https://linkedin.com/company/kawaki-studios",\n          "https://twitter.com/kawakistudios",\n          "${INSTAGRAM_URL}"\n        ],`
    );
  }
  // Update HTML links
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 4. services.html
updateFile('public/services.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 5. case-studies.html
updateFile('public/case-studies.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 6. case-studies/acme-headless-ecommerce.html
updateFile('public/case-studies/acme-headless-ecommerce.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 7. case-studies/fintech-roi-calculator.html
updateFile('public/case-studies/fintech-roi-calculator.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 8. 404.html
updateFile('public/404.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 9. blog.html
updateFile('public/blog.html', (c) => {
  c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
  c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
  return c;
});

// 9. All public/services/*.html
const servicesDir = path.resolve(__dirname, '../public/services');
fs.readdirSync(servicesDir).forEach(f => {
  if (f.endsWith('.html')) {
    updateFile(`public/services/${f}`, (c) => {
      c = c.replace(/href="https:\/\/instagram\.com(?:\/)"?/g, `href="${INSTAGRAM_URL}"`);
      c = c.replace(/href="https:\/\/instagram\.com"/g, `href="${INSTAGRAM_URL}"`);
      return c;
    });
  }
});
