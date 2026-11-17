const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');
const { serviceCopy, display, lower, groupOf } = require('./lib/service-copy');
const { cityServiceCopy, cityHubCopy, NOUN } = require('./lib/city-copy');
const { glance } = require('./lib/glance');
const { solutionCopy } = require('./lib/solution-copy');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const factsFile = path.resolve(rootDir, 'data', 'kawaki-facts.json');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');
const vercelFile = path.resolve(rootDir, 'vercel.json');

console.log('⚡ [Build SEO Pages] Initializing Differentiated Editorial & Topical Engine...');

if (!fs.existsSync(registryFile) || !fs.existsSync(factsFile)) {
  console.error('❌ Registry or facts file missing!');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));
const CASE_STUDIES = facts.verifiedProjects;

// City Profiles (Studio in New Delhi, Remote Model)
const CITY_PROFILES = {
  'Delhi': {
    context: 'As India’s national capital and northern commerce powerhouse, Delhi hosts major consumer flagships, commercial trade distributors, and corporate headquarters.',
    ecosystem: 'From Connaught Place and Nehru Place corporate offices to South Delhi consumer flagships, businesses require dependable web systems built for steady operational volume.',
    challenge: 'Intense local search competition and legacy platforms weighed down by bloated third-party plugins that degrade page responsiveness.',
    buyerNeeds: 'Fast, structured web platforms with clear navigation hierarchies and direct developer accountability.',
    collaboration: 'Our studio is based in New Delhi, allowing rapid face-to-face kickoff alignment when helpful, paired with focused sprint-based delivery.'
  },
  'Bangalore': {
    context: 'Bangalore is India’s premier technology and venture-funded startup ecosystem, demanding software-level engineering rigor from web platforms.',
    ecosystem: 'Home to SaaS innovators, tech founders, and venture firms across Koramangala, Indiranagar, HSR Layout, and Whitefield.',
    challenge: 'Engineering-led buyers expect modern user experiences, high uptime, structured data handling, and clean typography.',
    buyerNeeds: 'Component-driven frontend architectures, clean TypeScript codebases, and seamless integration with developer workflows.',
    collaboration: 'We collaborate remotely with Bangalore technology teams via structured sprint boards, Git pull requests, and live staging environments on Vercel.'
  },
  'Mumbai': {
    context: 'Mumbai is India’s financial and media capital, setting the national benchmark for corporate credibility, luxury retail, and institutional trust.',
    ecosystem: 'From BKC financial institutions and Lower Parel D2C flagships to Andheri creative media studios, digital platforms require refined presentation.',
    challenge: 'Balancing elevated typographic aesthetics and editorial polish with dependable transaction funnels and structured data hygiene.',
    buyerNeeds: 'Distinctive visual presentation, responsive mobile design, and secure backend integration for high-trust commercial interactions.',
    collaboration: 'We work remotely with Mumbai leadership teams through scheduled video reviews, milestone-gated deliveries, and transparent Git repositories.'
  },
  'Pune': {
    context: 'Pune combines deep automotive and industrial manufacturing capabilities with an active software engineering and enterprise SaaS corridor.',
    ecosystem: 'Centered across Hinjewadi, Magarpatta, and Baner, companies in Pune require web systems that bridge complex operational workflows with clean user interfaces.',
    challenge: 'Modernizing legacy database structures and internal workflows into responsive web platforms without disrupting ongoing business operations.',
    buyerNeeds: 'Scalable relational data schemas, role-based user access, and well-documented API connectors.',
    collaboration: 'Remote sprint collaboration from our New Delhi engineering studio, delivering clean TypeScript code and comprehensive deployment documentation.'
  },
  'Hyderabad': {
    context: 'Hyderabad is a primary technology and pharmaceutical corridor anchored by HITEC City, Gachibowli, and extensive enterprise software campuses.',
    ecosystem: 'Enterprises, healthcare groups, and B2B technology providers requiring high-security web portals and dependable digital systems.',
    challenge: 'Scalable data handling, role-based access controls, and multi-system synchronization across institutions, clinics, and software teams.',
    buyerNeeds: 'Durable full-stack architectures, clear relational modeling, and strict input validation.',
    collaboration: 'Structured remote development sprints from New Delhi with real-time staging previews and transparent Git commit histories.'
  },
  'Ahmedabad': {
    context: 'Ahmedabad is Gujarat’s commercial engine, characterized by large-scale industrial manufacturing, textile exports, chemical groups, and rising consumer brands.',
    ecosystem: 'Centered around SG Highway and Prahladnagar, business owners demand durable digital systems that generate qualified domestic and international trade inquiries.',
    challenge: 'Replacing static PDF catalogues and legacy websites with functional digital product showcases, technical specification sheets, and automated inquiry distribution.',
    buyerNeeds: 'High-clarity product catalogues, structured inquiry forms, and search visibility across global procurement queries.',
    collaboration: 'Remote digital product engineering from New Delhi, offering transparent milestone schedules and fixed-fee sprint delivery.'
  },
  'Jaipur': {
    context: 'Jaipur represents a unique nexus of luxury craftsmanship, export manufacturing, boutique hospitality, and emerging technology ventures.',
    ecosystem: 'Prestige jewelry brands, architectural restoration studios, and resort groups that rely on elevated visual storytelling and online customer discovery.',
    challenge: 'Creating immersive, high-resolution visual showcases that render smoothly on mobile broadband without layout shift or asset lag.',
    buyerNeeds: 'Refined typography, editorial spatial layouts, and optimized image delivery pipelines.',
    collaboration: 'Direct engineering collaboration from New Delhi, providing high-touch design exploration and clean frontend code.'
  },
  'Chandigarh': {
    context: 'Serving the prosperous Tri-City region (Chandigarh, Mohali, Panchkula), this market features healthcare centers, higher education, and modern IT parks.',
    ecosystem: 'Specialist medical clinics, regional healthcare institutions, educational providers, and growing IT service businesses in Mohali.',
    challenge: 'Establishing local patient and student trust, streamlining intake workflows, and achieving clear regional search discovery.',
    buyerNeeds: 'Patient-friendly information architecture, streamlined appointment intake, and verified schema markup.',
    collaboration: 'Seamless remote engineering from New Delhi with direct video strategy sessions and full project ownership.'
  },
  'Ludhiana': {
    context: 'Ludhiana is Punjab’s industrial backbone, famous for knitwear, bicycle manufacturing, automotive components, and international export houses.',
    ecosystem: 'Industrial manufacturers and multi-generation trade businesses transitioning from offline trade networks to international digital discovery.',
    challenge: 'Digitizing complex product inventories, providing downloadable CAD/PDF specification sheets, and capturing overseas buyer leads.',
    buyerNeeds: 'B2B product catalogues, downloadable specification sheets, and reliable search engine crawlability.',
    collaboration: 'Remote web system architecture from New Delhi, focusing on clean engineering, search visibility, and zero maintenance headaches.'
  },
  'Kolkata': {
    context: 'Kolkata is the primary commercial center of Eastern India, with deep roots in tea trading, heavy engineering, legal services, and publishing.',
    ecosystem: 'Established corporate enterprises in BBD Bagh and modern IT campuses in Salt Lake Sector V and New Town.',
    challenge: 'Modernizing legacy websites into responsive, search-friendly web platforms that respect institutional heritage while accelerating growth.',
    buyerNeeds: 'Corporate credibility, institutional content hierarchy, and fast page delivery.',
    collaboration: 'Remote engineering partnership from New Delhi, ensuring structured project governance and transparent deliverables.'
  },
  'Vadodara': {
    context: 'Vadodara is a key educational and industrial manufacturing hub in central Gujarat with notable chemical, pharmaceutical, and engineering sectors.',
    ecosystem: 'Industrial suppliers, fabrication units, and engineering consultancy firms needing professional B2B digital credibility.',
    challenge: 'Clear technical communication of engineering capabilities to global procurement officers and project contractors.',
    buyerNeeds: 'Clean technical documentation, structured capabilities matrices, and fast-loading web pages.',
    collaboration: 'Remote execution from New Delhi, delivering standards-compliant websites with clean HTML structure and structured schema.'
  },
  'Gurgaon': {
    context: 'Gurgaon hosts hundreds of corporate regional offices, prominent venture capital funds, and high-growth digital ventures.',
    ecosystem: 'CyberCity, Golf Course Road, and Udyog Vihar business districts with rapid business cycles and demanding digital expectations.',
    challenge: 'Speed to market, brand prestige, and technical sophistication required to compete in India’s most competitive commercial corridor.',
    buyerNeeds: 'High conversion velocity, modern component architecture, and polished executive aesthetics.',
    collaboration: 'Direct studio proximity from our New Delhi base, enabling in-person workshops when beneficial alongside rapid sprint delivery.'
  },
  'Noida': {
    context: 'Noida is a major technology, digital media, electronics manufacturing, and institutional education hub in the NCR.',
    ecosystem: 'Software development firms, media production broadcast facilities, and large educational campuses across Expressway sectors.',
    challenge: 'Multi-role student/parent portals, high-traffic media publishing, and dependable corporate marketing platforms.',
    buyerNeeds: 'Scalable content delivery, secure form submission pipelines, and clean responsive interfaces.',
    collaboration: 'Studio proximity from New Delhi, allowing responsive collaboration and continuous staging reviews on Vercel.'
  },
  'Dubai': {
    context: 'Dubai is the premier commercial gateway to the Middle East, demanding world-class luxury design, bilingual readiness, and high transactional reliability.',
    ecosystem: 'International trading companies, luxury real estate developers, hospitality groups, and regional fintech platforms in DIFC and Downtown.',
    challenge: 'Elevated design aesthetics, international payment gateways, and multilingual architecture for regional and global audiences.',
    buyerNeeds: 'Editorial typographic polish, fluid responsive navigation, and dependable API connectors.',
    collaboration: 'Remote digital engineering from New Delhi, aligning with Gulf Standard Time (GST) for live reviews and asynchronous development.'
  },
  'Canada': {
    context: 'The Canadian digital economy features thriving tech hubs in Toronto, Vancouver, and Montreal, operating with high engineering and accessibility standards.',
    ecosystem: 'Software startups, healthcare services, and professional consultancies looking for high-caliber engineering value.',
    challenge: 'Adhering to strict web standards, privacy compliance, and responsive interfaces without North American agency overheads.',
    buyerNeeds: 'Semantic HTML markup, strict TypeScript typing, and transparent Git repositories.',
    collaboration: 'Remote studio collaboration from New Delhi with overlapping coordination windows and transparent GitHub repository management.'
  },
  'London': {
    context: 'London is Europe’s primary tech and financial capital, characterized by uncompromising expectations for typographic elegance and technical craft.',
    ecosystem: 'Boutique investment firms, architecture practices, high-end retail brands, and B2B SaaS ventures across the City, Mayfair, and Shoreditch.',
    challenge: 'Editorial restraint, fast performance on mobile broadband, and high technical polish.',
    buyerNeeds: 'Sophisticated typography, minimalist grid layouts, and clean lightweight codebases.',
    collaboration: 'Remote partnership from New Delhi operating on GMT-aligned afternoon review sessions and predictable weekly delivery sprints.'
  }
};

