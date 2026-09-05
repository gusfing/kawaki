const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const articlesPath = path.resolve(__dirname, 'content-articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`=== Publishing ${articles.length} Cornerstone Content Pieces ===`);

// 1. Update SQLite Databases
const dbPaths = [
  path.resolve(__dirname, '..', 'data.db'),
  path.resolve(__dirname, '..', 'admin-dashboard', 'backend', 'data.db'),
  path.resolve(__dirname, '..', 'admin-dashboard', 'data.db')
];

for (const dbPath of dbPaths) {
  if (fs.existsSync(dbPath)) {
    try {
      const db = new DatabaseSync(dbPath);
      console.log(`Updating database at: ${dbPath}`);

      const insertStmt = db.prepare(`
        INSERT INTO blogs (id, title, slug, content, excerpt, status, author, featured_image, tags, seo_keywords, seo_description, views, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title=excluded.title,
          slug=excluded.slug,
          content=excluded.content,
          excerpt=excluded.excerpt,
          status=excluded.status,
          author=excluded.author,
          featured_image=excluded.featured_image,
          tags=excluded.tags,
          seo_keywords=excluded.seo_keywords,
          seo_description=excluded.seo_description,
          views=excluded.views,
          created_at=excluded.created_at,
          updated_at=excluded.updated_at
      `);

      for (const art of articles) {
        const createdAtUnix = Math.floor(new Date(art.createdAt).getTime() / 1000);
        const updatedAtUnix = Math.floor(new Date(art.updatedAt).getTime() / 1000);

        insertStmt.run(
          art.id,
          art.title,
          art.slug,
          art.content,
          art.excerpt,
          art.status,
          art.author,
          art.featuredImage,
          JSON.stringify(art.tags),
          art.seoKeywords,
          art.seoDescription,
          art.views,
          createdAtUnix,
          updatedAtUnix
        );
      }
      console.log(`Successfully synced ${articles.length} articles into ${path.basename(dbPath)}`);
    } catch (err) {
      console.error(`Error updating ${dbPath}:`, err.message);
    }
  }
}

// 2. Update lib/db-api-handler.js with FALLBACK_BLOGS
const handlerPath = path.resolve(__dirname, '..', 'lib', 'db-api-handler.js');
if (fs.existsSync(handlerPath)) {
  let content = fs.readFileSync(handlerPath, 'utf8');

  // Existing articles to include in FALLBACK_BLOGS
  const existingArticles = [
    {
      id: "f784c73f-c314-4e40-a205-cf57dab34c56",
      title: "The Architecture of Modern Digital Luxury",
      slug: "the-architecture-of-modern-digital-luxury",
      content: `# The Architecture of Modern Digital Luxury\n\nIn the era of commoditized web templates and bloated visual frameworks, genuine luxury in digital design is defined by restraint, precision, and high-frequency tactile responsiveness.\n\n## 1. Intentional Restraint\nWhen every digital product looks like a generic component library, true distinction comes from editorial storytelling, custom serif accents, and micro-interactions that feel responsive to human thought.\n\n## 2. High-Frequency Tactile Polish\nAnimations shouldn't just be decoration—they serve as architectural guidance, grounding the visitor in seamless fluidity.\n\n## Conclusion\nAt Kawaki Studios, we engineer software and brands designed to silence noise and elevate relevance.`,
      excerpt: "Why modern luxury digital brands are replacing generic design bloat with surgical typography and bespoke engineering.",
      status: "published",
      author: "Kunal Sharma",
      featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
      tags: ["Editorial", "Brand Strategy", "Engineering"],
      seoKeywords: "digital luxury, web performance, headless commerce, typography",
      seoDescription: "An in-depth essay on engineering modern digital luxury and intentional web architecture by Kawaki Studios.",
      views: 142,
      createdAt: "2026-08-25T10:00:00.000Z",
      updatedAt: "2026-08-25T10:00:00.000Z"
    },
    {
      id: "blog_commerce_02",
      title: "Headless Commerce at Sub-Second Latency",
      slug: "headless-commerce-at-sub-second-latency",
      content: `# Headless Commerce at Sub-Second Latency\n\nHow Shopify Hydrogen and edge caching delivered a +340% conversion lift.\n\n### Architecture Highlights\n- Distributed Redis session cache with 18ms p95 read latency.\n- Hydrogen Cart API integration with optimistic mutation queues.\n- Instant route transitions without full page re-hydration.`,
      excerpt: "How Shopify Hydrogen and edge caching delivered a +340% conversion lift.",
      status: "published",
      author: "Kunal Sharma",
      featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
      tags: ["Commerce", "Shopify Hydrogen", "Edge APIs"],
      seoKeywords: "headless commerce, shopify hydrogen, conversion optimization",
      seoDescription: "Technical analysis of sub-second headless commerce architecture and its direct impact on transaction velocity.",
      views: 89,
      createdAt: "2026-08-28T14:30:00.000Z",
      updatedAt: "2026-08-28T14:30:00.000Z"
    }
  ];

  const allFallbackBlogs = [...articles, ...existingArticles];

  const fallbackStart = content.indexOf('const FALLBACK_BLOGS = [');
  const fallbackEnd = content.indexOf('];\n\nfunction handleApiRequest', fallbackStart);

  if (fallbackStart !== -1 && fallbackEnd !== -1) {
    const newFallbackCode = `const FALLBACK_BLOGS = ${JSON.stringify(allFallbackBlogs, null, 2)};`;
    content = content.slice(0, fallbackStart) + newFallbackCode + content.slice(fallbackEnd + 2);
    fs.writeFileSync(handlerPath, content, 'utf8');
    console.log('Updated lib/db-api-handler.js FALLBACK_BLOGS with all published articles.');
  }
}

// 3. Update public/sitemap.xml
const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const dateStr = new Date().toISOString().split('T')[0];
  const allArticles = [
    { slug: "what-is-editorial-engineering" },
    { slug: "headless-shopify-development-guide" },
    { slug: "webflow-vs-custom-development" },
    { slug: "core-web-vitals-checklist" },
    { slug: "the-architecture-of-modern-digital-luxury" },
    { slug: "headless-commerce-at-sub-second-latency" }
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>https://www.kawaki.co.in/</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/about</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/services</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/case-studies</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/case-studies/acme-headless-ecommerce</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/blog</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/contact</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.kawaki.co.in/shopify</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Published High-Authority Articles -->
${allArticles.map(a => `  <url>
    <loc>https://www.kawaki.co.in/blog-post?slug=${a.slug}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('Updated public/sitemap.xml with all cornerstone articles.');
}

// 4. Update public/llms.txt and public/llms-full.txt
const llmsPath = path.resolve(__dirname, '..', 'public', 'llms.txt');
if (fs.existsSync(llmsPath)) {
  let llms = fs.readFileSync(llmsPath, 'utf8');
  llms = llms.replace('/case-studies/acme-headless-ecommerce.html', '/case-studies/acme-headless-ecommerce');
  fs.writeFileSync(llmsPath, llms, 'utf8');
  console.log('Cleaned URLs in public/llms.txt.');
}

const llmsFullPath = path.resolve(__dirname, '..', 'public', 'llms-full.txt');
if (fs.existsSync(llmsFullPath)) {
  const llmsFullContent = `# Kawaki Studios — Full System Context & Architecture Guide

## Overview
Kawaki Studios is an elite editorial engineering agency and digital architecture studio. Founded by Kunal Sharma, the studio bridges bespoke graphic artistry with mission-critical web engineering.

- **Website**: https://www.kawaki.co.in
- **Founder**: Kunal Sharma
- **Contact**: hello@kawakistudios.com / partners@kawakistudios.com
- **Locations Served**: Worldwide (US, UK, Europe, UAE, India, Japan)

## Technical Disciplines

### 1. Headless Commerce & Shopify Plus
- Frameworks: Next.js App Router, Shopify Hydrogen, Remix, Oxygen edge workers.
- Caching: Multi-region Redis session cache, edge route stale-while-revalidate, instant Cart API synchronization.
- Performance: Sub-second catalog browsing, 98+ Lighthouse mobile performance score.

### 2. Editorial Engineering & Custom CMS
- Architecture: Bespoke CMS dashboard, structured Markdown content pipelines, SQLite / LibSQL database synchronization.
- Typography: Custom curated editorial font pairings (Instrument Serif, Host Grotesk, Plus Jakarta Sans, JetBrains Mono).
- Accessibility: Level AA compliance (WCAG 2.2), fully keyboard-accessible modals, dynamic high-contrast focus rings.

### 3. Spatial & 3D Interactive Web
- Graphics: Three.js, WebGL shaders, GSAP ScrollTrigger physics, Lenis smooth scrolling.
- UI Physics: Magnetic hover states, fluid page transitions, spring-damper interactions.

## Published Cornerstone Articles & Engineering Guides
1. **What is Editorial Engineering? The Definitive Guide to Modern Web Craft**
   - URL: https://www.kawaki.co.in/blog-post?slug=what-is-editorial-engineering
   - Summary: Why ambitious brands are abandoning generic component libraries for publication-grade typography, narrative pacing, and sub-second web architecture.

2. **Headless Shopify Development: The Architecture of High-Velocity Commerce**
   - URL: https://www.kawaki.co.in/blog-post?slug=headless-shopify-development-guide
   - Summary: Engineering blueprint for decoupled storefronts, optimistic cart mutations, and edge caching on Shopify Plus.

3. **Webflow vs Custom Development: When to Graduate to Code in 2026**
   - URL: https://www.kawaki.co.in/blog-post?slug=webflow-vs-custom-development
   - Summary: Objective analysis of CMS ceilings, total cost of ownership, and performance bottlenecks between visual builders and custom engineering.

4. **Core Web Vitals & Sub-Second Latency: The Agency Performance Playbook**
   - URL: https://www.kawaki.co.in/blog-post?slug=core-web-vitals-checklist
   - Summary: Technical playbook for achieving sub-100ms INP and sub-1s LCP without compromising on editorial design or typography.

5. **The Architecture of Modern Digital Luxury**
   - URL: https://www.kawaki.co.in/blog-post?slug=the-architecture-of-modern-digital-luxury
   - Summary: Why high-value brands are abandoning generic template libraries in favor of bespoke editorial typography and sub-second edge responsiveness.

6. **Headless Commerce at Sub-Second Latency**
   - URL: https://www.kawaki.co.in/blog-post?slug=headless-commerce-at-sub-second-latency
   - Summary: Engineering blueprint for distributed session caching and optimistic mutation queues in Shopify Hydrogen.

## Contact & Working With Us
- Direct Calendar: https://www.kawaki.co.in/contact
- Inquiries: hello@kawakistudios.com / partners@kawakistudios.com
`;
  fs.writeFileSync(llmsFullPath, llmsFullContent, 'utf8');
  console.log('Updated public/llms-full.txt with 6 published articles.');
}

console.log('=== Finished Content Operation Publication ===');
