const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const sanitizeHtmlLib = require('sanitize-html');
const { getDb, formatBlogRow, FALLBACK_BLOGS } = require('../lib/db-api-handler.js');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const blogDir = path.resolve(publicDir, 'blog');
const blogIndexFile = path.resolve(publicDir, 'blog.html');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

// Ensure public/blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Deterministic UTC date formatter
function formatDate(isoStr) {
  if (!isoStr) return '25 Feb 2026';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '25 Feb 2026';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// 1. Deterministic Article Loader (DB priority -> Fallback merge)
function getPublishedArticles() {
  const articlesMap = new Map();

  // Load fallback inventory first as base
  if (Array.isArray(FALLBACK_BLOGS)) {
    for (const b of FALLBACK_BLOGS) {
      if (b.status === 'published' && b.slug) {
        articlesMap.set(b.slug, { ...b });
      }
    }
  }

  // Override / supplement with database records when available
  try {
    const db = getDb();
    if (db) {
      const rows = db.prepare("SELECT * FROM blogs WHERE status = 'published'").all();
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const formatted = formatBlogRow(row);
          if (formatted && formatted.slug) {
            articlesMap.set(formatted.slug, formatted);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Build Blog] DB load note (using fallback):', err.message);
  }

  // Deterministic sort: createdAt descending, tie-break by slug
  const articles = Array.from(articlesMap.values()).sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    if (timeB !== timeA) return timeB - timeA;
    return a.slug.localeCompare(b.slug);
  });

  return articles;
}

// 2. Hardened AST-based Allowlist HTML Sanitizer
function sanitizeHtml(html) {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
      'blockquote', 'code', 'pre',
      'a', 'img', 'br', 'hr', 'span',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      'code': ['class'],
      'pre': ['class'],
      'span': ['class'],
      'th': ['align', 'colspan', 'rowspan'],
      'td': ['align', 'colspan', 'rowspan']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto'],
      img: ['http', 'https']
    },
    allowedSchemesAppliedTo: ['href', 'src'],
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard'
  });
}

