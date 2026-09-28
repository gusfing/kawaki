/**
 * scripts/generate-llms.js
 * 
 * Generates canonical, machine-readable documentation:
 *   - public/llms.txt: High-signal entity definition, core capabilities, service knowledge,
 *     architecture principles, resources, reference architectures, FAQs, and entity links.
 *   - public/llms-full.txt: Expanded machine-readable knowledge base with exhaustive
 *     technical breakdowns, workflows, failure taxonomies, and deep article digests.
 * 
 * Dynamically binds published articles from the platform's content layer.
 */

const fs = require('fs');
const path = require('path');

// 1. Static Verified Knowledge Base
const ENTITY = {
  name: "Kawaki Studios",
  website: "https://www.kawaki.co.in/",
  founder: "Kunal Sharma",
  role: "Founder & Creative Direction",
  location: "New Delhi, India",
  description: "Kawaki Studios is a founder-led digital engineering studio based in New Delhi, India, focused on custom web development, web applications, Shopify development, AI automation, AI search optimization, and WordPress security and recovery.",
  disciplines: [
    "Custom Web Development",
    "Modern Web Applications",
    "Shopify and Headless Commerce",
    "AI Workflow Automation & Bounded Agents",
    "AI Search Optimization & Search Engineering",
    "WordPress Malware Removal & Security Recovery"
  ],
  serviceModel: "Founder-led digital engineering studio collaborating with select clients globally on bespoke digital platforms and mission-critical systems.",
  socials: {
    github: "https://github.com/gusfing/kawaki",
    linkedin: "https://linkedin.com/company/kawaki-studios",
    twitter: "https://twitter.com/kawakistudios",
    instagram: "https://instagram.com/kawaki.agency"
  },
  contact: {
    inquiries: "hello@kawakistudios.com",
    partnerships: "partners@kawakistudios.com",
    formUrl: "https://www.kawaki.co.in/contact"
  }
};

const CAPABILITIES = [
  {
    num: 1,
    title: "Custom web development",
    url: "https://www.kawaki.co.in/services/custom-web-development",
    desc: "Bespoke digital platforms engineered with Next.js App Router, TypeScript, and modern CSS architectures."
  },
  {
    num: 2,
    title: "Modern web application development",
    url: "https://www.kawaki.co.in/services/web-application-development",
    desc: "Full-stack web applications with complex state, dedicated API boundaries, and clear intellectual property ownership."
  },
  {
    num: 3,
    title: "Shopify and headless commerce engineering",
    url: "https://www.kawaki.co.in/services/shopify-development",
    desc: "Custom Liquid themes, Storefront API integrations, and sub-second decoupled commerce storefronts."
  },
  {
    num: 4,
    title: "AI workflow automation and bounded AI agents",
    url: "https://www.kawaki.co.in/services/ai-automation",
    desc: "Deterministic workflow orchestration (n8n/Make/code) and task-specific AI agents with strict runtime guardrails."
  },
  {
    num: 5,
    title: "AI search optimization and search engineering",
    url: "https://www.kawaki.co.in/services/ai-search-optimization",
    desc: "Technical search engineering, entity clarity, Schema.org JSON-LD structured data, and answer-first content discoverability."
  },
  {
    num: 6,
    title: "WordPress malware removal and security recovery",
    url: "https://www.kawaki.co.in/services/wordpress-malware-removal",
    desc: "Incident response, malicious code and backdoor extraction, database cleanup, and security hardening."
  },
  {
    num: 7,
    title: "Website performance optimization",
    url: "https://www.kawaki.co.in/services/website-performance-optimization",
    desc: "Core Web Vitals optimization, asset budgeting, font subsetting, and JavaScript main-thread execution reduction."
  },
  {
    num: 8,
    title: "Website redesign and platform modernization",
    url: "https://www.kawaki.co.in/services/website-redesign",
    desc: "Strategic replatforming, technical refactoring, and modernizing legacy web platforms without losing organic search equity."
  }
];

