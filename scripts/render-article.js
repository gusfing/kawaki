const { marked } = require('marked');
const sanitizeHtmlLib = require('sanitize-html');

// Deterministic UTC date formatter
function formatDate(isoStr) {
  if (!isoStr) return '25 Feb 2026';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return '25 Feb 2026';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// Hardened AST-based Allowlist HTML Sanitizer
function sanitizeHtml(html) {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
      'blockquote', 'code', 'pre',
      'a', 'img', 'br', 'hr', 'span',
      'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      'figure': ['class', 'style'],
      'figcaption': ['class', 'style'],
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

// Convert Markdown to Safe Semantic HTML (ensuring single page H1)
function renderMarkdown(md) {
  if (!md) return '';
  let cleanedMd = md.trim();
  cleanedMd = cleanedMd.replace(/^#\s+[^\n]+\n+/, '');
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

  if (slug === 'shopify-liquid-vs-headless' || slug.includes('liquid-vs-headless')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      contactUrl: '/contact?service=shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('shopify') || slug.includes('commerce') || category.includes('commerce')) {
    return {
      name: 'Shopify Development',
      url: '/services/shopify-development',
      label: 'Explore Shopify & Headless Commerce Engineering'
    };
  }
  if (slug.includes('state-management') || slug.includes('api-boundaries') || slug.includes('web-application')) {
    return {
      name: 'Web Application Development',
      url: '/services/web-application-development',
      label: 'Explore Full-Stack Web Application Engineering'
    };
  }
  if (slug.includes('performance') || slug.includes('speed') || slug.includes('core-web-vitals') || category.includes('performance')) {
    return {
      name: 'Website Performance Optimization',
      url: '/services/website-performance-optimization',
      label: 'Explore Website Performance & Core Web Vitals Optimization'
    };
  }
  if (slug.includes('backdoor') || slug.includes('web-shell') || category.includes('backdoor')) {
    return {
      name: 'WordPress Backdoor Removal',
      url: '/services/wordpress-backdoor-removal',
      contactUrl: '/contact?service=wordpress-backdoor-removal',
      label: 'Explore WordPress Backdoor Removal & Forensic Incident Response'
    };
  }
  if (slug.includes('redirect') || category.includes('redirect')) {
    return {
      name: 'WordPress Malicious Redirect Removal',
      url: '/services/malicious-redirect-removal',
      contactUrl: '/contact?service=malicious-redirect-removal',
      label: 'Explore WordPress Malicious Redirect Removal & Injected Script Cleanup'
    };
  }
  if (slug.includes('keyword-hack') || slug.includes('seo-spam') || slug.includes('spam-removal') || category.includes('spam') || slug.includes('malware') || category.includes('malware')) {
    return {
      name: 'SEO Spam Removal',
      url: '/services/seo-spam-removal',
      contactUrl: '/contact?service=seo-spam-removal',
      label: 'Explore WordPress SEO Spam Removal & Recovery'
    };
  }
  if (slug.includes('wordpress')) {
    return {
      name: 'WordPress Development',
      url: '/services/wordpress-development',
      label: 'Explore Custom WordPress Engineering & Gutenberg Architecture'
    };
  }
  if (slug.includes('search') || slug.includes('aeo') || slug.includes('geo')) {
    return {
      name: 'AI Search Optimization',
      url: '/services/ai-search-optimization',
      label: 'Explore AI Search Optimization & Search Engineering'
    };
  }
  if (slug === 'ai-automation-vs-ai-agents' || slug.includes('automation-vs-ai-agents')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      contactUrl: '/contact?service=ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  if (slug.includes('ai-') || slug.includes('automation') || category.includes('ai') || category.includes('automation')) {
    return {
      name: 'AI Automation',
      url: '/services/ai-automation',
      contactUrl: '/contact?service=ai-automation',
      label: 'Explore AI Automation & Workflow Architecture'
    };
  }
  if (slug.includes('custom-web') || slug.includes('no-code') || slug.includes('web-development')) {
    return {
      name: 'Custom Web Development',
      url: '/services/custom-web-development',
      contactUrl: '/contact?service=custom-web-development',
      label: 'Explore Custom Web Development & Architectural Tiers'
    };
  }
  return {
    name: 'Custom Web Development',
    url: '/services/custom-web-development',
    label: 'Explore Custom Web Development & Architectural Tiers'
  };
}

// Heading Extraction & ID Injection for Interactive Table of Contents
function extractHeadingsAndInjectIds(html) {
  const tocItems = [];
  const headingRegex = /<h([23])(.*?)>([\s\S]*?)<\/h\1>/gi;
  let index = 0;

  const modifiedHtml = html.replace(headingRegex, (match, level, attrs, innerContent) => {
    const plainText = innerContent.replace(/<[^>]+>/g, '').trim();
    if (!plainText) return match;

    let idMatch = attrs.match(/id=["']([^"']+)["']/i);
    let id = idMatch ? idMatch[1] : '';

    if (!id) {
      id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (!id) id = `section-${index}`;
      id = `h-${id}`;
      attrs = ` id="${id}"${attrs}`;
    }

    tocItems.push({
      id,
      title: plainText,
      level: parseInt(level, 10)
    });
    index++;

    return `<h${level}${attrs}>${innerContent}</h${level}>`;
  });

  return { html: modifiedHtml, tocItems };
}

// Curated Executive Summary / Key Takeaways for High-Impact Reading & AI Engine Optimization
function getArticleTakeaways(article) {
  const CURATED_TAKEAWAYS = {
    'what-is-editorial-engineering': [
      'Editorial engineering bridges publication typography, art direction, and high-performance software architecture.',
      'Replaces sterile template bloat with intentional narrative pacing, bespoke layouts, and sub-second critical rendering paths.',
      'Prioritizes human reader immersion alongside flawless Core Web Vitals and search crawler parsing.'
    ],
    'headless-shopify-development-guide': [
      'Decouples customer presentation from Shopify Plus backend via GraphQL Storefront APIs.',
      'Eliminates third-party app script waterfalls that degrade mobile conversion rates.',
      'Enables sub-second edge page transitions while maintaining PCI-DSS Level 1 checkout compliance.'
    ],
    'webflow-vs-custom-development': [
      'Webflow delivers unmatched visual agility and rapid time-to-market for marketing sites under 50 pages.',
      'Custom code becomes essential when business logic demands sub-800ms LCP, relational database scaling (>2,000 items), or custom auth.',
      'Total Cost of Ownership converges rapidly by Year 2 when factoring in enterprise Webflow seat tiers and third-party SaaS plugin taxes.'
    ],
    'nextjs-server-vs-client-components': [
      'Server Components (RSC) execute exclusively on the server, sending zero client JavaScript for data-fetching leaves.',
      'Client Components should be pushed to the leaves of the render tree for interactive state and event handlers.',
      'Proper composition boundaries drastically reduce bundle size and prevent unnecessary hydration waterfalls.'
    ],
    'nextjs-state-management-api-boundaries': [
      'Categorizes state into server state, URL search params, and local component UI state.',
      'Eliminates redundant global Redux stores in favor of React Server Actions and optimistic updates.',
      'Ensures clean API encapsulation across edge runtimes and Node persistence layers.'
    ],
    'nextjs-performance-architecture': [
      'Leverages Incremental Static Regeneration (ISR) and streaming SSR to deliver instant first paints.',
      'Granular bundle splitting and dynamic imports minimize main-thread execution time.',
      'Optimizes Core Web Vitals (LCP < 1.2s, CLS = 0, INP < 100ms) on real-world mobile network profiles.'
    ],
    'ai-automation-architecture': [
      'Separates deterministic DAG workflows from probabilistic LLM reasoning steps.',
      'Enforces strict tool permission boundaries and least-privilege API access.',
      'Integrates asynchronous human-in-the-loop (HITL) approval gates for all mutating or financial actions.'
    ],
    'ai-agent-reliability-evaluation': [
      'Evaluates agent reliability through pass@k benchmarks, bounded sandbox environments, and regression suites.',
      'Applies two-tier output validation: schema compliance followed by deterministic domain validation.',
      'Implements automated circuit breakers and state rollbacks when tool loops detect anomalies.'
    ],
    'japanese-keyword-hack-wordpress': [
      'Identifies cloaked user-agent conditional redirects and search-console spam injection vectors.',
      'Conducts forensic eradication of rogue sitemaps, injected database tables, and persistent cron hooks.',
      'Forces rapid Google deindexing using HTTP 410 Gone headers instead of standard 404 responses.'
    ],
    'wordpress-backdoors-stealth-web-shells': [
      'Detects obfuscated PHP web shells utilizing eval(), base64_decode(), and variable variables.',
      'Eradicates rootkit persistence hiding in wp-config.php, mu-plugins, and database options.',
      'Hardens file permissions, locks down execution in upload folders, and deploys integrity monitoring.'
    ],
    'wordpress-malicious-redirects-cleanup': [
      'Traces injected JavaScript and conditional .htaccess rules redirecting mobile visitors to spam destinations.',
      'Decodes dynamic obfuscation strings injected into core WordPress scripts and theme functions.',
      'Restores clean core checksums and locks down REST API injection endpoints.'
    ],
    'custom-web-development-vs-no-code': [
      'Evaluates tech stack choices across a 9-dimension decision matrix including TCO, IP ownership, and data ceilings.',
      'No-code is optimal for rapid market validation, landing pages, and non-technical editorial autonomy.',
      'Custom code is required when proprietary business logic, complex relations, and scalable unit economics dictate.'
    ],
    'shopify-liquid-vs-headless': [
      'Compares monolithic Liquid rendering against modern decoupled Storefront API architectures.',
      'Analyzes total cost of ownership, developer velocity, and app ecosystem trade-offs.',
      'Outlines the exact operational metrics that trigger a headless migration milestone.'
    ],
    'ai-automation-vs-ai-agents': [
      'Contrasts fixed deterministic automation with autonomous reasoning agentic loops across 18 dimensions.',
      'Explains why hybrid architectures deliver 99%+ reliability compared to pure autonomous agents.',
      'Provides an architectural decision tree for selecting the appropriate automation tier.'
    ],
    'how-ai-search-engines-cite-sources': [
      'Analyzes how Retrieval-Augmented Generation (RAG) and query fan-out locate authoritative reference sources.',
      'Explains entity salience, structured JSON-LD graphs, and direct-answer formatting for AEO/GEO.',
      'Details actionable optimization protocols to become the primary cited source in LLM outputs.'
    ],
    'what-to-prepare-before-hiring-web-development-agency': [
      'Defines the four essential pre-hire pillars: Business Objectives, Technical Scope, Design Readiness, and IP Governance.',
      'Explains how ambiguity triggers agency risk contingencies and expensive change-order cycles.',
      'Provides a comprehensive pre-hire RFP scoping checklist and 5 technical vetting questions.'
    ],
    'how-to-evaluate-a-web-development-proposal-beyond-price': [
      'Audits competing proposals across 5 core pillars: Architecture, Scope Precision, IP Governance, Milestone QA, and 3-Year TCO.',
      'Exposes the mechanics of underbidding: change-order ambushes, commercial template reselling, and offshore subcontracting.',
      'Supplies 5 non-negotiable questions to ask lead engineers on proposal review calls.'
    ]
  };

  return CURATED_TAKEAWAYS[article.slug] || [
    'Comprehensive technical architecture analysis engineered specifically for growing organizations.',
    'Clear decision frameworks, trade-off matrices, and benchmark criteria for executive evaluation.',
    'Production-grade implementation guidance focused on long-term scalability and security.'
  ];
}

// Generate Single Article HTML with Shrazen-Grade Layout & Architecture
function generateArticleHtml(article, allArticles = []) {
  const slug = article.slug;
  const title = article.title;
  const canonicalUrl = `https://kawaki.co.in/blog/${slug}`;
  const excerpt = article.excerpt || article.seoDescription || `Read ${title} by Kawaki Studios.`;
  const seoDesc = article.seoDescription || excerpt;
  const author = article.author || 'Kunal Sharma';
  const authorInitial = author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KS';
  const pubDateDisplay = formatDate(article.createdAt);
  const datePublished = article.createdAt || '2026-09-01T09:00:00.000Z';
  const dateModified = article.updatedAt || datePublished;
  const featuredImage = article.featuredImage || '/assets/images/blog/custom-code-vs-nocode-decision-matrix-chart.webp';
  const category = (article.tags && article.tags[0]) ? article.tags[0] : 'Engineering';
  const views = article.views || 180;
  
  // Calculate word count and estimated reading time
  const wordCount = (article.content || '').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(4, Math.ceil(wordCount / 200));

  // Render markdown and extract Table of Contents with heading IDs
  const rawContentHtml = renderMarkdown(article.content);
  const { html: contentHtml, tocItems } = extractHeadingsAndInjectIds(rawContentHtml);
  const contextualService = getContextualService(article);

  // Executive summary takeaways
  const takeaways = getArticleTakeaways(article);

  const tagsHtml = (article.tags && Array.isArray(article.tags) && article.tags.length > 0)
    ? article.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')
    : '';

  // Generate Table of Contents items HTML
  const tocListHtml = (tocItems && tocItems.length > 0)
    ? tocItems.map(item => `
      <li class="toc-item toc-level-${item.level}">
        <a href="#${item.id}">${item.title}</a>
      </li>
    `).join('')
    : '<li class="toc-item toc-level-2"><a href="#articleContent">Article Overview</a></li>';

  // Generate 3 Related Articles
  const otherArticles = (Array.isArray(allArticles) ? allArticles : []).filter(a => a.slug !== slug);
  const relatedArticles = otherArticles.slice(0, 3);
  const relatedCardsHtml = relatedArticles.map(rel => {
    const relCategory = (rel.tags && rel.tags[0]) ? rel.tags[0] : 'Engineering';
    const relExcerpt = rel.excerpt || rel.seoDescription || `Read ${rel.title} on Kawaki Studios.`;
    const relImage = rel.featuredImage || '/assets/images/blog/custom-code-vs-nocode-decision-matrix-chart.webp';
    return `
      <article class="post-light-card">
        <div class="card-img-wrapper">
          <a href="/blog/${rel.slug}">
            <img src="${relImage}" alt="${rel.title}" class="card-img" width="400" height="225" loading="lazy" decoding="async" />
          </a>
        </div>
        <div class="card-body">
          <span class="category-badge">${relCategory}</span>
          <h3 class="card-title">
            <a href="/blog/${rel.slug}">${rel.title}</a>
          </h3>
          <p class="card-excerpt">${relExcerpt.length > 135 ? relExcerpt.slice(0, 132) + '...' : relExcerpt}</p>
          <a href="/blog/${rel.slug}" class="card-read-link">Read Guide &rarr;</a>
        </div>
      </article>
    `;
  }).join('\n');

  // Share URLs
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonicalUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;

  // JSON-LD Structured Data: BlogPosting + BreadcrumbList
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": seoDesc,
    "image": featuredImage.startsWith('http') ? featuredImage : `https://kawaki.co.in${featuredImage}`,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author,
      "jobTitle": "Founder & Principal Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Kawaki Studios",
        "url": "https://kawaki.co.in"
      }
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://kawaki.co.in/#organization",
      "name": "Kawaki Studios",
      "url": "https://kawaki.co.in",
      "logo": "https://kawaki.co.in/assets/images/kawaki-logo.png"
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
        "item": "https://kawaki.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://kawaki.co.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  const BLOG_SEO_TITLES = {
    'what-to-prepare-before-hiring-web-development-agency': 'What to Prepare Before Hiring a Web Agency',
    'ai-automation-architecture': 'AI Automation Architecture & Workflows',
    'ai-agent-reliability-evaluation': 'AI Agent Reliability & Evaluation',
    'ai-automation-vs-ai-agents': 'AI Automation vs AI Agents Guide',
    'custom-web-development-vs-no-code': 'Custom Web Development vs No-Code',
    'what-is-editorial-engineering': 'What is Editorial Engineering? Guide',
    'headless-shopify-development-guide': 'Headless Shopify Development Guide',
    'how-ai-search-engines-cite-sources': 'How AI Search Engines Cite Sources',
    'japanese-keyword-hack-wordpress': 'Japanese Keyword Hack Cleanup Guide',
    'nextjs-performance-architecture': 'Next.js Performance Architecture Guide',
    'nextjs-server-vs-client-components': 'Next.js Server vs Client Components',
    'nextjs-state-management-api-boundaries': 'Next.js State Management & API Flow',
    'shopify-liquid-vs-headless': 'Shopify Liquid vs Headless Shopify',
    'webflow-vs-custom-development': 'Webflow vs Custom Web Development',
    'wordpress-backdoors-stealth-web-shells': 'WordPress Backdoor & Shell Removal',
    'wordpress-malicious-redirects-cleanup': 'WordPress Malicious Redirect Cleanup',
    'how-to-evaluate-a-web-development-proposal-beyond-price': 'How to Evaluate a Web Development Proposal'
  };

  const conciseTitle = BLOG_SEO_TITLES[slug] || (title.length > 40 ? title.split(':')[0] : title);
  const metaTitle = `${conciseTitle} — Kawaki Studios`;

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Clarity tracking code for https://kawaki.co.in/ -->
    <script>
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "yyqy7vt939");
    </script>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${metaTitle}</title>
    <meta name="description" content="${seoDesc}" />
    <meta name="generator" content="Kawaki Blog Engine" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${metaTitle}" />
    <meta property="og:description" content="${seoDesc}" />
    <meta property="og:image" content="${featuredImage.startsWith('http') ? featuredImage : 'https://kawaki.co.in' + featuredImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="675" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="${metaTitle}" />
    <meta name="twitter:description" content="${seoDesc}" />
    <meta name="twitter:image" content="${featuredImage.startsWith('http') ? featuredImage : 'https://kawaki.co.in' + featuredImage}" />

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
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/global.css?v=20260902_luxury_v6" />
    <link rel="stylesheet" href="/assets/css/chatbot.css?v=20260902_pill_v2" />

    <style>
        :root {
            --color-bg: #FFFFFF;
            --color-text: #12100E;
            --color-muted: #64748B;
            --color-accent: #C6FF00;
            --color-border: rgba(0, 0, 0, 0.08);
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
            line-height: 1.75;
            -webkit-font-smoothing: antialiased;
        }

        em {
            font-family: var(--font-serif);
            font-style: italic;
        }

        /* Container & Page Header */
        .post-detail-page {
            max-width: 1240px;
            margin: 0 auto;
            padding: 130px 24px 80px;
        }

        .breadcrumbs-nav {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 13px;
            font-weight: 500;
            color: var(--color-muted);
            margin-bottom: 1.5rem;
        }
        .breadcrumbs-nav a {
            color: var(--color-muted);
            text-decoration: none;
            transition: color 0.2s;
        }
        .breadcrumbs-nav a:hover {
            color: #111111;
        }
        .breadcrumbs-nav .divider {
            color: rgba(0,0,0,0.25);
        }
        .breadcrumbs-nav .active {
            color: #111111;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 480px;
        }

        .post-header {
            margin-bottom: 2.5rem;
        }

        .header-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 1.25rem;
        }

        .category-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 14px;
            border-radius: 50px;
            background: #F4F4F5;
            color: #18181B;
            border: 1px solid rgba(0, 0, 0, 0.08);
            font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
            font-size: 12.5px;
            font-weight: 600;
            letter-spacing: -0.01em;
            text-transform: capitalize;
            text-decoration: none;
            transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .category-badge:hover {
            background: #E4E4E7;
            color: #09090B;
            border-color: rgba(0, 0, 0, 0.15);
        }

        .meta-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 500;
            color: var(--color-muted);
        }
        .meta-item svg {
            color: var(--color-muted);
        }

        .post-title {
            font-size: clamp(2.2rem, 4.5vw, 3.5rem);
            font-weight: 800;
            line-height: 1.15;
            letter-spacing: -0.03em;
            color: #111111;
            margin: 0 0 1.5rem;
        }

        .author-credits {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 1.25rem 0;
            border-top: 1px solid rgba(0,0,0,0.08);
            border-bottom: 1px solid rgba(0,0,0,0.08);
            margin-bottom: 2.5rem;
            font-size: 14px;
        }
        .author-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #111114;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            border: 2px solid rgba(198, 255, 0, 0.4);
        }
        .author-details {
            display: flex;
            flex-direction: column;
        }
        .author-name {
            font-weight: 700;
            color: #111111;
        }
        .author-role {
            font-size: 12px;
            color: var(--color-muted);
        }

        /* Hero Featured Image Container */
        .featured-image-wrapper {
            margin-bottom: 3.5rem;
        }
        .featured-image-container {
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 580px;
            border-radius: 20px;
            overflow: hidden;
            background: #0B0B0E;
            box-shadow: 0 20px 45px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.08);
        }
        .post-featured-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        /* Two-Column Layout Grid */
        .article-layout {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 340px;
            gap: 3.5rem;
            align-items: start;
        }
        @media (max-width: 1024px) {
            .article-layout {
                grid-template-columns: 1fr;
                gap: 2.5rem;
            }
            .article-sidebar {
                order: 2;
            }
        }

        /* Executive Summary / Key Takeaways Card */
        .key-takeaways-card {
            background: #F8F9FA;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-left: 4px solid #111111;
            border-radius: 16px;
            padding: 1.75rem 2rem;
            margin-bottom: 2.5rem;
        }
        .takeaways-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 0.75rem;
        }
        .takeaways-header h3 {
            margin: 0;
            font-size: 1.05rem;
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #111111;
            font-family: var(--font-primary, sans-serif);
        }
        .takeaway-icon {
            color: #111111;
        }
        .takeaway-lead {
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
            margin-bottom: 1rem;
        }
        .takeaway-bullets {
            margin: 0;
            padding-left: 1.25rem;
            color: #1F2937;
            font-size: 14.5px;
            line-height: 1.6;
        }
        .takeaway-bullets li {
            margin-bottom: 0.5rem;
        }

        /* Main Post Content Typography */
        .post-body-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #2D2A26;
        }
        .post-body-content h2 {
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #111111;
            margin: 3rem 0 1.25rem;
            scroll-margin-top: 110px;
        }
        .post-body-content h3 {
            font-size: 1.35rem;
            font-weight: 700;
            letter-spacing: -0.015em;
            color: #111111;
            margin: 2.25rem 0 1rem;
            scroll-margin-top: 110px;
        }
        .post-body-content p {
            margin-bottom: 1.5rem;
        }
        .post-body-content ul, .post-body-content ol {
            margin: 1.5rem 0;
            padding-left: 1.75rem;
        }
        .post-body-content li {
            margin-bottom: 0.5rem;
        }
        .post-body-content a {
            color: #111111;
            text-decoration: underline;
            text-decoration-color: var(--color-accent);
            text-underline-offset: 4px;
            transition: color 0.2s;
        }
        .post-body-content a:hover {
            color: #000000;
        }
        .post-body-content blockquote {
            border-left: 3px solid #C6FF00;
            background: #F9F9FB;
            padding: 1.25rem 1.5rem;
            border-radius: 0 12px 12px 0;
            margin: 2rem 0;
            color: #374151;
            font-style: italic;
        }
        .post-body-content pre {
            background: #111116;
            color: #F4F4F5;
            padding: 1.5rem;
            border-radius: 14px;
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 14px;
            line-height: 1.6;
            margin: 2rem 0;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .post-body-content code {
            font-family: var(--font-mono);
            font-size: 14px;
            background: rgba(0,0,0,0.06);
            padding: 2px 6px;
            border-radius: 4px;
        }
        .post-body-content pre code {
            background: transparent;
            padding: 0;
            border-radius: 0;
            color: inherit;
        }
        .post-body-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 2.5rem 0;
            font-size: 14.5px;
        }
        .post-body-content th {
            background: #111114;
            color: #FFFFFF;
            text-align: left;
            padding: 12px 16px;
            font-weight: 600;
            border: 1px solid #111114;
        }
        .post-body-content td {
            padding: 12px 16px;
            border: 1px solid rgba(0,0,0,0.08);
            background: #FFFFFF;
        }
        .post-body-content tr:nth-child(even) td {
            background: #F9FAF6;
        }
        .post-body-content figure {
            margin: 2.5rem 0;
            padding: 0;
        }
        .post-body-content img {
            max-width: 100%;
            height: auto;
            border-radius: 14px;
            display: block;
            box-shadow: 0 12px 35px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.08);
        }
        .post-body-content figcaption {
            margin-top: 0.75rem;
            font-size: 0.85rem;
            color: var(--color-muted);
            text-align: center;
            font-family: var(--font-mono);
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

        /* In-Article Conversion Card */
        .in-article-cta {
            margin: 3.5rem 0;
            padding: 2.5rem 2rem;
            background: #111114;
            color: #FFFFFF;
            border-radius: 20px;
            text-align: center;
            border: 1px solid rgba(198, 255, 0, 0.2);
            position: relative;
            overflow: hidden;
        }
        .in-article-cta .cta-kicker {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #C6FF00;
            margin-bottom: 0.75rem;
        }
        .in-article-cta h3 {
            font-size: clamp(1.4rem, 2.5vw, 1.85rem);
            font-weight: 800;
            color: #FFFFFF;
            margin: 0 0 1rem;
            letter-spacing: -0.02em;
        }
        .in-article-cta p {
            color: #94A3B8;
            font-size: 15px;
            line-height: 1.6;
            max-width: 580px;
            margin: 0 auto 1.75rem;
        }
        .in-article-cta .cta-actions {
            display: flex;
            gap: 16px;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn-primary-theme {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #C6FF00;
            color: #111111;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            transition: transform 0.2s, background 0.2s;
        }
        .btn-primary-theme:hover {
            transform: translateY(-2px);
            background: #D4FF33;
        }
        .btn-link-secondary {
            color: #94A3B8;
            font-size: 13.5px;
            font-weight: 600;
            text-decoration: underline;
            text-underline-offset: 4px;
            transition: color 0.2s;
        }
        .btn-link-secondary:hover {
            color: #FFFFFF;
        }

        /* Author Bio Card */
        .author-bio-card {
            display: flex;
            gap: 20px;
            padding: 2rem;
            background: #FAFAFC;
            border: 1px solid rgba(0,0,0,0.07);
            border-radius: 18px;
            margin-top: 3.5rem;
            align-items: flex-start;
        }
        @media (max-width: 640px) {
            .author-bio-card {
                flex-direction: column;
            }
        }
        .bio-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #111114;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 20px;
            border: 2px solid #C6FF00;
            flex-shrink: 0;
        }
        .bio-details h4 {
            margin: 0.25rem 0 0.5rem;
            font-size: 1.25rem;
            font-weight: 800;
            color: #111111;
        }
        .bio-role {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #65a30d;
        }
        .bio-details p {
            margin: 0 0 1rem;
            font-size: 14px;
            line-height: 1.6;
            color: #4B5563;
        }
        .bio-socials {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            font-size: 13px;
            font-weight: 600;
        }
        .bio-socials a {
            color: #111111;
            text-decoration: none;
            transition: color 0.2s;
        }
        .bio-socials a:hover {
            color: #65a30d;
        }
        .bio-consult {
            color: #111111;
            font-weight: 700;
            text-decoration: underline !important;
        }

        /* Sidebar Widgets */
        .article-sidebar {
            position: sticky;
            top: 110px;
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
        }

        .toc-light-card {
            background: #FAFAFC;
            border: 1px solid rgba(0,0,0,0.07);
            border-radius: 18px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .toc-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #111111;
            margin: 0 0 1rem;
            font-family: var(--font-mono);
        }
        .toc-list {
            list-style: none;
            margin: 0;
            padding: 0;
            max-height: 420px;
            overflow-y: auto;
            scrollbar-width: thin;
        }
        .toc-item {
            margin-bottom: 2px;
            border-radius: 6px;
            transition: all 0.2s;
        }
        .toc-item a {
            display: block;
            padding: 6px 10px;
            font-size: 13.5px;
            line-height: 1.45;
            color: #4B5563;
            text-decoration: none;
            border-left: 2px solid transparent;
            transition: all 0.2s;
        }
        .toc-level-3 a {
            padding-left: 20px;
            font-size: 12.5px;
            color: #6B7280;
        }
        .toc-item.active a {
            color: #111111;
            font-weight: 700;
            border-left-color: #C6FF00;
            background: rgba(198, 255, 0, 0.15);
            border-radius: 0 6px 6px 0;
        }
        .toc-item a:hover {
            color: #111111;
            background: rgba(0,0,0,0.03);
        }

        .share-light-card {
            background: #FAFAFC;
            border: 1px solid rgba(0,0,0,0.07);
            border-radius: 18px;
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .share-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-family: var(--font-mono);
            color: #111111;
        }
        .share-buttons {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .share-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 1px solid rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111111;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }
        .share-btn:hover {
            background: #111111;
            color: #FFFFFF;
            border-color: #111111;
        }

        .strategy-call-card {
            background: #111114;
            color: #FFFFFF;
            border-radius: 18px;
            padding: 1.5rem;
            border: 1px solid rgba(255,255,255,0.08);
        }
        .call-badge {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: #C6FF00;
            margin-bottom: 0.5rem;
        }
        .call-title {
            font-size: 1.15rem;
            font-weight: 800;
            margin: 0 0 0.5rem;
            color: #FFFFFF;
        }
        .call-desc {
            font-size: 13px;
            color: #94A3B8;
            line-height: 1.5;
            margin: 0 0 1.25rem;
        }
        .btn-sidebar-call {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            background: #C6FF00;
            color: #111111;
            font-weight: 700;
            font-size: 13.5px;
            padding: 10px 16px;
            border-radius: 50px;
            text-decoration: none;
            transition: transform 0.2s, background 0.2s;
            box-sizing: border-box;
        }
        .btn-sidebar-call:hover {
            transform: translateY(-2px);
            background: #D4FF33;
        }

        /* Related Posts Section */
        .related-posts-section {
            margin-top: 5rem;
            padding-top: 3.5rem;
            border-top: 1px solid rgba(0,0,0,0.08);
        }
        .related-section-title {
            font-size: clamp(1.6rem, 3vw, 2.2rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #111111;
            margin: 0 0 2.5rem;
            text-align: center;
        }
        .related-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        @media (max-width: 900px) {
            .related-grid {
                grid-template-columns: 1fr;
            }
        }
        .post-light-card {
            background: #FFFFFF;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 18px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .post-light-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 35px rgba(0,0,0,0.06);
        }
        .card-img-wrapper {
            aspect-ratio: 16 / 9;
            overflow: hidden;
            background: #0B0B0E;
        }
        .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .post-light-card:hover .card-img {
            transform: scale(1.04);
        }
        .card-body {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        .card-title {
            font-size: 1.15rem;
            font-weight: 700;
            line-height: 1.35;
            margin: 0.75rem 0 0.5rem;
        }
        .card-title a {
            color: #111111;
            text-decoration: none;
            transition: color 0.2s;
        }
        .card-title a:hover {
            color: #65a30d;
        }
        .card-excerpt {
            font-size: 13.5px;
            color: var(--color-muted);
            line-height: 1.55;
            margin-bottom: 1.25rem;
            flex-grow: 1;
        }
        .card-read-link {
            font-size: 13px;
            font-weight: 700;
            color: #111111;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transition: gap 0.2s;
        }
        .card-read-link:hover {
            gap: 8px;
            color: #65a30d;
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
                            <span>Available for Select Projects</span>
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
                            <a href="https://linkedin.com/company/kawaki-studios" target="_blank" rel="noopener">LinkedIn ↗</a>
                            <a href="https://twitter.com/kawakistudios" target="_blank" rel="noopener">Twitter / X ↗</a>
                            <a href="https://instagram.com/kawaki.agency" target="_blank" rel="noopener">Instagram ↗</a>
                            <a href="https://behance.net" target="_blank" rel="noopener">Behance ↗</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MAIN ARTICLE BODY -->
    <main class="post-detail-page">
        <!-- BREADCRUMBS -->
        <nav aria-label="Breadcrumb" class="breadcrumbs-nav">
            <a href="/">Home</a>
            <span class="divider">/</span>
            <a href="/blog">Blog</a>
            <span class="divider">/</span>
            <span class="active" aria-current="page">${title}</span>
        </nav>

        <!-- POST HEADER -->
        <header class="post-header">
            <div class="header-meta">
                <span class="category-badge">${category}</span>
                <span class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${readingTime} min read
                </span>
                <span class="meta-item">${pubDateDisplay}</span>
            </div>

            <h1 class="post-title" id="articleTitle">
                ${title}
            </h1>

            <div class="author-credits">
                <div class="author-avatar" id="authorInitial">${authorInitial}</div>
                <div class="author-details">
                    <span class="author-name" id="authorName">${author}</span>
                    <span class="author-role">Founder &amp; Principal Engineer, Kawaki Studios</span>
                </div>
            </div>
        </header>

        <!-- FEATURED HERO IMAGE -->
        <div class="featured-image-wrapper">
            <div class="featured-image-container">
                <img id="articleImage" src="${featuredImage}" alt="${title}" class="post-featured-img" width="1200" height="675" fetchpriority="high" decoding="async" />
            </div>
        </div>

        <!-- TWO-COLUMN ARTICLE LAYOUT -->
        <div class="article-layout" id="articleWrapper">
            <!-- LEFT MAIN CONTENT COLUMN -->
            <article class="article-content-column">
                <!-- EXECUTIVE SUMMARY / KEY TAKEAWAYS -->
                <div class="key-takeaways-card">
                    <div class="takeaways-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="takeaway-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                        <h3>Executive Summary / Key Takeaways</h3>
                    </div>
                    <p class="takeaway-lead">${seoDesc}</p>
                    <ul class="takeaway-bullets">
                        ${takeaways.map(pt => `<li>${pt}</li>`).join('\n                        ')}
                    </ul>
                </div>

                <!-- MAIN ARTICLE CONTENT -->
                <div class="post-body-content" id="articleContent">
                    ${contentHtml}
                </div>

                <!-- TAGS -->
                <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.08);" id="articleTags">
                    ${tagsHtml}
                </div>

                <!-- IN-ARTICLE CONVERSION CTA -->
                <div class="in-article-cta text-center">
                    <span class="cta-kicker">// ARCHITECTURAL PARTNERSHIP</span>
                    <h3>Need Help Engineering Your Web Platform or AI Systems?</h3>
                    <p>From high-performance Next.js architectures to headless Shopify storefronts, custom AI automations, and enterprise WordPress security recovery, Kawaki Studios designs resilient digital infrastructure built to scale.</p>
                    <div class="cta-actions">
                        <a href="${contextualService.contactUrl || '/contact'}" class="btn-primary-theme">
                            <span>Schedule Engineering Discovery</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M5.904 10.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"></path></svg>
                        </a>
                        <a href="${contextualService.url}" class="btn-link-secondary">
                            ${contextualService.label} &rarr;
                        </a>
                    </div>
                </div>

                <!-- AUTHOR BIO CARD -->
                <div class="author-bio-card">
                    <div class="bio-avatar">
                        <span class="avatar-text">${authorInitial}</span>
                    </div>
                    <div class="bio-details">
                        <span class="bio-role">Founder &amp; Principal Engineer</span>
                        <h4>${author}</h4>
                        <p>Kunal is the founder and principal engineer at Kawaki Studios, specializing in high-performance web engineering, Next.js application architecture, headless Shopify systems, autonomous AI workflows, and forensic WordPress security recovery. He helps ambitious founders and modern enterprises design resilient, high-velocity digital flagships.</p>
                        <div class="bio-socials">
                            <a href="https://linkedin.com/company/kawaki-studios" target="_blank" rel="noopener">LinkedIn ↗</a>
                            <a href="https://twitter.com/kawakistudios" target="_blank" rel="noopener">Twitter / X ↗</a>
                            <a href="https://github.com/gusfing/kawaki" target="_blank" rel="noopener">GitHub ↗</a>
                            <a href="/contact" class="bio-consult">Book 15-Min Briefing ↗</a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- RIGHT STICKY SIDEBAR -->
            <aside class="article-sidebar" data-lenis-prevent>
                <!-- WIDGET 1: TABLE OF CONTENTS -->
                <div class="toc-light-card">
                    <h3 class="toc-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        Table of Contents
                    </h3>
                    <nav class="toc-nav">
                        <ul class="toc-list" data-lenis-prevent>
                            ${tocListHtml}
                        </ul>
                    </nav>
                </div>

                <!-- WIDGET 2: SHARE BUTTONS -->
                <div class="share-light-card">
                    <span class="share-label">Share Article</span>
                    <div class="share-buttons">
                        <button class="share-btn" id="share-copy" title="Copy Link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </button>
                        <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="share-btn" title="Share on Twitter / X">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </a>
                        <a href="${linkedInUrl}" target="_blank" rel="noopener noreferrer" class="share-btn" title="Share on LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>

                <!-- WIDGET 3: 1-ON-1 STRATEGY CALL -->
                <div class="strategy-call-card">
                    <span class="call-badge">1-ON-1 CONSULTATION</span>
                    <h4 class="call-title">Book an Engineering Briefing</h4>
                    <p class="call-desc">Discuss your web platform, Next.js migration, AI workflow, or security recovery directly with our engineering team.</p>
                    <a href="/contact" class="btn-sidebar-call">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>Schedule Call</span>
                    </a>
                </div>
            </aside>
        </div>

        <!-- RELATED POSTS SECTION -->
        <section class="related-posts-section">
            <h2 class="related-section-title">Related Engineering Insights</h2>
            <div class="related-grid">
                ${relatedCardsHtml}
            </div>
        </section>
    </main>

    <!-- UNIVERSAL GLOBAL FOOTER -->
    <footer class="sections global-site-footer">
        <div class="footer-top-strip">
            <div class="footer-status-pill">
                <span class="footer-status-dot"></span>
                <span>Available for Select Projects</span>
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
                <div class="footer-contact-item" style="margin-top: 0.75rem;">
                    <span class="footer-contact-label">Infrastructure Partner</span>
                    <a href="https://www.hostinger.com" target="_blank" rel="noopener" class="footer-partner-badge" title="Hostinger Official Partner — Cloud &amp; Hosting Infrastructure">
                        <img src="/assets/images/hostinger-partner-dark.png" alt="Hostinger Partner" width="160" height="60" loading="lazy" />
                    </a>
                </div>
            </div>

            <div class="footer-col">
                <div class="footer-col-header">// CLIENT TIME ZONES</div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New Delhi — Studio HQ</span>
                        <span class="footer-time-clock" id="footerTimeDelhi">--:-- -- IST</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>Tokyo — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeTokyo">--:-- -- JST</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>London — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeLondon">--:-- -- GMT</span>
                    </div>
                </div>
                <div class="footer-time-badge">
                    <div class="footer-time-city">
                        <span>New York — Client Time Zone</span>
                        <span class="footer-time-clock" id="footerTimeNY">--:-- -- EST</span>
                    </div>
                </div>
            </div>

            <div class="footer-col">
                <div class="footer-col-header">// SOCIAL INDEX</div>
                <ul class="footer-links-list">
                    <li><a href="https://instagram.com/kawaki.agency" target="_blank" rel="noopener"><span>Instagram</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://twitter.com/kawakistudios" target="_blank" rel="noopener"><span>X / Twitter</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://linkedin.com/company/kawaki-studios" target="_blank" rel="noopener"><span>LinkedIn</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://behance.net" target="_blank" rel="noopener"><span>Behance</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                    <li><a href="https://github.com/gusfing/kawaki" target="_blank" rel="noopener"><span>GitHub</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a></li>
                </ul>
            </div>
        </div>

        <div class="footer-giant-watermark">
            <span>KAWAKI</span>
        </div>

        <div class="footer-bottom">
            <div class="copyright">© 2026 Kawaki Studios. All rights reserved. — Custom Web Development &amp; Shopify Stores.</div>
            <ul class="footer-bottom-links">
                <li><a href="/about">Privacy Policy</a></li>
                <li><a href="/about">Terms of Service</a></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener">Sitemap</a></li>
                <li><a href="/robots.txt" target="_blank" rel="noopener">Robots.txt</a></li>
                <li><a href="/llms.txt" target="_blank" rel="noopener">LLMs.txt</a></li>
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
            // Share Copy Link Handler
            const copyBtn = document.getElementById('share-copy');
            if (copyBtn) {
                copyBtn.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        const originalHtml = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                        copyBtn.setAttribute('title', 'Link Copied!');
                        setTimeout(() => {
                            copyBtn.innerHTML = originalHtml;
                            copyBtn.setAttribute('title', 'Copy Link');
                        }, 2500);
                    } catch (err) {
                        console.error('Failed to copy link:', err);
                    }
                });
            }

            // Table of Contents Scroll-Spy via IntersectionObserver
            const tocLinks = document.querySelectorAll('.toc-list a');
            const headings = Array.from(document.querySelectorAll('.post-body-content h2, .post-body-content h3'));
            
            if (tocLinks.length > 0 && headings.length > 0) {
                const observerOptions = {
                    root: null,
                    rootMargin: '-100px 0px -65% 0px',
                    threshold: 0
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('id');
                            tocLinks.forEach((link) => {
                                const item = link.closest('.toc-item');
                                if (link.getAttribute('href') === '#' + id) {
                                    item?.classList.add('active');
                                    const tocList = document.querySelector('.toc-list');
                                    if (tocList && item) {
                                        const offset = item.offsetTop - tocList.offsetTop;
                                        tocList.scrollTo({ top: offset - 40, behavior: 'smooth' });
                                    }
                                } else {
                                    item?.classList.remove('active');
                                }
                            });
                        }
                    });
                }, observerOptions);

                headings.forEach(h => observer.observe(h));
            }

            // Smooth scroll on TOC link click
            tocLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href')?.slice(1);
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        const navOffset = 100;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Time update helper for footer
            function updateFooterClocks() {
                const now = new Date();
                const opt = (tz) => ({ timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true });
                const elDelhi = document.getElementById('footerTimeDelhi');
                const elTokyo = document.getElementById('footerTimeTokyo');
                const elLondon = document.getElementById('footerTimeLondon');
                const elNY = document.getElementById('footerTimeNY');
                if (elDelhi) elDelhi.innerText = now.toLocaleTimeString('en-US', opt('Asia/Kolkata')) + ' IST';
                if (elTokyo) elTokyo.innerText = now.toLocaleTimeString('en-US', opt('Asia/Tokyo')) + ' JST';
                if (elLondon) elLondon.innerText = now.toLocaleTimeString('en-US', opt('Europe/London')) + ' GMT';
                if (elNY) elNY.innerText = now.toLocaleTimeString('en-US', opt('America/New_York')) + ' EST';
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
</body>
</html>
`;
}

module.exports = {
  formatDate,
  sanitizeHtml,
  renderMarkdown,
  getContextualService,
  extractHeadingsAndInjectIds,
  getArticleTakeaways,
  generateArticleHtml
};
