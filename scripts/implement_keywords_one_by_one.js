const fs = require('fs');
const path = require('path');

// Load SEO registry
const registry = JSON.parse(fs.readFileSync('data/seo-pages.json', 'utf8'));
const registryMap = new Map();
registry.forEach(item => {
  let url = item.kawakiUrl;
  if (!url.startsWith('/')) url = '/' + url;
  registryMap.set(url, item);
});

// Curated keywords for core services
const CORE_SERVICE_KEYWORDS = {
  'custom-web-development': [
    'custom web development',
    'bespoke web development',
    'digital flagship engineering',
    'nextjs development company',
    'high performance websites',
    'kawaki studios'
  ],
  'mobile-app-development': [
    'mobile app development',
    'flutter app development',
    'react native development',
    'ios app development',
    'android app development',
    'cross platform mobile apps'
  ],
  'shopify-development': [
    'shopify development',
    'headless shopify',
    'shopify plus agency',
    'custom liquid themes',
    'storefront api integration',
    'ecommerce engineering'
  ],
  'web-application-development': [
    'web application development',
    'full stack web apps',
    'saas development company',
    'react web applications',
    'custom software engineering',
    'kawaki studios'
  ],
  'website-redesign': [
    'website redesign services',
    'website modernization',
    'cms migration',
    'legacy platform rebuild',
    'ui ux overhaul',
    'kawaki studios'
  ],
  'website-performance-optimization': [
    'website performance optimization',
    'core web vitals optimization',
    'page speed optimization',
    'lcp optimization',
    'sub second load times',
    'frontend performance'
  ],
  'ai-automation': [
    'ai automation services',
    'workflow automation agency',
    'n8n automation',
    'make com scenarios',
    'task specific ai agents',
    'business process automation'
  ],
  'ai-search-optimization': [
    'ai search optimization',
    'generative engine optimization',
    'geo services',
    'answer engine optimization',
    'chatgpt search optimization',
    'perplexity seo'
  ],
  'wordpress-development': [
    'wordpress development company',
    'enterprise wordpress engineering',
    'custom gutenberg blocks',
    'headless wordpress',
    'bespoke wordpress themes',
    'kawaki studios'
  ],
  'wordpress-malware-removal': [
    'wordpress malware removal',
    'hacked website recovery',
    'website virus removal',
    'database sanitization',
    'backdoor cleanup',
    'hacked site cleanup'
  ],
  'malicious-redirect-removal': [
    'malicious redirect removal',
    'wordpress redirect hack fix',
    'hacked site redirect removal',
    'google blacklist removal',
    'malware cleanup'
  ],
  'seo-spam-removal': [
    'seo spam removal',
    'japanese keyword hack removal',
    'pharma hack cleanup',
    'spam links removal',
    'google search console recovery'
  ],
  'website-security-hardening': [
    'website security hardening',
    'wordpress security audit',
    'firewall configuration',
    'brute force prevention',
    'vulnerability patch'
  ],
  'wordpress-backdoor-removal': [
    'wordpress backdoor removal',
    'php webshell cleanup',
    'eval base64 malware fix',
    'hidden admin account removal',
    'hacked site cleanup'
  ],
  'wordpress-security-audit': [
    'wordpress security audit',
    'vulnerability assessment',
    'penetration testing',
    'plugin security audit',
    'source code security review'
  ]
};

// Curated keywords for core main pages
const CORE_PAGE_KEYWORDS = {
  'index.html': [
    'custom web development',
    'shopify development',
    'custom web applications',
    'mobile app development',
    'ai automation',
    'ai search optimization'
  ],
  'about.html': [
    'about kawaki studios',
    'digital product studio',
    'web engineering company',
    'kunal sharma',
    'senior web developers delhi',
    'custom software studio'
  ],
  'services.html': [
    'web engineering services',
    'custom web development',
    'mobile app development',
    'shopify development',
    'ai automation',
    'website security recovery'
  ],
  'case-studies.html': [
    'web development case studies',
    'software engineering portfolio',
    'mobile app portfolio',
    'digital product showcase',
    'kawaki studios client work'
  ],
  'contact.html': [
    'contact kawaki studios',
    'hire web developers',
    'schedule technical discovery',
    'custom web development quote',
    'project inquiry'
  ],
  'blog.html': [
    'web engineering blog',
    'frontend architecture essays',
    'nextjs tutorials',
    'shopify performance tips',
    'generative engine optimization insights'
  ]
};