const CORE_SERVICES = [
  {
    id: "custom-web-dev",
    name: "Custom Web Development",
    url: "https://www.kawaki.co.in/services/custom-web-development",
    definition: "Bespoke digital platform engineering utilizing modern web standards, component-driven frontend architecture, and server-side rendering to create high-performance web presences tailored to exact operational requirements.",
    delivers: [
      "Modular frontend architectures built on Next.js App Router and React Server Components",
      "TypeScript codebases engineered for type safety, maintainability, and clean separation of concerns",
      "Publication-grade typographic hierarchies and custom design implementations without generic templates",
      "Sub-second page transitions, responsive viewports, and asset-budgeted media delivery",
      "Direct API integrations, webhook handlers, and database connections"
    ],
    problemsAddressed: [
      "Rigid CMS template constraints preventing custom layout grids or dynamic customer flows",
      "Excessive JavaScript bundles and render-blocking scripts degrading Core Web Vitals",
      "Fragile third-party plugin ecosystems causing frequent software regressions",
      "Lack of clean developer documentation and poor code maintainability"
    ],
    technicalAreas: [
      "Next.js App Router, React Server Components (RSC), TypeScript",
      "Modern CSS architectures, fluid typography (CSS clamp), semantic HTML5",
      "REST & GraphQL API design, serverless microservices",
      "Edge caching, CDN routing, and Core Web Vitals engineering"
    ],
    appropriateWhen: "Appropriate when a business requires a distinctive, highly tailored digital flagship that cannot be constrained by off-the-shelf website builders or generic themes.",
    relatedServices: [
      "https://www.kawaki.co.in/services/web-application-development",
      "https://www.kawaki.co.in/services/website-performance-optimization",
      "https://www.kawaki.co.in/services/website-redesign"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/nextjs-server-vs-client-components",
      "https://www.kawaki.co.in/blog/nextjs-state-management-api-boundaries",
      "https://www.kawaki.co.in/blog/nextjs-performance-architecture",
      "https://www.kawaki.co.in/blog/webflow-vs-custom-development",
      "https://www.kawaki.co.in/blog/what-is-editorial-engineering"
    ]
  },
  {
    id: "web-app-dev",
    name: "Web Application Development",
    url: "https://www.kawaki.co.in/services/web-application-development",
    definition: "Full-stack software engineering for complex interactive web applications, internal tools, customer portals, and SaaS interfaces requiring persistent state, multi-tenant security, and robust backend integration.",
    delivers: [
      "Interactive single-page and hybrid server-rendered application frontends",
      "Strict server/client boundaries preventing unauthorized access to sensitive business logic",
      "Session-based authentication, role-based access control (RBAC), and token verification",
      "Real-time state management, optimistic UI updates, and client-side error boundaries",
      "Complete client ownership of all application source code and deployment assets"
    ],
    problemsAddressed: [
      "Spreadsheet-driven business processes causing manual operational friction and data errors",
      "Legacy software systems lacking modern responsive interfaces and mobile usability",
      "Slow client-side rendering with excessive hydration penalties locking the main thread",
      "Unsecured client-side data queries leaking internal operational metrics"
    ],
    technicalAreas: [
      "Next.js, React 19, TypeScript, Node.js",
      "Client state management, optimistic mutations, server action contracts",
      "PostgreSQL, SQLite, Redis caching, structured data migrations",
      "JWT/Session authentication, CORS security envelopes, API Route Handlers"
    ],
    appropriateWhen: "Appropriate when a business requires an interactive software tool, dashboard, portal, or workflow engine that demands dedicated state management and transactional backend operations.",
    relatedServices: [
      "https://www.kawaki.co.in/services/custom-web-development",
      "https://www.kawaki.co.in/services/ai-automation"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/nextjs-state-management-api-boundaries",
      "https://www.kawaki.co.in/blog/nextjs-server-vs-client-components"
    ]
  },
  {
    id: "shopify-dev",
    name: "Shopify Development",
    url: "https://www.kawaki.co.in/services/shopify-development",
    definition: "Custom e-commerce engineering for Shopify stores, ranging from bespoke Liquid theme development and checkout optimizations to decoupled headless storefronts powered by the Shopify Storefront GraphQL API.",
    delivers: [
      "Bespoke Shopify Liquid themes built without bloated multi-purpose commercial themes",
      "Decoupled headless storefronts utilizing Next.js, Shopify Hydrogen, and Edge caching",
      "Custom product detail pages (PDPs) with narrative layouts and dynamic variant pickers",
      "Optimistic cart drawer mutations providing instantaneous customer feedback",
      "Platform migrations from WooCommerce, Magento, or custom carts to Shopify"
    ],
    problemsAddressed: [
      "Slow mobile storefront loading speeds caused by excessive third-party Shopify app scripts",
      "Conversion rate drops resulting from sluggish cart interactions and layout shift",
      "Rigid theme settings preventing unique editorial storytelling or brand presentation",
      "Catalog synchronization errors across multi-currency or localized storefronts"
    ],
    technicalAreas: [
      "Shopify Liquid, Theme App Extensions, Theme Customizer JSON schemas",
      "Shopify Storefront GraphQL API (v2026-01+), cartLinesAdd mutations",
      "Next.js App Router, React Server Components, Vercel Edge / Cloudflare Workers",
      "Stale-while-revalidate (SWR) edge caching with automated inventory webhooks"
    ],
    appropriateWhen: "Appropriate for ambitious e-commerce brands needing either a high-performance custom Liquid theme or a sub-second decoupled headless storefront.",
    relatedServices: [
      "https://www.kawaki.co.in/services/custom-web-development",
      "https://www.kawaki.co.in/services/website-performance-optimization"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/headless-shopify-development-guide",
      "https://www.kawaki.co.in/blog/shopify-liquid-vs-headless"
    ]
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    url: "https://www.kawaki.co.in/services/ai-automation",
    definition: "Enterprise workflow automation engineering that pairs deterministic orchestration with bounded artificial intelligence, strict tool permissions, human authorization gates, and end-to-end audit logging.",
    delivers: [
      "Multi-step automated workflows built on self-hosted n8n, Make, or custom Node.js/Python services",
      "Task-specific AI agents with strict schema-validated tool definitions and narrow scopes",
      "Human-in-the-loop authorization gates that pause execution for high-consequence business actions",
      "Automated document ingestion converting PDFs, invoices, and contracts into structured JSON",
      "Immutable telemetry sinks recording every reasoning step, tool payload, and latency metric"
    ],
    problemsAddressed: [
      "Repetitive manual data entry and copying between CRM, accounting, and communication tools",
      "Unbounded AI prototypes hallucinating database updates or leaking customer credentials",
      "Brittle automation scripts crashing silently on unexpected schema changes or network timeouts",
      "Lack of compliance records and visibility into what automated systems executed"
    ],
    technicalAreas: [
      "Self-hosted n8n instances, Make, webhook orchestration, event-driven architecture",
      "Bounded LLM integration (OpenAI, Anthropic, local models), JSON Schema / Zod validation",
      "Deterministic state machines, checkpoint serialization, idempotency key enforcement",
      "Exponential backoff with full jitter, Saga pattern compensating actions"
    ],
    appropriateWhen: "Appropriate for organizations seeking to automate complex, multi-system operational workflows without granting unbounded write access or risking data corruption.",
    relatedServices: [
      "https://www.kawaki.co.in/services/web-application-development",
      "https://www.kawaki.co.in/services/ai-search-optimization"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/ai-automation-architecture",
      "https://www.kawaki.co.in/blog/ai-agent-reliability-evaluation",
      "https://www.kawaki.co.in/blog/ai-automation-vs-ai-agents"
    ]
  },
  {
    id: "ai-search-opt",
    name: "AI Search Optimization",
    url: "https://www.kawaki.co.in/services/ai-search-optimization",
    definition: "Search engineering and content discoverability architecture that optimizes digital assets for traditional search engines, answer engines (AEO), and generative AI assistants (GEO) through entity clarity and verifiable structured data.",
    delivers: [
      "Comprehensive Schema.org JSON-LD graph architecture (Organization, WebSite, Service, BlogPosting)",
      "Answer-first editorial structure designed for semantic entity extraction and snippet inclusion",
      "Internal linking architecture establishing clear topical authority hierarchies",
      "Crawl budget optimization, canonical URL enforcement, and automated XML sitemaps",
      "Machine-readable markdown indices and documentation layers for external agent ingestion"
    ],
    problemsAddressed: [
      "Digital content ignored or misrepresented by AI assistants (Perplexity, ChatGPT, Gemini, Copilot)",
      "Fragmented entity signals across the web leading to ambiguous search brand graphs",
      "Technical crawl blockers, canonical loops, and missing structured metadata",
      "Keyword-stuffed content that fails to provide authoritative, citable factual definitions"
    ],
    technicalAreas: [
      "Schema.org JSON-LD graph modeling, entity linkage via @id references",
      "Technical SEO audits, Core Web Vitals compliance, server-side rendering (SSR)",
      "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO)",
      "Information retrieval heuristics, context window citation formatting"
    ],
    appropriateWhen: "Appropriate for businesses wanting their technical expertise, services, and brand identity to be accurately indexed, comprehended, and cited by modern search and AI models.",
    relatedServices: [
      "https://www.kawaki.co.in/services/custom-web-development",
      "https://www.kawaki.co.in/services/ai-automation"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/what-is-editorial-engineering"
    ]
  },
  {
    id: "wp-malware-removal",
    name: "WordPress Malware Removal & Recovery",
    url: "https://www.kawaki.co.in/services/wordpress-malware-removal",
    definition: "Forensic incident response, malicious code eradication, and security recovery for compromised WordPress platforms, followed by environmental hardening to prevent reinfection.",
    delivers: [
      "Full filesystem forensic audit comparing core and plugin files against official checksums",
      "Manual and automated extraction of obfuscated PHP backdoors, webshells, and eval scripts",
      "Database sanitization removing injected spam links, rogue admin accounts, and malicious wp_options records",
      "Resolution of search engine security blacklists (Google 'Deceptive site ahead' warnings)",
      "Post-cleanup environment hardening, file permission lockdown, and security policy deployment"
    ],
    problemsAddressed: [
      "Websites silently redirecting mobile or search visitors to spam and phishing domains",
      "Hosting accounts suspended due to high CPU spikes, malware detection, or outbound spam emails",
      "Recurring malware reinfections caused by hidden root-level backdoors or persistent cron jobs",
      "Japanese keyword hacks, pharma spam, and thousands of injected doorway pages"
    ],
    technicalAreas: [
      "PHP malware de-obfuscation, webshell identification, Linux server log forensics",
      "MySQL database payload inspection, serialized data repair, cron table analysis",
      ".htaccess rewrite rule audit, nginx server block hardening, WAF deployment",
      "WordPress core checksum verification, salt rotation, file permission lockdowns"
    ],
    appropriateWhen: "Appropriate when a WordPress website has been breached, blacklisted, suspended by hosting, or compromised by persistent unauthorized scripts.",
    relatedServices: [
      "https://www.kawaki.co.in/services/wordpress-backdoor-removal",
      "https://www.kawaki.co.in/services/malicious-redirect-removal",
      "https://www.kawaki.co.in/services/seo-spam-removal",
      "https://www.kawaki.co.in/services/website-security-hardening",
      "https://www.kawaki.co.in/services/wordpress-security-audit"
    ],
    relatedResources: [
      "https://www.kawaki.co.in/blog/japanese-keyword-hack-wordpress"
    ]
  }
];

