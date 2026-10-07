const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const vercelFile = path.resolve(rootDir, 'vercel.json');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

console.log('⚡ [Build SEO Pages] Initializing Phase 1 Topical Architecture Engine...');

if (!fs.existsSync(registryFile)) {
  console.error('❌ Registry not found at data/seo-pages.json');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
console.log(`✓ Loaded registry with ${registry.length} source URL mappings.`);

// Verified Case Studies Catalog for internal linking & proof
const CASE_STUDIES = {
  'pixza': {
    slug: 'pixza',
    title: 'Pixza Studio — AI Media & Creative SaaS',
    tag: 'AI Product Development',
    desc: 'High-concurrency AI generation engine built on React 19, Cloudflare Workers, and sub-second generation pipelines.',
    image: '/assets/images/case-studies/pixza/hero.jpg',
    url: '/case-studies/pixza'
  },
  'kova': {
    slug: 'kova',
    title: 'Kova — Next-Gen AI Visual Web Builder',
    tag: 'Digital Product Engineering',
    desc: 'Proprietary visual layout engine compiling drag-and-drop actions into clean, production-grade Next.js code.',
    image: '/assets/images/case-studies/pixza/img-1.webp',
    url: '/case-studies/kova'
  },
  'nextschool-erp': {
    slug: 'nextschool-erp',
    title: 'NextSchool ERP — Multi-Campus School Cloud',
    tag: 'Education SaaS & Systems',
    desc: 'Enterprise multi-role school operating system managing admissions, fee reconciliation, live bus tracking, and grading.',
    image: '/assets/images/case-studies/lms-ecosystem/hero.jpg',
    url: '/case-studies/nextschool-erp'
  },
  'nursepass': {
    slug: 'nursepass',
    title: 'NursePass — Healthcare Clinical Examination Portal',
    tag: 'Healthcare Web Platform',
    desc: 'NCLEX simulation engine with adaptive question scoring, real-time analytics, and high-security student examination gateways.',
    image: '/assets/images/case-studies/nursepass/hero.jpg',
    url: '/case-studies/nursepass'
  },
  'lms-ecosystem': {
    slug: 'lms-ecosystem',
    title: 'LMS Ecosystem — Multi-Role Educational Platform',
    tag: 'Web Application Development',
    desc: 'Complex role-based web and mobile ecosystem connecting 25,000+ students, teachers, parents, and administrative staff.',
    image: '/assets/images/case-studies/lms-ecosystem/hero.jpg',
    url: '/case-studies/lms-ecosystem'
  },
  'bazzaro': {
    slug: 'bazzaro',
    title: 'Bazzaro — Headless Fashion & Apparel Flagship',
    tag: 'Headless Ecommerce',
    desc: 'Bespoke Shopify Plus architecture delivering sub-second collection transitions, faceted filters, and 42% higher conversion velocity.',
    image: '/assets/images/case-studies/bazzaro/hero.jpg',
    url: '/case-studies/bazzaro'
  },
  'urbanland': {
    slug: 'urbanland',
    title: 'Urbanland Products — High-Spec Architectural Catalogue',
    tag: 'B2B Catalog & Ecommerce',
    desc: 'Engineered specification platform for high-performance architectural materials, CAD downloads, and contractor portals.',
    image: '/assets/images/case-studies/urbanland/hero.jpg',
    url: '/case-studies/urbanland'
  },
  'kala-design': {
    slug: 'kala-design',
    title: 'Kala Design Co — Architecture & Spatial Studio',
    tag: 'Editorial Studio Website',
    desc: 'Minimalist editorial showcase with fluid WebGL interactions, project documentation galleries, and refined typographic pacing.',
    image: '/assets/images/case-studies/kala-design/hero.jpg',
    url: '/case-studies/kala-design'
  },
  'decor-lab': {
    slug: 'decor-lab',
    title: 'Decor Lab — Luxury Interior Studio & Commerce',
    tag: 'Custom Web & WooCommerce',
    desc: 'Curated interior architecture showroom combining high-resolution spatial portfolios with custom inquiry funnels.',
    image: '/assets/images/case-studies/decor-lab/hero.jpg',
    url: '/case-studies/decor-lab'
  },
  'spa-salon': {
    slug: 'spa-salon',
    title: 'Spa & Salon — Multi-Branch Wellness Booking Platform',
    tag: 'Booking & Local Commerce',
    desc: 'Direct appointment management platform featuring multi-staff scheduling, WhatsApp confirmations, and POS integration.',
    image: '/assets/images/case-studies/decor-lab/hero.jpg',
    url: '/case-studies/spa-salon'
  },
  'fintech-roi-calculator': {
    slug: 'fintech-roi-calculator',
    title: 'Fintech ROI Calculator — Interactive Financial Engine',
    tag: 'Interactive Web Application',
    desc: 'Real-time client financial modeling application with dynamic SVG visualization, parametric sliders, and automated PDF delivery.',
    image: '/assets/images/case-studies/urbanland/hero.jpg',
    url: '/case-studies/fintech-roi-calculator'
  }
};

// Common Header Navigation Component
function renderHeader() {
  return `
  <header class="site-header" style="position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0, 0, 0, 0.08);">
    <div class="seo-container" style="display: flex; align-items: center; justify-content: space-between; height: 72px;">
      <a href="/" class="site-logo" style="text-decoration: none; display: flex; align-items: center; gap: 0.6rem; color: #111111; font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em;">
        <span style="display: inline-block; width: 10px; height: 10px; background: #ea580c; border-radius: 50%;"></span>
        KAWAKI STUDIOS
      </a>
      <nav class="site-nav" style="display: flex; align-items: center; gap: 2rem;">
        <a href="/services" style="color: #444444; text-decoration: none; font-size: 0.92rem; font-weight: 600; transition: color 0.15s ease;">Services</a>
        <a href="/case-studies" style="color: #444444; text-decoration: none; font-size: 0.92rem; font-weight: 600; transition: color 0.15s ease;">Selected Work</a>
        <a href="/about" style="color: #444444; text-decoration: none; font-size: 0.92rem; font-weight: 600; transition: color 0.15s ease;">About</a>
        <a href="/blog" style="color: #444444; text-decoration: none; font-size: 0.92rem; font-weight: 600; transition: color 0.15s ease;">Insights</a>
        <a href="/contact" style="background: #111111; color: #FFFFFF; text-decoration: none; font-size: 0.88rem; font-weight: 600; padding: 0.6rem 1.25rem; border-radius: 9999px; transition: background 0.15s ease;">Start a Project &rarr;</a>
      </nav>
    </div>
  </header>`;
}

// Common Footer Component
function renderFooter() {
  return `
  <footer class="site-footer" style="background: #FAFAFA; border-top: 1px solid rgba(0, 0, 0, 0.08); padding: 5rem 0 3rem; margin-top: 4rem;">
    <div class="seo-container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
        <div>
          <div style="font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em; color: #111111; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #ea580c; border-radius: 50%;"></span>
            KAWAKI STUDIOS
          </div>
          <p style="font-size: 0.88rem; color: #666666; line-height: 1.6; margin: 0 0 1.5rem 0;">
            New Delhi-based digital product and web development studio. Engineering custom websites, headless commerce, web applications, and AI systems built to last.
          </p>
          <div style="font-size: 0.82rem; color: #888888;">
            Registered Studio: New Delhi, India<br />
            Global Client Collaborations
          </div>
        </div>

        <div>
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; margin-bottom: 1.2rem;">Core Disciplines</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
            <li><a href="/services/custom-web-development" style="color: #555555; text-decoration: none;">Custom Web Development</a></li>
            <li><a href="/services/web-application-development" style="color: #555555; text-decoration: none;">Web Applications</a></li>
            <li><a href="/services/shopify-development" style="color: #555555; text-decoration: none;">Shopify & Headless Commerce</a></li>
            <li><a href="/services/ai-automation" style="color: #555555; text-decoration: none;">AI Automation & Agents</a></li>
            <li><a href="/services/ai-search-optimization" style="color: #555555; text-decoration: none;">AI Search & GEO</a></li>
            <li><a href="/services/website-security-hardening" style="color: #555555; text-decoration: none;">Security & Incident Recovery</a></li>
          </ul>
        </div>

        <div>
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; margin-bottom: 1.2rem;">Key Locations</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
            <li><a href="/delhi" style="color: #555555; text-decoration: none;">New Delhi (Studio HQ)</a></li>
            <li><a href="/bangalore" style="color: #555555; text-decoration: none;">Bangalore (Tech Corridor)</a></li>
            <li><a href="/mumbai" style="color: #555555; text-decoration: none;">Mumbai (Enterprise & D2C)</a></li>
            <li><a href="/pune" style="color: #555555; text-decoration: none;">Pune (Software Hub)</a></li>
            <li><a href="/hyderabad" style="color: #555555; text-decoration: none;">Hyderabad (Enterprise IT)</a></li>
            <li><a href="/locations" style="color: #ea580c; text-decoration: none; font-weight: 600;">All Locations &rarr;</a></li>
          </ul>
        </div>

        <div>
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; margin-bottom: 1.2rem;">Resources & Legal</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
            <li><a href="/pricing" style="color: #555555; text-decoration: none;">Studio Pricing Models</a></li>
            <li><a href="/technical-audit" style="color: #555555; text-decoration: none;">Architecture Audit</a></li>
            <li><a href="/resources" style="color: #555555; text-decoration: none;">Engineering Whitepapers</a></li>
            <li><a href="/privacy-policy" style="color: #555555; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/terms-of-service" style="color: #555555; text-decoration: none;">Terms of Service</a></li>
            <li><a href="/terminal" style="color: #555555; text-decoration: none;">Developer Terminal</a></li>
          </ul>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(0, 0, 0, 0.08); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.82rem; color: #888888;">
        <div>&copy; 2026 Kawaki Studios LLP. All rights reserved. Precise, durable web systems.</div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="https://github.com/gusfing/kawaki" target="_blank" rel="noopener" style="color: #888888; text-decoration: none;">GitHub</a>
          <a href="https://x.com/kawakistudios" target="_blank" rel="noopener" style="color: #888888; text-decoration: none;">Twitter</a>
          <a href="/sitemap.xml" style="color: #888888; text-decoration: none;">XML Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
  
  <script src="/assets/js/chatbot.js?v=20261008_v1" defer></script>
  <script>
    // FAQ Accordion Interaction
    document.querySelectorAll('.seo-faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.seo-faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.seo-faq-item').forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  </script>`;
}

// Generate FAQ Schema and Markup
function generateFaqs(pageData) {
  const serviceName = pageData.service || 'Custom Web Development';
  const loc = pageData.location || 'Delhi';
  const isLocation = pageData.pageType.includes('location');

  let faqs = [];

  if (isLocation) {
    faqs = [
      {
        q: `How does Kawaki Studios collaborate with businesses in ${loc}?`,
        a: `Kawaki Studios is headquartered in New Delhi and works with businesses in ${loc} through a structured remote engineering model. We conduct live technical discovery sessions via video, operate transparent sprint boards in Linear, maintain continuous staging previews on Vercel, and provide clear asynchronous updates.`
      },
      {
        q: `Do you have a physical sales office in ${loc}?`,
        a: `No. We do not maintain redundant physical branch offices or mark up client rates to pay for local real estate overhead. All our senior digital artisans and software engineers work centrally from our New Delhi studio, delivering world-class custom web systems to ${loc} clients at direct engineering value.`
      },
      {
        q: `What types of ${loc} businesses do you typically build for?`,
        a: `We build for ambitious technology startups, established D2C retail brands, high-growth professional services, healthcare institutions, and enterprise teams in ${loc} that have outgrown rigid templates, WordPress bloat, or slow no-code site builders.`
      },
      {
        q: `How long does a custom web project typically take for a ${loc} brand?`,
        a: `A focused corporate flagship or high-conversion marketing platform typically takes 4 to 6 weeks. More complex web applications, multi-role client portals, or custom headless Shopify architectures generally require 8 to 12 weeks with milestone-driven sprint staging.`
      },
      {
        q: `What technology stack do you use for ${loc} web development projects?`,
        a: `We architect primarily with modern web standards: Next.js (App Router), TypeScript, React, Tailwind CSS, Cloudflare Workers, Node.js, and headless CMS or Shopify Storefront APIs. We never lock clients into proprietary black-box software.`
      },
      {
        q: `How do you ensure post-launch security and performance maintenance?`,
        a: `Every project includes comprehensive post-launch warranty support, automated 24/7 uptime monitoring, daily offsite database snapshots, and edge WAF firewall configuration via Cloudflare to prevent intrusion and maintain sub-second load times.`
      }
    ];
  } else {
    faqs = [
      {
        q: `What does ${serviceName} typically involve at Kawaki Studios?`,
        a: `Our ${serviceName.toLowerCase()} engagements begin with deep requirements discovery, systems architecture design, component modeling, and full-stack software development. We deliver clean, modular codebases with automated CI/CD deployments, structured schema, and comprehensive technical documentation.`
      },
      {
        q: `How is custom ${serviceName.toLowerCase()} different from generic agency templates?`,
        a: `Unlike traditional agencies that repurpose bloated third-party themes or generic page builders, Kawaki Studios writes clean, purposeful code tailored to your exact business workflows. This ensures sub-second render speeds, total architectural ownership, zero security vulnerabilities from unmaintained plugins, and seamless scalability.`
      },
      {
        q: `Can you integrate ${serviceName.toLowerCase()} with our existing software and APIs?`,
        a: `Yes. We specialize in API orchestration and headless middleware. Whether you need bidirectional sync with your CRM (HubSpot, Salesforce), ERP systems, payment gateways (Stripe, Razorpay), or internal databases, we build resilient, typed integration pipelines.`
      },
      {
        q: `What are your project pricing and payment structures?`,
        a: `We operate on transparent, milestone-scoped fixed pricing. After an initial technical scoping call, we provide a detailed statement of work with clearly defined deliverable sprints, transparent timelines, and zero hidden scope creep.`
      },
      {
        q: `Who owns the intellectual property and code upon project completion?`,
        a: `You do. You retain 100% full intellectual property ownership of all custom source code, design files, architectural documentation, and database schemas upon completion and payment. We hand over clean Git repositories with zero proprietary license locks.`
      },
      {
        q: `How do we get started on a ${serviceName.toLowerCase()} project?`,
        a: `You can initiate a discovery discussion by booking a 15-minute briefing via our Contact Page or submitting your project brief. Our senior technical partners will review your requirements and outline a preliminary architectural blueprint.`
      }
    ];
  }

  return faqs;
}

// Generate Complete Page HTML
function generatePageHtml(pageData) {
  const canonicalUrl = `https://www.kawaki.co.in${pageData.kawakiUrl}`;
  const faqs = generateFaqs(pageData);
  const matchedStudies = (pageData.relatedCaseStudies || ['pixza', 'bazzaro'])
    .map(slug => CASE_STUDIES[slug])
    .filter(Boolean)
    .slice(0, 3);

  // Schema.org Graph
  const schemaGraph = [
    {
      "@type": pageData.schemaType || "Service",
      "@id": `${canonicalUrl}#service`,
      "name": pageData.h1,
      "url": canonicalUrl,
      "description": pageData.metaDescription,
      "provider": {
        "@type": "Organization",
        "@id": "https://www.kawaki.co.in/#organization",
        "name": "Kawaki Studios",
        "url": "https://www.kawaki.co.in",
        "logo": "https://www.kawaki.co.in/assets/images/kawaki-logo.png"
      },
      "serviceType": pageData.service
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.kawaki.co.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": pageData.pageType.includes('location') ? "Locations" : "Services",
          "item": pageData.pageType.includes('location') ? "https://www.kawaki.co.in/locations" : "https://www.kawaki.co.in/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageData.h1,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${pageData.metaDescription.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <title>${pageData.title.replace(/"/g, '&quot;')}</title>

    <!-- Open Graph / Social -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${pageData.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${pageData.metaDescription.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />
    <meta property="og:site_name" content="Kawaki Studios" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="${pageData.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${pageData.metaDescription.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />

    <!-- Fonts & Core Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
    <link rel="stylesheet" href="/assets/css/global.css?v=20261008_v1" />
    <link rel="stylesheet" href="/assets/css/seo-pages.css?v=20261008_v1" />
    <link rel="stylesheet" href="/assets/css/chatbot.css?v=20261008_v1" />

    <!-- Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }, null, 2)}
    </script>
</head>
<body class="seo-page-body">

    ${renderHeader()}

    <!-- Breadcrumb Bar -->
    <div class="seo-breadcrumb-nav">
      <div class="seo-container">
        <ul class="seo-breadcrumb-list" aria-label="Breadcrumb">
          <li class="seo-breadcrumb-item"><a href="/">Home</a></li>
          <li class="seo-breadcrumb-sep">/</li>
          <li class="seo-breadcrumb-item"><a href="${pageData.pageType.includes('location') ? '/locations' : '/services'}">${pageData.pageType.includes('location') ? 'Locations' : 'Services'}</a></li>
          <li class="seo-breadcrumb-sep">/</li>
          <li class="seo-breadcrumb-item active" aria-current="page">${pageData.service}</li>
        </ul>
      </div>
    </div>

    <!-- Main Hero -->
    <main>
      <section class="seo-hero">
        <div class="seo-container">
          <div class="seo-badge-row">
            <span class="seo-badge accent">${pageData.service}</span>
            <span class="seo-badge">${pageData.location ? `${pageData.location} · Global` : 'Digital Engineering'}</span>
            <span class="seo-badge">Verified Architecture</span>
          </div>

          <h1 class="seo-hero-title">${pageData.h1}</h1>
          <p class="seo-hero-desc">${pageData.metaDescription}</p>

          <div class="seo-hero-actions">
            <a href="/contact" class="seo-btn-primary">Start a Project &rarr;</a>
            <a href="/case-studies" class="seo-btn-secondary">Explore Our Work</a>
          </div>
        </div>
      </section>

      <!-- Section 1: Executive Overview -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 01 / STRATEGIC OVERVIEW ]</span>
          <h2 class="seo-section-title">Built for Precision, High Velocity & Long-Term Maintainability</h2>
          <p class="seo-section-desc">
            Your web platform is the single most critical asset in your digital operations. Kawaki Studios architects custom digital products around your exact business requirements, performance boundaries, and scaling targets — without reliance on fragile third-party page builders or bloated legacy code.
          </p>

          <div class="seo-grid-3">
            <div class="seo-card">
              <div class="seo-card-number">01.01</div>
              <h3 class="seo-card-title">Clean Engineering Architecture</h3>
              <p class="seo-card-body">
                We develop with modern modular components, strict TypeScript typing, and edge-rendered delivery. The result is zero technical debt, predictable maintenance, and lightning-fast execution.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">01.02</div>
              <h3 class="seo-card-title">Measurable Conversion Velocity</h3>
              <p class="seo-card-body">
                Sub-second page transitions, intuitive visual hierarchies, and friction-free user journeys engineered to turn cold organic visitors into qualified inbound leads and paying customers.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">01.03</div>
              <h3 class="seo-card-title">Direct Studio Partnership</h3>
              <p class="seo-card-body">
                You work directly with our senior software engineers and product designers in New Delhi. No non-technical account managers, no offshore outsourcing, and no handoff disconnects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Core Capabilities & Deliverables -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 02 / CAPABILITY SPECTRUM ]</span>
          <h2 class="seo-section-title">What We Design, Build & Deploy</h2>
          <p class="seo-section-desc">
            From focused digital flagship websites to complex web applications and automated AI data flows, we engineer resilient software systems across every layer of the modern technical stack.
          </p>

          <div class="seo-grid-2">
            <div class="seo-card">
              <div class="seo-card-number">02.01</div>
              <h3 class="seo-card-title">Custom Frontend Engineering & Design Systems</h3>
              <p class="seo-card-body">
                Bespoke design systems authored in pure CSS or Tailwind, eliminating layout shifts and asset bloat. Fully responsive, WCAG 2.1 AA accessible, and optimized for maximum interaction velocity on mobile and desktop viewports.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">02.02</div>
              <h3 class="seo-card-title">Serverless API & Backend Orchestration</h3>
              <p class="seo-card-body">
                Resilient backend micro-services, transactional webhook listeners, and relational SQLite/PostgreSQL schemas engineered with Hono, Node.js, and edge computing for fault-tolerant reliability.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">02.03</div>
              <h3 class="seo-card-title">Search & Generative Discovery Architecture</h3>
              <p class="seo-card-body">
                Built-in semantic HTML5 hierarchy, automated JSON-LD structured data, clean canonical index structures, and llms.txt integration so search crawlers and AI answer engines index your value proposition accurately.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">02.04</div>
              <h3 class="seo-card-title">Enterprise Security Hardening & Edge WAF</h3>
              <p class="seo-card-body">
                Zero-trust cloud infrastructure, strict Content Security Policies (CSP), automated rate-limiting, and sanitized data inputs that protect your operations from automated malware and injection exploits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Delivery Process -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 03 / DELIVERY PROTOCOL ]</span>
          <h2 class="seo-section-title">Transparent 6-Stage Engineering Process</h2>
          <p class="seo-section-desc">
            We operate through transparent, milestone-gated sprints with continuous staging access, weekly video walkthroughs, and clear architectural deliverables.
          </p>

          <div class="seo-process-timeline">
            <div class="seo-process-step">
              <div class="seo-step-num">01 / SCOPE</div>
              <div class="seo-step-title">Technical Discovery</div>
              <p class="seo-step-desc">Audit user journeys, data flow, third-party APIs, and establish rigid non-functional requirements.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">02 / ARCH</div>
              <div class="seo-step-title">System Architecture</div>
              <p class="seo-step-desc">Define database models, API boundaries, component tokens, and deployment pipelines.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">03 / DESIGN</div>
              <div class="seo-step-title">Editorial UX Design</div>
              <p class="seo-step-desc">High-fidelity typography, spatial layouts, micro-interactions, and conversion paths in Figma.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">04 / BUILD</div>
              <div class="seo-step-title">Sprint Engineering</div>
              <p class="seo-step-desc">Full-stack software construction, automated test writing, and continuous staging reviews.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">05 / LAUNCH</div>
              <div class="seo-step-title">Hardening & Cutover</div>
              <p class="seo-step-desc">Lighthouse audit optimization, 301 redirect map verification, SSL cutover, and DNS deployment.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">06 / EVOLVE</div>
              <div class="seo-step-title">Ongoing Retainer</div>
              <p class="seo-step-desc">Continuous monitoring, security patches, iterative performance audits, and feature expansion.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Relevant Verified Case Studies -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 04 / VERIFIED PROOF ]</span>
          <h2 class="seo-section-title">Demonstrated Digital Flagships & Production Systems</h2>
          <p class="seo-section-desc">
            Explore verified web applications, digital products, and ecommerce architectures engineered by Kawaki Studios.
          </p>

          <div class="seo-cases-grid">
            ${matchedStudies.map(cs => `
            <a href="${cs.url}" class="seo-case-card">
              <img src="${cs.image}" alt="${cs.title}" class="seo-case-image" loading="lazy" width="600" height="340" />
              <div class="seo-case-content">
                <span class="seo-case-tag">${cs.tag}</span>
                <h3 class="seo-case-title">${cs.title}</h3>
                <p class="seo-case-desc">${cs.desc}</p>
                <span class="seo-case-link">Read Blueprint &rarr;</span>
              </div>
            </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Section 5: Technical FAQs -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 05 / FREQUENTLY ASKED QUESTIONS ]</span>
          <h2 class="seo-section-title">Common Questions & Technical Details</h2>
          <p class="seo-section-desc">
            Clear, practical answers about our engineering standards, collaboration workflows, pricing models, and timelines.
          </p>

          <div class="seo-faq-container">
            ${faqs.map((f, i) => `
            <div class="seo-faq-item ${i === 0 ? 'active' : ''}">
              <button class="seo-faq-question" type="button">
                <span>${f.q}</span>
                <span class="seo-faq-icon">+</span>
              </button>
              <div class="seo-faq-answer">
                <p style="margin: 0;">${f.a}</p>
              </div>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Section 6: High-Impact Conversion CTA -->
      <section class="seo-cta-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ START A PROJECT ]</span>
          <h2>Ready to Architect a Web System Built to Last?</h2>
          <p>
            Whether you need a custom web platform, a headless commerce storefront, or deterministic AI automation, our partners are ready to engineer your solution.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/contact" style="background: #FFFFFF; color: #111111; padding: 0.9rem 2rem; border-radius: 9999px; font-weight: 700; text-decoration: none; transition: transform 0.15s ease;">Schedule Architecture Call &rarr;</a>
            <a href="mailto:contact@kawaki.co.in" style="background: rgba(255, 255, 255, 0.1); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.9rem 2rem; border-radius: 9999px; font-weight: 600; text-decoration: none;">contact@kawaki.co.in</a>
          </div>
        </div>
      </section>
    </main>

    ${renderFooter()}

</body>
</html>`;
}

// 1. Build All 'create' Pages
console.log('\n🚀 [1/3] Generating HTML pages for action=create...');
let createdCount = 0;
const indexableUrls = [];

for (const entry of registry) {
  if (entry.action === 'create') {
    // Generate static file
    let relPath = entry.kawakiUrl.replace(/^\//, '');
    let filePath;

    if (relPath.includes('/')) {
      const dirPart = path.dirname(relPath);
      const filePart = path.basename(relPath);
      const fullDir = path.join(publicDir, dirPart);
      if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
      filePath = path.join(fullDir, `${filePart}.html`);
    } else {
      filePath = path.join(publicDir, `${relPath}.html`);
    }

    const html = generatePageHtml(entry);
    fs.writeFileSync(filePath, html, 'utf8');
    createdCount++;
  }

  if (entry.indexable && entry.kawakiUrl) {
    indexableUrls.push(entry.kawakiUrl);
  }
}
console.log(`✓ Generated ${createdCount} static HTML pages in public/ directory.`);

// 2. Generate 301 Redirects in vercel.json
console.log('\n🚀 [2/3] Updating redirects in vercel.json...');
if (fs.existsSync(vercelFile)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
  const existingRedirects = vercelConfig.redirects || [];
  const existingSourceSet = new Set(existingRedirects.map(r => r.source));

  let addedRedirects = 0;
  for (const entry of registry) {
    if (entry.action === 'redirect' || entry.action === 'merge') {
      const sourcePath = new URL(entry.sourceUrl).pathname.replace(/\/$/, '') || '/';
      const targetPath = entry.kawakiUrl;

      if (sourcePath !== targetPath && !existingSourceSet.has(sourcePath)) {
        existingRedirects.push({
          source: sourcePath,
          destination: targetPath,
          permanent: true
        });
        existingSourceSet.add(sourcePath);
        addedRedirects++;
      }
    }
  }

  vercelConfig.redirects = existingRedirects;
  fs.writeFileSync(vercelFile, JSON.stringify(vercelConfig, null, 2), 'utf8');
  console.log(`✓ Synchronized vercel.json: ${addedRedirects} redirects added (total ${existingRedirects.length}).`);
}

// 3. Extend public/sitemap.xml
console.log('\n🚀 [3/3] Synchronizing sitemap.xml with Phase 1 indexable inventory...');
if (fs.existsSync(sitemapFile)) {
  let sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
  
  // Extract existing locs
  const existingLocMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  const existingUrls = new Set(existingLocMatches.map(m => m.replace(/<\/?loc>/g, '').trim()));
  
  // Unique canonical indexable URLs to add
  const uniqueUrlsToAdd = Array.from(new Set(indexableUrls));
  let addedSitemapCount = 0;
  let newEntriesXml = '';

  for (const u of uniqueUrlsToAdd) {
    const fullLoc = `https://www.kawaki.co.in${u.replace(/\/$/, '') || '/'}`;
    if (!existingUrls.has(fullLoc) && fullLoc !== 'https://www.kawaki.co.in/blog/:slug') {
      newEntriesXml += `  <url>\n    <loc>${fullLoc}</loc>\n    <lastmod>2026-10-08</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      existingUrls.add(fullLoc);
      addedSitemapCount++;
    }
  }

  if (addedSitemapCount > 0) {
    const closeTagIdx = sitemapContent.lastIndexOf('</urlset>');
    if (closeTagIdx !== -1) {
      sitemapContent = sitemapContent.slice(0, closeTagIdx) + newEntriesXml + sitemapContent.slice(closeTagIdx);
      fs.writeFileSync(sitemapFile, sitemapContent, 'utf8');
      console.log(`✓ Added ${addedSitemapCount} verified Phase 1 canonical URLs to sitemap.xml.`);
    }
  } else {
    console.log('✓ sitemap.xml is already up to date.');
  }
}

console.log('\n🎉 [Build SEO Pages] Phase 1 Topical Architecture Build Complete!');
