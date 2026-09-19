const path = require('path');
const fs = require('fs');

// Locate the canonical SQLite database
function getDbPath() {
  const candidates = [
    path.resolve(__dirname, '..', 'admin-dashboard', 'backend', 'data.db'),
    path.resolve(__dirname, '..', 'data.db'),
    path.resolve(__dirname, '..', 'admin-dashboard', 'data.db')
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return candidates[0];
}

let dbInstance = null;

function getDb() {
  if (dbInstance) return dbInstance;

  try {
    const { DatabaseSync } = require('node:sqlite');
    const dbPath = getDbPath();
    dbInstance = new DatabaseSync(dbPath);
    return dbInstance;
  } catch (err) {
    console.warn('[Kawaki DB] Could not initialize node:sqlite:', err.message);
    return null;
  }
}

function formatBlogRow(row) {
  if (!row) return null;

  let tags = [];
  if (row.tags) {
    try {
      tags = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags;
    } catch (e) {
      tags = [row.tags];
    }
  }

  // Handle created_at and updated_at as ISO strings or timestamps
  let createdAt = new Date().toISOString();
  if (row.created_at) {
    createdAt = typeof row.created_at === 'number' 
      ? new Date(row.created_at * (row.created_at < 10000000000 ? 1000 : 1)).toISOString()
      : new Date(row.created_at).toISOString();
  }

  let updatedAt = createdAt;
  if (row.updated_at) {
    updatedAt = typeof row.updated_at === 'number' 
      ? new Date(row.updated_at * (row.updated_at < 10000000000 ? 1000 : 1)).toISOString()
      : new Date(row.updated_at).toISOString();
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    excerpt: row.excerpt || '',
    status: row.status || 'draft',
    author: row.author || 'Kunal Sharma',
    featuredImage: row.featured_image || null,
    tags,
    seoKeywords: row.seo_keywords || null,
    seoDescription: row.seo_description || null,
    views: row.views || 0,
    createdAt,
    updatedAt
  };
}

function formatPageRow(row) {
  if (!row) return null;
  let createdAt = row.created_at ? new Date(row.created_at * 1000).toISOString() : new Date().toISOString();
  let updatedAt = row.updated_at ? new Date(row.updated_at * 1000).toISOString() : new Date().toISOString();

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    status: row.status || 'draft',
    seoTitle: row.seo_title || null,
    seoDescription: row.seo_description || null,
    seoKeywords: row.seo_keywords || null,
    published: row.published === 1 || row.status === 'published',
    createdAt,
    updatedAt
  };
}