// Curated keywords for case studies
const CASE_STUDY_KEYWORDS = {
  'lms-ecosystem': [
    'lms mobile app development',
    'flutter mobility case study',
    'school transit tracking app',
    'multi role education platform',
    'kawaki studios case study'
  ],
  'iptv-mobile': [
    'iptv mobile app case study',
    'flutter video streaming client',
    'exoplayer hardware decoding',
    'picture in picture mobile app',
    'streaming media development'
  ],
  'spa-salon': [
    'spa booking mobile app',
    'salon management platform',
    'flutter appointment scheduling',
    'multi branch booking system',
    'local commerce platform'
  ],
  'pixza': [
    'ai image generator web app',
    'pixza case study',
    'nextjs saas platform',
    'interactive canvas web app',
    'ai media platform'
  ],
  'bazzaro': [
    'shopify fashion store case study',
    'bazzaro custom storefront',
    'headless shopify apparel',
    'high conversion fashion ecommerce'
  ],
  'kala-design': [
    'architectural studio website',
    'kala design case study',
    'luxury portfolio engineering',
    'editorial web design'
  ],
  'decor-lab': [
    'luxury interior showroom website',
    'decor lab case study',
    'furniture catalogue website',
    'spatial interior portfolio'
  ],
  'urbanland': [
    'b2b product catalogue case study',
    'urbanland products',
    'technical datasheet portal',
    'architectural materials catalogue'
  ],
  'nursepass': [
    'healthcare education web platform',
    'nursepass case study',
    'nclex exam prep portal',
    'adaptive test simulation'
  ],
  'kova': [
    'ai visual layout builder',
    'kova case study',
    'design to code web app',
    'component generator tool'
  ],
  'nextschool-erp': [
    'school erp web portal',
    'nextschool case study',
    'education management system',
    'multi campus admissions portal'
  ],
  'fintech-roi-calculator': [
    'fintech roi calculator',
    'interactive financial calculator',
    'parametric cost estimation tool',
    'interactive web tool case study'
  ]
};

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

function cleanKeywords(list) {
  const seen = new Set();
  const cleaned = [];
  list.forEach(item => {
    let s = item.toLowerCase().trim()
      .replace(/\s+/g, ' ')
      .replace(/\bservices services\b/g, 'services')
      .replace(/\bagency agency\b/g, 'agency')
      .replace(/\bcompany company\b/g, 'company');
    if (s.length > 2 && !seen.has(s)) {
      seen.add(s);
      cleaned.push(s);
    }
  });
  return cleaned.slice(0, 6);
}

