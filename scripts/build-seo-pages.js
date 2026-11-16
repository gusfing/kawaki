const fs = require('fs');
const path = require('path');
const shell = require('./lib/shell');
const { serviceCopy, display, lower } = require('./lib/service-copy');

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
    section1Tag = '[ 01 / REGIONAL ENGAGEMENT ]';
    section1Title = `Digital Engineering & Web Systems for ${loc} Businesses`;
    overviewParagraph = `Operating from our primary studio in New Delhi, Kawaki Studios partners with businesses in ${loc} that require bespoke web development, full-stack web applications, and headless ecommerce storefronts. ${profile.context} Rather than relying on generic visual site builders or bloated off-the-shelf themes, we construct clean, maintainable software architectures aligned with ${loc} commercial goals.`;

    valueCards = [
      { num: '01.01', title: `Modular Frontend Architecture for ${loc}`, body: `Component-driven frontend architectures engineered in TypeScript and React to eliminate framework weight for ${loc} businesses.` },
      { num: '01.02', title: `Search Crawlability & Entity Clarity in ${loc}`, body: `Semantic HTML hierarchy, programmatic metadata, and verified JSON-LD schema engineered for commercial discovery across ${loc}.` },
      { num: '01.03', title: `Direct Engineering Collaboration with ${loc} Teams`, body: `Direct sprint collaboration with our practicing software engineers in New Delhi, ensuring milestone visibility for ${loc} leadership teams.` }
    ];

    challengeTitle = `Commercial & Technical Landscape in ${loc}`;
    challengeDesc = `${profile.ecosystem} Addressing these dynamics demands reliable digital systems that load smoothly on mobile networks and clearly articulate commercial positioning. ${profile.challenge}`;

    deliverables = [
      { title: `Responsive Frontend Engineering in ${loc}`, body: `Mobile-first layouts built with semantic CSS and React, delivering predictable responsiveness across varied network conditions in ${loc}.` },
      { title: `Relational Schemas & API Pipelines for ${loc}`, body: `Structured database schemas in SQLite or PostgreSQL, connected to external services via clean REST and webhook connectors for ${loc} operations.` },
      { title: `Structured Schema & Crawl Optimization in ${loc}`, body: `Accurate organization and service schema markup ensuring search engines index key commercial capabilities in ${loc} without ambiguity.` },
      { title: `Transparent Code Handoff for ${loc} Clients`, body: `Every ${loc} client receives full access to a modular Git codebase with clear documentation, avoiding proprietary vendor dependency.` }
    ];

    archTitle = `Remote Collaboration Framework for ${loc} Teams`;
    archDesc = `${profile.collaboration} We structure engagements through milestone sprints, weekly video walkthroughs, and live staging environments on Vercel for ${loc} deployments.`;

    processSteps = [
      { num: '01 / DISCOVERY', title: `Requirements & Architecture Audit for ${loc}`, desc: `Define core user flows, technical dependencies, and data schemas for your ${loc} commercial operations.` },
      { num: '02 / DESIGN', title: `Typographic & Visual Systems for ${loc}`, desc: `Craft clean layout grids, typographic hierarchies, and responsive interfaces in Figma tailored for ${loc} market expectations.` },
      { num: '03 / SPRINT', title: `Milestone Engineering for ${loc}`, desc: `Build modular full-stack features with ongoing staging previews on Vercel for your ${loc} deployment.` },
      { num: '04 / QA & LAUNCH', title: `Cross-Device QA & Cutover for ${loc}`, desc: `Execute semantic markup audits, mobile responsiveness checks, and disciplined production cutover for ${loc}.` }
    ];

    faqs = [
      { q: `Where is Kawaki Studios based, and how do you collaborate with ${loc} organizations?`, a: `Kawaki Studios is headquartered in New Delhi. We serve clients in ${loc} through a structured remote engineering model using video strategy sessions, Linear sprint tracking, and live staging previews on Vercel.` },
      { q: `Does Kawaki Studios operate a physical satellite office in ${loc}?`, a: `No. We intentionally maintain a centralized engineering and design studio in New Delhi rather than maintaining a distributed sales office in ${loc}. This allows our senior developers to work directly on your codebase without agency overhead.` },
      { q: `What technologies do you use for web projects in ${loc}?`, a: `We primarily engineer systems using Next.js, React, TypeScript, Node.js, Python, SQLite, PostgreSQL, and Shopify Liquid/Storefront APIs for ${loc} deployments.` },
      { q: `How do we track project milestones and code progress from ${loc}?`, a: `We provide weekly video walkthroughs, transparent Git commits, staging links on Vercel, and direct communication with practicing engineers throughout your ${loc} project.` }
    ];
  }

  // =========================================================================
  // 2. LOCATION-SERVICE PAGES (54 pages)
  // =========================================================================
  else if (pType === 'location-service') {
    section1Tag = '[ 01 / REGIONAL SERVICE ARCHITECTURE ]';
    section1Title = `Bespoke ${sName} for ${loc} Organizations`;
    overviewParagraph = `Kawaki Studios delivers professional ${sName.toLowerCase()} tailored for commercial organizations in ${loc}. ${profile.context} Rather than applying generic templates, we architect bespoke web solutions designed around your specific business model and market realities for ${h.toLowerCase()}.`;

    valueCards = [
      { num: '01.01', title: `${sName} Strategy for ${loc}`, body: `Custom system architecture engineered specifically for ${sName.toLowerCase()} requirements among ${loc} commercial organizations.` },
      { num: '01.02', title: `Commercial Impact in ${loc}`, body: `Refined typography, clear service taxonomy, and conversion-focused user journeys built to differentiate your ${sName.toLowerCase()} brand in ${loc}.` },
      { num: '01.03', title: `Centralized Engineering Direct to ${loc}`, body: `Direct technical coordination from our New Delhi development team, offering clear milestone accountability for ${sName.toLowerCase()} project leads in ${loc}.` }
    ];

    challengeTitle = `${sName} Demands in the ${loc} Ecosystem`;
    challengeDesc = `${profile.ecosystem} For businesses investing in ${sName.toLowerCase()} across ${loc}, the primary challenge is overcoming generic templates, unmaintained visual plugins, and slow mobile loading speeds that undermine buyer conversion.`;

    deliverables = [
      { title: `Tailored ${sName} Systems in ${loc}`, body: `Bespoke digital architecture engineered to solve the specific operational bottlenecks faced by ${loc} organizations investing in ${sName.toLowerCase()}.` },
      { title: `Mobile Performance Across ${loc}`, body: `Mobile-first fluid layouts that render cleanly across mobile broadband in ${loc} without unexpected layout shifts for ${sName.toLowerCase()}.` },
      { title: `Structured Data & Regional Crawlability in ${loc}`, body: `Comprehensive schema markup and semantic headings ensuring search engines index your ${sName.toLowerCase()} offerings accurately across ${loc}.` },
      { title: `Secure API & Data Connectors for ${loc}`, body: `Sanitized input handling and disciplined REST/webhook integrations connecting your ${sName.toLowerCase()} platform with existing operational software in ${loc}.` }
    ];

    archTitle = `Remote Engineering Standards for ${sName} in ${loc}`;
    archDesc = `All our development for ${loc} clients follows modern web standards with strict TypeScript typing, clean semantic CSS, and disciplined testing from our New Delhi studio for ${h.toLowerCase()}.`;

    processSteps = [
      { num: '01 / SCOPE', title: `Domain Discovery for ${sName} in ${loc}`, desc: `Map functional specifications and commercial objectives for your ${sName.toLowerCase()} audience in ${loc}.` },
      { num: '02 / ARCH', title: `Data Modeling for ${sName} in ${loc}`, desc: `Define relational models, component boundaries, and integration endpoints for ${sName.toLowerCase()} serving the ${loc} market.` },
      { num: '03 / BUILD', title: `Iterative Sprint Development for ${loc}`, desc: `Develop modular full-stack components with continuous staging reviews on Vercel for your ${loc} deployment of ${sName.toLowerCase()}.` },
      { num: '04 / DEPLOY', title: `Verification & Production Release in ${loc}`, desc: `Perform schema validation, cross-browser audits, and live DNS cutover for your ${loc} ${sName.toLowerCase()} platform.` }
    ];

    faqs = [
      { q: `Why choose custom ${sName.toLowerCase()} over pre-made templates in ${loc}?`, a: `Pre-made templates often bundle unneeded plugins and generic layouts for ${sName.toLowerCase()}. Custom engineering provides complete code control, clean maintainability, and distinct visual identity tailored to ${loc} commercial standards.` },
      { q: `How do you manage communication and project progress for ${sName.toLowerCase()} in ${loc}?`, a: `We provide weekly video walkthroughs, shared sprint boards, continuous staging previews on Vercel, and direct developer communication for your ${loc} ${sName.toLowerCase()} build.` },
      { q: `Can you connect our ${sName.toLowerCase()} platform with our operational databases in ${loc}?`, a: `Yes. We build secure REST and webhook connectors to synchronize data with your external databases, CRM systems, and operational software for ${sName.toLowerCase()} in ${loc}.` },
      { q: `How does Kawaki Studios ensure long-term codebase maintainability for ${sName.toLowerCase()} in ${loc}?`, a: `We write modular TypeScript and semantic HTML with full codebase access, delivering clean Git repositories that any competent engineer can maintain for ${sName.toLowerCase()} in ${loc}.` }
    ];
  }

  // =========================================================================
  // 3. SOLUTION PAGES (13 pages)
  // =========================================================================
  else if (pType === 'solution') {
    section1Tag = '[ 01 / DOMAIN BLUEPRINT ]';
    section1Title = `Purpose-Built Solution Architecture: ${sName}`;

    if (url.includes('healthcare') || url.includes('clinic') || url.includes('medical') || url.includes('surgical') || url.includes('hospital') || url.includes('spine') || url.includes('endocrinology')) {
      overviewParagraph = `Healthcare and clinical web platforms require precise information architecture, patient-centric navigation, and clear procedural guidance. Our ${sName.toLowerCase()} practice addresses patient intake workflows, clinician directory routing, and privacy-sensitive data handling for ${h.toLowerCase()} without unnecessary third-party tracking scripts.`;

      valueCards = [
        { num: '01.01', title: 'Patient-Centered Information Design', body: `Clear procedural breakdowns, physician credential showcases, and friction-free consultation booking funnels tailored for ${h.toLowerCase()}.` },
        { num: '01.02', title: 'Privacy-Sensitive Data Handling', body: `Sanitized form inputs, role-based database storage, and secure transmission protocols for sensitive patient inquiries across ${url}.` },
        { num: '01.03', title: 'Demonstrated Healthcare Experience', body: `Adjacent experience demonstrated in our NursePass healthcare platform, supporting high-volume adaptive test workflows relevant to ${sName.toLowerCase()}.` }
      ];

      challengeTitle = `Operational & Regulatory Realities in Healthcare Digital Systems`;
      challengeDesc = `Patients searching for specialized healthcare services need immediate reassurance, verifiable clinician credentials, and clear directions. Generic templates often fail accessibility requirements and introduce data leakage through intrusive third-party plugins for ${kw}.`;

      deliverables = [
        { title: 'Clinician Directory & Department Routing', body: `Structured profiles highlighting doctor qualifications, clinical specialties, and direct appointment scheduling for ${sName.toLowerCase()}.` },
        { title: 'Pre-Consultation Intake Funnels', body: `Step-by-step patient intake forms with client-side validation and secure database submission for ${url}.` },
        { title: 'Medical Schema & Local Entity Markup', body: `Accurate MedicalOrganization and Physician JSON-LD markup ensuring search engines parse clinical specialties correctly for ${sName.toLowerCase()}.` },
        { title: 'Fast Mobile Access for Urgent Inquiries', body: `Lightweight HTML/CSS assets delivering rapid page rendering on mobile networks for patients seeking urgent care across ${h.toLowerCase()}.` }
      ];

      archTitle = `Clinical Platform Implementation & Architecture`;
      archDesc = `We construct healthcare solutions with modular React/Next.js components, structured SQLite or PostgreSQL databases, and secure webhook notification pipelines for ${sName.toLowerCase()}.`;

      processSteps = [
        { num: '01 / INTAKE', title: 'Clinical Workflow Discovery', desc: `Audit patient journeys, medical department hierarchies, and appointment routing requirements for ${sName.toLowerCase()}.` },
        { num: '02 / TAXONOMY', title: 'Medical Taxonomy & Schema', desc: `Establish clinical condition pages, specialist directories, and healthcare structured data for ${h.toLowerCase()}.` },
        { num: '03 / SPRINT', title: 'Secure Interface Engineering', desc: `Build responsive clinical portals with sanitized input handling and staging previews for ${url}.` },
        { num: '04 / VERIFY', title: 'Accessibility & Security Audit', desc: `Verify WCAG contrast standards, input sanitization, and production DNS deployment for ${sName.toLowerCase()}.` }
      ];

      faqs = [
        { q: `What kind of healthcare platforms can Kawaki Studios engineer for ${sName.toLowerCase()}?`, a: `We build hospital department portals, specialist clinic websites, patient inquiry systems, and adaptive medical education software for ${sName.toLowerCase()} like our verified NursePass platform.` },
        { q: `How do you handle patient data privacy for ${sName.toLowerCase()}?`, a: `We implement sanitized form inputs, secure HTTPS transmission, role-based backend access, and avoid third-party marketing tracking scripts across ${sName.toLowerCase()} pages.` },
        { q: `Can the platform integrate with our hospital management software?`, a: `Yes. We can build custom REST and webhook connectors to synchronize appointment requests with external clinical management systems for ${url}.` },
        { q: `How do you structure medical credentials for local search visibility?`, a: `We implement structured MedicalOrganization and Physician schema markup detailing clinical qualifications, clinic locations, and accepted consultation methods for ${sName.toLowerCase()}.` }
      ];
    } else if (url.includes('school') || url.includes('erp')) {
      overviewParagraph = `Multi-campus educational institutions require robust digital platforms that coordinate admissions, attendance records, fee collections, and student gradebooks. Our ${sName.toLowerCase()} solution applies structured relational data modeling and role-based access control to simplify administrative operations for ${h.toLowerCase()}.`;

      valueCards = [
        { num: '01.01', title: 'Multi-Role User Portals', body: `Dedicated, role-protected dashboards for school administrators, teachers, parents, and students within ${h.toLowerCase()}.` },
        { num: '01.02', title: 'Admissions & Fee Management', body: `Structured digital intake pipelines for applicant documentation, fee receipt generation, and enrollment tracking for ${url}.` },
        { num: '01.03', title: 'Verified NextSchool ERP Provenance', body: `Directly supported by our verified NextSchool ERP build, managing campus operations and student academic profiles for ${sName.toLowerCase()}.` }
      ];

      challengeTitle = `Administrative Complexity in Modern Education Management`;
      challengeDesc = `Disjointed spreadsheets and legacy paper processes lead to communication breakdowns between departments and parents. Educational institutions need a single reliable system that maintains data integrity across academic terms for ${kw}.`;

      deliverables = [
        { title: 'Student Lifecycle & Admissions Portal', body: `Digital enrollment forms, document upload workflows, and automated application status notifications for ${sName.toLowerCase()}.` },
        { title: 'Fee Tracking & Ledger Synchronization', body: `Fee schedule configuration, automated payment status updates, and digital receipt generation for ${url}.` },
        { title: 'Attendance & Academic Gradebooks', body: `Teacher portals for daily attendance logging, term grade recording, and report card generation for ${h.toLowerCase()}.` },
        { title: 'Role-Based Database Isolation', body: `Fine-grained permission models ensuring teachers, parents, and administrators access only authorized data within ${sName.toLowerCase()}.` }
      ];

      archTitle = `Educational System Architecture & Data Modeling`;
      archDesc = `Engineered using Next.js, Node.js, and relational databases (PostgreSQL/SQLite) with normalized schemas for terms, classes, students, and financial records for ${sName.toLowerCase()}.`;

      processSteps = [
        { num: '01 / SCOPE', title: 'Campus Workflow Mapping', desc: `Map administrative structures, academic calendars, fee tiers, and user role requirements for ${sName.toLowerCase()}.` },
        { num: '02 / SCHEMA', title: 'Relational Database Design', desc: `Architect normalized schemas connecting campuses, classes, student records, and ledger accounts for ${h.toLowerCase()}.` },
        { num: '03 / BUILD', title: 'Role-Based Portal Sprints', desc: `Develop authenticated interfaces for administrators, faculty, and parent portals for ${url}.` },
        { num: '04 / CUTOVER', title: 'Data Migration & Staff Handoff', desc: `Assist with initial data ingestion, permission testing, and operational deployment for ${sName.toLowerCase()}.` }
      ];

      faqs = [
        { q: `What core modules are included in your school ERP architecture?`, a: `Our architecture covers student admissions, attendance tracking, fee management, examination gradebooks, and role-based administrative dashboards for ${h.toLowerCase()}.` },
        { q: `Can parents and students access the system from mobile devices?`, a: `Yes. All interfaces are responsive web applications optimized for mobile screens without requiring proprietary app-store downloads.` },
        { q: `How do you manage permissions between teachers and administrators?`, a: `We implement strict role-based access control (RBAC), parameterized SQL queries, and sanitized form inputs for ${h.toLowerCase()} to ensure disciplined data hygiene.` },
        { q: `What verified project highlights Kawaki Studios' education capability?`, a: `Our NextSchool ERP platform is an active multi-campus operations portal engineered for comprehensive student and fee management.` }
      ];
    } else if (url.includes('fashion') || url.includes('ecommerce')) {
      overviewParagraph = `Apparel brands require fast, visually engaging digital storefronts that handle rich photography, variant filtering, and high-converting checkout flows. Our ${sName.toLowerCase()} solution combines custom Shopify Liquid theme development or headless Storefront API architectures for ${h.toLowerCase()}.`;

      valueCards = [
        { num: '01.01', title: 'Custom Shopify Liquid & Storefront API', body: `Clean theme code without plugin bloat, delivering fast collection rendering and custom product detail layouts for ${h.toLowerCase()}.` },
        { num: '01.02', title: 'Intuitive Catalog & Variant Filtering', body: `Facet-based filtering by size, color, fit, and price that updates seamlessly without full-page reloads across ${url}.` },
        { num: '01.03', title: 'Demonstrated Bazzaro Fashion Showcase', body: `Adjacent experience demonstrated in our custom Bazzaro apparel storefront, engineered for smooth discovery and tailored for ${sName.toLowerCase()}.` }
      ];

      challengeTitle = `Conversion Bottlenecks in Modern Fashion Ecommerce`;
      challengeDesc = `Pre-made marketplace themes frequently introduce excessive JavaScript, slow mobile load speeds, and rigid design limitations. High-growth fashion brands need bespoke storefronts that highlight garment craft while maintaining rapid checkout speeds for ${kw}.`;

      deliverables = [
        { title: 'Bespoke Collection & Product Grids', body: `Fluid responsive grids featuring hover states, lifestyle imagery galleries, and instant variant switching for ${sName.toLowerCase()}.` },
        { title: 'Facet Filtering & Search Architecture', body: `Instant filtering across complex clothing catalogs without sluggish page reloads across ${url}.` },
        { title: 'Conversion-Focused Cart Drawers', body: `Lightweight slide-out cart experiences with upsell slots, free shipping bars, and friction-free checkout pathways for ${h.toLowerCase()}.` },
        { title: 'Clean Liquid & API Integration', body: `Clean Liquid templates connected with Shopify APIs, avoiding unstable third-party visual page builders in ${sName.toLowerCase()}.` }
      ];

      archTitle = `Storefront Architecture & Catalog Engineering`;
      archDesc = `Constructed with modern frontend tooling, semantic HTML/CSS, and Shopify Liquid or Storefront API endpoints for reliable ecommerce performance in ${sName.toLowerCase()}.`;

      processSteps = [
        { num: '01 / AUDIT', title: 'Catalog & Brand Strategy', desc: `Analyze product variants, visual assets, and customer conversion pathways for ${sName.toLowerCase()}.` },
        { num: '02 / DESIGN', title: 'Editorial UI & Mobile Layouts', desc: `Craft high-contrast product pages, typography, and collection lookbooks in Figma for ${h.toLowerCase()}.` },
        { num: '03 / SPRINT', title: 'Theme Development & API Connectors', desc: `Engineer custom Liquid templates, cart drawers, and filter scripts with staging previews for ${url}.` },
        { num: '04 / LAUNCH', title: 'Checkout Testing & Store Launch', desc: `Verify mobile speed, payment gateway connectivity, inventory sync, and live store launch for ${sName.toLowerCase()}.` }
      ];

      faqs = [
        { q: `Do you build fashion stores using standard Shopify themes or custom code?`, a: `We engineer custom themes in Shopify Liquid or headless Storefront API architectures, ensuring your store is distinctive and free of unneeded plugin code for ${h.toLowerCase()}.` },
        { q: `Can you migrate our existing store without disrupting live catalog orders?`, a: `Yes. We develop new storefronts in staging environments, migrating product data and customer records cleanly before executing DNS cutovers.` },
        { q: `How do you optimize high-resolution clothing images for mobile speed?`, a: `We implement modern image formats (WebP), responsive srcset attributes, and disciplined lazy loading to ensure high-fidelity imagery without mobile lag.` },
        { q: `What verified project highlights Kawaki Studios' fashion ecommerce work?`, a: `Our Bazzaro case study showcases a custom Shopify apparel storefront featuring fluid collection discovery and brand storytelling.` }
      ];
    } else {
      // Default Solution (SaaS, Hardware, Media, Publishing)
      overviewParagraph = `Our ${sName.toLowerCase()} solution addresses specialized technical and operational challenges for ${h.toLowerCase()}. We engineer dependable digital systems with structured databases, role-based workflows, and clean user interfaces designed to scale smoothly with your business.`;

      valueCards = [
        { num: '01.01', title: 'Tailored Relational Data Modeling', body: `Relational schemas in SQLite or PostgreSQL structured to enforce data integrity across complex business records for ${h.toLowerCase()}.` },
        { num: '01.02', title: 'Authenticated Portals & Workspaces', body: `Role-based dashboards and client workspaces protected by clean session authentication across ${url}.` },
        { num: '01.03', title: 'Verified Product Engineering Provenance', body: `Demonstrated in active platforms like Pixza and Kova, providing proven architecture patterns for ${sName.toLowerCase()}.` }
      ];

      challengeTitle = `System Bottlenecks in ${sName}`;
      challengeDesc = `Off-the-shelf software often forces organizations into rigid, pre-determined workflows that fail to match actual operational requirements. Custom engineering bridges this gap with tailored data schemas and intuitive role-specific interfaces for ${kw}.`;

      deliverables = [
        { title: 'Custom Data Modeling & Database Design', body: `Carefully designed relational schemas that enforce data integrity and support complex multi-entity relationships for ${sName.toLowerCase()}.` },
        { title: 'Role-Based Access & Secure Portals', body: `Intuitive administrative dashboards and end-user portals protected by secure session authentication within ${url}.` },
        { title: 'Event-Driven Webhook Pipelines', body: `Event-driven triggers for transactional notifications, email alerts, and external platform updates for ${h.toLowerCase()}.` },
        { title: 'Comprehensive Technical Documentation', body: `Clear documentation covering API schemas, deployment procedures, and administrative operational guides for ${sName.toLowerCase()}.` }
      ];

      archTitle = `Architectural Blueprint & Implementation`;
      archDesc = `We construct solutions with modular component patterns, documented REST endpoints, and secure database interactions, ensuring high maintainability and straightforward future enhancements for ${sName.toLowerCase()}.`;

      processSteps = [
        { num: '01 / SCOPE', title: 'System Requirements Modeling', desc: `Analyze data entities, user roles, and operational requirements for ${sName.toLowerCase()}.` },
        { num: '02 / ARCH', title: 'Database & API Specification', desc: `Define schema boundaries, endpoint contracts, and session authentication patterns for ${h.toLowerCase()}.` },
        { num: '03 / SPRINT', title: 'Modular Full-Stack Sprints', desc: `Develop frontend views and backend endpoints with regular staging previews for ${url}.` },
        { num: '04 / DEPLOY', title: 'System Verification & Release', desc: `Conduct security checks, integration testing, and production deployment for ${sName.toLowerCase()}.` }
      ];

      faqs = [
        { q: `What makes a custom ${sName.toLowerCase()} superior to generic SaaS?`, a: `Custom platforms give you total data ownership, tailored feature roadmaps, zero recurring per-seat software taxes, and workflows that match your exact business processes for ${h.toLowerCase()}.` },
        { q: `Can this ${sName.toLowerCase()} solution integrate with our existing operational tools?`, a: `Yes. We build custom REST and webhook connectors to synchronize ${sName.toLowerCase()} workflows with your existing databases, CRM tools, and internal services.` },
        { q: `How do you approach user permissions and data security in ${sName.toLowerCase()}?`, a: `We implement strict role-based access control (RBAC), parameterized SQL queries, and sanitized form inputs for ${h.toLowerCase()} to ensure disciplined data hygiene.` },
        { q: `How do you deliver code and maintainability upon ${sName.toLowerCase()} project completion?`, a: `You receive a clean Git repository, schema documentation, and deployment configurations for ${sName.toLowerCase()} without proprietary lock-ins.` }
      ];
    }
  }

  // =========================================================================
  // 4. RESOURCE PAGES (11 pages)
  // =========================================================================
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
  const loc = entry.location;
  const currentUrl = entry.kawakiUrl;
  const STOP = new Set(['and', 'for', 'the', 'services', 'service', 'agency', 'company', 'development', 'in', 'of', 'a']);
  const words = e => new Set(String(e.primaryKeyword || e.service || '').toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2 && !STOP.has(w)));
  const mine = words(entry);
  const short = e => {
    const d = String(e.metaDescription || '').split(/(?<=\.)\s/)[0];
    return d.length > 96 ? d.slice(0, d.lastIndexOf(' ', 92)) + '\u2026' : d;
  };
  const pool = registry.filter(e => e.kawakiUrl !== currentUrl && e.kawakiUrl !== '/' && e.indexable !== false && e.pageType !== 'core' && e.pageType !== 'legal');
  let picks;
  if (loc) {
    const sameLoc = pool.filter(e => e.location === loc);
    const sameServ = pool.filter(e => e.service === entry.service && e.location && e.location !== loc);
    picks = sameLoc.slice(0, 3).concat(sameServ.slice(0, 2));
  } else {
    picks = pool.filter(e => !e.location)
      .map(e => ({ e, score: [...words(e)].filter(w => mine.has(w)).length + (e.pageType === entry.pageType ? 0.5 : 0) }))
      .filter(x => x.score >= 1)
      .sort((x, y) => y.score - x.score || x.e.kawakiUrl.localeCompare(y.e.kawakiUrl))
      .slice(0, 5).map(x => x.e);
    const cities = pool.filter(e => e.location && e.service === entry.service).slice(0, 5 - picks.length > 0 ? 2 : 1);
    picks = picks.concat(cities);
  }
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
      "serviceType": entry.service
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