const SUPPORTING_SERVICES = [
  {
    name: "Website Redesign",
    url: "https://www.kawaki.co.in/services/website-redesign",
    summary: "Strategic replatforming and visual modernization of outdated websites into high-performance digital platforms without losing organic search equity, keyword rankings, or URL authority."
  },
  {
    name: "Website Performance Optimization",
    url: "https://www.kawaki.co.in/services/website-performance-optimization",
    summary: "Systematic Core Web Vitals engineering targeting Largest Contentful Paint (LCP < 1.2s), zero Cumulative Layout Shift (CLS = 0), and low Interaction to Next Paint (INP < 100ms) through asset budgeting, critical font subsetting, and JavaScript reduction."
  },
  {
    name: "WordPress Development",
    url: "https://www.kawaki.co.in/services/wordpress-development",
    summary: "Clean, bespoke WordPress theme and backend engineering for publishers and organizations that require WordPress for content management but demand custom code, fast load times, and minimal plugin dependencies."
  }
];

const SECURITY_SUB_SERVICES = [
  {
    name: "WordPress Backdoor Removal",
    url: "https://www.kawaki.co.in/services/wordpress-backdoor-removal",
    problem: "Hidden persistent access vectors allowing attackers to regain administrative control after surface-level cleanup.",
    symptoms: "Malware returning within 24-48 hours, unauthorized administrator accounts appearing, unfamiliar files in wp-includes.",
    scope: "Forensic code inspection, hash verification against WordPress.org releases, rogue cron job elimination, salt key rotation."
  },
  {
    name: "Malicious Redirect Removal",
    url: "https://www.kawaki.co.in/services/malicious-redirect-removal",
    problem: "Conditional script injections redirecting select visitors (such as mobile users or search traffic) to malicious external sites.",
    symptoms: "Site opens normally on direct desktop visits but redirects to suspicious domains when accessed from mobile Google search.",
    scope: "Inspection of .htaccess files, index.php headers, theme footer scripts, database option records, and server rewrite rules."
  },
  {
    name: "SEO Spam Removal",
    url: "https://www.kawaki.co.in/services/seo-spam-removal",
    problem: "Automated injection of thousands of spam pages or outbound links designed to siphon domain authority for illicit networks.",
    symptoms: "Google indexing thousands of Japanese, pharma, or gambling URLs under your domain; search console security alerts.",
    scope: "Database query cleanup, removal of injected sitemaps, virtual doorway file deletion, Google Search Console re-indexing requests."
  },
  {
    name: "Website Security Hardening",
    url: "https://www.kawaki.co.in/services/website-security-hardening",
    problem: "Default configurations and outdated software exposing web platforms to brute-force attacks and known vulnerabilities.",
    symptoms: "Excessive failed login attempts, unauthorized file upload warnings, missing security headers.",
    scope: "Directory execution restrictions (/wp-content/uploads/ disabled for PHP), two-factor authentication, security headers, least-privilege permissions."
  },
  {
    name: "WordPress Security Audit",
    url: "https://www.kawaki.co.in/services/wordpress-security-audit",
    problem: "Unknown vulnerabilities, misconfigurations, and outdated third-party code putting systems at risk prior to active breach.",
    symptoms: "Compliance requirements, pre-acquisition due diligence, or proactive risk assessment for business-critical websites.",
    scope: "Full code and plugin vulnerability scanning, database user audit, hosting configuration review, and prioritized remediation roadmap."
  }
];

