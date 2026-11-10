const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const seoPagesFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const factsFile = path.resolve(rootDir, 'data', 'kawaki-facts.json');

console.log('⚡ [Build Directory] Generating authoritative HTML Directory and Site Index...');

const seoPages = JSON.parse(fs.readFileSync(seoPagesFile, 'utf8'));
const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));

// Group pages by category
const corePages = [
  { url: '/', title: 'Home — Custom Web Development & Software Studio', desc: 'Bespoke web platforms, headless commerce, and software engineering in New Delhi.' },
  { url: '/about', title: 'About Kawaki Studios', desc: 'Studio ethos, engineering philosophy, and founder-led delivery model.' },
  { url: '/services', title: 'Services & Systems Architecture', desc: 'Complete capability catalog across web, mobile, ecommerce, and AI automation.' },
  { url: '/case-studies', title: 'Selected Work & Case Studies', desc: 'Architectural case studies, verified production systems, and performance telemetry.' },
  { url: '/blog', title: 'Engineering Journal & Insights', desc: 'Technical essays on performance, AI search engines, headless commerce, and security.' },
  { url: '/contact', title: 'Discovery & Project Booking', desc: 'Direct intake, 15-minute briefing calls, and WhatsApp consultation.' },
  { url: '/privacy-policy', title: 'Privacy Policy', desc: 'Client confidentiality, data protection, and governance principles.' },
  { url: '/terms-of-service', title: 'Terms of Service', desc: 'Commercial engagement terms, milestone delivery, and intellectual property.' },
  { url: '/terminal', title: 'Interactive Studio Terminal', desc: 'Developer CLI terminal interface for Kawaki Studios services and telemetry.' }
];

const coreServices = [
  { url: '/services/custom-web-development', title: 'Custom Web Development', desc: 'Bespoke Next.js & TypeScript platforms engineered for sub-second Core Web Vitals.' },
  { url: '/services/web-application-development', title: 'Web Application Development', desc: 'Complex SaaS portals, multi-tenant workflows, and resilient API architecture.' },
  { url: '/services/mobile-app-development', title: 'Mobile App Development', desc: 'Cross-platform native iOS & Android applications built with React Native and Expo.' },
  { url: '/services/shopify-development', title: 'Headless Shopify Commerce', desc: 'Sub-second luxury D2C storefronts, bespoke checkout flows, and ERP integrations.' },
  { url: '/services/ai-automation', title: 'AI Automation & Agents', desc: 'Deterministic LLM pipelines, autonomous calling agents, and business workflows.' },
  { url: '/services/ai-search-optimization', title: 'AI Search & Answer Engine Optimization', desc: 'Structured data, schema hierarchies, and knowledge graph authority for Perplexity & ChatGPT.' },
  { url: '/services/website-performance-optimization', title: 'Performance & Core Web Vitals', desc: 'Sub-1.0s LCP tuning, bundle minimization, and edge CDN cache optimization.' },
  { url: '/services/website-redesign', title: 'Enterprise Website Redesign', desc: 'Editorial visual upgrades, zero-downtime migrations, and SEO preservation.' },
  { url: '/services/website-security-hardening', title: 'Website Security Hardening', desc: 'Attack surface elimination, CSP headers, automated vulnerability shielding.' },
  { url: '/services/wordpress-security-audit', title: 'WordPress Security Audit', desc: 'Deep forensic scans, backdoor hunting, and integrity auditing.' },
  { url: '/services/wordpress-malware-removal', title: 'WordPress Malware Removal', desc: 'Emergency disinfection, database remediation, and Google blacklist clearance.' },
  { url: '/services/wordpress-backdoor-removal', title: 'WordPress Backdoor Removal', desc: 'Stealth web shell eradication and permanent cron re-infection defense.' },
  { url: '/services/malicious-redirect-removal', title: 'Malicious Redirect Removal', desc: 'Remediation of .htaccess injections and stealth mobile redirects.' },
  { url: '/services/seo-spam-removal', title: 'SEO Spam & Japanese Keyword Hack Removal', desc: 'Search index repair, spam injection cleanup, and sitemap re-indexing.' },
  { url: '/services/wordpress-development', title: 'Custom WordPress Engineering', desc: 'Headless CMS setups, bespoke theme engineering, and zero-plugin architectures.' }
];