// 3. Convert Markdown to Safe Semantic HTML (ensuring exactly one H1 per page)
function renderMarkdown(md, articleTitle) {
  if (!md) return '';
  let cleanedMd = md.trim();
  // Strip duplicate leading # title if it matches or is at the start
  cleanedMd = cleanedMd.replace(/^#\s+[^\n]+\n+/, '');
  // Downgrade any remaining markdown # to ## so the header H1 remains the single page H1
  cleanedMd = cleanedMd.replace(/^#\s+(.+)$/gm, '## $1');
  const rawHtml = marked.parse(cleanedMd, {
    gfm: true,
    breaks: true
  });
  return sanitizeHtml(rawHtml);
}

// Contextual service links by category or slug
function getContextualService(article) {
  const slug = (article.slug || '').toLowerCase();
  const category = (article.tags && article.tags[0] ? article.tags[0] : '').toLowerCase();

  if (slug.includes('shopify') || slug.includes('commerce') || category.includes('commerce')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('vitals') || slug.includes('search') || category.includes('performance')) {
    return {
      name: 'AI Search Optimization',
      url: '/services/ai-search-optimization',
      label: 'Explore AI Search Optimization & Web Performance'
    };
  }
  return {
    name: 'Custom Web Development',
    url: '/services/custom-web-development',
    label: 'Explore Custom Web Development & Architectural Tiers'
  };
}

// 4. Generate Single Article HTML
function generateArticleHtml(article) {
  const slug = article.slug;
  const title = article.title;
  const canonicalUrl = `https://www.kawaki.co.in/blog/${slug}`;
  const excerpt = article.excerpt || article.seoDescription || `Read ${title} by Kawaki Studios.`;
  const seoDesc = article.seoDescription || excerpt;
  const author = article.author || 'Kunal Sharma';
  const authorInitial = author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KS';
  const pubDateDisplay = formatDate(article.createdAt);
  const datePublished = article.createdAt || '2026-09-01T09:00:00.000Z';
  const dateModified = article.updatedAt || datePublished;
  const featuredImage = article.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
  const category = (article.tags && article.tags[0]) ? article.tags[0] : 'Editorial';
  const views = article.views || 180;
  const contentHtml = renderMarkdown(article.content, article.title);
  const contextualService = getContextualService(article);

  const tagsHtml = (article.tags && Array.isArray(article.tags) && article.tags.length > 0)
    ? article.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')
    : '';

  // JSON-LD Structured Data: BlogPosting + BreadcrumbList
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": seoDesc,
    "image": featuredImage,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kawaki Studios",
      "url": "https://www.kawaki.co.in",
      "logo": "https://www.kawaki.co.in/assets/images/kawaki-logo.png"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kawaki.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.kawaki.co.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Kawaki Studios</title>
    <meta name="description" content="${seoDesc}" />
    <meta name="generator" content="Kawaki Blog Engine" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title} | Kawaki Studios" />
    <meta property="og:description" content="${seoDesc}" />
    <meta property="og:image" content="${featuredImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="${title} | Kawaki Studios" />
    <meta name="twitter:description" content="${seoDesc}" />
    <meta name="twitter:image" content="${featuredImage}" />

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
${JSON.stringify(blogPostingSchema, null, 4)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 4)}
    </script>

    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/global.css?v=20260902_luxury_v6" />
    <link rel="stylesheet" href="/assets/css/chatbot.css?v=20260902_pill_v2" />

    <style>
        :root {
            --color-bg: #FFFFFF;
            --color-text: #12100E;
            --color-muted: #6B7280;
            --color-accent: #C6FF00;
            --font-sans: "Plus Jakarta Sans", sans-serif;
            --font-serif: "Instrument Serif", serif;
            --font-mono: "JetBrains Mono", monospace;
        }

        body {
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: var(--font-sans);
            margin: 0;
            padding: 0;
            font-size: 17px;
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
        }

        em {
            font-family: var(--font-serif);
            font-style: italic;
        }

        .article-container {
            max-width: 860px;
            margin: 0 auto;
            padding: 130px 24px 80px;
        }

        .article-breadcrumb {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 13px;
            font-weight: 500;
            color: var(--color-muted);
            margin-bottom: 1.5rem;
        }
        .article-breadcrumb a {
            color: var(--color-muted);
            text-decoration: none;
            transition: color 0.2s;
        }
        .article-breadcrumb a:hover {
            color: var(--color-accent);
        }
        .article-breadcrumb .bc-sep {
            color: rgba(0,0,0,0.3);
        }
        .article-breadcrumb .bc-current {
            color: var(--color-text);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 420px;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-muted);
            text-decoration: none;
            margin-bottom: 2rem;
            transition: color 0.2s;
        }
        .back-link:hover {
            color: var(--color-accent);
        }

        .article-meta-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 600;
            color: var(--color-accent);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1rem;
        }

        .article-header-title {
            font-size: clamp(2.4rem, 5vw, 3.8rem);
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin: 0 0 1.5rem;
            color: #111111;
        }

        .article-info-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            padding: 1.25rem 0;
            border-top: 1px solid rgba(0,0,0,0.08);
            border-bottom: 1px solid rgba(0,0,0,0.08);
            margin-bottom: 2.5rem;
            font-size: 14px;
            color: var(--color-muted);
        }

        .author-box {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .author-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #111111;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 13px;
        }

        .article-hero-image {
            width: 100%;
            height: auto;
            max-height: 480px;
            object-fit: cover;
            border-radius: 20px;
            margin-bottom: 3rem;
            box-shadow: 0 12px 35px rgba(0,0,0,0.06);
        }

        .article-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #2D2A26;
        }

        .article-content h1, 
        .article-content h2, 
        .article-content h3 {
            color: #111111;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 2.5rem 0 1rem;
        }
        .article-content h2 {
            font-size: 1.75rem;
        }
        .article-content h3 {
            font-size: 1.35rem;
        }

        .article-content p {
            margin-bottom: 1.5rem;
        }

        .article-content ul,
        .article-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }

        .article-content li {
            margin-bottom: 0.5rem;
        }

        .article-content a {
            color: #111111;
            text-decoration: underline;
            text-decoration-color: var(--color-accent);
            text-underline-offset: 4px;
            transition: color 0.2s;
        }
        .article-content a:hover {
            color: #000000;
        }

        .article-content pre {
            background: #111116;
            color: #F4F4F5;
            padding: 1.25rem;
            border-radius: 12px;
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 14px;
            margin: 1.5rem 0;
        }

        .article-content code {
            font-family: var(--font-mono);
            font-size: 14px;
            background: rgba(0,0,0,0.06);
            padding: 2px 6px;
            border-radius: 4px;
        }

        .article-content pre code {
            background: transparent;
            padding: 0;
            border-radius: 0;
            color: inherit;
        }

        .article-content blockquote {
            border-left: 3px solid var(--color-accent);
            padding-left: 1.25rem;
            margin: 2rem 0;
            font-style: italic;
            color: #4A4640;
        }

        .tag-pill {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 50px;
            background: rgba(0,0,0,0.05);
            font-size: 12px;
            font-weight: 600;
            color: #4A4640;
            margin-right: 6px;
            margin-bottom: 6px;
        }

        .rlvnt-btn {
            position: relative;
            display: inline-flex;
            gap: 8px;
            border: 1px solid var(--color-text);
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 50px;
            font-family: var(--font-serif);
            font-weight: 400;
            font-style: italic;
            background: transparent;
            color: var(--color-text);
            font-size: 1rem;
            overflow: hidden;
            transition: color 0.4s, transform 0.3s, background-color 0.3s, border-color 0.3s;
            cursor: pointer;
            text-decoration: none;
        }
        .rlvnt-btn.max-content {
            width: max-content;
            height: max-content;
            font-size: 20px;
            padding: 8px 16px;
        }
        .rlvnt-btn:hover {
            background-color: var(--color-text);
            color: #ffffff;
        }
    </style>