const CASE_STUDIES = [
  {
    title: "Acme Headless Commerce Architecture",
    url: "https://www.kawaki.co.in/case-studies/acme-headless-ecommerce",
    status: "Architectural Reference Design",
    summary: "A conceptual reference architecture demonstrating how ambitious e-commerce brands decouple Shopify backend commerce from customer-facing presentation. Explores Next.js App Router, Shopify Storefront GraphQL API v2026, edge caching (SWR), and optimistic cart mutations targeting sub-second page transitions."
  },
  {
    title: "Fintech ROI Calculator Architecture",
    url: "https://www.kawaki.co.in/case-studies/fintech-roi-calculator",
    status: "Architectural Reference Design",
    summary: "A conceptual reference architecture exploring client-side interactive financial modeling. Demonstrates zero-dependency SVG chart rendering, parametric sensitivity calculations, sub-second reactivity, and lead qualification webhook integration."
  }
];

const FAQS = [
  {
    category: "General",
    q: "What does Kawaki Studios do?",
    a: "Kawaki Studios is an independent digital engineering studio founded by Kunal Sharma. We engineer custom web platforms, modern web applications, bespoke Shopify storefronts, deterministic AI workflow automations, AI search architectures, and WordPress security recovery."
  },
  {
    category: "General",
    q: "Where is Kawaki Studios based?",
    a: "Kawaki Studios is based in New Delhi, India, and collaborates with select clients globally."
  },
  {
    category: "Web Development",
    q: "What is custom web development?",
    a: "Custom web development is the engineering of a digital platform using modern programming standards, clean semantic code, and tailored architecture, rather than forcing business requirements into pre-made commercial CMS templates or no-code page builders."
  },
  {
    category: "Web Development",
    q: "When should a business choose custom development over a site builder?",
    a: "Custom development is appropriate when a business requires a distinctive design identity, specialized user flows, sub-second loading performance, complete code ownership, or deep API and database integrations that off-the-shelf builders cannot support."
  },
  {
    category: "Web Development",
    q: "Who retains ownership of the custom web application source code?",
    a: "Clients retain 100% intellectual property ownership of the source code, architecture documentation, and design assets upon milestone settlement. Kawaki Studios delivers clean Git repositories with no proprietary runtime lock-in."
  },
  {
    category: "AI Automation",
    q: "What is the difference between simple automation and an AI agent?",
    a: "Simple automation follows rigid, deterministic if-this-then-that branching paths. An AI agent uses a language model to interpret unstructured inputs, reason across dynamic conditions, select and invoke tools, and synthesize data before committing actions."
  },
  {
    category: "AI Automation",
    q: "How does Kawaki Studios constrain AI agents to ensure reliability?",
    a: "We deploy defense-in-depth guardrails: strict Zod schema validation on tool inputs, least-privilege API scopes, finite state machine action spaces, full-jitter exponential backoff, structured observation contracts, and human-in-the-loop gates for high-impact decisions."
  },
  {
    category: "AI Automation",
    q: "When should human approval be required in an AI workflow?",
    a: "Human authorization gates are required when an action crosses pre-defined risk thresholds: high-value financial mutations, irreversible database deletions, security credential alterations, or sensitive customer-facing communication."
  },
  {
    category: "Shopify",
    q: "When is headless Shopify appropriate?",
    a: "Headless Shopify is appropriate for high-volume merchants whose conversion rates or brand experience are constrained by Liquid templating, app script bloat, or multi-market international catalog requirements requiring sub-second edge rendering."
  },
  {
    category: "WordPress Security",
    q: "What is the distinction between WordPress Development and WordPress Security?",
    a: "WordPress Development focuses on engineering, customizing, and maintaining clean WordPress themes and backends. WordPress Security and Recovery focuses on forensic investigation, malware extraction, backdoor removal, and hardening on compromised sites."
  },
  {
    category: "WordPress Security",
    q: "Why does WordPress malware frequently return after deletion?",
    a: "Malware recurs because attackers install stealth backdoors—obfuscated PHP files, rogue administrative users, or database cron jobs—that re-download malicious payloads after surface files are deleted. Complete recovery requires eradicating all persistence vectors."
  },
  {
    category: "AI Search",
    q: "What is the difference between SEO, AEO, and GEO?",
    a: "Traditional SEO focuses on crawler indexability and algorithmic SERP rankings. Answer Engine Optimization (AEO) structures content for direct question-answering engines. Generative Engine Optimization (GEO) focuses on entity authority, verifiable documentation, and citation in LLM knowledge graphs."
  },
  {
    category: "AI Search",
    q: "Does maintaining an llms.txt file guarantee visibility in AI search answers?",
    a: "No. llms.txt is a clean, machine-readable documentation file for systems that choose to ingest it. It does not act as an algorithmic ranking signal in Google Search, and no technical markup guarantees inclusion in generative AI overviews."
  }
];

// 2. Fetch Articles Dynamically
function getPublishedArticles() {
  try {
    const { getDb, formatBlogRow, FALLBACK_BLOGS } = require('../lib/db-api-handler.js');
    const db = getDb();
    if (db) {
      const rows = db.prepare("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC").all();
      if (rows && rows.length > 0) {
        return rows.map(formatBlogRow).filter(Boolean);
      }
    }
    if (Array.isArray(FALLBACK_BLOGS)) {
      return FALLBACK_BLOGS.filter(b => b.status === 'published');
    }
  } catch (err) {
    console.warn('[Generate LLMs] Warning loading articles from db:', err.message);
  }
  return [];
}