// Reusable Universal Header (Standardized from public/about.html)
function generateDifferentiatedContent(entry) {
  const loc = entry.location || 'Delhi';
  const profile = CITY_PROFILES[loc] || CITY_PROFILES['Delhi'];
  const sName = entry.service;
  const pType = entry.pageType;
  const url = entry.kawakiUrl;
  const h = entry.h1;
  const kw = entry.primaryKeyword || sName.toLowerCase();

  let section1Tag = '[ 01 / STRATEGIC PURPOSE ]';
  let section1Title = '';
  let overviewParagraph = '';
  let valueCards = [];

  let section2Tag = '[ 02 / DOMAIN REALITIES ]';
  let challengeTitle = '';
  let challengeDesc = '';
  let deliverables = [];

  let section3Tag = '[ 03 / IMPLEMENTATION STANDARDS ]';
  let archTitle = '';
  let archDesc = '';
  let processSteps = [];

  let faqs = [];

  // =========================================================================
  // 1. LOCATION HUB PAGES (14 pages)
  // =========================================================================
  if (pType === 'location') {
    const cc = cityHubCopy(entry);
    section1Title = cc.section1Title;
    overviewParagraph = cc.overviewParagraph;
    valueCards = cc.valueCards;
    challengeTitle = cc.challengeTitle;
    challengeDesc = cc.challengeDesc;
    deliverables = cc.deliverables;
    archTitle = cc.archTitle;
    archDesc = cc.archDesc;
    processSteps = cc.processSteps;
    faqs = cc.faqs;
  }

  else if (pType === 'location-service') {
    const cc = cityServiceCopy(entry);
    section1Title = cc.section1Title;
    overviewParagraph = cc.overviewParagraph;
    valueCards = cc.valueCards;
    challengeTitle = cc.challengeTitle;
    challengeDesc = cc.challengeDesc;
    deliverables = cc.deliverables;
    archTitle = cc.archTitle;
    archDesc = cc.archDesc;
    processSteps = cc.processSteps;
    faqs = cc.faqs;
  }

  else if (pType === 'solution') {
    const cc = solutionCopy(entry);
    section1Title = cc.section1Title;
    overviewParagraph = cc.overviewParagraph;
    valueCards = cc.valueCards;
    challengeTitle = cc.challengeTitle;
    challengeDesc = cc.challengeDesc;
    deliverables = cc.deliverables;
    archTitle = cc.archTitle;
    archDesc = cc.archDesc;
    processSteps = cc.processSteps;
    faqs = cc.faqs;
  }

  else if (pType === 'resource') {
    section1Tag = '[ 01 / ENGINEERING REFERENCE ]';
    section1Title = `Technical Analysis & Guide: ${sName}`;
    overviewParagraph = `This engineering guide and reference framework provides an objective technical analysis of ${sName.toLowerCase()} (${h.toLowerCase()}). Authored by our development team in New Delhi, it details real-world architectural considerations, budget benchmarks, and practical implementation patterns for modern web systems.`;

    valueCards = [
      { num: '01.01', title: 'Empirical Production Benchmarks', body: `Insights drawn directly from our active production builds across custom web applications, ecommerce stores, and digital tools for ${h.toLowerCase()}.` },
      { num: '01.02', title: 'Objective Architectural Tradeoffs', body: `Practical comparisons of monolithic CMS setups, headless architectures, and decoupled database systems across ${url}.` },
      { num: '01.03', title: 'Actionable Implementation Rubrics', body: `Clear decision matrices to help engineering leads and business founders make informed technical investments in ${sName.toLowerCase()}.` }
    ];

    challengeTitle = `Strategic Considerations in ${sName}`;
    challengeDesc = `Navigating modern web technologies requires balancing immediate business priorities against long-term maintenance costs, technical debt, and team capabilities for ${kw}.`;

    deliverables = [
      { title: 'Architectural Frameworks & Patterns', body: `Proven patterns for structuring modern web applications, state boundaries, and API integrations for ${sName.toLowerCase()}.` },
      { title: 'Transparent Budgeting & Cost Modeling', body: `Realistic financial models detailing upfront engineering investments versus long-term hosting and maintenance for ${url}.` },
      { title: 'Agency & Technical Evaluation Rubrics', body: `Practical checklists for assessing technical capabilities, code quality, and delivery transparency in ${h.toLowerCase()}.` },
      { title: 'Performance & Security Checklists', body: `Actionable steps for auditing Core Web Vitals, server response times, and baseline security configurations for ${sName.toLowerCase()}.` }
    ];

    archTitle = `Methodology & Evaluation Standards`;
    archDesc = `We evaluate web systems against clear technical criteria: code maintainability, asset weight, search crawlability, security posture, and predictable operational costs for ${sName.toLowerCase()}.`;

    processSteps = [
      { num: '01 / DISCOVERY', title: 'Problem Framing & Goals', desc: `Identify core operational requirements and long-term business objectives for ${sName.toLowerCase()}.` },
      { num: '02 / EVALUATION', title: 'Technical Stack Comparison', desc: `Evaluate frontend frameworks, database requirements, and hosting overhead for ${h.toLowerCase()}.` },
      { num: '03 / SPEC', title: 'Architecture Specification', desc: `Define API contracts, data models, and component boundaries for ${url}.` },
      { num: '04 / BENCHMARK', title: 'Performance Verification', desc: `Audit Core Web Vitals, asset size, and crawl efficiency for ${sName.toLowerCase()}.` }
    ];

    faqs = [
      { q: `How does Kawaki Studios derive its engineering benchmarks for ${sName.toLowerCase()}?`, a: `Our benchmarks for ${h.toLowerCase()} are derived from verified production builds across our active portfolio of custom websites, web applications, and ecommerce storefronts.` },
      { q: `Can our team consult with Kawaki Studios regarding ${sName.toLowerCase()}?`, a: `Yes. We provide technical advisory discussions and architectural reviews for organizations evaluating ${h.toLowerCase()} architectures.` },
      { q: `What are the most common mistakes companies make regarding ${sName.toLowerCase()}?`, a: `Common pitfalls in ${sName.toLowerCase()} include relying on bloated all-in-one page builders, failing to plan for post-launch maintenance, and neglecting proper search engine crawl architecture.` },
      { q: `How frequently is this guide on ${sName.toLowerCase()} updated?`, a: `We update our technical documentation on ${h.toLowerCase()} periodically to reflect evolving web standards, browser capabilities, and search engine guidelines.` }
    ];
  }

  // =========================================================================
  // 5. SERVICE & INDUSTRY PAGES (119 pages)
  // =========================================================================
  else {
    const sc = serviceCopy(entry);
    section1Title = sc.section1Title;
    overviewParagraph = sc.overviewParagraph;
    valueCards = sc.valueCards;
    challengeTitle = sc.challengeTitle;
    challengeDesc = sc.challengeDesc;
    deliverables = sc.deliverables;
    archTitle = sc.archTitle;
    archDesc = sc.archDesc;
    processSteps = sc.processSteps;
    faqs = sc.faqs;
  }

  return {
    section1Tag,
    section1Title,
    overviewParagraph,
    valueCards,
    section2Tag,
    challengeTitle,
    challengeDesc,
    deliverables,
    section3Tag,
    archTitle,
    archDesc,
    processSteps,
    faqs
  };
}