</head>

<body>
    <!-- SVG LIQUID LENS FILTER -->
    <svg style="display: none;">
        <defs>
            <filter id="liquid-lens">
                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" result="turbulence"></feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="40" xChannelSelector="R" yChannelSelector="G" result="displacement"></feDisplacementMap>
            </filter>
        </defs>
    </svg>

    <!-- GLOBAL FLOATING PILL NAVBAR -->
    <div class="nav-wrapper" id="globalNav">
        <nav>
            <a href="/" class="nav-left" aria-label="Kawaki Studios">
                <img src="/assets/images/kawaki-logo.png" alt="Kawaki Studios" class="site-header-logo" width="947" height="242" decoding="async" />
            </a>
            <a class="nav-center" href="mailto:hello@kawakistudios.com">hello@kawakistudios.com <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"></path></svg></a>
            <div class="nav-right" id="menuToggleBtn" aria-label="Open Menu">
                <span id="menu-toggle-text">MENU</span>
                <div id="menu-toggle-icon">
                    <div class="bar bar-top"></div>
                    <div class="bar bar-bottom"></div>
                </div>
            </div>
        </nav>
    </div>

    <!-- FULLSCREEN OVERLAY MENU -->
    <div class="fullscreen-menu" id="fullscreenMenu" style="display: none; opacity: 0; pointer-events: none;">
        <div class="menu-overlay-layer"></div>
        <div class="menu-overlay-layer"></div>
        <div class="menu-content-wrapper">
            <span class="span-menu"><em>kawaki</em></span>
            <div class="menu-layout">
                <div class="menu-col menu-col-left">
                    <div class="main-menu-links" id="mainMenuPrimary">
                        <ul>
                            <li data-img="/assets/images/hero_slide_1_clean.webp" data-tag="Home — Studio Overview" data-desc="Digital Flagship &amp; Capabilities Overview">
                                <a href="/">
                                    <span class="menu-idx">01</span>
                                    <span class="menu-text">Home <em>Index</em></span>
                                </a>
                            </li>
                            <li data-img="/assets/images/hero_slide_2_clean.webp" data-tag="About Us — Editorial Manifesto" data-desc="Studio Philosophy &amp; Engineering Principles">
                                <a href="/about">
                                    <span class="menu-idx">02</span>
                                    <span class="menu-text">About <em>Kawaki Studios</em></span>
                                </a>
                            </li>
                            <li data-img="/assets/images/hero_slide_3_clean.webp" data-tag="Capabilities &amp; Architecture" data-desc="Five Core Engineering &amp; Recovery Pillars">
                                <a href="/services" id="menuServicesTrigger" class="menu-services-trigger" aria-haspopup="true" aria-expanded="false">
                                    <span class="menu-idx">03</span>
                                    <span class="menu-text">Explore <em>Our Services</em></span>
                                    <span class="menu-expand-badge" title="Expand services">+</span>
                                </a>
                            </li>
                            <li data-img="/assets/images/about_hero_bg.jpg" data-tag="Architectural Concepts" data-desc="Reference Designs &amp; Engineering Blueprints">
                                <a href="/case-studies">
                                    <span class="menu-idx">04</span>
                                    <span class="menu-text">Selected <em>Concepts &amp; Blueprints</em></span>
                                </a>
                            </li>
                            <li data-img="/assets/images/station_drag_prism.webp" data-tag="Engineering &amp; Design Notes" data-desc="Essays on Web Engineering &amp; Performance">
                                <a href="/blog">
                                    <span class="menu-idx">05</span>
                                    <span class="menu-text">Blogs &amp; <em>Insights</em></span>
                                </a>
                            </li>
                            <li data-img="/assets/images/about-studio.webp" data-tag="15-Min Strategy Session" data-desc="Schedule a Technical Discovery Call">
                                <a href="/contact">
                                    <span class="menu-idx">06</span>
                                    <span class="menu-text">Discovery <em>Call</em></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- EXPANDED SERVICES SUB-NAVIGATION MEGA-MENU -->
                    <div class="main-menu-services" id="mainMenuServices" style="display: none; opacity: 0;">
                        <div class="menu-services-topbar">
                            <button type="button" class="menu-services-back-btn" id="menuServicesBackBtn" aria-label="Back to main menu">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                <span>Back to Menu</span>
                            </button>
                            <span class="menu-services-header-title">EXPLORE OUR SERVICES</span>
                            <a href="/services" class="menu-services-hub-link">
                                <span>All Services</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div class="menu-services-grid">
                            <div class="menu-services-group">
                                <div class="menu-services-cat-title">// WEB &amp; COMMERCE</div>
                                <ul class="menu-services-list">
                                    <li data-img="/assets/images/project_1.jpg" data-tag="Web Engineering" data-desc="Custom Websites &amp; Next.js Web Applications">
                                        <a href="/services/custom-web-development">
                                            <span class="sub-idx">01</span>
                                            <span class="sub-name">Custom Web Development</span>
                                        </a>
                                    </li>
                                    <li data-img="/assets/images/about_hero_bg.jpg" data-tag="Commerce Engineering" data-desc="Custom Storefronts &amp; Theme Customization">
                                        <a href="/services/shopify-development">
                                            <span class="sub-idx">02</span>
                                            <span class="sub-name">Shopify Development</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="menu-services-group">
                                <div class="menu-services-cat-title">// AI &amp; AUTOMATION</div>
                                <ul class="menu-services-list">
                                    <li data-img="/assets/images/station_drag_prism.webp" data-tag="Intelligent Systems" data-desc="n8n, Make &amp; Deterministic AI Agent Workflows">
                                        <a href="/services/ai-automation">
                                            <span class="sub-idx">03</span>
                                            <span class="sub-name">AI Automation</span>
                                        </a>
                                    </li>
                                    <li data-img="/assets/images/hero_slide_3_clean.webp" data-tag="Search Engineering" data-desc="AI Search Optimization, AEO &amp; GEO Architecture">
                                        <a href="/services/ai-search-optimization">
                                            <span class="sub-idx">04</span>
                                            <span class="sub-name">AI Search Optimization</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="menu-services-group">
                                <div class="menu-services-cat-title">// SECURITY &amp; RECOVERY</div>
                                <ul class="menu-services-list">
                                    <li data-img="/assets/images/hero_slide_1_clean.webp" data-tag="Security &amp; Recovery" data-desc="Hacked Site Cleanup &amp; Database Sanitization">
                                        <a href="/services/wordpress-malware-removal">
                                            <span class="sub-idx">05</span>
                                            <span class="sub-name">WordPress Malware Removal</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="menu-services-group">
                                <div class="menu-services-cat-title">// CREATIVE &amp; SPECIALIST</div>
                                <ul class="menu-services-list">
                                    <li data-img="/assets/images/hero_slide_2_clean.webp" data-tag="Brand &amp; Creative" data-desc="Social Presence &amp; Content Architecture">
                                        <a href="/services">
                                            <span class="sub-idx">06</span>
                                            <span class="sub-name">Social Media Management</span>
                                        </a>
                                    </li>
                                    <li data-img="/assets/images/about-studio.webp" data-tag="Motion Design" data-desc="Short-Form Video &amp; Editorial Motion Content">
                                        <a href="/services">
                                            <span class="sub-idx">07</span>
                                            <span class="sub-name">Reel Editing</span>
                                        </a>
                                    </li>
                                    <li data-img="/assets/images/kw-project-ecomm.webp" data-tag="Spatial &amp; 3D" data-desc="Visual Product Modeling &amp; 3D Interactive Assets">
                                        <a href="/services">
                                            <span class="sub-idx">08</span>
                                            <span class="sub-name">3D Design</span>
                                        </a>
                                    </li>
                                    <li data-img="/assets/images/project_3_1787254295127.webp" data-tag="Spatial Planning" data-desc="Architectural Modeling &amp; Environmental Visualization">
                                        <a href="/services">
                                            <span class="sub-idx">09</span>
                                            <span class="sub-name">Architecture Planning</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu-col menu-col-right">
                    <div class="menu-preview-card" id="menuPreviewCard">
                        <div class="menu-preview-img-box">
                            <img id="menuPreviewImg" src="/assets/images/station_drag_prism.webp" alt="Preview" width="1376" height="768" loading="lazy" decoding="async" />
                        </div>
                        <div class="menu-preview-meta">
                            <span class="menu-preview-badge" id="menuPreviewTag">Engineering &amp; Design Notes</span>
                            <span class="menu-preview-desc" id="menuPreviewDesc">Custom Web Design &amp; Development</span>
                        </div>
                    </div>

                    <div class="menu-info-block">
                        <div class="menu-status-pill">
                            <span class="status-dot"></span>
                            <span>Available for Q3/Q4 Projects</span>
                        </div>
                        <a href="/contact" class="menu-cta-button">
                            <span>Schedule a Call</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" fill="#C6FF00"></circle>
                                <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path>
                            </svg>
                        </a>
                        <a href="mailto:hello@kawakistudios.com" class="menu-email-link">hello@kawakistudios.com</a>
                    </div>

                    <div class="menu-socials-strip">
                        <span class="socials-title">Follow</span>
                        <div class="social-tags">
                            <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener">Twitter / X ↗</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram ↗</a>
                            <a href="https://behance.net" target="_blank" rel="noopener">Behance ↗</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MAIN ARTICLE BODY -->
    <main class="article-container">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="article-breadcrumb">
            <a href="/">Home</a>
            <span class="bc-sep">/</span>
            <a href="/blog">Blog</a>
            <span class="bc-sep">/</span>
            <span class="bc-current">${title}</span>
        </nav>

        <a href="/blog" class="back-link">
            ← Back to all stories
        </a>

        <article id="articleWrapper">
            <div class="article-meta-badge" id="articleCategory">
                ● ${category}
            </div>
            
            <h1 class="article-header-title" id="articleTitle">
                ${title}
            </h1>

            <div class="article-info-bar">
                <div class="author-box">
                    <div class="author-avatar" id="authorInitial">${authorInitial}</div>
                    <div>
                        <div style="font-weight: 700; color: #111111;" id="authorName">${author}</div>
                        <div style="font-size: 12px;" id="articleDate">${pubDateDisplay}</div>
                    </div>
                </div>
                <div style="font-family: var(--font-mono); font-size: 13px;" id="articleViews">
                    ${views} reads
                </div>
            </div>

            <img id="articleImage" src="${featuredImage}" alt="${title}" class="article-hero-image" width="1200" height="855" fetchpriority="high" decoding="async" />

            <div class="article-content" id="articleContent">
                ${contentHtml}
            </div>

            <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.08);" id="articleTags">
                ${tagsHtml}
            </div>

            <div style="margin-top: 4rem; padding: 2.5rem; background: #F8F8FA; border-radius: 24px; text-align: center;">
                <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Have a bold idea to engineer?</h3>
                <p style="color: #6b7280; font-size: 15px; margin-bottom: 1.25rem;">Let's build high-performance digital experiences together.</p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    <a href="${contextualService.url}" style="font-size: 14px; font-weight: 600; color: #111111; text-decoration: underline; text-underline-offset: 4px;">
                        ${contextualService.label} &rarr;
                    </a>
                </div>
                <a href="/contact" class="rlvnt-btn max-content" style="margin: 0 auto;">
                    <span>Start a Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"> 
                        <circle cx="8" cy="8" r="8" fill="#C6FF00"></circle> 
                        <path fill="#FFFFFF" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path> 
                    </svg>
                </a>
            </div>
        </article>
    </main>

    <!-- UNIVERSAL GLOBAL FOOTER -->
    <footer class="sections global-site-footer">
        <div class="footer-top-strip">
            <div class="footer-status-pill">
                <span class="footer-status-dot"></span>
                <span>Available for Q3 / Q4 Projects — Worldwide</span>
            </div>
        </div>

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

        <div class="footer-grid-directory">
            <div class="footer-col">
                <div class="footer-col-header">// DIRECTORY</div>
                <ul class="footer-links-list">
                    <li><a href="/"><span>Home</span> <span class="nav-idx">01</span></a></li>
                    <li><a href="/about"><span>About Studio</span> <span class="nav-idx">02</span></a></li>
                    <li><a href="/services"><span>Services & Systems</span> <span class="nav-idx">03</span></a></li>
                    <li><a href="/case-studies"><span>Case Studies</span> <span class="nav-idx">04</span></a></li>
                    <li><a href="/blog"><span>Journal / Insights</span> <span class="nav-idx">05</span></a></li>
                    <li><a href="/contact"><span>Discovery & Booking</span> <span class="nav-idx">06</span></a></li>
                </ul>
            </div>

            <div class="footer-col">
                <div class="footer-col-header">// DIRECT CHANNELS</div>
                <div class="footer-contact-item">
                    <span class="footer-contact-label">New Business & Inquiries</span>
                    <a href="mailto:hello@kawakistudios.com" class="footer-contact-val">
                        hello@kawakistudios.com
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </a>
                </div>
                <div class="footer-contact-item" style="margin-top: 0.5rem;">
                    <span class="footer-contact-label">Partnerships & Co-Ventures</span>
                    <a href="mailto:partners@kawakistudios.com" class="footer-contact-val">
                        partners@kawakistudios.com
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </a>
                </div>
                <div class="footer-contact-item" style="margin-top: 0.5rem;">
                    <span class="footer-contact-label">Direct Founder Calendar</span>
                    <a href="/contact" class="footer-contact-val" style="color: #111111; font-weight: 600;">
                        Book 15-Min Briefing ↗
                    </a>
                </div>
            </div>

            <div class="footer-col">
                <div class="footer-col-header">// STUDIOS & LOCAL TIME</div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New Delhi (HQ)</span>
                        <span class="footer-time-clock" id="footerTimeDelhi">--:-- -- IST</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>Tokyo</span>
                        <span class="footer-time-clock" id="footerTimeTokyo">--:-- -- JST</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>London</span>
                        <span class="footer-time-clock" id="footerTimeLondon">--:-- -- GMT</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New York</span>
                        <span class="footer-time-clock" id="footerTimeNY">--:-- -- EST</span>
                    </div>
                </div>
            </div>

            <div class="footer-col">
                <div class="footer-col-header">// SOCIAL INDEX</div>
                <ul class="footer-links-list">
                    <li><a href="https://instagram.com" target="_blank" rel="noopener"><span>Instagram</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener"><span>X / Twitter</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noopener"><span>LinkedIn</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://behance.net" target="_blank" rel="noopener"><span>Behance</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://github.com" target="_blank" rel="noopener"><span>GitHub</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                </ul>
            </div>
        </div>

        <div class="footer-giant-watermark">
            <span>KAWAKI</span>
        </div>

        <div class="footer-bottom">
            <div class="copyright">© 2026 Kawaki Studios Ltd. All rights reserved. — Custom Web Development &amp; Shopify Stores.</div>
            <ul class="footer-bottom-links">
                <li><a href="/about">Privacy Policy</a></li>
                <li><a href="/about">Terms of Service</a></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener">Sitemap</a></li>
                <li><a href="/robots.txt" target="_blank" rel="noopener">Robots.txt</a></li>
                <li><a href="/llms.txt" target="_blank" rel="noopener">LLMs.txt</a></li>
                <li><span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.85rem; color: #555;"><span style="width:6px; height:6px; border-radius:50%; background:#C6FF00; display:inline-block;"></span> Systems Nominal</span></li>
            </ul>
            <button class="footer-back-to-top" id="backToTop" aria-label="Go to top">
                <span>Back to Top</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
        </div>
    </footer>

    <script src="/assets/js/main.js?v=20260902_luxury_v6" defer></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Time update helper for footer
            function updateFooterClocks() {
                const now = new Date();
                const opt = (tz) => ({ timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true });
                const elDelhi = document.getElementById('footerTimeDelhi');
                const elTokyo = document.getElementById('footerTimeTokyo');
                const elLondon = document.getElementById('footerTimeLondon');
                const elNY = document.getElementById('footerTimeNY');
                if (elDelhi) elDelhi.innerText = \`\${now.toLocaleTimeString('en-US', opt('Asia/Kolkata'))} IST\`;
                if (elTokyo) elTokyo.innerText = \`\${now.toLocaleTimeString('en-US', opt('Asia/Tokyo'))} JST\`;
                if (elLondon) elLondon.innerText = \`\${now.toLocaleTimeString('en-US', opt('Europe/London'))} GMT\`;
                if (elNY) elNY.innerText = \`\${now.toLocaleTimeString('en-US', opt('America/New_York'))} EST\`;
            }
            updateFooterClocks();
            setInterval(updateFooterClocks, 10000);

            // Back to top
            const btt = document.getElementById('backToTop');
            if (btt) {
                btt.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        });
    </script>
    <script src="/assets/js/chatbot.js?v=20260902_pill_v3" defer></script>
</body>
</html>
`;
}