// Read blog posts
let blogPosts = [];
const blogHtmlPath = path.join(publicDir, 'blog.html');
if (fs.existsSync(blogHtmlPath)) {
  const blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');
  const postRegex = /<a\s+href="(\/blog\/[^"]+)"[^>]*>[\s\S]*?<h[23][^>]*>(.*?)<\/h[23]>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi;
  let match;
  while ((match = postRegex.exec(blogHtml)) !== null) {
    blogPosts.push({
      url: match[1],
      title: match[2].replace(/<[^>]+>/g, '').trim(),
      desc: match[3].replace(/<[^>]+>/g, '').trim()
    });
  }
}

// Case Studies
const caseStudies = [
  { url: '/case-studies/kala-design', title: 'Kala Design Co — Architectural Monograph', desc: 'Luxury editorial platform with 0.6s LCP and bespoke project archives.' },
  { url: '/case-studies/bazzaro', title: 'BAZZARO — Headless Menswear Flagship', desc: 'Headless Shopify with 0.4s instant search and 4.2x checkout speed.' },
  { url: '/case-studies/nextschool-erp', title: 'NextSchool ERP — Institutional Campus OS', desc: 'Multi-tenant cloud architecture managing 12,000+ active institutional records.' },
  { url: '/case-studies/nursepass', title: 'NursePass — Healthcare Clinical Engine', desc: 'Adaptive NCLEX assessment engine built on Next.js App Router and WCAG Level AA.' },
  { url: '/case-studies/acme-headless-ecommerce', title: 'Acme Headless Commerce Platform', desc: 'High-conversion modular commerce architecture with sub-second catalog discovery.' },
  { url: '/case-studies/decor-lab', title: 'Decor Lab — Interior Design Portfolio', desc: 'Minimalist spatial gallery with custom fluid image zoom and zero layout shift.' },
  { url: '/case-studies/iptv-mobile', title: 'IPTV Mobile Streaming Interface', desc: 'Low-latency media streaming player and live guide on React Native.' },
  { url: '/case-studies/kova', title: 'KOVA — Performance Web Platform', desc: 'Enterprise engineering platform focused on raw execution speed and accessibility.' },
  { url: '/case-studies/lms-ecosystem', title: 'LMS Ecosystem Platform', desc: 'Interactive curriculum delivery engine with role-based access management.' },
  { url: '/case-studies/pixza', title: 'Pixza Production Studio Platform', desc: 'High-aesthetic portfolio engine engineered for creative agencies.' },
  { url: '/case-studies/spa-salon', title: 'Spa & Wellness Booking Platform', desc: 'Instant calendar reservations, staff dispatching, and automated SMS reminders.' },
  { url: '/case-studies/urbanland', title: 'Urbanland Real Estate Monograph', desc: 'Architectural property listings with interactive neighborhood amenity maps.' },
  { url: '/case-studies/fintech-roi-calculator', title: 'Fintech ROI & Yield Calculator', desc: 'Client-side financial modeling engine with real-time dynamic compounding graphs.' }
];

// Group remaining programmatic pages by Service or Location
const aiPages = [];
const cityGroups = {};

for (const entry of seoPages) {
  if (entry.kawakiUrl === '/') continue;
  if (coreServices.some(s => s.url === entry.kawakiUrl)) continue;

  if (entry.kawakiUrl.startsWith('/ai-') || entry.kawakiUrl.includes('answer-engine') || entry.kawakiUrl.includes('citation')) {
    aiPages.push({
      url: entry.kawakiUrl,
      title: entry.h1 || entry.title,
      desc: entry.metaDescription
    });
  } else if (entry.location) {
    const loc = entry.location;
    if (!cityGroups[loc]) cityGroups[loc] = [];
    cityGroups[loc].push({
      url: entry.kawakiUrl,
      title: entry.h1 || entry.title,
      desc: entry.metaDescription
    });
  } else {
    // Other service/topic
    const cat = entry.service || 'Specialized Solutions';
    if (!cityGroups[cat]) cityGroups[cat] = [];
    cityGroups[cat].push({
      url: entry.kawakiUrl,
      title: entry.h1 || entry.title,
      desc: entry.metaDescription
    });
  }
}

