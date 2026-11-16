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

// Article page on the shared site shell (scripts/lib/article-page.js)
function generateArticleHtml(article, allArticles = []) {
  return require('./lib/article-page').articlePage(article, allArticles, {
    renderMarkdown, extractHeadingsAndInjectIds, getContextualService, formatDate
  });
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