function deriveKeywords(filePath, html) {
  const rel = path.relative('public', filePath).replace(/\\/g, '/');
  const baseName = path.basename(filePath, '.html');
  const dirName = path.dirname(rel);

  // 1. Core main pages
  if (CORE_PAGE_KEYWORDS[rel]) {
    return cleanKeywords(CORE_PAGE_KEYWORDS[rel]);
  }

  // 2. Core services in services/
  if (dirName === 'services' && CORE_SERVICE_KEYWORDS[baseName]) {
    return cleanKeywords(CORE_SERVICE_KEYWORDS[baseName]);
  }

  // 3. Case studies in case-studies/
  if (dirName === 'case-studies' && CASE_STUDY_KEYWORDS[baseName]) {
    return cleanKeywords(CASE_STUDY_KEYWORDS[baseName]);
  }

  // 4. Registry match in data/seo-pages.json
  const route = '/' + (rel === 'index.html' ? '' : rel.replace(/\.html$/, ''));
  if (registryMap.has(route)) {
    const reg = registryMap.get(route);
    const kwList = [];
    if (reg.primaryKeyword && reg.primaryKeyword.length > 2) {
      kwList.push(reg.primaryKeyword.toLowerCase());
    }
    if (Array.isArray(reg.secondaryKeywords)) {
      reg.secondaryKeywords.forEach(sk => {
        if (sk && sk.length > 2) {
          kwList.push(sk.toLowerCase());
        }
      });
    }
    if (kwList.length > 0) {
      kwList.push('kawaki studios');
      return cleanKeywords(kwList);
    }
  }

  // 5. Regional pages
  const cityDirs = ['delhi', 'bangalore', 'mumbai', 'gurgaon', 'pune', 'hyderabad', 'noida', 'ahmedabad', 'jaipur', 'chandigarh', 'ludhiana', 'kolkata', 'vadodara', 'dubai', 'london', 'canada'];
  if (cityDirs.includes(dirName)) {
    const cityName = dirName.charAt(0).toUpperCase() + dirName.slice(1);
    const serviceName = baseName.replace(/-/g, ' ');
    return cleanKeywords([
      `${serviceName} in ${cityName}`,
      `${cityName} ${serviceName}`,
      `${serviceName} company`,
      `${serviceName} agency`,
      `kawaki studios ${cityName}`
    ]);
  }

  // 6. Blog posts
  if (dirName === 'blog') {
    const topic = baseName.replace(/-/g, ' ');
    return cleanKeywords([
      topic,
      `${topic} guide`,
      'web engineering insights',
      'frontend architecture',
      'kawaki studios blog'
    ]);
  }

  // 7. General root or subpage fallback
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  let mainPhrase = baseName.replace(/-/g, ' ');
  if (titleMatch) {
    const parts = titleMatch[1].split(/[|—–-]/);
    if (parts[0] && parts[0].trim().length > 3) {
      mainPhrase = parts[0].trim().toLowerCase();
    }
  }

  return cleanKeywords([
    mainPhrase,
    `${mainPhrase} services`,
    `${mainPhrase} agency`,
    'digital engineering',
    'kawaki studios'
  ]);
}

function processFile(filePath) {
  const rel = path.relative('public', filePath).replace(/\\/g, '/');
  
  // Skip 404 and admin
  if (rel === '404.html' || rel.startsWith('admin/')) {
    return { skipped: true, reason: 'utility or admin' };
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const keywords = deriveKeywords(filePath, html);
  const keywordString = keywords.join(', ');
  const metaTag = `<meta name="keywords" content="${keywordString}" />`;

  // Check if keywords already exist
  const existingKwMatch = html.match(/<meta\s+name=["']keywords["'][^>]*>/i);
  if (existingKwMatch) {
    // Replace with optimized keywords
    html = html.replace(existingKwMatch[0], metaTag);
  } else {
    // Insert after meta description if possible
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*>/i);
    if (descMatch) {
      html = html.replace(descMatch[0], `${descMatch[0]}\n    ${metaTag}`);
    } else {
      // Insert before canonical link or before </head>
      const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
      if (canMatch) {
        html = html.replace(canMatch[0], `${metaTag}\n    ${canMatch[0]}`);
      } else {
        html = html.replace('</head>', `    ${metaTag}\n</head>`);
      }
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  return { updated: true, keywords: keywordString };
}

console.log('⚡ [Keywords Implementation] Processing all pages one by one...\n');

const allFiles = getHtmlFiles('public');
let updatedCount = 0;
let skippedCount = 0;

allFiles.forEach((file, idx) => {
  const rel = path.relative('public', file).replace(/\\/g, '/');
  const res = processFile(file);
  if (res.updated) {
    updatedCount++;
    console.log(`[${updatedCount.toString().padStart(3, '0')}/${allFiles.length}] ✓ ${rel}`);
    console.log(`      Keywords: ${res.keywords}`);
  } else {
    skippedCount++;
    console.log(`[---/${allFiles.length}] ↷ Skipped: ${rel} (${res.reason})`);
  }
});

console.log('\n=======================================');
console.log(`🎉 COMPLETED KEYWORDS IMPLEMENTATION`);
console.log(`Total HTML files examined: ${allFiles.length}`);
console.log(`Total Pages updated one-by-one: ${updatedCount}`);
console.log(`Total Pages skipped (404 / admin): ${skippedCount}`);
console.log('=======================================');
