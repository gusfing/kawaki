const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

function optimizeDescription(desc) {
  if (!desc || desc.length <= 165) return desc;
  const sentences = desc.split('. ');
  if (sentences.length > 1 && sentences[0].length >= 85 && sentences[0].length <= 165) {
    let s = sentences[0].trim();
    if (!s.endsWith('.')) s += '.';
    if (s.length <= 135 && !s.includes('Kawaki Studios')) {
      s = s.slice(0, -1) + ' by Kawaki Studios.';
    }
    return s;
  }
  let trimmed = desc.slice(0, 155);
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace > 110) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  return trimmed.trim() + '.';
}

const allFiles = getHtmlFiles('public');
console.log(`⚡ [On-Page SEO] Processing ${allFiles.length} files...\n`);

let updatedCount = 0;

allFiles.forEach(filePath => {
  const rel = path.relative('public', filePath).split(path.sep).join('/');
  if (rel === '404.html' || rel.startsWith('admin/')) return;

  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Specific page fixes
  if (rel === 'llm-seo.html') {
    html = html.replace(
      '<title>LLM SEO | Kawaki Studios</title>',
      '<title>LLM SEO Services — AI Search &amp; Citations | Kawaki Studios</title>'
    );
    html = html.replace(
      '<meta property="og:title" content="LLM SEO | Kawaki Studios" />',
      '<meta property="og:title" content="LLM SEO Services — AI Search &amp; Citations | Kawaki Studios" />'
    );
    modified = true;
  }

  if (rel === 'pricing.html') {
    html = html.replace(
      '<title>Pricing | Kawaki Studios</title>',
      '<title>Transparent Pricing &amp; Engineering Packages | Kawaki Studios</title>'
    );
    html = html.replace(
      '<meta property="og:title" content="Pricing | Kawaki Studios" />',
      '<meta property="og:title" content="Transparent Pricing &amp; Engineering Packages | Kawaki Studios" />'
    );
    modified = true;
  }

  if (rel === 'terminal.html') {
    if (!html.includes('og:title')) {
      const ogBlock = `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.kawaki.co.in/terminal" />
    <meta property="og:title" content="Kawaki Studios // Terminal Shell" />
    <meta property="og:description" content="Interactive Command Line Interface for Kawaki Studios. Explore bespoke digital engineering, verified client case studies, and studio capabilities." />
    <meta property="og:image" content="https://www.kawaki.co.in/assets/images/og-image.jpg" />
    <meta property="og:site_name" content="Kawaki Studios" />
    <meta property="og:locale" content="en_IN" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="Kawaki Studios // Terminal Shell" />
    <meta name="twitter:description" content="Interactive Command Line Interface for Kawaki Studios. Explore bespoke digital engineering, verified client case studies, and studio capabilities." />
    <meta name="twitter:image" content="https://www.kawaki.co.in/assets/images/og-image.jpg" />\n`;
      html = html.replace('<link rel="canonical" href="https://www.kawaki.co.in/terminal">', `${ogBlock}    <link rel="canonical" href="https://www.kawaki.co.in/terminal">`);
      modified = true;
    }
  }

  // 2. Ensure robots tag exists
  if (!/<meta[^>]*name=["']robots["']/i.test(html)) {
    const robotsTag = '    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n';
    if (html.includes('<meta name="viewport"')) {
      html = html.replace(/(<meta name="viewport"[^>]*>\s*)/i, `$1${robotsTag}`);
      modified = true;
    } else if (html.includes('<meta charset=')) {
      html = html.replace(/(<meta charset=[^>]*>\s*)/i, `$1${robotsTag}`);
      modified = true;
    }
  }

  // 3. Ensure og:site_name and og:locale
  if (html.includes('property="og:title"') || html.includes("property='og:title'")) {
    if (!html.includes('og:site_name')) {
      html = html.replace(/(<meta[^>]*property=["']og:title["'][^>]*>\s*)/i, `$1    <meta property="og:site_name" content="Kawaki Studios" />\n`);
      modified = true;
    }
    if (!html.includes('og:locale')) {
      html = html.replace(/(<meta[^>]*property=["']og:site_name["'][^>]*>\s*)/i, `$1    <meta property="og:locale" content="en_IN" />\n`);
      modified = true;
    }
  }

  // 4. Optimize description if overly long (> 175 chars)
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content="([^"]*)"/i);
  if (descMatch && descMatch[1].length > 175) {
    const origDesc = descMatch[1];
    const newDesc = optimizeDescription(origDesc);
    if (newDesc !== origDesc) {
      html = html.replace(
        `<meta name="description" content="${origDesc}"`,
        `<meta name="description" content="${newDesc}"`
      );
      // Synchronize og:description if matching
      if (html.includes(`content="${origDesc}"`)) {
        html = html.split(`content="${origDesc}"`).join(`content="${newDesc}"`);
      }
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`[${updatedCount.toString().padStart(3, '0')}] ✓ ${rel} (On-Page SEO enhanced)`);
  }
});

console.log('\n=======================================');
console.log(`🎉 ON-PAGE SEO ENHANCEMENT COMPLETE`);
console.log(`Total Pages updated: ${updatedCount}`);
console.log('=======================================');