// 5. Update Blog Index Grid & Script in public/blog.html
function updateBlogIndexHtml(articles) {
  let content = fs.readFileSync(blogIndexFile, 'utf8');

  // Generate cards HTML
  const fallbackImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80'
  ];

  const cardsHtml = articles.map((b, idx) => {
    const dateStr = formatDate(b.createdAt);
    const category = (b.tags && b.tags[0]) ? b.tags[0] : 'Editorial';
    const imgSrc = b.featuredImage || fallbackImages[idx % fallbackImages.length];

    return `                <a href="/blog/${b.slug}" class="blog-card span-4 dynamic-api-card" data-category="${category}">
                    <div class="card-meta-row">
                        <span class="meta-date">${dateStr}</span>
                        <span class="meta-separator"></span>
                        <span class="meta-category" style="color: #C6FF00; font-weight: 700;">${category}</span>
                        <span class="read-more">Read <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                    </div>
                    <div class="card-image-wrapper">
                        <img src="${imgSrc}" alt="${b.title}" width="800" height="450" loading="lazy" decoding="async" onerror="this.src='${fallbackImages[0]}'">
                    </div>
                    <h3 class="card-title">${b.title}</h3>
                </a>`;
  }).join('\n');

  // Replace #blogGrid container content
  const gridRegex = /(<div class="blog-grid" id="blogGrid">)([\s\S]*?)(<\/div>\s*<\/section>)/i;
  if (gridRegex.test(content)) {
    content = content.replace(gridRegex, `$1\n${cardsHtml}\n            $3`);
  } else {
    console.warn('[Build Blog] Warning: Could not find #blogGrid in public/blog.html');
  }

  // Update client script in blog.html: remove fetch, retain filtering & Lenis
  const scriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*(?:async\s*)?\(\)\s*=>\s*\{[\s\S]*?<\/script>/i;
  const newScript = `<script>
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

            // Lenis Smooth Scroll
            const lenis = new Lenis();
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((t) => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);

            // Category Filtering on Static Pre-Rendered Cards
            const filterContainer = document.getElementById('categoryFilters');

            function applyFilter(selectedCategory) {
                const allCards = document.querySelectorAll('.blog-card');
                allCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category') || '';
                    if (selectedCategory === 'all' || cardCategory.toLowerCase() === selectedCategory.toLowerCase()) {
                        card.style.display = 'flex';
                        if (typeof gsap !== "undefined") {
                            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            if (filterContainer) {
                filterContainer.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') return;
                    e.preventDefault();

                    const selectedCategory = e.target.getAttribute('data-category');
                    filterContainer.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                    e.target.classList.add('active');

                    applyFilter(selectedCategory);
                });
            }
        });
    </script>`;

  if (scriptRegex.test(content)) {
    content = content.replace(scriptRegex, newScript);
  }

  fs.writeFileSync(blogIndexFile, content, 'utf8');
  console.log(`✓ Updated public/blog.html with ${articles.length} pre-rendered article cards.`);
}

