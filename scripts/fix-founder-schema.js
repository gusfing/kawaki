const fs = require('fs');
const path = require('path');

function updateFile(relPath, fn) {
  const fullPath = path.resolve(__dirname, '..', relPath);
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

// 1. index.html: remove sameAs inside founder object
updateFile('public/index.html', (c) => {
  return c.replace(
    /"founder":\s*\{\s*"@type":\s*"Person",\s*"@id":\s*"https:\/\/www\.kawaki\.co\.in\/about#founder",\s*"name":\s*"Kunal Sharma",\s*"jobTitle":\s*"Founder & Creative Direction",\s*"url":\s*"https:\/\/www\.kawaki\.co\.in\/about"[\s\S]*?\}/,
    `"founder": {\n        "@type": "Person",\n        "@id": "https://www.kawaki.co.in/about#founder",\n        "name": "Kunal Sharma",\n        "jobTitle": "Founder & Creative Direction",\n        "url": "https://www.kawaki.co.in/about"\n      }`
  );
});

// 2. about.html: remove sameAs inside founder object
updateFile('public/about.html', (c) => {
  return c.replace(
    /"founder":\s*\{\s*"@type":\s*"Person",\s*"@id":\s*"https:\/\/www\.kawaki\.co\.in\/about#founder",\s*"name":\s*"Kunal Sharma",\s*"jobTitle":\s*"Founder & Creative Direction",\s*"url":\s*"https:\/\/www\.kawaki\.co\.in\/about"[\s\S]*?\}/,
    `"founder": {\n          "@type": "Person",\n          "@id": "https://www.kawaki.co.in/about#founder",\n          "name": "Kunal Sharma",\n          "jobTitle": "Founder & Creative Direction",\n          "url": "https://www.kawaki.co.in/about"\n        }`
  );
});

// 3. contact.html: remove sameAs inside founder object
updateFile('public/contact.html', (c) => {
  return c.replace(
    /"founder":\s*\{\s*"@type":\s*"Person",\s*"@id":\s*"https:\/\/www\.kawaki\.co\.in\/about#founder",\s*"name":\s*"Kunal Sharma"[\s\S]*?\}/,
    `"founder": {\n          "@type": "Person",\n          "@id": "https://www.kawaki.co.in/about#founder",\n          "name": "Kunal Sharma"\n        }`
  );
});