// Add specialized regional mobile application practice pages
const mobileCities = [
  { city: 'Delhi', url: '/delhi/mobile-app-development-company', title: 'Mobile App Development Company in Delhi', desc: 'Native iOS & Android mobile app engineering for high-growth ventures in Delhi NCR.' },
  { city: 'Bangalore', url: '/bangalore/mobile-app-development-company', title: 'Mobile App Development Company in Bangalore', desc: 'Production React Native and Expo mobile app development for venture-backed teams.' },
  { city: 'Gurgaon', url: '/gurgaon/mobile-app-development-company', title: 'Mobile App Development Company in Gurgaon', desc: 'Enterprise cross-platform mobile apps engineered for speed and high retention.' },
  { city: 'Mumbai', url: '/mumbai/mobile-app-development-company', title: 'Mobile App Development Company in Mumbai', desc: 'Commercial and fintech mobile application development with sub-second response times.' }
];
for (const m of mobileCities) {
  if (!cityGroups[m.city]) cityGroups[m.city] = [];
  cityGroups[m.city].unshift({ url: m.url, title: m.title, desc: m.desc });
}

// Generate HTML
function renderDirectoryHtml() {
  const totalCount = corePages.length + coreServices.length + caseStudies.length + blogPosts.length + aiPages.length +
    Object.values(cityGroups).reduce((acc, g) => acc + g.length, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory &amp; Capabilities Index | Kawaki Studios</title>
    <meta name="description" content="Complete directory of software engineering capabilities, custom web development services, headless commerce flagships, and regional practices by Kawaki Studios.">
    <link rel="canonical" href="https://kawaki.co.in/directory">
    <meta name="robots" content="index, follow">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="stylesheet" href="/assets/css/global.css">
    <link rel="stylesheet" href="/assets/css/seo-pages.css">
    <style>
        .directory-wrap {
            max-width: 1240px;
            margin: 0 auto;
            padding: 3rem 1.5rem 6rem;
        }
        .dir-hero {
            padding: 4rem 0 2.5rem;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            margin-bottom: 3.5rem;
        }
        .dir-tag {
            font-family: 'Space Mono', monospace;
            font-size: 0.78rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #111111;
            display: inline-block;
            background: #e9e6dd;
            padding: 4px 10px;
            border-radius: 4px;
            margin-bottom: 1rem;
        }
        .dir-title {
            font-family: 'Host Grotesk', -apple-system, sans-serif;
            font-size: clamp(2.2rem, 4vw, 3.4rem);
            font-weight: 700;
            line-height: 1.12;
            color: #111111;
            margin-bottom: 1rem;
        }
        .dir-desc {
            font-size: 1.12rem;
            line-height: 1.65;
            color: #444444;
            max-width: 780px;
        }
        .dir-stats {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            margin-top: 1.5rem;
            font-family: 'Space Mono', monospace;
            font-size: 0.82rem;
            color: #333333;
        }
        .dir-section {
            margin-bottom: 4rem;
        }
        .dir-section-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            border-bottom: 2px solid #111111;
            padding-bottom: 0.75rem;
            margin-bottom: 1.5rem;
        }
        .dir-section-title {
            font-family: 'Host Grotesk', sans-serif;
            font-size: 1.55rem;
            font-weight: 700;
            color: #111111;
        }
        .dir-section-count {
            font-family: 'Space Mono', monospace;
            font-size: 0.82rem;
            color: #666666;
        }
        .dir-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.25rem;
        }
        .dir-card {
            background: #ffffff;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 8px;
            padding: 1.25rem 1.4rem;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.2s ease;
        }
        .dir-card:hover {
            border-color: #111111;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.05);
        }
        .dir-card-title {
            font-family: 'Host Grotesk', sans-serif;
            font-size: 1.05rem;
            font-weight: 700;
            color: #111111;
            margin-bottom: 0.45rem;
            line-height: 1.35;
        }
        .dir-card-desc {
            font-size: 0.85rem;
            color: #555555;
            line-height: 1.5;
            margin-bottom: 0.85rem;
            flex-grow: 1;
        }
        .dir-card-link {
            font-family: 'Space Mono', monospace;
            font-size: 0.75rem;
            font-weight: 700;
            color: #111111;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .dir-city-group {
            margin-bottom: 2.25rem;
        }
        .dir-city-name {
            font-family: 'Space Mono', monospace;
            font-size: 0.92rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #222222;
            margin-bottom: 0.85rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .dir-city-name::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgba(0,0,0,0.08);
        }
        .dir-search-bar {
            width: 100%;
            padding: 14px 18px;
            font-size: 1rem;
            border: 1px solid rgba(0,0,0,0.15);
            border-radius: 8px;
            font-family: 'Host Grotesk', sans-serif;
            margin-bottom: 2.5rem;
            background: #ffffff;
            box-sizing: border-box;
        }
        .dir-search-bar:focus {
            outline: none;
            border-color: #111111;
        }
    </style>
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://kawaki.co.in/directory#webpage",
          "url": "https://kawaki.co.in/directory",
          "name": "Directory & Capabilities Index | Kawaki Studios",
          "description": "Complete directory of software engineering capabilities, custom web development services, headless commerce flagships, and regional practices by Kawaki Studios.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://kawaki.co.in/#website",
            "name": "Kawaki Studios",
            "url": "https://kawaki.co.in"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://kawaki.co.in/directory#breadcrumb",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kawaki.co.in" },
            { "@type": "ListItem", "position": 2, "name": "Directory", "item": "https://kawaki.co.in/directory" }
          ]
        }
      ]
    }
    </script>