// 3. Render llms.txt
function generateLlmsTxt(articles) {
  let doc = `# Kawaki Studios\n\n`;
  doc += `> ${ENTITY.description}\n\n`;

  doc += `## Core Capabilities\n\n`;
  CAPABILITIES.forEach((c) => {
    doc += `${c.num}. [${c.title}](${c.url}): ${c.desc}\n`;
  });
  doc += `\n`;

  doc += `## About Kawaki Studios\n\n`;
  doc += `Kawaki Studios is an independent digital engineering studio founded and led by ${ENTITY.founder}. The studio bridges thoughtful visual design with disciplined software engineering, delivering bespoke web platforms, modern web applications, e-commerce storefronts, and automated workflows.\n\n`;
  doc += `Based in ${ENTITY.location}, the studio works directly with a select roster of clients globally. We operate without junior account managers or sales intermediaries; every project is architected and executed directly by senior engineering leadership.\n\n`;
  doc += `Our engineering philosophy prioritizes deterministic systems, verifiable performance, sub-second latency, security hygiene, and clean architectural boundaries.\n\n`;

  doc += `## What Kawaki Does\n\n`;
  doc += `We design, develop, and maintain high-performance digital systems across six primary disciplines:\n\n`;
  ENTITY.disciplines.forEach(d => {
    doc += `- **${d}**\n`;
  });
  doc += `\n`;

  doc += `## Core Engineering Services\n\n`;
  CORE_SERVICES.forEach(s => {
    doc += `### ${s.name}\n\n`;
    doc += `**Definition**\n${s.definition}\n\n`;
    doc += `**What Kawaki Delivers**\n`;
    s.delivers.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n**Typical Problems Addressed**\n`;
    s.problemsAddressed.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n**Technical Areas**\n`;
    s.technicalAreas.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n**When This Service Is Appropriate**\n${s.appropriateWhen}\n\n`;
    doc += `**Related Services**\n`;
    s.relatedServices.forEach(u => { doc += `- <${u}>\n`; });
    if (s.relatedResources.length > 0) {
      doc += `\n**Related Resources**\n`;
      s.relatedResources.forEach(u => { doc += `- <${u}>\n`; });
    }
    doc += `\n**Canonical URL**: <${s.url}>\n\n`;
  });

  doc += `## Supporting Web Engineering Services\n\n`;
  SUPPORTING_SERVICES.forEach(s => {
    doc += `### ${s.name}\n`;
    doc += `${s.summary}\n`;
    doc += `**Canonical URL**: <${s.url}>\n\n`;
  });

  doc += `## WordPress Security & Recovery\n\n`;
  doc += `Kawaki Studios provides full-lifecycle incident response and security hardening for compromised WordPress environments. The core service is [WordPress Malware Removal & Recovery](https://www.kawaki.co.in/services/wordpress-malware-removal), supported by specialized forensic services:\n\n`;
  SECURITY_SUB_SERVICES.forEach(s => {
    doc += `### ${s.name}\n`;
    doc += `- **Problem**: ${s.problem}\n`;
    doc += `- **Symptoms**: ${s.symptoms}\n`;
    doc += `- **Scope**: ${s.scope}\n`;
    doc += `- **Canonical URL**: <${s.url}>\n\n`;
  });

  doc += `## Engineering Approach\n\n`;
  doc += `### Web Architecture\n`;
  doc += `We engineer web platforms using clean semantic HTML5, fluid typography via CSS clamp() mathematics, and modern component boundaries. We reject bloated multi-purpose themes in favor of lean, maintainable codebases.\n\n`;
  doc += `### Application Architecture\n`;
  doc += `In web application engineering, we enforce strict server/client execution boundaries. Data access, credential management, and business logic remain strictly isolated on the server; client components are reserved for tactile user events and local UI state.\n\n`;
  doc += `### Performance Engineering\n`;
  doc += `Performance is treated as an architectural constraint, not an afterthought. We optimize for Core Web Vitals (LCP < 1.2s, CLS = 0, INP < 100ms) through critical asset budgeting, self-hosted font subsetting, and GPU-accelerated motion.\n\n`;
  doc += `### AI Automation Architecture\n`;
  doc += `We follow a six-stage orchestration model: Ingestion & Parsing → Deterministic Filtering → Bounded AI Inference → Human Authorization Gate → System Execution & Write → Telemetry & Audit Log. Deterministic rules always precede probabilistic models.\n\n`;
  doc += `### AI Agent Reliability\n`;
  doc += `Our agent architecture framework organizes reliability into three pillars: (1) Evaluation Harnesses, (2) Five-Layer Defense-in-Depth Guardrails (Input, Decision, Tool, Output, Infrastructure) enforced outside the model, and (3) Failure Recovery via classification, exponential backoff with full jitter, and Saga compensation patterns.\n\n`;
  doc += `### Security & Recovery\n`;
  doc += `Security recovery requires root-cause eradication. We verify core checksums, isolate obfuscated backdoors, sanitize database records, and enforce least-privilege permissions to eliminate persistent vectors.\n\n`;
  doc += `### Search Engineering\n`;
  doc += `We construct interconnected Schema.org JSON-LD knowledge graphs linked to a canonical Organization entity, establishing clear authority across search engines and AI answer engines.\n\n`;

  doc += `## AI Automation Deep Dive\n\n`;
  doc += `### What AI Automation Means\n`;
  doc += `AI automation is the integration of machine reasoning into operational business workflows. At Kawaki Studios, automation is never treated as unconstrained model autonomy; it is engineered as governed, bounded software.\n\n`;
  doc += `### Workflow Automation vs. AI Agents\n`;
  doc += `Deterministic workflows route structured data using strict rule engines. AI agents are introduced selectively when unstructured text, ambiguous intent, or dynamic semantic synthesis is required.\n\n`;
  doc += `### Human Approval & Tool Permissions\n`;
  doc += `Agents operate under strict least-privilege API scopes and Zod schema validation. High-consequence mutations (financial transactions, data deletions, security changes) pause asynchronously for human operator sign-off.\n\n`;
  doc += `### Evaluation & Guardrails\n`;
  doc += `Agent capabilities are validated using Evaluation-Driven Development (EDD) across golden datasets and deterministic code assertions. Production systems enforce five layers of deterministic software guardrails outside the model.\n\n`;
  doc += `### Failure Recovery & Observability\n`;
  doc += `Transient errors recover via full-jitter backoff; permanent failures trigger compensating Saga rollbacks. Every action, tool call, and observation is persisted in structured telemetry sinks.\n\n`;
  doc += `**Key Resources**:\n`;
  doc += `- [AI Automation Architecture](https://www.kawaki.co.in/blog/ai-automation-architecture)\n`;
  doc += `- [AI Agent Reliability: Evaluation, Guardrails, and Failure Recovery](https://www.kawaki.co.in/blog/ai-agent-reliability-evaluation)\n`;
  doc += `- [AI Automation vs AI Agents: Architecture, Reliability, and When to Use Each](https://www.kawaki.co.in/blog/ai-automation-vs-ai-agents)\n\n`;

  doc += `## AI Search Optimization Deep Dive\n\n`;
  doc += `### SEO, AEO, and GEO\n`;
  doc += `- **SEO (Search Engine Optimization)**: Optimizes technical crawlability, indexation, site speed, and semantic hierarchy for algorithmic web crawlers.\n`;
  doc += `- **AEO (Answer Engine Optimization)**: Formats factual definitions and concise answers for direct answer extraction by search features.\n`;
  doc += `- **GEO (Generative Engine Optimization)**: Establishes clear entity authority, structured Schema.org graphs, and authoritative documentation to ensure accurate representation in generative AI systems.\n\n`;
  doc += `### Entity Clarity & Structured Data\n`;
  doc += `We link all digital assets to a singular \`https://www.kawaki.co.in/#organization\` node, explicitly defining founder, geographic presence, services, and published articles.\n\n`;
  doc += `### Measurement Limitations\n`;
  doc += `Search engines do not use machine-readable documentation files (such as llms.txt) as direct algorithmic ranking signals. Structured data and machine documentation facilitate accurate indexing, but do not guarantee specific rankings or generative AI inclusions.\n\n`;

  doc += `## Shopify & Commerce Deep Dive\n\n`;
  doc += `### Shopify Development & Custom Themes\n`;
  doc += `We develop lightweight, custom Shopify Liquid themes that eliminate third-party app bloat and maintain fast mobile loading speeds.\n\n`;
  doc += `### Headless Shopify Architecture\n`;
  doc += `For enterprise e-commerce requirements, we decouple frontend presentation using Next.js, querying Shopify's Storefront GraphQL API and utilizing edge caching with automated inventory webhook invalidation.\n\n`;

  doc += `## Published Architecture Guides & Resources\n\n`;
  
  // Categorize articles
  const webEngArticles = articles.filter(a => {
    const slug = a.slug || '';
    return slug.includes('nextjs') || slug.includes('editorial') || slug.includes('webflow') || slug.includes('custom-web') || slug.includes('no-code');
  });
  const aiArticles = articles.filter(a => {
    const slug = a.slug || '';
    return slug.includes('ai-') || slug.includes('automation');
  });
  const shopifyArticles = articles.filter(a => {
    const slug = a.slug || '';
    return slug.includes('shopify');
  });
  const wpSecurityArticles = articles.filter(a => {
    const slug = a.slug || '';
    return slug.includes('wordpress') || slug.includes('security') || slug.includes('keyword-hack') || slug.includes('malware') || slug.includes('spam');
  });

  doc += `### Web Engineering Resources\n\n`;
  webEngArticles.forEach(a => {
    doc += `#### [${a.title}](https://www.kawaki.co.in/blog/${a.slug})\n`;
    doc += `> ${a.excerpt || a.seoDescription}\n\n`;
    doc += `- **Canonical**: https://www.kawaki.co.in/blog/${a.slug}\n`;
    doc += `- **Topic**: ${(a.tags && a.tags[0]) || 'Web Engineering'}\n\n`;
  });

  doc += `### AI Automation Resources\n\n`;
  aiArticles.forEach(a => {
    doc += `#### [${a.title}](https://www.kawaki.co.in/blog/${a.slug})\n`;
    doc += `> ${a.excerpt || a.seoDescription}\n\n`;
    doc += `- **Canonical**: https://www.kawaki.co.in/blog/${a.slug}\n`;
    doc += `- **Topic**: ${(a.tags && a.tags[0]) || 'AI Automation'}\n\n`;
  });

  doc += `### Shopify & Commerce Resources\n\n`;
  shopifyArticles.forEach(a => {
    doc += `#### [${a.title}](https://www.kawaki.co.in/blog/${a.slug})\n`;
    doc += `> ${a.excerpt || a.seoDescription}\n\n`;
    doc += `- **Canonical**: https://www.kawaki.co.in/blog/${a.slug}\n`;
    doc += `- **Topic**: ${(a.tags && a.tags[0]) || 'E-Commerce'}\n\n`;
  });

  if (wpSecurityArticles.length > 0) {
    doc += `### WordPress Security & Recovery Resources\n\n`;
    wpSecurityArticles.forEach(a => {
      doc += `#### [${a.title}](https://www.kawaki.co.in/blog/${a.slug})\n`;
      doc += `> ${a.excerpt || a.seoDescription}\n\n`;
      doc += `- **Canonical**: https://www.kawaki.co.in/blog/${a.slug}\n`;
      doc += `- **Topic**: ${(a.tags && a.tags[0]) || 'WordPress Security'}\n\n`;
    });
  }

  doc += `## Case Studies & Architectural Reference Designs\n\n`;
  doc += `*Note: The following projects represent Architectural Reference Designs and conceptual systems engineered to demonstrate technical capabilities; they are not client engagements.*\n\n`;
  CASE_STUDIES.forEach(cs => {
    doc += `### [${cs.title}](${cs.url})\n`;
    doc += `- **Status**: ${cs.status}\n`;
    doc += `- **Summary**: ${cs.summary}\n`;
    doc += `- **Canonical URL**: <${cs.url}>\n\n`;
  });

  doc += `## Company Entity\n\n`;
  doc += `**Name**: ${ENTITY.name}\n`;
  doc += `**Canonical Website**: ${ENTITY.website}\n`;
  doc += `**Founder**: ${ENTITY.founder} (${ENTITY.role})\n`;
  doc += `**Headquarters**: ${ENTITY.location}\n`;
  doc += `**Primary Disciplines**:\n`;
  ENTITY.disciplines.forEach(d => { doc += `- ${d}\n`; });
  doc += `\n**Verified Profiles**:\n`;
  doc += `- GitHub: <${ENTITY.socials.github}>\n`;
  doc += `- LinkedIn: <${ENTITY.socials.linkedin}>\n`;
  doc += `- Twitter / X: <${ENTITY.socials.twitter}>\n`;
  doc += `- Instagram: <${ENTITY.socials.instagram}>\n\n`;

  doc += `## Entity Relationships\n\n`;
  doc += `- Kawaki Studios → founded by → Kunal Sharma\n`;
  doc += `- Kawaki Studios → provides → Custom Web Development\n`;
  doc += `- Kawaki Studios → provides → Web Application Development\n`;
  doc += `- Kawaki Studios → provides → Shopify Development\n`;
  doc += `- Kawaki Studios → provides → AI Automation\n`;
  doc += `- Kawaki Studios → provides → AI Search Optimization\n`;
  doc += `- Kawaki Studios → provides → WordPress Security & Recovery\n`;
  doc += `- Kawaki Studios → publishes → Technical Architecture Guides\n`;
  doc += `- Kawaki Studios → publishes → Architectural Reference Designs\n\n`;

  doc += `## Geographic Presence\n\n`;
  doc += `Kawaki Studios is based in New Delhi, India. The studio delivers projects and collaborates with clients globally via remote asynchronous engineering workflows. The studio maintains no physical offices outside New Delhi, India.\n\n`;

  doc += `## Frequently Asked Questions\n\n`;
  FAQS.forEach((f, idx) => {
    doc += `### ${f.q}\n`;
    doc += `**Category**: ${f.category}\n\n`;
    doc += `${f.a}\n\n`;
  });

  doc += `## Contact\n\n`;
  doc += `- **Canonical Website**: ${ENTITY.website}\n`;
  doc += `- **General Inquiries**: ${ENTITY.contact.inquiries}\n`;
  doc += `- **Partnerships**: ${ENTITY.contact.partnerships}\n`;
  doc += `- **Project Discovery**: <${ENTITY.contact.formUrl}>\n`;
  doc += `- **Full LLM Context**: https://www.kawaki.co.in/llms-full.txt\n`;

  return doc;
}

// 4. Render llms-full.txt
function generateLlmsFullTxt(articles) {
  let doc = `# Kawaki Studios — Full Machine-Readable Knowledge Base & System Architecture\n\n`;
  doc += `> ${ENTITY.description}\n\n`;
  doc += `> Comprehensive technical documentation of Kawaki Studios: entity definition, engineering capabilities, service architecture, failure recovery protocols, published research, and operational reference models.\n\n`;

  doc += `## 1. Studio Overview & Entity Information\n\n`;
  doc += `- **Entity Name**: ${ENTITY.name}\n`;
  doc += `- **Canonical Website**: ${ENTITY.website}\n`;
  doc += `- **Founder & Creative Direction**: ${ENTITY.founder}\n`;
  doc += `- **Base of Operations**: ${ENTITY.location}\n`;
  doc += `- **Operating Model**: Founder-led engineering studio. All projects are architected and executed directly by senior engineering leadership without account management layers.\n`;
  doc += `- **Contact**: ${ENTITY.contact.inquiries} / ${ENTITY.contact.partnerships}\n`;
  doc += `- **Discovery Form**: ${ENTITY.contact.formUrl}\n`;
  doc += `- **GitHub Repository**: ${ENTITY.socials.github}\n`;
  doc += `- **LinkedIn Company**: ${ENTITY.socials.linkedin}\n`;
  doc += `- **Twitter / X**: ${ENTITY.socials.twitter}\n`;
  doc += `- **Instagram Profile**: ${ENTITY.socials.instagram}\n\n`;

  doc += `## 2. Core Capabilities Matrix\n\n`;
  CAPABILITIES.forEach((c) => {
    doc += `### Capability ${c.num}: ${c.title}\n`;
    doc += `- **Canonical URL**: <${c.url}>\n`;
    doc += `- **Summary**: ${c.desc}\n\n`;
  });

  doc += `## 3. Comprehensive Service Architecture\n\n`;
  CORE_SERVICES.forEach(s => {
    doc += `### Service: ${s.name}\n`;
    doc += `- **URL**: <${s.url}>\n`;
    doc += `- **Core Definition**: ${s.definition}\n\n`;
    doc += `#### Detailed Deliverables\n`;
    s.delivers.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n#### Problem Scenarios Addressed\n`;
    s.problemsAddressed.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n#### Technical Implementations & Patterns\n`;
    s.technicalAreas.forEach(item => { doc += `- ${item}\n`; });
    doc += `\n#### Qualification & Suitability\n`;
    doc += `${s.appropriateWhen}\n\n`;
    doc += `#### Cross-Service Interconnections\n`;
    s.relatedServices.forEach(u => { doc += `- Related Service: <${u}>\n`; });
    s.relatedResources.forEach(u => { doc += `- Technical Guide: <${u}>\n`; });
    doc += `\n---\n\n`;
  });

  doc += `## 4. Supporting Disciplines\n\n`;
  SUPPORTING_SERVICES.forEach(s => {
    doc += `### ${s.name}\n`;
    doc += `- **Canonical URL**: <${s.url}>\n`;
    doc += `- **Scope & Description**: ${s.summary}\n\n`;
  });

  doc += `## 5. WordPress Security, Forensics & Recovery Sub-System\n\n`;
  doc += `The parent recovery discipline is [WordPress Malware Removal](https://www.kawaki.co.in/services/wordpress-malware-removal). Under this parent, Kawaki Studios isolates five distinct threat vectors:\n\n`;
  SECURITY_SUB_SERVICES.forEach(s => {
    doc += `### Threat Vector: ${s.name}\n`;
    doc += `- **Canonical URL**: <${s.url}>\n`;
    doc += `- **Underlying Vulnerability**: ${s.problem}\n`;
    doc += `- **Observable Symptoms**: ${s.symptoms}\n`;
    doc += `- **Remediation Scope**: ${s.scope}\n\n`;
  });

  doc += `## 6. Engineering & Architecture Principles\n\n`;
  doc += `### Principle I: Determinism Precedes Probability\n`;
  doc += `We never introduce an artificial intelligence model where deterministic logic, compiled syntax trees, or database constraints can solve the problem. Probabilistic models are reserved exclusively for unstructured semantic understanding, natural language classification, and adaptive entity extraction.\n\n`;
  doc += `### Principle II: Defense-in-Depth Guardrails\n`;
  doc += `Autonomous systems are enclosed within five deterministic software guardrails enforced outside the model: (1) Input validation, (2) Decision state machines, (3) Tool schema enforcement via Zod, (4) Output boundary checking, and (5) Infrastructure timeouts and token spend budgets.\n\n`;
  doc += `### Principle III: Measurable Performance Engineering\n`;
  doc += `We engineer for strict Core Web Vitals targets: Largest Contentful Paint under 1.2 seconds, Cumulative Layout Shift of 0.00, and Interaction to Next Paint under 100 milliseconds. Every kilobyte of client JavaScript is budgeted.\n\n`;
  doc += `### Principle IV: Full Client Code Ownership\n`;
  doc += `Clients retain 100% intellectual property ownership of the source code, architecture documentation, and design assets upon milestone settlement. We build with open, standard web technologies without proprietary runtime lock-in.\n\n`;

  doc += `## 7. AI Automation & Agent Reliability Architecture\n\n`;
  doc += `### The Six-Stage Automation Pipeline\n`;
  doc += `\`\`\`\n`;
  doc += `[Stage 01: Ingestion & Parsing]       -> Webhooks, API events, inbound documents received and validated.\n`;
  doc += `[Stage 02: Deterministic Filtering]   -> Rule-based routing filters standard actions without LLM inference.\n`;
  doc += `[Stage 03: Bounded AI Inference]      -> Task-specific model processes unstructured semantics.\n`;
  doc += `[Stage 04: Human Authorization Gate]  -> High-consequence mutations pause for human operator approval.\n`;
  doc += `[Stage 05: System Execution & Write]  -> Payloads committed to CRM/ERP/DB with idempotency keys.\n`;
  doc += `[Stage 06: Telemetry & Audit Log]     -> Execution trace, token usage, latency persisted for compliance.\n`;
  doc += `\`\`\`\n\n`;
  doc += `### Mathematical Agent Evaluation & The pass@k Metric\n`;
  doc += `In research literature, pass@k measures whether at least one out of k generated samples passes offline tests:\n`;
  doc += `pass@k := E [ 1 - (binom(n-c, k) / binom(n, k)) ]\n`;
  doc += `For live side-effecting workflows, single-attempt success is more directly relevant than pass@k, but production reliability requires multi-dimensional tracking: Task Completion Rate (TCR), Invariant Violation Rate, recovery convergence, observability, and bounded execution budgets.\n\n`;

  doc += `## 8. Published Technical Research & Architecture Guides\n\n`;
  articles.forEach(a => {
    doc += `### [${a.title}](https://www.kawaki.co.in/blog/${a.slug})\n`;
    doc += `- **Canonical URL**: https://www.kawaki.co.in/blog/${a.slug}\n`;
    doc += `- **Author**: ${a.author || 'Kunal Sharma'}\n`;
    doc += `- **Primary Topics**: ${(a.tags || []).join(', ')}\n`;
    doc += `- **Executive Summary**: ${a.excerpt || a.seoDescription}\n`;
    doc += `- **Key Concepts**: ${a.seoKeywords || ''}\n\n`;
  });

  doc += `## 9. Architectural Reference Designs (Case Studies)\n\n`;
  doc += `*Clarification: The following projects are Architectural Reference Designs engineered to demonstrate full-stack technical craft; they are not client commercial engagements.*\n\n`;
  CASE_STUDIES.forEach(cs => {
    doc += `### Reference Design: ${cs.title}\n`;
    doc += `- **Canonical URL**: <${cs.url}>\n`;
    doc += `- **Designation**: ${cs.status}\n`;
    doc += `- **Detailed Blueprint**: ${cs.summary}\n\n`;
  });

  doc += `## 10. Comprehensive Frequently Asked Questions\n\n`;
  FAQS.forEach(f => {
    doc += `### Q: ${f.q}\n`;
    doc += `**Domain**: ${f.category}\n\n`;
    doc += `${f.a}\n\n`;
  });

  doc += `## 11. Geographic & Operational Declarations\n\n`;
  doc += `- **Physical Base**: New Delhi, India.\n`;
  doc += `- **Service Radius**: Global delivery via remote asynchronous collaboration.\n`;
  doc += `- **Office Footprint**: Kawaki Studios operates as a focused studio without secondary branch offices or remote international physical locations.\n\n`;

  doc += `## 12. Contact & Engagement Protocol\n\n`;
  doc += `- **Official Website**: ${ENTITY.website}\n`;
  doc += `- **Client Communication**: ${ENTITY.contact.inquiries}\n`;
  doc += `- **Partnership Outreach**: ${ENTITY.contact.partnerships}\n`;
  doc += `- **Discovery Scheduling**: <${ENTITY.contact.formUrl}>\n`;

  return doc;
}

// 5. Main Execution
function generateLlms(articles = null) {
  if (!articles) {
    articles = getPublishedArticles();
  }

  const llmsTxtContent = generateLlmsTxt(articles);
  const llmsFullTxtContent = generateLlmsFullTxt(articles);

  const publicDir = path.resolve(__dirname, '..', 'public');
  const llmsPath = path.resolve(publicDir, 'llms.txt');
  const llmsFullPath = path.resolve(publicDir, 'llms-full.txt');

  fs.writeFileSync(llmsPath, llmsTxtContent, 'utf8');
  fs.writeFileSync(llmsFullPath, llmsFullTxtContent, 'utf8');

  const llmsLines = llmsTxtContent.split('\n').length;
  const llmsFullLines = llmsFullTxtContent.split('\n').length;
  const llmsBytes = Buffer.byteLength(llmsTxtContent, 'utf8');
  const llmsFullBytes = Buffer.byteLength(llmsFullTxtContent, 'utf8');

  console.log(`✓ Generated public/llms.txt (${llmsLines} lines, ${llmsBytes} bytes)`);
  console.log(`✓ Generated public/llms-full.txt (${llmsFullLines} lines, ${llmsFullBytes} bytes)`);

  return {
    llmsLines,
    llmsBytes,
    llmsFullLines,
    llmsFullBytes
  };
}

if (require.main === module) {
  generateLlms();
}

module.exports = {
  generateLlms,
  generateLlmsTxt,
  generateLlmsFullTxt,
  ENTITY,
  CAPABILITIES,
  CORE_SERVICES,
  SUPPORTING_SERVICES,
  SECURITY_SUB_SERVICES,
  CASE_STUDIES,
  FAQS
};