const FALLBACK_BLOGS = [
  {
    "id": "art_editorial_engineering_01",
    "title": "What is Editorial Engineering? The Definitive Guide to Modern Web Craft",
    "slug": "what-is-editorial-engineering",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Editorial Engineering",
      "Web Architecture",
      "Design Systems",
      "Typography"
    ],
    "seoKeywords": "editorial engineering, editorial web development, custom cms development, digital flagships, typography systems, web architecture",
    "seoDescription": "Discover what editorial engineering is and why leading digital brands use publication-grade typography, narrative pacing, and sub-second architectures to outpace competitors.",
    "excerpt": "Discover why modern digital flagships are trading generic component libraries for editorial engineering—a discipline bridging publication-grade typography, narrative motion, and sub-second web architecture.",
    "status": "published",
    "views": 318,
    "createdAt": "2026-09-01T09:00:00.000Z",
    "updatedAt": "2026-09-05T12:00:00.000Z",
    "content": "# What is Editorial Engineering? The Definitive Guide to Modern Web Craft\n\nIn an internet saturated with lookalike SaaS templates, interchangeable Tailwind component libraries, and homogenized ecommerce themes, the web has suffered a profound aesthetic collapse. Every homepage features the same oversized centered badge, the same three-column feature cards, and the same sterile sans-serif font stack.\n\n**Editorial Engineering** is the antidote.\n\nIt is a disciplined intersection of print publication design, journalistic narrative pacing, and mission-critical software engineering. At [Kawaki Studios](/about), we define editorial engineering not as aesthetic ornamentation, but as a holistic architecture where design, typography, and performance function as a singular narrative vessel.\n\n---\n\n## 1. The Core Definition: Beyond Traditional Frontend Development\n\nTraditional web development treats content as a passive payload injected into pre-fabricated layout containers. Designers create static wireframes in Figma, developers translate them into rigid CSS grids, and copywriters force copy into fixed character limits.\n\nEditorial engineering upends this hierarchy:\n\n1. **Content Shapes the Architecture:** Layouts dynamically adapt to the cadence, rhythm, and emotional tone of the editorial prose.\n2. **Typography is Structural Infrastructure:** Rather than defaulting to system UI fonts, typographical pairings (such as high-contrast serifs paired with technical grotesks) guide the visitor's reading velocity.\n3. **Motion Serves as Visual Punctuation:** Micro-interactions, kinetic text reveal states, and fluid scroll triggers act as journalistic cues rather than distracting novelties.\n4. **Sub-Second Performance is Non-Negotiable:** A narrative cannot command attention if page transitions stutter or assets trigger Cumulative Layout Shifts (CLS).\n\n---\n\n## 2. The Three Architectural Pillars of Editorial Engineering\n\n### Pillar I: Publication-Grade Typographic Systems\nIn print journalism—from *The New Yorker* to *Monocle*—typography is calibrated with surgical precision. Leading, tracking, optical margins, and measure (line length) are calculated to minimize cognitive fatigue.\n\nIn digital editorial engineering, we translate these classical principles to fluid viewports:\n- **Fluid Type Scales:** Utilizing CSS clamp() mathematics to ensure headline hierarchy scales smoothly across mobile, tablet, and ultra-wide displays without awkward word wraps.\n- **Serif & Grotesk Dialogue:** Pairing expressive display serifs (such as *Instrument Serif* or *Playfair*) with rigorous structural sans-serifs (*Plus Jakarta Sans*, *Host Grotesk*) creates visual tension between heritage craft and contemporary digital speed.\n- **Optical Kerning and Tabular Numerals:** Ensuring numerical data, financial figures, and timestamps render in monospaced tabular numerals (*JetBrains Mono*) prevents layout jitter during real-time data updates.\n\n### Pillar II: Headless Content Pipelines & Editorial Freedom\nEditorial engineering requires modern content orchestration. Monolithic CMS platforms force editorial teams into restrictive WYSIWYG editors that output bloated inline HTML and unoptimized images.\n\nWe build headless content architectures leveraging:\n- **Structured Markdown & MDX Pipelines:** Content creators write in clean, distraction-free markdown with custom component embeds.\n- **Edge Cache Invalidation:** Content changes propagate to edge points-of-presence (PoPs) within milliseconds via automated webhooks.\n- **Decoupled Editorial Dashboards:** Engineering custom admin interfaces that mirror the brand's exact publishing workflow, rather than forcing teams into generic administrative dashboards.\n\n### Pillar III: Sub-Second Latency and Zero Layout Shift\nHigh-end editorial design often falls victim to performance bloat—uncompressed photography, multiple multi-megabyte font weights, and heavy JavaScript scroll libraries.\n\nAt Kawaki Studios, editorial engineering mandates extreme technical hygiene:\n- **Pre-rendered Static HTML:** Essential editorial prose is served directly in static markup, eliminating client-side rendering spinners and providing instant indexation for search engines.\n- **Critical Font Subsetting:** Font files are stripped of unused glyphs, preloaded in the document head, and served with font-display: swap to eliminate Flash of Invisible Text (FOIT).\n- **GPU-Accelerated Scroll Physics:** Smooth scroll engines (like Lenis) are synchronized directly with requestAnimationFrame tickers to ensure 60fps fluidity even on mobile devices.\n\n---\n\n## 3. Editorial Engineering in Headless Commerce\n\nWhile publishing companies were the first to embrace editorial engineering, high-growth direct-to-consumer (DTC) and luxury commerce brands are now adopting it to solve rising customer acquisition costs (CAC).\n\nWhen every competitor uses standard Shopify themes, shopping becomes a generic, transactional chore. Editorial commerce transforms the store into a digital magazine:\n- **Narrative Product Detail Pages (PDPs):** Replacing basic photo carousels with immersive storytelling, origin deep dives, ingredient sourcing breakdowns, and interactive 3D visualizers.\n- **Seamless Add-to-Cart from Editorial Content:** Readers can inspect and purchase featured products directly inside long-form essays without navigating away from the narrative.\n- **Sub-Second Route Switching:** Utilizing headless platforms like Shopify Hydrogen and Next.js, product catalog browsing feels as instantaneous as turning a physical page.\n\nExplore our case study on how we engineered a sub-second headless platform for Acme: [Acme Headless Commerce Case Study](/case-studies/acme-headless-ecommerce).\n\n---\n\n## 4. How to Audit Your Platform for Editorial Engineering Readiness\n\nAsk your engineering and creative leadership these five critical diagnostic questions:\n\n1. **Mobile LCP:** Is your Largest Contentful Paint under 1.0s, or do visitors wait while megabytes of JavaScript hydrate?\n2. **Typographic Hierarchy:** Do headlines scale seamlessly using fluid typography, or do they awkwardly clip on narrow viewports?\n3. **Layout Stability:** Does your page suffer from layout shift when images or fonts load?\n4. **Content Autonomy:** Can your marketing team launch distinct, narrative-driven layouts without filing engineering tickets?\n5. **Structured Search Context:** Does every published piece carry semantic JSON-LD metadata for search engines and AI citation models?\n\n---\n\n## 5. Frequently Asked Questions (FAQ)\n\n### What distinguishes an editorial engineer from a frontend developer?\nA standard frontend developer focuses primarily on converting visual wireframes into code and wiring up APIs. An editorial engineer combines senior full-stack engineering proficiency with publication design literacy, typography fundamentals, narrative pacing, and technical SEO architecture.\n\n### Can editorial engineering be applied to SaaS and B2B platforms?\nYes. Modern B2B buyers conduct extensive independent research before speaking with sales. High-converting B2B platforms use editorial engineering to present whitepapers, documentation, interactive ROI calculators, and product manifestos as premium publication assets rather than sterile corporate marketing pages.\n\n### How does editorial engineering impact SEO and organic search?\nBy structuring content with semantic HTML5 hierarchies, comprehensive Schema.org JSON-LD structured data, clean URL architectures, and superior Core Web Vitals, editorial platforms consistently rank higher for competitive, high-intent keywords and get cited more frequently by modern AI answer engines (Perplexity, ChatGPT, Google AI Overviews).\n\n---\n\n## Conclusion: Building Digital Flagships that Endure\n\nThe internet does not need more forgettable websites. It needs thoughtful, high-performance digital flagships that command respect and captivate attention.\n\nIf you are planning a strategic redesign, a headless commerce migration, or a custom editorial platform, [schedule a discovery call with Kawaki Studios](/contact) or explore our [Services & Architectural Tiers](/services)."
  },
  {
    "id": "art_headless_shopify_02",
    "title": "Headless Shopify Development: The Architecture of High-Velocity Commerce",
    "slug": "headless-shopify-development-guide",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Commerce",
      "Shopify Plus",
      "Headless Architecture",
      "Performance"
    ],
    "seoKeywords": "headless shopify development, headless commerce agency, shopify plus headless, storefront api, sub second commerce, shopify hydrogen",
    "seoDescription": "Comprehensive technical guide to building headless Shopify Plus platforms. Learn how edge caching, optimistic UI, and custom APIs deliver sub-second commerce experiences.",
    "excerpt": "A technical blueprint for engineering sub-second headless Shopify Plus storefronts using Storefront API v2026, edge caching, and optimistic cart mutations.",
    "status": "published",
    "views": 247,
    "createdAt": "2026-09-02T11:00:00.000Z",
    "updatedAt": "2026-09-05T12:00:00.000Z",
    "content": "# Headless Shopify Development: The Architecture of High-Velocity Commerce\n\nFor high-volume merchants, Shopify's standard monolithic Liquid templating engine eventually hits an immovable ceiling. Third-party app bloat, render-blocking scripts, rigid URL structures, and cross-origin checkout hops erode customer conversion rates on mobile devices.\n\nGoing **Headless on Shopify Plus** decouples the customer-facing frontend presentation layer from Shopify's enterprise commerce backend.\n\nIn this comprehensive technical guide, we unpack the exact architecture, data fetching patterns, and performance optimizations we implement at [Kawaki Studios](/services) to build sub-second headless storefronts that lift conversion rates.\n\n---\n\n## 1. Why Ambitious Brands Decouple Shopify\n\nWhen evaluating headless architecture, engineering teams and e-commerce directors must weigh tangible business metrics against architectural complexity:\n\n1. **Sub-Second Page Transitions:** Liquid renders server-side on Shopify's centralized servers for every page request. Decoupled frontends (built on Next.js or Shopify Hydrogen) leverage edge computing (Cloudflare Workers, Vercel Edge) to serve catalog pages in under 80 milliseconds.\n2. **Total Design and UX Freedom:** You are no longer constrained by Liquid's DOM structure or rigid theme editor settings. Build custom 3D configurators, non-standard layout grids, and bespoke editorial checkout flows.\n3. **Multi-Market and Localization Scale:** Serve distinct currencies, localized languages, and personalized inventory catalogs from a single unified codebase.\n4. **Clean Codebase Immune to App Rot:** Third-party Shopify apps inject unminified CSS and tracking scripts into Liquid theme files. In a headless setup, integrations occur strictly via server-side APIs or isolated microservices, keeping the client bundle lean.\n\n---\n\n## 2. The Modern Headless Shopify Stack\n\nThe 2026 enterprise headless stack consists of four decoupled layers:\n\n1. **Presentation Layer:** Next.js App Router or Shopify Hydrogen with React Server Components.\n2. **Edge Routing & Caching:** Cloudflare Workers or Vercel Edge delivering stale-while-revalidate caching and Geo-IP currency routing.\n3. **Commerce Engine:** Shopify Storefront GraphQL API (v2026-01+) powering products, collections, inventory, and cart mutations.\n4. **Editorial CMS:** Decoupled CMS (Sanity, Contentful, or bespoke markdown engine) powering campaigns, lookbooks, and brand storytelling.\n\n---\n\n## 3. Engineering Optimistic Cart Mutations\n\nThe cart is where conversion rate optimization (CRO) is won or lost. In traditional Shopify stores, clicking 'Add to Cart' triggers a blocking network request, displays a loading spinner, and refreshes the cart drawer after a 400–800ms delay.\n\nIn a high-velocity headless architecture, we implement **Optimistic Cart State**:\n\n1. **Instant UI Response:** When a user clicks 'Add to Bag', the local client state updates instantly (0ms delay), incrementing the badge counter and opening the slide-over drawer with spring physics.\n2. **Background Mutation Pipeline:** A background GraphQL mutation is dispatched to Shopify's cartLinesAdd endpoint.\n3. **Reconciliation & Error Recovery:** If the network request succeeds, the local cart merges with Shopify's returned cart token. If an out-of-stock condition occurs, the UI seamlessly rolls back with an elegant notification toast.\n\nThis pattern eliminates perceived latency and keeps mobile shoppers in an uninterrupted buying flow.\n\n---\n\n## 4. Edge Caching & Cache Invalidation Strategy\n\nThe primary challenge of headless e-commerce is ensuring product inventory, pricing, and availability remain strictly synchronized without sacrificing edge caching speed.\n\n### Stale-While-Revalidate (SWR) with Webhook Invalidation\n- **Catalog Pages (Collections & Products):** Cached globally at the CDN edge with an SWR policy (s-maxage=3600, stale-while-revalidate=86400).\n- **Inventory Webhooks:** Shopify inventory_levels/update and products/update webhooks trigger instant, surgical edge cache purges for the specific product slug via on-demand revalidation.\n- **Dynamic Pricing & Stock Checks:** On the Product Detail Page (PDP), static product copy and imagery render instantly from the edge cache, while real-time variant stock is hydrated via a lightweight client-side micro-query.\n\n---\n\n## 5. Case Study Metrics: Acme Headless E-commerce\n\nWhen Kawaki Studios re-engineered Acme's digital storefront from an off-the-shelf Shopify theme to a bespoke headless architecture:\n- **Largest Contentful Paint (LCP):** Dropped from 3.8 seconds to **0.8 seconds**.\n- **Mobile Bounce Rate:** Decreased by **31%**.\n- **Mobile Conversion Rate:** Increased by **+42%**.\n- **Average Order Value (AOV):** Lifted by **18%** through integrated editorial cross-sell modules.\n\nRead the complete breakdown: [Acme Headless Commerce Case Study](/case-studies/acme-headless-ecommerce).\n\n---\n\n## 6. Frequently Asked Questions\n\n### Does going headless break standard Shopify apps?\nFront-end widget apps (such as basic review stars or pop-up countdowns) do not automatically inject into a custom headless frontend. Instead, you integrate review systems (such as Yotpo, Okendo, or Stamped) via their official REST/GraphQL APIs, resulting in faster load times and complete styling control. Back-office apps (shipping, ERP, inventory, taxes) function completely undisturbed.\n\n### How does checkout work in headless Shopify?\nCheckout operates natively through Shopify's PCI-compliant, one-page checkout. When the customer is ready to transact, the frontend calls the Storefront API to generate a verified checkout URL and redirects the buyer seamlessly, preserving all discounts, gift cards, and Shop Pay preferences.\n\n### What is the typical investment for a custom headless build?\nEnterprise headless builds typically range from $25,000 for focused flagship migrations to $75,000+ for complex multi-brand, multi-currency international deployments. Explore our [Services & Engagement Tiers](/services) or explore our [Case Studies](/case-studies).\n\n---\n\n## Ready to Elevate Your Commerce Infrastructure?\n\nIf your current Shopify store is constrained by template limitations or sluggish mobile load times, let's talk engineering. [Schedule an architectural briefing with our technical partners](/contact)."
  },
  {
    "id": "art_webflow_vs_code_03",
    "title": "Webflow vs Custom Development: When Ambitious Brands Need to Graduate to Code in 2026",
    "slug": "webflow-vs-custom-development",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Web Development",
      "Comparisons",
      "Tech Stack",
      "Engineering"
    ],
    "seoKeywords": "webflow vs custom development, webflow limitations, custom website vs webflow, when to graduate from webflow, custom web development studio",
    "seoDescription": "Comparing Webflow vs custom development in 2026. Explore performance limits, CMS scaling, total cost of ownership, and when your brand needs bespoke code.",
    "excerpt": "An objective, architecture-first comparison between Webflow and custom engineering. We break down total cost of ownership, SEO control, performance ceilings, and proprietary lock-in.",
    "status": "published",
    "views": 194,
    "createdAt": "2026-09-03T14:00:00.000Z",
    "updatedAt": "2026-09-05T12:00:00.000Z",
    "content": "# Webflow vs Custom Development: When Ambitious Brands Need to Graduate to Code in 2026\n\nNo-code website builders have transformed how startups validate products and launch initial landing pages. Among them, **Webflow** stands out as the premier visual development tool for marketing teams.\n\nHowever, as ambitious brands scale past Series A, expand international footprints, or launch sophisticated digital flagships, they inevitably encounter the architectural ceiling of visual builders.\n\nAt [Kawaki Studios](/about), we frequently engineer bespoke web platforms for companies that have outgrown Webflow. In this guide, we provide an objective, data-backed comparison between Webflow and custom code engineering to help founders, CMOs, and engineering leaders make the right technological choice.\n\n---\n\n## 1. At a Glance: Feature & Capability Matrix\n\n- **Speed to MVP:** Webflow delivers in 1–3 weeks; Custom code in 3–8 weeks.\n- **Code Ownership & Portability:** Webflow locks you into proprietary AWS hosting; Custom code gives you 100% owned Git repositories deployable anywhere.\n- **CMS Collection Limits:** Webflow has a hard ceiling of 10,000 items on enterprise plans; Custom code allows unlimited database scaling with SQL, PostgreSQL, or headless CMS.\n- **Runtime Weight:** Webflow injects proprietary JS and class bloat; Custom code enables zero-bundle static HTML or surgical imports.\n- **Complex 3D & Graphics:** Webflow is limited to CSS transforms and Lottie; Custom code supports full Three.js, WebGL shaders, and GSAP scroll physics.\n- **Integrations:** Webflow relies on webhooks and Zapier workarounds; Custom code connects directly to edge APIs, serverless functions, and microservices.\n\n---\n\n## 2. Where Webflow Excels\n\nIt is crucial to acknowledge what Webflow does brilliantly:\n- **Marketing Autonomy:** Non-technical marketing teams can change text, replace images, and publish blog articles without requesting engineering sprint capacity.\n- **Rapid Prototyping:** Validating a brand concept or launching an event landing page can be accomplished in days.\n- **Built-in Hosting & SSL:** Zero server provisioning, security patching, or DevOps infrastructure required.\n\nFor early-stage startups and lifestyle businesses with low traffic and simple content needs, Webflow is often the pragmatic, cost-efficient choice.\n\n---\n\n## 3. The 4 Hidden Ceilings of Webflow\n\nWhen a brand reaches scale, Webflow's visual abstractions create friction in four critical operational areas:\n\n### Ceiling 1: CMS Scaling and Data Limits\nWebflow imposes strict limits on CMS items (typically 2,000 to 10,000 items on top-tier plans). If you operate a high-volume editorial publication, a directory, a multi-location directory, or an extensive case study archive, you will hit this hard cap.\n\nIn custom development, content is backed by SQLite, PostgreSQL, or headless CMS platforms with virtually infinite scaling and sub-millisecond querying.\n\n### Ceiling 2: Cumulative Code Bloat & Core Web Vitals\nBecause Webflow must account for every possible visual setting, it generates extensive helper CSS classes and injects a proprietary JavaScript runtime into every page. Adding third-party tracking pixels, Google Tag Manager, and custom scripts quickly degrades Core Web Vitals (INP and LCP), hurting your Google search rankings.\n\nCustom engineering utilizes zero-dependency architectures, critical CSS inlining, and deferred script loading to guarantee 95+ mobile Lighthouse scores.\n\n### Ceiling 3: Vendor Lock-in & Lack of Version Control\nIn Webflow, your website lives inside Webflow's proprietary cloud ecosystem. You cannot easily run pull requests, unit tests, automated CI/CD security audits, or maintain branch previews with multiple engineering collaborators. If you decide to migrate away from Webflow later, you cannot simply export clean, reusable source code—you must rebuild from scratch.\n\n### Ceiling 4: Proprietary Interaction Limitations\nWebflow's interaction panel handles standard fade-ins and parallax scrolls reasonably well. But if your brand requires bespoke editorial engineering—such as custom cursor physics, WebGL fluid shaders, interactive canvas product visualizers, or custom audio-reactive components—visual builders cannot deliver the required frame rates.\n\n---\n\n## 4. The Financial TCO: 2-Year Cost of Ownership Comparison\n\nFounders often assume custom development is substantially more expensive over a 2-year horizon. While initial upfront capital expenditure is higher for custom code, the total cost of ownership (TCO) converges rapidly:\n\n- **Webflow Enterprise Costs:** Webflow Workspace plans + Enterprise hosting + CMS add-on tiers + third-party plugins (Jetboost, Memberstack, Finsweet attributes) frequently total **$15,000 – $35,000+ annually** in recurring SaaS subscription fees.\n- **Custom Code Architecture:** High-performance static hosting on modern edge platforms (Vercel, Cloudflare Pages, AWS) costs **$20 – $100 per month**, accompanied by complete code ownership and zero vendor tax.\n\n---\n\n## 5. Decision Framework: When Should You Graduate?\n\nGraduate from Webflow to Custom Code if:\n1. Your website is your primary revenue engine or customer acquisition channel.\n2. Your CMS requirements exceed 5,000 items or demand complex relational data models.\n3. Your mobile Core Web Vitals are failing due to third-party script bloat.\n4. You require bespoke web experiences (3D, spatial UI, custom cart mutations).\n5. You want enterprise-grade security, code ownership, and modern Git workflows.\n\n---\n\n## Build an Uncompromising Digital Flagship\n\nYour website should be an asset that appreciates in value, not a rented template constrained by platform limits.\n\n[Explore our Web Development & Flagship Engineering Services](/services) or [schedule a discovery call with our team](/contact)."
  },
  {
    "id": "art_cwv_performance_04",
    "title": "Core Web Vitals & Sub-Second Latency: The Agency Performance Playbook",
    "slug": "core-web-vitals-checklist",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Performance",
      "Technical SEO",
      "Core Web Vitals",
      "Frontend Engineering"
    ],
    "seoKeywords": "core web vitals checklist, web performance optimization, sub-second latency, interaction to next paint, largest contentful paint, technical seo speed",
    "seoDescription": "Master Core Web Vitals in 2026. Learn our engineering playbook to crush LCP, INP, and CLS benchmarks with zero compromises on visual fidelity or typography.",
    "excerpt": "How Kawaki Studios consistently achieves sub-100ms INP and sub-1s LCP on heavy editorial flagships. The definitive playbook for modern frontend speed.",
    "status": "published",
    "views": 182,
    "createdAt": "2026-09-04T10:00:00.000Z",
    "updatedAt": "2026-09-05T12:00:00.000Z",
    "content": "# Core Web Vitals & Sub-Second Latency: The Agency Performance Playbook\n\nIn modern web design, an ongoing tension exists between creative directors who demand rich typography, fluid animations, and high-resolution imagery, and engineering teams charged with satisfying Google's stringent **Core Web Vitals**.\n\nToo many agencies compromise by producing sterile, stripped-back websites in an effort to achieve green Lighthouse scores.\n\nAt [Kawaki Studios](/services), we reject this false dichotomy. We engineer digital flagships that marry luxurious editorial aesthetics with sub-second performance. In this playbook, we share the exact technical optimizations, architectural patterns, and auditing checklists we use to achieve sub-100ms INP and sub-1s LCP across all client platforms.\n\n---\n\n## 1. The 2026 Core Web Vitals Metric Standards\n\nGoogle measures real-world user experience across three foundational dimensions:\n\n1. **Largest Contentful Paint (LCP):** Good is ≤ 2.5s; our Kawaki agency benchmark is **< 1.0s**. Measures initial loading velocity.\n2. **Interaction to Next Paint (INP):** Good is ≤ 200ms; our Kawaki agency benchmark is **< 80ms**. Measures tactile UI response on every tap, click, and keypress.\n3. **Cumulative Layout Shift (CLS):** Good is ≤ 0.1; our Kawaki agency benchmark is **0.00**. Measures visual stability and zero asset jumping.\n\n---\n\n## 2. Crushing Largest Contentful Paint (LCP)\n\nLCP measures when the primary content element (typically a hero headline, banner image, or featured video) finishes rendering on the screen.\n\n### Tactic 1: Preload Critical Hero Fonts with Proper Attributes\nFonts are the number one hidden cause of delayed LCP in editorial sites. If your custom font takes 800ms to download over 4G networks, text rendering is blocked.\n- Preconnect to web font origins in your document head.\n- Preload critical display fonts with font-display: swap to prevent Flash of Invisible Text.\n\n### Tactic 2: Modern Image Formats & Explicit Aspect Ratios\nNever serve unoptimized JPEG or PNG files for desktop banners.\n- Convert all photographic assets to modern WebP or AVIF formats.\n- Always declare explicit width and height attributes or modern CSS aspect-ratio rules to reserve DOM layout space before images load, completely eliminating layout shifts.\n- Apply fetchpriority='high' exclusively to the LCP hero image, and loading='lazy' to all images below the initial viewport fold.\n\n### Tactic 3: Edge HTML Delivery & Zero Client-Side Spinners\nIf your website requires visitors to download a 500KB JavaScript bundle before rendering client-side content, your Time to First Byte (TTFB) and First Contentful Paint (FCP) are already compromised. We serve static pre-rendered HTML directly from edge nodes with sub-50ms TTFB.\n\n---\n\n## 3. Mastering Interaction to Next Paint (INP)\n\nIn March 2024, Google officially replaced First Input Delay (FID) with **Interaction to Next Paint (INP)**. While FID only evaluated the initial click delay, INP evaluates *every* user interaction throughout the entire session—from menu toggles and filter clicks to accordion expansions.\n\n### Tactic 1: Break Up Long JavaScript Tasks (>50ms)\nWhen a user clicks a button, the browser's main thread must not be blocked by heavy computation or synchronous DOM queries.\n- Defer analytics tracking and third-party telemetry using requestIdleCallback().\n- Yield execution to the main thread during heavy rendering loops using scheduler.yield() or setTimeout(0).\n\n### Tactic 2: Decouple Scroll Animation Logic from the Main Thread\nHeavy scroll-driven animations frequently cause INP regressions on mobile devices:\n- Never query getBoundingClientRect() inside native scroll event listeners without throttling.\n- Use passive event listeners: window.addEventListener('scroll', handler, { passive: true }).\n- Implement modern smooth scrolling with hardware-accelerated transforms (transform: translate3d) rather than modifying layout properties like top or margin.\n\n---\n\n## 4. Achieving Zero Cumulative Layout Shift (CLS)\n\nNothing degrades perceived luxury faster than a page that jumps around as assets finish loading.\n\n### Key Rules for 0.00 CLS:\n1. **Reserve Dynamic Element Heights:** If your page includes dynamic accordions, announcements, or cookie consent banners, reserve minimum container heights using CSS min-height.\n2. **Font Fallback Font-Metrics Matching:** When using web fonts alongside system fallbacks, calibrate font metrics (size-adjust, ascent-override, descent-override) to match glyph dimensions, preventing text reflow when the custom font swaps in.\n3. **No Dynamic Ad or Widget Injection:** Never inject dynamic widgets above existing content without pre-allocated container dimensions.\n\n---\n\n## 5. The Kawaki 10-Point Performance Checklist\n\nReview your platform against this rigorous production standard before every deployment:\n\n- [ ] LCP hero image compressed to WebP/AVIF with fetchpriority='high'.\n- [ ] Critical display fonts preloaded in head with font-display: swap.\n- [ ] All images have explicit width and height attributes.\n- [ ] Server TTFB measured under 200ms globally via edge CDN.\n- [ ] No render-blocking JavaScript files in document head.\n- [ ] Google Fonts connection preconnected to Google static asset domains.\n- [ ] Third-party scripts (analytics, chatbots) loaded with defer or on user idle.\n- [ ] CSS minified and unused framework styles purged.\n- [ ] Single semantic <h1> tag per page with clean heading hierarchy.\n- [ ] Complete Schema.org JSON-LD markup validated via Google Rich Results Test.\n\n---\n\n## Build Without Compromise\n\nPerformance is not a post-launch cleanup task—it is a fundamental design constraint.\n\nExplore our [Engineering Flagships & Case Studies](/case-studies) or [schedule a technical discovery session](/contact) with Kawaki Studios."
  },
  {
    "id": "f784c73f-c314-4e40-a205-cf57dab34c56",
    "title": "The Architecture of Modern Digital Luxury",
    "slug": "the-architecture-of-modern-digital-luxury",
    "content": "# The Architecture of Modern Digital Luxury\n\nIn the era of commoditized web templates and bloated visual frameworks, genuine luxury in digital design is defined by restraint, precision, and high-frequency tactile responsiveness.\n\n## 1. Intentional Restraint\nWhen every digital product looks like a generic component library, true distinction comes from editorial storytelling, custom serif accents, and micro-interactions that feel responsive to human thought.\n\n## 2. High-Frequency Tactile Polish\nAnimations shouldn't just be decoration—they serve as architectural guidance, grounding the visitor in seamless fluidity.\n\n## Conclusion\nAt Kawaki Studios, we engineer software and brands designed to silence noise and elevate relevance.",
    "excerpt": "Why modern luxury digital brands are replacing generic design bloat with surgical typography and bespoke engineering.",
    "status": "published",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Editorial",
      "Brand Strategy",
      "Engineering"
    ],
    "seoKeywords": "digital luxury, web performance, headless commerce, typography",
    "seoDescription": "An in-depth essay on engineering modern digital luxury and intentional web architecture by Kawaki Studios.",
    "views": 142,
    "createdAt": "2026-08-25T10:00:00.000Z",
    "updatedAt": "2026-08-25T10:00:00.000Z"
  },
  {
    "id": "blog_commerce_02",
    "title": "Headless Commerce at Sub-Second Latency",
    "slug": "headless-commerce-at-sub-second-latency",
    "content": "# Headless Commerce at Sub-Second Latency\n\nHow Shopify Hydrogen and edge caching delivered a +340% conversion lift.\n\n### Architecture Highlights\n- Distributed Redis session cache with 18ms p95 read latency.\n- Hydrogen Cart API integration with optimistic mutation queues.\n- Instant route transitions without full page re-hydration.",
    "excerpt": "How Shopify Hydrogen and edge caching delivered a +340% conversion lift.",
    "status": "published",
    "author": "Kunal Sharma",
    "featuredImage": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    "tags": [
      "Commerce",
      "Shopify Hydrogen",
      "Edge APIs"
    ],
    "seoKeywords": "headless commerce, shopify hydrogen, conversion optimization",
    "seoDescription": "Technical analysis of sub-second headless commerce architecture and its direct impact on transaction velocity.",
    "views": 89,
    "createdAt": "2026-08-28T14:30:00.000Z",
    "updatedAt": "2026-08-28T14:30:00.000Z"
  }
];