// 6. Update sitemap.xml with Clean URLs
function updateSitemap(articles) {
  let content = fs.readFileSync(sitemapFile, 'utf8');

  // Replace or build the Published High-Authority Articles block
  const sitemapArticlesXml = articles.map(b => {
    return `  <url>
    <loc>https://www.kawaki.co.in/blog/${b.slug}</loc>
    <lastmod>2026-09-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  // Match existing blog URLs block
  const blockRegex = /(<!-- Published High-Authority Articles -->)([\s\S]*?)(<\/urlset>)/i;
  if (blockRegex.test(content)) {
    content = content.replace(blockRegex, `$1\n${sitemapArticlesXml}\n$3`);
  } else {
    // If block comment not present, replace any /blog-post?slug= URLs
    content = content.replace(/(  <url>[\s\S]*?<loc>https:\/\/www\.kawaki\.co\.in\/blog-post\?slug=[^<]+<\/loc>[\s\S]*?<\/url>\n?)+/g, '');
    content = content.replace('</urlset>', `  <!-- Published High-Authority Articles -->\n${sitemapArticlesXml}\n</urlset>`);
  }

  fs.writeFileSync(sitemapFile, content, 'utf8');
  console.log(`✓ Updated public/sitemap.xml with ${articles.length} clean /blog/:slug URLs.`);
}

// 7. Stale Article Reconciliation & Cleanup (Tightened Generator Ownership Boundary)
const ARTICLE_FILE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;

function reconcileStaleArticles(articles) {
  const expectedFiles = new Set(articles.map(a => `${a.slug}.html`));
  const removedFiles = [];

  if (fs.existsSync(blogDir)) {
    const existingEntries = fs.readdirSync(blogDir);
    for (const entry of existingEntries) {
      const entryPath = path.join(blogDir, entry);
      const isFile = fs.statSync(entryPath).isFile();

      // 1. Must be a file and match clean slug filename pattern
      if (!isFile || !ARTICLE_FILE_PATTERN.test(entry)) {
        continue;
      }

      // 2. If it is in the current expected published inventory, keep it
      if (expectedFiles.has(entry)) {
        continue;
      }

      // 3. Verify generator ownership before deleting (never delete arbitrary custom HTML)
      try {
        const fileHead = fs.readFileSync(entryPath, 'utf8').slice(0, 2048);
        const isGeneratorOwned = fileHead.includes('<meta name="generator" content="Kawaki Blog Engine"') ||
                                 fileHead.includes('id="articleWrapper"');
        if (isGeneratorOwned) {
          fs.unlinkSync(entryPath);
          removedFiles.push(entry);
          console.log(`  🗑️ [Cleanup] Removed stale generator-owned article: public/blog/${entry}`);
        } else {
          console.log(`  ℹ️ [Preserved] Skipping non-generator HTML file: public/blog/${entry}`);
        }
      } catch (readErr) {
        console.warn(`  ⚠️ Could not inspect public/blog/${entry}: ${readErr.message}`);
      }
    }
  }

  if (removedFiles.length === 0) {
    console.log('✓ Verified public/blog inventory: 0 stale article files found.');
  } else {
    console.log(`✓ Stale article cleanup complete: removed ${removedFiles.length} file(s).`);
  }
  return removedFiles;
}

// 8. Main Runner
function build() {
  console.log('⚡ [Build Blog] Loading published articles from inventory...');
  const articles = getPublishedArticles();
  console.log(`✓ Loaded ${articles.length} published articles.`);

  if (articles.length === 0) {
    console.error('❌ [Build Blog] No published articles found!');
    process.exit(1);
  }

  // Reconcile and clean up any stale generated article files
  const removedStale = reconcileStaleArticles(articles);

  // Generate individual article pages
  for (const article of articles) {
    const articleHtml = generateArticleHtml(article);
    const targetFile = path.resolve(blogDir, `${article.slug}.html`);
    fs.writeFileSync(targetFile, articleHtml, 'utf8');
    console.log(`  -> Generated public/blog/${article.slug}.html`);
  }

  // Update blog index grid
  updateBlogIndexHtml(articles);

  // Update sitemap.xml
  updateSitemap(articles);

  console.log('\n🚀 [Build Blog] Successfully pre-rendered all articles and synchronized catalog!\n');
  return { articles, removedStale };
}

if (require.main === module) {
  build();
}

module.exports = {
  getPublishedArticles,
  reconcileStaleArticles,
  renderMarkdown,
  sanitizeHtml,
  generateArticleHtml,
  updateBlogIndexHtml,
  updateSitemap,
  build
};