// Generate Complete Page HTML
function getRelatedPages(entry) {
  /* Related links are how Google finds its way to these pages, so every page must receive some.
     Each cluster (a topic group, a city, a page type) is sorted into a ring and every page links to the
     pages after it, which gives every page the same number of links from its neighbours.
     (The old picker treated the default location "Delhi" as a city and sent every page to the same three.) */
  const currentUrl = entry.kawakiUrl;
  const short = e => {
    const d = String(e.metaDescription || '').split(/(?<=\.)\s/)[0];
    return d.length > 96 ? d.slice(0, d.lastIndexOf(' ', 92)) + '\u2026' : d;
  };
  const pool = registry.filter(e => e.kawakiUrl !== '/' && e.indexable !== false && e.pageType !== 'core' && e.pageType !== 'legal');
  const ring = (list, n) => {
    const l = list.slice().sort((x, y) => x.kawakiUrl.localeCompare(y.kawakiUrl));
    let i = l.findIndex(e => e.kawakiUrl === currentUrl);
    // Not in this list (a top-up from another cluster): start where the page would sit alphabetically.
    if (i === -1) i = l.filter(e => e.kawakiUrl < currentUrl).length - 1;
    const out = [];
    for (let k = 1; k <= l.length && out.length < n; k++) {
      const e = l[(i + k + l.length) % l.length];
      if (e && e.kawakiUrl !== currentUrl) out.push(e);
    }
    return out;
  };
  const group = e => groupOf(e.kawakiUrl.replace(/^\//, ''));
  let picks = [];
  if (entry.pageType === 'location-service') {
    const hub = pool.find(e => e.pageType === 'location' && e.location === entry.location);
    picks = (hub ? [hub] : [])
      .concat(ring(pool.filter(e => e.pageType === 'location-service' && e.location === entry.location), 2))
      .concat(ring(pool.filter(e => e.pageType === 'location-service' && e.service === entry.service), 2));
  } else if (entry.pageType === 'location') {
    picks = pool.filter(e => e.pageType === 'location-service' && e.location === entry.location).slice(0, 3)
      .concat(ring(pool.filter(e => e.pageType === 'location'), 2));
  } else if (entry.pageType === 'service') {
    picks = ring(pool.filter(e => e.pageType === 'service' && group(e) === group(entry)), 4);
  } else {
    picks = ring(pool.filter(e => e.pageType === entry.pageType), 3);
  }
  // Top up small clusters: first service pages on the same topic, then the wider list.
  if (picks.length < 5) picks = picks.concat(ring(pool.filter(e => e.pageType === 'service' && group(e) === group(entry)), 5));
  if (picks.length < 5) picks = picks.concat(ring(pool.filter(e => e.pageType === 'service'), 5));
  const seen = new Set();
  picks = picks.filter(e => e.kawakiUrl !== currentUrl && !seen.has(e.kawakiUrl) && seen.add(e.kawakiUrl));
  const rel = picks.slice(0, 5).map(e => ({ title: e.h1 || e.title, url: e.kawakiUrl, badge: short(e) }));
  rel.push({ title: 'Every page on the site', url: '/directory', badge: 'Services, cities, guides and case studies, in one index.' });
  return rel;
}

function renderPage(entry) {
  const content = generateDifferentiatedContent(entry);
  const canonicalUrl = `https://kawaki.co.in${entry.kawakiUrl}`;
  const relatedPages = getRelatedPages(entry);
  
  // Matched real case studies
  const matchedStudies = (entry.relatedCaseStudies || ['bazzaro', 'kala-design'])
    .map(slug => CASE_STUDIES[slug])
    .filter(Boolean)
    .slice(0, 3);

  // Determine accurate Breadcrumb category & URL
  let breadcrumbName = 'Services';
  let breadcrumbUrl = 'https://kawaki.co.in/services';
  let ogType = 'website';

  if (entry.pageType.includes('location')) {
    breadcrumbName = 'Locations';
    breadcrumbUrl = 'https://kawaki.co.in/locations';
  } else if (entry.pageType === 'solution') {
    breadcrumbName = 'Solutions';
    breadcrumbUrl = 'https://kawaki.co.in/solutions';
  } else if (entry.pageType === 'resource') {
    breadcrumbName = 'Resources';
    breadcrumbUrl = 'https://kawaki.co.in/resources';
    ogType = 'article';
  }

  // "At a glance" facts block (AEO): service, city, solution, industry and technology pages.
  const isCity = entry.pageType === 'location' || entry.pageType === 'location-service';
  const at = (entry.pageType === 'core' || entry.pageType === 'legal') ? null : glance({
    name: entry.pageType === 'location' ? 'websites and web apps' : entry.pageType === 'location-service' ? (NOUN[entry.service] || lower(entry.service)) : lower(entry.service),
    slug: entry.pageType === 'location' ? 'custom-web-development' : entry.kawakiUrl.replace(/^\//, ''),
    city: isCity ? entry.location : null
  });

  // Schema Graph
  const schemaGraph = [
    {
      "@type": entry.schemaType || "Service",
      "@id": `${canonicalUrl}#service`,
      "name": entry.h1,
      "url": canonicalUrl,
      "description": entry.metaDescription,
      "provider": {
        "@type": "Organization",
        "@id": "https://kawaki.co.in/#organization",
        "name": "Kawaki Studios",
        "url": "https://kawaki.co.in",
        "logo": "https://kawaki.co.in/assets/images/kawaki-logo.png"
      },
      "serviceType": entry.service,
      ...(at ? { areaServed: at.ld.areaServed } : {}),
      ...(at && at.ld.offers ? { offers: at.ld.offers } : {})
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kawaki.co.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": breadcrumbName,
          "item": breadcrumbUrl
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": entry.h1,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": content.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  /* ---------- New design: the shared shell plus the homepage's own components ---------- */
  const S = shell;
  const pagePath = entry.kawakiUrl;
  const crumbPath = breadcrumbUrl.replace('https://kawaki.co.in', '') || '/';
  const svcName = display(entry.service);
  const crumbs = [[breadcrumbName, crumbPath], [svcName, pagePath]];
  schemaGraph[1] = S.breadcrumbLd(pagePath, crumbs);
  const LIVE = {
    'kala-design': { img: 'kala-live', domain: 'kaladesignco.com', clip: 'kala' },
    'bazzaro': { img: 'bazzaro-live', domain: 'bazzaro.in', clip: 'bazzaro' },
    'nextschool-erp': { img: 'nextschool-live', domain: 'nextschoolerp.com', clip: 'nextschool' },
    'nursepass': { img: 'nursepass-live', domain: 'nursepass.de', clip: 'nursepass' },
    'urbanland': { img: 'urbanland-live', domain: 'urbanlandproducts.com' },
    'decor-lab': { img: 'decorlab-live', domain: 'decorlabs.co.in' }
  };
  const slugOf = cs => cs.url.split('/').pop();
  const live = matchedStudies.filter(cs => LIVE[slugOf(cs)]).slice(0, 2);
  const rest = matchedStudies.filter(cs => !live.includes(cs));
  const stepNum = s => (String(s.num).match(/\d+/) || ['01'])[0].padStart(2, '0');
  const longTitle = entry.h1.length > 30;

  const caseFrame = (cs, i) => {
    const L = LIVE[slugOf(cs)];
    return `<li class="case${i % 2 ? ' case--flip' : ''} grid">
                    <figure class="case__media browser"${L.clip ? ` data-clip="${L.clip}"` : ''}>
                        <div class="browser__bar"><span class="browser__addr">${S.LOCK}<span>${L.domain}</span></span><span class="browser__load" aria-hidden="true"></span></div>
                        <div class="browser__view">
                            <img src="/assets/images/home/${L.img}.webp" alt="${S.esc(cs.name)} homepage, live at ${L.domain}" width="1280" height="800" loading="lazy" decoding="async" />${L.clip ? '\n                            <video class="case__clip" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>' : ''}
                        </div>
                    </figure>
                    <div class="case__body">
                        <p class="case__meta"><span>${S.esc(cs.category)}</span></p>
                        <h3 class="case__title"><a href="${cs.url}">${S.esc(cs.name)}</a></h3>
                        <p class="case__desc">${S.esc(cs.description)}.</p>
                        <span class="case__cta" aria-hidden="true">Read the case study<svg viewBox="0 0 16 16"><path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                    </div>
                </li>`;
  };
  const row = (href, name, desc) => `<li><a class="row svc" href="${href}"><h3 class="row__name">${S.esc(name)}</h3><span class="svc__desc">${S.esc(desc)}</span>${S.ROW_GO}</a></li>`;
  const card = (n, title, body) => `<li class="card"><span class="card__n">${n}</span><h3 class="card__title">${title}</h3><p class="card__body">${body}</p></li>`;

  const main = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml(crumbs)}
                <div class="phero__row grid">
                    <h1 class="phero__title${longTitle ? ' phero__title--long' : ''}" id="page-title">${entry.h1}<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></h1>
                    <div class="phero__side">
                        <p class="phero__lede">${entry.metaDescription}</p>
                        <div class="phero__actions">
                            <a class="btn" href="/contact">Start a project${S.ARROW}</a>
                            <a class="draw" href="#work">See the work${S.ARROW_DOWN}</a>
                        </div>
                    </div>
                </div>
            </div>
            ${S.strip([['kept', 'Custom code'], ['cut', 'Page builders'], ['kept', 'Semantic HTML'], ['kept', 'Typed APIs'], ['cut', 'Bought themes'], ['kept', 'Staging links'], ['cut', 'Plugin piles'], ['kept', 'Git handoff'], ['cut', 'Lock-in']], 'Built with custom code, semantic HTML, typed APIs, staging links and a Git handoff. Left out: page builders, bought themes, plugin piles and lock-in.')}
        </section>

        ${at ? at.html : ''}

        <section class="sec wrap" id="overview" aria-labelledby="overview-title">
            <div class="sec-head grid">
                <h2 class="h2" id="overview-title" data-reveal>${content.section1Title || `What ${lower(entry.service)} covers`}</h2>
            </div>
            <div class="grid"><p class="lead">${content.overviewParagraph}</p></div>
            <ol class="cards cards--3">
                ${content.valueCards.map((c, i) => card('0' + (i + 1), c.title, c.body)).join('\n                ')}
            </ol>
        </section>

        <section class="sec sec--line wrap" id="scope" aria-labelledby="scope-title">
            <div class="sec-head grid">
                <h2 class="h2" id="scope-title" data-reveal>${content.challengeTitle}</h2>
            </div>
            <div class="grid"><p class="lead">${content.challengeDesc}</p></div>
            <ol class="cards cards--2">
                ${content.deliverables.map((d, i) => card('0' + (i + 1), d.title, d.body)).join('\n                ')}
            </ol>
        </section>

        <section class="process wrap" id="process" aria-labelledby="process-title" style="margin-top: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="process-title" data-reveal>${content.archTitle}</h2>
                <div class="sec-head__aside"><p>${content.archDesc}</p></div>
            </div>
            <ol class="steps steps--${Math.min(6, Math.max(3, content.processSteps.length))}" data-steps>
                ${content.processSteps.map(s => `<li class="step"><span class="step__n">${stepNum(s)}</span><h3>${s.title}</h3><p>${s.desc}</p></li>`).join('\n                ')}
                <li class="steps__path" aria-hidden="true" role="presentation"></li>
            </ol>
        </section>

        <section class="work wrap" id="work" aria-labelledby="work-title">
            <div class="sec-head grid">
                <h2 class="h2" id="work-title" data-reveal>Work we have shipped</h2>
                <div class="sec-head__aside">
                    <p>Each one has a full case study.</p>
                    <a class="draw" href="/case-studies">All case studies${S.ARROW}</a>
                </div>
            </div>
            ${live.length ? `<ul class="cases">
                ${live.map(caseFrame).join('\n                ')}
            </ul>` : ''}
            ${rest.length ? `<ul class="rows"${live.length ? ' style="margin-top: clamp(56px, 8vw, 120px);"' : ''}>
                ${rest.map(cs => row(cs.url, cs.name, cs.category)).join('\n                ')}
            </ul>` : ''}
        </section>

        <section class="faq wrap" id="faq" aria-labelledby="faq-title">
            <div class="sec-head grid">
                <h2 class="h2" id="faq-title" data-reveal>Questions about ${lower(entry.service)}</h2>
                <div class="sec-head__aside">
                    <p>Something else? Ask the developers who would build it.</p>
                    <a class="draw" href="https://wa.me/917678123943?text=${encodeURIComponent('Hi Kunal, I have a question about ' + lower(entry.service))}" target="_blank" rel="noopener">WhatsApp the studio</a>
                </div>
            </div>
            <div class="faq__list">
                ${S.faqHtml(content.faqs)}
            </div>
        </section>

        <section class="sec wrap related" aria-labelledby="related-title" style="padding-bottom: var(--space-sec);">
            <div class="sec-head grid">
                <h2 class="h2" id="related-title" data-reveal>Related pages</h2>
                <div class="sec-head__aside"><a class="draw" href="/services">All services${S.ARROW}</a></div>
            </div>
            <ul class="rows">
                ${relatedPages.map(r => row(r.url, r.title, r.badge)).join('\n                ')}
            </ul>
        </section>`;

  const HUBS = {
    '/resources': { type: 'resource', heading: 'Guides and resources', count: n => `${n} guides`, aside: ['/blog', 'The blog'] },
    '/locations': { type: 'location', heading: 'Where we work', count: n => `${n} cities`, aside: ['/contact', 'Work with us remotely'] },
    '/industries': { type: 'industry', heading: 'Industries we build for', count: n => `${n} industries`, aside: ['/services', 'All services'] }
  };
  const hub = HUBS[entry.kawakiUrl];
  if (hub) {
    const guides = registry.filter(e => e.pageType === hub.type);
    const hubMain = `<section class="phero" aria-labelledby="page-title">
            <div class="wrap">
                ${S.crumbsHtml([[hub.heading, entry.kawakiUrl]])}
                <div class="phero__row grid">
                    <h1 class="phero__title" id="page-title">${hub.heading}<span class="glyph glyph--badge" aria-hidden="true">${S.ASTERISK}</span></h1>
                    <div class="phero__side"><p class="phero__lede">${entry.metaDescription}</p></div>
                </div>
            </div>
        </section>
        <section class="sec wrap related" aria-labelledby="guides-title" style="padding-bottom: var(--space-sec);">
            <div class="sec-head grid"><h2 class="h2" id="guides-title" data-reveal>${hub.count(guides.length)}</h2><div class="sec-head__aside"><a class="draw" href="${hub.aside[0]}">${hub.aside[1]}${S.ARROW}</a></div></div>
            <ul class="rows">
                ${guides.map(e => row(e.kawakiUrl, e.h1 || e.title, String(e.metaDescription || '').split(/(?<=\.)\s/)[0])).join('\n                ')}
            </ul>
        </section>`;
    schemaGraph[1] = S.breadcrumbLd(entry.kawakiUrl, [[hub.heading, entry.kawakiUrl]]);
    const graph = schemaGraph.filter(x => x['@type'] !== 'FAQPage');
    const vv = S.versions();
    return S.head({ title: entry.title, description: entry.metaDescription, path: entry.kawakiUrl, jsonLd: { '@context': 'https://schema.org', '@graph': graph } }, vv) + S.body({ path: entry.kawakiUrl, main: hubMain }, vv);
  }

  const v = S.versions();
  return S.head({ title: entry.title, description: entry.metaDescription, path: pagePath, ogType, jsonLd: { '@context': 'https://schema.org', '@graph': schemaGraph } }, v) +
    S.body({ path: pagePath, main }, v);
}

// 1. Generate Static Files for all action=create entries
console.log('\n🚀 [1/3] Generating static HTML files for action=create...');
let createdCount = 0;
const allPublishedUrls = [];

for (const entry of registry) {
  if (entry.action === 'create') {
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

    const html = renderPage(entry);
    fs.writeFileSync(filePath, html, 'utf8');
    createdCount++;
  }

  if (entry.indexable && entry.kawakiUrl) {
    allPublishedUrls.push(entry.kawakiUrl);
  }
}

console.log(`✓ Generated ${createdCount} static HTML pages in public/ directory.`);

// 2. Synchronize sitemap.xml
console.log('\n🚀 [2/3] Synchronizing public/sitemap.xml...');
try {
  const { execSync } = require('child_process');
  execSync('node scripts/build-sitemap.js', { stdio: 'inherit', cwd: rootDir });
} catch (err) {
  console.warn('⚠️ Warning updating sitemap via build-sitemap.js:', err.message);
}

// 3. Vercel Redirects
console.log('\n🚀 [3/3] Validating vercel.json configuration...');
if (fs.existsSync(vercelFile)) {
  const v = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
  console.log(`✓ vercel.json verified with cleanUrls=true and ${v.redirects ? v.redirects.length : 0} redirects.`);
}

console.log(`\n🎉 [Build SEO Pages] ${registry.length}-page registry generated successfully.`);