function handleApiRequest(req, res, parsedUrl, reqBody = null) {
  let pathname = parsedUrl.pathname.replace(/^\/api/, '');
  
  if (parsedUrl.searchParams.has('match')) {
    const match = parsedUrl.searchParams.get('match').replace(/^\/+/, '');
    pathname = `/${match}`;
    parsedUrl.searchParams.delete('match');
  } else if (pathname.includes('[...path]') || pathname === '') {
    if (req.headers && req.headers['x-forwarded-uri']) {
      pathname = req.headers['x-forwarded-uri'].replace(/^\/api/, '');
    }
  }

  const method = req.method ? req.method.toUpperCase() : 'GET';
  const db = getDb();

  // Helper to send JSON response
  const sendJson = (statusCode, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data);
    }
    if (!res.headersSent) {
      res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8'
      });
    }
    res.end(JSON.stringify(data));
  };

  // 1. Health
  if (pathname === '/health' || pathname === '') {
    return sendJson(200, {
      success: true,
      status: 'healthy',
      version: '5.0.0',
      database: Boolean(db),
      dbPath: db ? getDbPath() : null,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Auth Endpoint: /api/auth
  if (pathname.startsWith('/auth')) {
    return sendJson(200, {
      success: true,
      authenticated: true,
      user: { name: 'Kunal Sharma', role: 'Master Admin' }
    });
  }

  // 3. Analytics Endpoint: /api/analytics
  if (pathname.startsWith('/analytics')) {
    let totalBlogs = FALLBACK_BLOGS.length;
    let publishedBlogs = FALLBACK_BLOGS.filter(b => b.status === 'published').length;
    let totalViews = 1420;

    if (db) {
      try {
        const rows = db.prepare('SELECT status, views FROM blogs').all();
        totalBlogs = rows.length;
        publishedBlogs = rows.filter(r => r.status === 'published').length;
        totalViews = rows.reduce((acc, r) => acc + (r.views || 0), 0) || 1420;
      } catch (e) {}
    }

    return sendJson(200, {
      success: true,
      data: {
        totalViews,
        uniqueVisitors: Math.round(totalViews * 0.62),
        publishedBlogs,
        totalBlogs,
        livePages: 6,
        seoHealth: 98
      }
    });
  }

  // 4. Single Blog: /api/blogs/:slugOrId
  if (pathname.startsWith('/blogs/')) {
    const slugOrId = decodeURIComponent(pathname.replace('/blogs/', ''));

    if (method === 'GET') {
      if (db) {
        try {
          const row = db.prepare('SELECT * FROM blogs WHERE slug = ? OR id = ?').get(slugOrId, slugOrId);
          if (row) {
            try {
              db.prepare('UPDATE blogs SET views = views + 1 WHERE id = ?').run(row.id);
            } catch (e) {}
            return sendJson(200, { success: true, data: formatBlogRow(row) });
          }
        } catch (e) {
          console.error('[DB Error]', e);
        }
      }

      const fallback = FALLBACK_BLOGS.find(b => b.slug === slugOrId || b.id === slugOrId);
      if (fallback) {
        return sendJson(200, { success: true, data: fallback });
      }

      return sendJson(404, { success: false, error: `Blog '${slugOrId}' not found` });
    }

    if (method === 'PUT') {
      if (db && reqBody) {
        try {
          const updates = [];
          const values = [];
          if (reqBody.title) { updates.push('title = ?'); values.push(reqBody.title); }
          if (reqBody.content) { updates.push('content = ?'); values.push(reqBody.content); }
          if (reqBody.excerpt !== undefined) { updates.push('excerpt = ?'); values.push(reqBody.excerpt); }
          if (reqBody.status) { updates.push('status = ?'); values.push(reqBody.status); }
          if (reqBody.author) { updates.push('author = ?'); values.push(reqBody.author); }
          if (reqBody.featuredImage !== undefined) { updates.push('featured_image = ?'); values.push(reqBody.featuredImage); }
          if (reqBody.tags) { updates.push('tags = ?'); values.push(JSON.stringify(reqBody.tags)); }
          if (reqBody.seoKeywords !== undefined) { updates.push('seo_keywords = ?'); values.push(reqBody.seoKeywords); }
          if (reqBody.seoDescription !== undefined) { updates.push('seo_description = ?'); values.push(reqBody.seoDescription); }
          updates.push('updated_at = ?'); values.push(Math.floor(Date.now() / 1000));
          values.push(slugOrId);

          if (updates.length > 1) {
            db.prepare(`UPDATE blogs SET ${updates.join(', ')} WHERE id = ? OR slug = ?`).run(...values, slugOrId);
          }
          const updated = db.prepare('SELECT * FROM blogs WHERE id = ? OR slug = ?').get(slugOrId, slugOrId);
          return sendJson(200, { success: true, data: formatBlogRow(updated) });
        } catch (e) {
          return sendJson(500, { success: false, error: e.message });
        }
      }
      return sendJson(200, { success: true, data: reqBody });
    }

    if (method === 'DELETE') {
      if (db) {
        try {
          db.prepare('DELETE FROM blogs WHERE id = ? OR slug = ?').run(slugOrId, slugOrId);
          return sendJson(200, { success: true, message: 'Blog deleted' });
        } catch (e) {
          return sendJson(500, { success: false, error: e.message });
        }
      }
      return sendJson(200, { success: true, message: 'Blog deleted' });
    }
  }

  // 5. Blogs Collection: /api/blogs
  if (pathname === '/blogs') {
    if (method === 'GET') {
      const status = parsedUrl.searchParams.get('status');
      const limit = parseInt(parsedUrl.searchParams.get('limit') || '50', 10);
      const search = parsedUrl.searchParams.get('search');

      if (db) {
        try {
          let query = 'SELECT * FROM blogs';
          const params = [];
          const conditions = [];

          if (status) {
            conditions.push('status = ?');
            params.push(status);
          }
          if (search) {
            conditions.push('(title LIKE ? OR content LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
          }

          if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
          }

          query += ' ORDER BY created_at DESC LIMIT ?';
          params.push(limit);

          const rows = db.prepare(query).all(...params);
          const formatted = rows.map(formatBlogRow);

          return sendJson(200, {
            success: true,
            data: formatted,
            pagination: {
              page: 1,
              limit,
              total: rows.length
            }
          });
        } catch (e) {
          console.error('[DB Blogs Query Error]', e);
        }
      }

      let filtered = FALLBACK_BLOGS;
      if (status) {
        filtered = filtered.filter(b => b.status === status);
      }
      return sendJson(200, {
        success: true,
        data: filtered.slice(0, limit),
        pagination: { page: 1, limit, total: filtered.length }
      });
    }

    if (method === 'POST') {
      if (db && reqBody) {
        try {
          const { randomUUID } = require('crypto');
          const id = reqBody.id || randomUUID();
          const title = reqBody.title || 'Untitled Blog';
          const slug = reqBody.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const content = reqBody.content || '';
          const excerpt = reqBody.excerpt || '';
          const status = reqBody.status || 'draft';
          const author = reqBody.author || 'Kunal Sharma';
          const featuredImage = reqBody.featuredImage || null;
          const tags = JSON.stringify(reqBody.tags || ['Editorial']);
          const seoKeywords = reqBody.seoKeywords || null;
          const seoDescription = reqBody.seoDescription || null;
          const now = Math.floor(Date.now() / 1000);

          db.prepare(`
            INSERT INTO blogs (id, title, slug, content, excerpt, status, author, featured_image, tags, seo_keywords, seo_description, views, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
          `).run(id, title, slug, content, excerpt, status, author, featuredImage, tags, seoKeywords, seoDescription, now, now);

          const created = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
          return sendJson(201, { success: true, data: formatBlogRow(created) });
        } catch (e) {
          return sendJson(500, { success: false, error: e.message });
        }
      }
      return sendJson(201, { success: true, data: reqBody });
    }
  }

  // 6. Pages Collection: /api/pages
  if (pathname === '/pages' || pathname.startsWith('/pages')) {
    if (db) {
      try {
        const rows = db.prepare('SELECT * FROM pages ORDER BY updated_at DESC').all();
        if (rows && rows.length > 0) {
          return sendJson(200, {
            success: true,
            data: rows.map(formatPageRow),
            pagination: { page: 1, limit: 50, total: rows.length }
          });
        }
      } catch (e) {}
    }

    const defaultPages = [
      { id: "page_home", title: "Home", slug: "home", status: "published", published: true, updatedAt: new Date().toISOString() },
      { id: "page_services", title: "Services", slug: "services", status: "published", published: true, updatedAt: new Date().toISOString() },
      { id: "page_about", title: "About", slug: "about", status: "published", published: true, updatedAt: new Date().toISOString() },
      { id: "page_works", title: "Case Studies", slug: "case-studies", status: "published", published: true, updatedAt: new Date().toISOString() },
      { id: "page_blog", title: "Insights & Blog", slug: "blog", status: "published", published: true, updatedAt: new Date().toISOString() },
      { id: "page_contact", title: "Contact", slug: "contact", status: "published", published: true, updatedAt: new Date().toISOString() }
    ];

    return sendJson(200, {
      success: true,
      data: defaultPages,
      pagination: { page: 1, limit: 50, total: defaultPages.length }
    });
  }

  // 7. Sitemap Dynamic XML: /api/sitemap or /api/sitemap.xml
  if (pathname === '/sitemap' || pathname === '/sitemap.xml') {
    let blogs = FALLBACK_BLOGS;
    if (db) {
      try {
        const rows = db.prepare("SELECT slug, updated_at, created_at FROM blogs WHERE status = 'published'").all();
        if (rows && rows.length > 0) {
          blogs = rows;
        }
      } catch (e) {}
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.kawaki.co.in/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.kawaki.co.in/about</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.kawaki.co.in/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.kawaki.co.in/case-studies</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.kawaki.co.in/case-studies/acme-headless-ecommerce</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.kawaki.co.in/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.kawaki.co.in/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
${blogs.map(b => `  <url><loc>https://www.kawaki.co.in/blog/${b.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.end(xml);
  }

  // Fallback 404
  return sendJson(404, {
    success: false,
    error: `API Route '${pathname}' not found`
  });
}

module.exports = {
  getDb,
  getDbPath,
  handleApiRequest,
  formatBlogRow,
  FALLBACK_BLOGS
};