</head>
<body class="seo-page-body" style="background: #fbfaf6; color: #111111;">
    <!-- Global Header -->
    <header style="background: #ffffff; border-bottom: 1px solid rgba(0,0,0,0.08); padding: 1.25rem 2rem; position: sticky; top: 0; z-index: 100;">
        <div style="max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <a href="/" style="font-family: 'Host Grotesk', sans-serif; font-size: 1.25rem; font-weight: 800; color: #111111; text-decoration: none; letter-spacing: -0.02em;">
                KAWAKI <span style="font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 400; color: #666666;">// STUDIOS</span>
            </a>
            <nav style="display: flex; gap: 1.5rem; align-items: center; font-family: 'Space Mono', monospace; font-size: 0.82rem;">
                <a href="/services" style="color: #333333; text-decoration: none;">Services</a>
                <a href="/case-studies" style="color: #333333; text-decoration: none;">Work</a>
                <a href="/blog" style="color: #333333; text-decoration: none;">Journal</a>
                <a href="/about" style="color: #333333; text-decoration: none;">About</a>
                <a href="/contact" style="background: #111111; color: #ffffff; padding: 7px 14px; border-radius: 4px; text-decoration: none; font-weight: 700;">Start Project &rarr;</a>
            </nav>
        </div>
    </header>

    <main class="directory-wrap">
        <header class="dir-hero">
            <span class="dir-tag">// SITE ARCHITECTURE &amp; CAPABILITY DIRECTORY</span>
            <h1 class="dir-title">Directory &amp; Capabilities Index</h1>
            <p class="dir-desc">
                An authoritative index of verified software capabilities, high-performance web engineering practices, headless commerce solutions, and regional studio hubs engineered by Kawaki Studios.
            </p>
            <div class="dir-stats">
                <span>📁 <strong>${totalCount}</strong> Verified Destinations</span>
                <span>⚡ <strong>100%</strong> Crawlable &amp; Direct</span>
                <span>🏛️ <strong>New Delhi HQ</strong> · Studio Practice</span>
            </div>
        </header>

        <input type="text" id="dirSearch" class="dir-search-bar" placeholder="Filter capabilities, services, technologies, or cities (e.g., 'Shopify', 'Delhi', 'AI', 'Mobile', 'WordPress')..." aria-label="Search directory">

        <!-- 01. CORE STUDIO PLATFORMS -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">01 / Core Studio Platforms &amp; Portals</h2>
                <span class="dir-section-count">${corePages.length} Pages</span>
            </div>
            <div class="dir-grid">
                ${corePages.map(p => `
                <a href="${p.url}" class="dir-card">
                    <div>
                        <h3 class="dir-card-title">${p.title}</h3>
                        <p class="dir-card-desc">${p.desc}</p>
                    </div>
                    <span class="dir-card-link">View Page &rarr;</span>
                </a>
                `).join('')}
            </div>
        </section>

        <!-- 02. CORE ENGINEERING SERVICES -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">02 / Core Engineering Capabilities &amp; Services</h2>
                <span class="dir-section-count">${coreServices.length} Practices</span>
            </div>
            <div class="dir-grid">
                ${coreServices.map(s => `
                <a href="${s.url}" class="dir-card">
                    <div>
                        <h3 class="dir-card-title">${s.title}</h3>
                        <p class="dir-card-desc">${s.desc}</p>
                    </div>
                    <span class="dir-card-link">Explore Practice &rarr;</span>
                </a>
                `).join('')}
            </div>
        </section>

        <!-- 03. CASE STUDIES & PRODUCTION METRICS -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">03 / Case Studies &amp; Verified Telemetry</h2>
                <span class="dir-section-count">${caseStudies.length} Platforms</span>
            </div>
            <div class="dir-grid">
                ${caseStudies.map(cs => `
                <a href="${cs.url}" class="dir-card">
                    <div>
                        <h3 class="dir-card-title">${cs.title}</h3>
                        <p class="dir-card-desc">${cs.desc}</p>
                    </div>
                    <span class="dir-card-link">Read Architectural Case Study &rarr;</span>
                </a>
                `).join('')}
            </div>
        </section>

        <!-- 04. AI AUTOMATION & AUTONOMOUS SYSTEMS -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">04 / AI Automation, Agents &amp; Generative Visibility</h2>
                <span class="dir-section-count">${aiPages.length} Topics</span>
            </div>
            <div class="dir-grid">
                ${aiPages.map(ai => `
                <a href="${ai.url}" class="dir-card">
                    <div>
                        <h3 class="dir-card-title">${ai.title}</h3>
                        <p class="dir-card-desc">${ai.desc}</p>
                    </div>
                    <span class="dir-card-link">View Framework &rarr;</span>
                </a>
                `).join('')}
            </div>
        </section>

        <!-- 05. REGIONAL PRACTICE HUBS & CITY PRACTICES -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">05 / Regional Practice Hubs &amp; Specialized City Practices</h2>
                <span class="dir-section-count">${Object.keys(cityGroups).length} Regions</span>
            </div>
            ${Object.entries(cityGroups).map(([city, pages]) => `
            <div class="dir-city-group">
                <div class="dir-city-name">${city} Practice Hub (${pages.length} Services)</div>
                <div class="dir-grid">
                    ${pages.map(cp => `
                    <a href="${cp.url}" class="dir-card">
                        <div>
                            <h3 class="dir-card-title">${cp.title}</h3>
                            <p class="dir-card-desc">${cp.desc}</p>
                        </div>
                        <span class="dir-card-link">View Practice &rarr;</span>
                    </a>
                    `).join('')}
                </div>
            </div>
            `).join('')}
        </section>

        <!-- 06. ENGINEERING JOURNAL ARTICLES -->
        <section class="dir-section">
            <div class="dir-section-header">
                <h2 class="dir-section-title">06 / Engineering Journal &amp; Technical Insights</h2>
                <span class="dir-section-count">${blogPosts.length} Articles</span>
            </div>
            <div class="dir-grid">
                ${blogPosts.map(bp => `
                <a href="${bp.url}" class="dir-card">
                    <div>
                        <h3 class="dir-card-title">${bp.title}</h3>
                        <p class="dir-card-desc">${bp.desc}</p>
                    </div>
                    <span class="dir-card-link">Read Journal Essay &rarr;</span>
                </a>
                `).join('')}
            </div>
        </section>
    </main>

    <!-- Global Footer -->
    <footer class="sections global-site-footer">
        <div class="services-header-2">
            <div class="footer-headline-group">
                <h3 class="services-title-2">Ready to talk?</h3>
                <h3 class="services-title-2"><em>let’s build something <span style="font-family: 'Instrument Serif', Georgia, serif; font-style: italic; color: #111111; text-decoration: underline; text-decoration-color: #C6FF00; text-underline-offset: 6px;">iconic.</span></em></h3>
            </div>
            <a href="/contact" class="footer-cta-card-btn">
                <span>Schedule Intro Call</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" fill="#C6FF00"></circle>
                    <path fill="#111111" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                </svg>
            </a>
        </div>
        <div class="footer-bottom">
            <div class="copyright">© 2026 Kawaki Studios. All rights reserved. — Custom Web Development &amp; Software Engineering Studio in New Delhi &amp; Delhi NCR.</div>
            <ul class="footer-bottom-links">
                <li><a href="/directory">Directory</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener">Sitemap (XML)</a></li>
                <li><a href="/robots.txt" target="_blank" rel="noopener">Robots.txt</a></li>
                <li><a href="/llms.txt" target="_blank" rel="noopener">LLMs.txt</a></li>
            </ul>
        </div>
    </footer>

    <!-- Instant Search Script -->
    <script>
    document.getElementById('dirSearch')?.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.dir-card');
        const groups = document.querySelectorAll('.dir-city-group');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        groups.forEach(group => {
            const visible = group.querySelectorAll('.dir-card[style*="display: flex"]');
            group.style.display = (!query || visible.length > 0) ? 'block' : 'none';
        });
    });
    </script>
</body>
</html>`;
}

const html = renderDirectoryHtml();
fs.writeFileSync(path.join(publicDir, 'directory.html'), html, 'utf8');
// Also write sitemap.html companion so both /directory and /sitemap work
fs.writeFileSync(path.join(publicDir, 'sitemap.html'), html, 'utf8');

console.log('✓ Successfully generated public/directory.html & public/sitemap.html');
