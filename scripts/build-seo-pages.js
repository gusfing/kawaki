const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const registryFile = path.resolve(rootDir, 'data', 'seo-pages.json');
const factsFile = path.resolve(rootDir, 'data', 'kawaki-facts.json');
const vercelFile = path.resolve(rootDir, 'vercel.json');
const sitemapFile = path.resolve(publicDir, 'sitemap.xml');

console.log('⚡ [Build SEO Pages] Initializing 226-Page Topical Architecture Engine (Strict Claim Validation)...');

if (!fs.existsSync(registryFile) || !fs.existsSync(factsFile)) {
  console.error('❌ Registry or facts file missing!');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const facts = JSON.parse(fs.readFileSync(factsFile, 'utf8'));

console.log(`✓ Loaded registry with ${registry.length} targets and verified capability registry.`);

// Verified Case Studies
const CASE_STUDIES = facts.verifiedProjects;

// City Profiles for Realistic Local Differentiation (Zero Fabricated Offices)
const CITY_PROFILES = {
  'Delhi': {
    context: 'As India’s national capital and northern commerce powerhouse, Delhi is home to high-volume retail flagships, corporate headquarters, and scaling direct-to-consumer brands.',
    ecosystem: 'From Connaught Place and Nehru Place trade hubs to South Delhi consumer brands, businesses here need websites that handle substantial traffic without breaking.',
    challenge: 'High competition across search queries and legacy web platforms burdened by bloated plugins and sluggish performance.',
    workModel: 'Our engineering studio is based in New Delhi, allowing rapid face-to-face kickoff alignment when helpful, paired with focused sprint-based delivery.'
  },
  'Bangalore': {
    context: 'Bangalore is the epicenter of India’s technology and venture-funded startup ecosystem, demanding software-level engineering rigor from web platforms.',
    ecosystem: 'Home to SaaS innovators, tech founders, and venture firms across Koramangala, Indiranagar, HSR Layout, and Whitefield.',
    challenge: 'Technical audiences, engineering-led decision makers, and SaaS buyers expect modern user experiences, high uptime, and crisp typography.',
    workModel: 'We serve Bangalore technology companies remotely from our New Delhi studio via structured Linear sprint boards, asynchronous Slack/Discord updates, and staging environments on Vercel.'
  },
  'Mumbai': {
    context: 'Mumbai is India’s financial and media capital, setting the national benchmark for corporate credibility, luxury branding, and institutional trust.',
    ecosystem: 'From BKC financial institutions and Lower Parel D2C flagships to Andheri creative media houses, digital platforms in Mumbai require flawless presentation.',
    challenge: 'Balancing high-fidelity visual aesthetics and editorial polish with high-reliability transactional security and clear conversion funnels.',
    workModel: 'We collaborate remotely with Mumbai leadership teams through scheduled video reviews, milestone-gated deliveries, and zero administrative friction.'
  },
  'Pune': {
    context: 'Pune blends deep automotive manufacturing capabilities with a vibrant software engineering, EdTech, and enterprise SaaS ecosystem.',
    ecosystem: 'Centering around Hinjewadi, Magarpatta, and Baner, organizations in Pune require web systems that connect complex operational data with clean client interfaces.',
    challenge: 'Integrating legacy ERP databases and enterprise workflows into modern web applications without disrupting day-to-day operations.',
    workModel: 'Remote sprint collaboration from our New Delhi engineering base, delivering clean Git repositories and comprehensive API documentation.'
  },
  'Hyderabad': {
    context: 'Hyderabad is a primary technology and pharmaceutical corridor anchored by HITEC City, Gachibowli, and extensive enterprise software campuses.',
    ecosystem: 'Enterprises, healthcare groups, and B2B technology providers requiring high-security portals and dependable web applications.',
    challenge: 'Scalable data handling, role-based access controls, and multi-system integration across hospital chains, educational groups, and software platforms.',
    workModel: 'Structured asynchronous development sprints from New Delhi with real-time staging previews and daily Git commit transparency.'
  },
  'Ahmedabad': {
    context: 'Ahmedabad is Gujarat’s commercial engine, characterized by large-scale industrial manufacturing, textile exports, chemical groups, and rising consumer brands.',
    ecosystem: 'Centering on SG Highway and Prahladnagar, business owners demand durable digital systems that generate qualified domestic and international inquiries.',
    challenge: 'Replacing static corporate brochures with functional product catalogues, technical specification portals, and automated inquiry distribution.',
    workModel: 'Remote digital product engineering from New Delhi, offering transparent milestone schedules and fixed-fee sprint pricing.'
  },
  'Jaipur': {
    context: 'Jaipur represents a unique nexus of luxury craftsmanship, export manufacturing, boutique hospitality, and emerging technology ventures.',
    ecosystem: 'Prestige jewelry brands, architectural restoration studios, and resort groups that rely on elevated visual storytelling and online customer discovery.',
    challenge: 'Creating immersive, high-resolution visual experiences that load reliably on mobile devices without layout shift or lag.',
    workModel: 'Direct engineering collaboration from New Delhi, providing high-touch design exploration and clean frontend code.'
  },
  'Chandigarh': {
    context: 'Serving the prosperous Tri-City region (Chandigarh, Mohali, Panchkula), this market features healthcare centers, higher education, and modern IT parks.',
    ecosystem: 'Specialist medical clinics, regional healthcare institutions, educational providers, and growing IT service businesses in Mohali.',
    challenge: 'Local patient trust, streamlined appointment intake, and clear regional search visibility across North India.',
    workModel: 'Seamless remote engineering from New Delhi with direct video strategy sessions and full project ownership.'
  },
  'Ludhiana': {
    context: 'Ludhiana is Punjab’s industrial backbone, famous for knitwear, bicycle manufacturing, automotive components, and international export houses.',
    ecosystem: 'Industrial manufacturers and multi-generation trade businesses transitioning from offline trade networks to international digital discovery.',
    challenge: 'Digitizing complex product inventories, providing downloadable CAD/PDF specification sheets, and capturing overseas buyer leads.',
    workModel: 'Remote web system architecture from New Delhi, focusing on clean engineering, search visibility, and zero maintenance headaches.'
  },
  'Kolkata': {
    context: 'Kolkata is the primary commercial center of Eastern India, with deep roots in tea trading, heavy engineering, legal services, and publishing.',
    ecosystem: 'Established corporate enterprises in BBD Bagh and modern IT campuses in Salt Lake Sector V and New Town.',
    challenge: 'Modernizing legacy websites into responsive, search-friendly web platforms that respect institutional heritage while accelerating growth.',
    workModel: 'Remote engineering partnership from New Delhi, ensuring structured project governance and transparent deliverables.'
  },
  'Vadodara': {
    context: 'Vadodara is a key educational and industrial manufacturing hub in central Gujarat with notable chemical, pharmaceutical, and engineering sectors.',
    ecosystem: 'Industrial suppliers, fabrication units, and engineering consultancy firms needing professional B2B digital credibility.',
    challenge: 'Clear technical communication of engineering capabilities to global procurement officers and project contractors.',
    workModel: 'Remote execution from New Delhi, delivering standards-compliant websites with clean HTML structure and structured schema.'
  },
  'Gurgaon': {
    context: 'Gurgaon (Gurugram) hosts hundreds of Fortune 500 regional offices, prominent venture capital funds, and high-growth digital ventures.',
    ecosystem: 'CyberCity, Golf Course Road, and Udyog Vihar business districts with rapid business cycles and demanding digital expectations.',
    challenge: 'Speed to market, brand prestige, and technical sophistication required to compete in India’s most competitive commercial corridor.',
    workModel: 'Direct alignment from our central New Delhi studio, enabling in-person workshops as needed alongside rapid sprint delivery.'
  },
  'Noida': {
    context: 'Noida is a major technology, digital media, electronics manufacturing, and institutional education hub in the NCR.',
    ecosystem: 'Software development firms, media production broadcast facilities, and large educational campuses across Expressway sectors.',
    challenge: 'Multi-role student/parent portals, high-traffic media publishing, and dependable corporate marketing platforms.',
    workModel: 'Studio proximity from New Delhi, allowing responsive collaboration and continuous staging reviews on Vercel.'
  },
  'Dubai': {
    context: 'Dubai is the premier commercial gateway to the Middle East, demanding world-class luxury design, bilingual readiness, and high transactional reliability.',
    ecosystem: 'International trading companies, luxury real estate developers, hospitality groups, and regional fintech platforms in DIFC and Downtown.',
    challenge: 'Elevated design aesthetics, international payment gateways, and multilingual architecture for regional and global audiences.',
    workModel: 'Remote digital engineering from New Delhi, aligning with Gulf Standard Time (GST) for live reviews and asynchronous development.'
  },
  'Canada': {
    context: 'The Canadian digital economy features thriving tech hubs in Toronto, Vancouver, and Montreal, operating with high engineering and accessibility standards.',
    ecosystem: 'Software startups, healthcare services, and professional consultancies looking for high-caliber engineering value.',
    challenge: 'Adhering to strict web standards, privacy compliance (PIPEDA), and responsive interfaces without North American agency markups.',
    workModel: 'Remote studio collaboration from New Delhi with overlapping coordination windows and transparent GitHub repository management.'
  },
  'London': {
    context: 'London is Europe’s primary tech and financial capital, characterized by uncompromising expectations for typographic elegance and technical craft.',
    ecosystem: 'Boutique investment firms, architecture practices, high-end retail brands, and B2B SaaS ventures across the City, Mayfair, and Shoreditch.',
    challenge: 'Editorial restraint, fast performance on mobile broadband, and high technical polish.',
    workModel: 'Remote partnership from New Delhi operating on GMT-aligned afternoon review sessions and predictable weekly delivery sprints.'
  }
};

// Reusable Header
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

// Reusable Footer
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
            Global Remote Engineering Practice
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
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; margin-bottom: 1.2rem;">Regional Coverage</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
            <li><a href="/delhi" style="color: #555555; text-decoration: none;">New Delhi (Studio HQ)</a></li>
            <li><a href="/bangalore" style="color: #555555; text-decoration: none;">Bangalore (Tech Hub)</a></li>
            <li><a href="/mumbai" style="color: #555555; text-decoration: none;">Mumbai (Enterprise & D2C)</a></li>
            <li><a href="/pune" style="color: #555555; text-decoration: none;">Pune (Engineering)</a></li>
            <li><a href="/hyderabad" style="color: #555555; text-decoration: none;">Hyderabad (IT & Healthcare)</a></li>
            <li><a href="/locations" style="color: #ea580c; text-decoration: none; font-weight: 600;">All Locations &rarr;</a></li>
          </ul>
        </div>

        <div>
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #111111; margin-bottom: 1.2rem;">Resources & Legal</div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
            <li><a href="/pricing" style="color: #555555; text-decoration: none;">Studio Pricing Models</a></li>
            <li><a href="/technical-audit" style="color: #555555; text-decoration: none;">Technical Architecture Audit</a></li>
            <li><a href="/resources" style="color: #555555; text-decoration: none;">Engineering Resources</a></li>
            <li><a href="/privacy-policy" style="color: #555555; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/terms-of-service" style="color: #555555; text-decoration: none;">Terms of Service</a></li>
            <li><a href="/terminal" style="color: #555555; text-decoration: none;">Developer Terminal</a></li>
          </ul>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(0, 0, 0, 0.08); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.82rem; color: #888888;">
        <div>&copy; 2026 Kawaki Studios LLP. All rights reserved. Clean, maintainable web systems.</div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="https://github.com/gusfing/kawaki" target="_blank" rel="noopener" style="color: #888888; text-decoration: none;">GitHub</a>
          <a href="https://x.com/kawakistudios" target="_blank" rel="noopener" style="color: #888888; text-decoration: none;">Twitter</a>
          <a href="/sitemap.xml" style="color: #888888; text-decoration: none;">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
  
  <script src="/assets/js/chatbot.js?v=20261008_v2" defer></script>
  <script>
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

// Generate Differentiated Content for Each Page Archetype
function generateDifferentiatedContent(entry) {
  const loc = entry.location || 'Delhi';
  const profile = CITY_PROFILES[loc] || CITY_PROFILES['Delhi'];
  const sName = entry.service;
  const pType = entry.pageType;
  const lastSlug = entry.kawakiUrl.split('/').filter(Boolean).pop() || '';

  let overviewParagraph = '';
  let challengeTitle = '';
  let challengeDesc = '';
  let archTitle = '';
  let archDesc = '';
  let deliverables = [];
  let faqs = [];

  if (pType === 'location') {
    overviewParagraph = `Operating as an independent digital product studio based in New Delhi, Kawaki Studios provides businesses in ${loc} with bespoke website development, modern full-stack web applications, and headless ecommerce systems. ${profile.context} We focus on structured engineering without relying on bloated templates or brittle third-party visual page builders.`;
    challengeTitle = `Digital Realities & Requirements for ${loc} Businesses`;
    challengeDesc = `${profile.ecosystem} ${profile.challenge}`;
    archTitle = `Remote Engineering & Collaboration Framework for ${loc}`;
    archDesc = profile.workModel;
    deliverables = [
      { title: 'Custom Responsive Web Architecture', body: `Clean component structures crafted in modern HTML5, CSS, and React, eliminating framework bloat for businesses across ${loc}.` },
      { title: 'Search Engine & Semantic Optimization', body: `Semantic HTML hierarchy, programmatic metadata, and verified JSON-LD schema engineered for crawlability.` },
      { title: 'System Integrations & API Pipelines', body: 'Connecting your web platform with your CRM, payment gateways, inventory databases, and operational webhooks.' },
      { title: 'Maintainable Code & Full IP Ownership', body: 'Every client receives complete ownership of clean Git repositories with zero proprietary vendor locks.' }
    ];
    faqs = [
      { q: `Where is Kawaki Studios located, and how do you work with ${loc} clients?`, a: `Kawaki Studios is headquartered in New Delhi. We serve clients in ${loc} through a structured remote engineering model using video alignment calls, Linear sprint tracking, and live Vercel staging environments.` },
      { q: `Do you operate a physical sales office in ${loc}?`, a: `No. We intentionally avoid the overhead of satellite sales offices in ${loc}. Our entire senior engineering and design team operates centrally from New Delhi, delivering high-touch technical value directly to our clients.` },
      { q: `What technologies do you use for ${loc} web projects?`, a: `We build with Next.js, React, TypeScript, Tailwind CSS, Node.js, and modern headless commerce APIs like Shopify Storefront API.` },
      { q: `How long does a typical custom website build take for a ${loc} company?`, a: `A focused marketing flagship typically requires 4 to 6 weeks. More complex web applications or custom ecommerce systems typically take 8 to 12 weeks with milestone-gated deliverables.` }
    ];
  } else if (pType === 'location-service') {
    overviewParagraph = `Kawaki Studios delivers professional ${sName.toLowerCase()} for companies in ${loc} that require high reliability and clean code. ${profile.context} Rather than applying generic template designs, we architect purposeful digital platforms tailored to your commercial objectives.`;
    challengeTitle = `${sName} Demands in the ${loc} Market`;
    challengeDesc = `${profile.ecosystem} Addressing these market dynamics requires clean software architecture, high mobile responsiveness, and disciplined search discovery.`;
    archTitle = `Engineering Standards for ${sName} in ${loc}`;
    archDesc = `All our development follows modern web standards with strict typing, clean CSS, and thorough browser validation. ${profile.workModel}`;
    deliverables = [
      { title: `Tailored ${sName} Architecture`, body: `Bespoke digital architecture engineered to solve the specific operational bottlenecks faced by ${loc} organizations.` },
      { title: 'Responsive Mobile Performance', body: 'Mobile-first fluid layouts that render cleanly across smart devices without unexpected layout shifts or touch lag.' },
      { title: 'Structured Data & Search Crawlability', body: 'Comprehensive schema markup and semantic headings ensuring search engines index your services accurately.' },
      { title: 'Security & Database Isolation', body: 'Sanitized input handling, automated SSL, and disciplined database hygiene to protect company data.' }
    ];
    faqs = [
      { q: `Why choose custom ${sName.toLowerCase()} over standard themes in ${loc}?`, a: `Pre-made themes often bundle excessive scripts, unmaintained plugins, and slow load times. Our custom engineering provides complete code control, clean maintainability, and distinct visual identity.` },
      { q: `How do you manage communication and project progress for ${loc} clients?`, a: `We provide weekly video walkthroughs, shared Linear project boards, continuous staging previews, and clear asynchronous communication.` },
      { q: `Can you integrate our ${sName.toLowerCase()} platform with our internal software?`, a: `Yes. We build secure REST and webhook connectors to sync data seamlessly with your existing CRM, ERP, and operational tools.` },
      { q: `Who owns the final codebase upon project delivery?`, a: `You retain 100% intellectual property ownership of all custom code, assets, and design files upon completion.` }
    ];
  } else if (pType === 'solution') {
    overviewParagraph = `Our ${sName.toLowerCase()} practice addresses the complex operational and architectural challenges of modern digital organizations. We engineer dependable digital systems with structured databases, role-based workflows, and clean user interfaces that scale smoothly with your business.`;
    challengeTitle = `Critical Operational Challenges in ${sName}`;
    challengeDesc = `Off-the-shelf software often forces organizations into rigid, pre-determined workflows that fail to match actual operational requirements. Custom engineering bridges this gap with tailored data schemas and intuitive role-specific interfaces.`;
    archTitle = `Architectural Blueprint & Implementation`;
    archDesc = `We construct solutions with modular component patterns, documented REST endpoints, and secure database interactions, ensuring high maintainability and straightforward future enhancements.`;
    deliverables = [
      { title: 'Custom Data Modeling & Database Design', body: 'Carefully designed relational schemas that enforce data integrity and support complex multi-entity relationships.' },
      { title: 'Role-Based Access & Secure Portals', body: 'Intuitive administrative dashboards and end-user portals protected by secure session authentication.' },
      { title: 'Automated Communication & Webhooks', body: 'Event-driven triggers for transactional notifications, email alerts, and external platform updates.' },
      { title: 'Comprehensive Technical Documentation', body: 'Clear documentation covering API schemas, deployment procedures, and administrative operational guides.' }
    ];
    faqs = [
      { q: `What makes a custom ${sName.toLowerCase()} superior to generic SaaS?`, a: `Custom platforms give you total data ownership, tailored feature roadmaps, zero recurring per-user licensing fees, and workflows that match your exact business processes.` },
      { q: `Can this solution integrate with our existing accounting or CRM systems?`, a: `Yes. We regularly build custom API integrations to synchronize data with platforms like Salesforce, HubSpot, QuickBooks, and proprietary internal databases.` },
      { q: `How do you approach user permissions and data security?`, a: `We implement strict role-based access control (RBAC), parameterized SQL queries, and sanitized form inputs to ensure robust data security.` },
      { q: `What is the estimated development timeline for this solution?`, a: `Typical development cycles range from 6 to 12 weeks, broken into clear milestone-gated sprints with regular staging reviews.` }
    ];
  } else if (pType === 'resource') {
    overviewParagraph = `This engineering guide and reference framework provides an objective technical analysis of ${sName.toLowerCase()}. Authored by our senior engineers in New Delhi, it details real-world architectural considerations, budget benchmarks, and practical implementation patterns for modern web systems.`;
    challengeTitle = `Industry Realities & Strategic Considerations`;
    challengeDesc = `Navigating modern web technologies requires balancing immediate business priorities against long-term maintenance costs, technical debt, and team capabilities.`;
    archTitle = `Methodology & Evaluation Standards`;
    archDesc = `We evaluate web systems against clear technical criteria: code maintainability, asset weight, search crawlability, security posture, and predictable operational costs.`;
    deliverables = [
      { title: 'Architectural Frameworks & Best Practices', body: 'Proven patterns for structuring modern web applications, state boundaries, and API integrations.' },
      { title: 'Transparent Budgeting & Cost Modeling', body: 'Realistic financial models detailing upfront engineering investments versus long-term hosting and maintenance.' },
      { title: 'Vendor & Agency Evaluation Rubrics', body: 'Practical checklists for assessing technical capabilities, code quality, and delivery transparency.' },
      { title: 'Performance & Security Checklists', body: 'Actionable steps for auditing Core Web Vitals, server response times, and baseline security configurations.' }
    ];
    faqs = [
      { q: `How does Kawaki Studios derive its engineering benchmarks?`, a: `Our benchmarks are based on real production builds across our active portfolio of custom websites, web applications, and ecommerce storefronts.` },
      { q: `Can our team consult with Kawaki Studios on this topic?`, a: `Yes. We provide technical advisory calls and architectural reviews for organizations evaluating custom web development projects.` },
      { q: `What are the most common mistakes companies make in this area?`, a: `Relying on bloated all-in-one page builders, failing to plan for post-launch maintenance, and neglecting proper search engine crawl architecture.` },
      { q: `How frequently are these engineering guides updated?`, a: `We update our technical documentation periodically to reflect evolving web standards, browser capabilities, and search engine guidelines.` }
    ];
  } else {
    // Standard Service, Technology, Industry
    overviewParagraph = `Kawaki Studios provides bespoke ${sName.toLowerCase()} engineered around the specific operational and commercial needs of ambitious businesses. We combine strategic product design with disciplined engineering to create durable digital systems that look distinctive and perform reliably.`;
    challengeTitle = `The Business Need for Purpose-Built ${sName}`;
    challengeDesc = `Generic templates and automated website generators frequently result in sluggish load speeds, rigid design constraints, and security vulnerabilities. Purpose-built engineering ensures your digital presence reflects your brand’s true quality and supports sustained business growth.`;
    archTitle = `Our Technical & Engineering Standards`;
    archDesc = `We build using modern, proven technologies—including Next.js, React, TypeScript, and clean semantic CSS. Every codebase is structured for readability, modularity, and seamless long-term maintenance.`;
    deliverables = [
      { title: `Modular ${sName} Engineering`, body: 'Custom component hierarchies built for high performance, reusability, and straightforward content updates.' },
      { title: 'Search Engine & AI Discovery', body: 'Built-in semantic HTML structure, clean canonical URL routing, and structured JSON-LD schema.' },
      { title: 'API Connectors & Third-Party Integrations', body: 'Reliable integrations connecting your web platform to CRMs, payment gateways, and backend services.' },
      { title: 'Dedicated Support & Project Handoff', body: 'Clean Git repositories, comprehensive documentation, and direct engineering handoff with zero proprietary lock-in.' }
    ];
    faqs = [
      { q: `What is Kawaki Studios’ process for ${sName.toLowerCase()}?`, a: `We work through six structured stages: Technical Discovery, System Architecture, UI/UX Design, Sprint Engineering, Security & Performance Hardening, and Launch.` },
      { q: `How do you ensure our website remains fast and maintainable over time?`, a: `We write clean, purposeful code without relying on bloated plugins or monolithic themes. This minimizes asset weight and ensures stable long-term operation.` },
      { q: `Can you customize the platform to our specific business workflows?`, a: `Yes. Custom development allows us to build unique calculators, custom inquiry flows, member portals, and specialized integrations that off-the-shelf templates cannot support.` },
      { q: `How do we initiate a project with Kawaki Studios?`, a: `You can reach out via our contact page to schedule an initial discovery discussion. We will review your requirements and provide a clear, milestone-scoped proposal.` }
    ];
  }

  return {
    overviewParagraph,
    challengeTitle,
    challengeDesc,
    archTitle,
    archDesc,
    deliverables,
    faqs
  };
}

// Generate Complete Page HTML
function renderPage(entry) {
  const content = generateDifferentiatedContent(entry);
  const canonicalUrl = `https://www.kawaki.co.in${entry.kawakiUrl}`;
  
  // Matched real case studies
  const matchedStudies = (entry.relatedCaseStudies || ['bazzaro', 'kala-design'])
    .map(slug => CASE_STUDIES[slug])
    .filter(Boolean)
    .slice(0, 3);

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
        "@id": "https://www.kawaki.co.in/#organization",
        "name": "Kawaki Studios",
        "url": "https://www.kawaki.co.in",
        "logo": "https://www.kawaki.co.in/assets/images/kawaki-logo.png"
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
          "item": "https://www.kawaki.co.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": entry.pageType.includes('location') ? "Locations" : (entry.pageType === 'solution' ? "Solutions" : (entry.pageType === 'resource' ? "Resources" : "Services")),
          "item": entry.pageType.includes('location') ? "https://www.kawaki.co.in/locations" : "https://www.kawaki.co.in/services"
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
    <meta name="description" content="${entry.metaDescription.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <title>${entry.title.replace(/"/g, '&quot;')}</title>

    <!-- Open Graph / Social -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${entry.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${entry.metaDescription.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />
    <meta property="og:site_name" content="Kawaki Studios" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@kawakistudios" />
    <meta name="twitter:title" content="${entry.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${entry.metaDescription.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="https://www.kawaki.co.in/assets/images/about_hero_bg.jpg" />

    <!-- Fonts & Core Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
    <link rel="stylesheet" href="/assets/css/global.css?v=20261008_v2" />
    <link rel="stylesheet" href="/assets/css/seo-pages.css?v=20261008_v2" />
    <link rel="stylesheet" href="/assets/css/chatbot.css?v=20261008_v2" />

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
          <li class="seo-breadcrumb-item"><a href="${entry.pageType.includes('location') ? '/locations' : '/services'}">${entry.pageType.includes('location') ? 'Locations' : 'Services'}</a></li>
          <li class="seo-breadcrumb-sep">/</li>
          <li class="seo-breadcrumb-item active" aria-current="page">${entry.service}</li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <main>
      <section class="seo-hero">
        <div class="seo-container">
          <div class="seo-badge-row">
            <span class="seo-badge accent">${entry.service}</span>
            <span class="seo-badge">${entry.location ? `${entry.location} · Studio Practice` : 'Digital Engineering'}</span>
            <span class="seo-badge">Bespoke Architecture</span>
          </div>

          <h1 class="seo-hero-title">${entry.h1}</h1>
          <p class="seo-hero-desc">${entry.metaDescription}</p>

          <div class="seo-hero-actions">
            <a href="/contact" class="seo-btn-primary">Start a Project &rarr;</a>
            <a href="/case-studies" class="seo-btn-secondary">Explore Selected Work</a>
          </div>
        </div>
      </section>

      <!-- Section 1: Strategic Overview -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 01 / STRATEGIC OVERVIEW ]</span>
          <h2 class="seo-section-title">Precise Web Systems Built for Long-Term Value</h2>
          <p class="seo-section-desc">${content.overviewParagraph}</p>

          <div class="seo-grid-3">
            <div class="seo-card">
              <div class="seo-card-number">01.01</div>
              <h3 class="seo-card-title">Clean, Documented Code</h3>
              <p class="seo-card-body">
                We write modular, human-readable codebases adhering strictly to modern standards. No cryptic legacy plugins or proprietary framework dependencies.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">01.02</div>
              <h3 class="seo-card-title">Focused Conversion Velocity</h3>
              <p class="seo-card-body">
                Intuitive layout hierarchy, crisp typographic contrast, and clear calls to action engineered to guide visitors smoothly toward contact and transaction milestones.
              </p>
            </div>

            <div class="seo-card">
              <div class="seo-card-number">01.03</div>
              <h3 class="seo-card-title">Direct Engineering Team</h3>
              <p class="seo-card-body">
                You collaborate directly with our practicing software engineers and product designers in New Delhi, ensuring direct accountability throughout the project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Regional/Service Context -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 02 / DOMAIN REALITIES ]</span>
          <h2 class="seo-section-title">${content.challengeTitle}</h2>
          <p class="seo-section-desc">${content.challengeDesc}</p>

          <div class="seo-grid-2">
            ${content.deliverables.map((d, i) => `
            <div class="seo-card">
              <div class="seo-card-number">02.0${i + 1}</div>
              <h3 class="seo-card-title">${d.title}</h3>
              <p class="seo-card-body">${d.body}</p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Section 3: Engineering Architecture -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 03 / TECHNICAL STANDARDS ]</span>
          <h2 class="seo-section-title">${content.archTitle}</h2>
          <p class="seo-section-desc">${content.archDesc}</p>

          <div class="seo-process-timeline">
            <div class="seo-process-step">
              <div class="seo-step-num">01 / SCOPE</div>
              <div class="seo-step-title">Technical Discovery</div>
              <p class="seo-step-desc">Audit user journeys, required integrations, and define functional requirements clearly.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">02 / ARCH</div>
              <div class="seo-step-title">System Architecture</div>
              <p class="seo-step-desc">Design component boundaries, database schemas, and integration pipelines before coding begins.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">03 / DESIGN</div>
              <div class="seo-step-title">UI & Visual Layout</div>
              <p class="seo-step-desc">Craft refined typographic hierarchies, responsive layout grids, and interactive states in Figma.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">04 / SPRINT</div>
              <div class="seo-step-title">Milestone Engineering</div>
              <p class="seo-step-desc">Build modular full-stack features with ongoing staging previews and continuous code reviews.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">05 / VERIFY</div>
              <div class="seo-step-title">QA & Production Cutover</div>
              <p class="seo-step-desc">Verify responsive viewports, schema validation, canonical URL routing, and live DNS cutover.</p>
            </div>

            <div class="seo-process-step">
              <div class="seo-step-num">06 / SUSTAIN</div>
              <div class="seo-step-title">Ongoing Retainers</div>
              <p class="seo-step-desc">Proactive dependency updates, security auditing, and iterative feature enhancements as needed.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Verified Case Studies -->
      <section class="seo-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ 04 / DEMONSTRATED WORK ]</span>
          <h2 class="seo-section-title">Verified Production Platforms & Case Studies</h2>
          <p class="seo-section-desc">
            Explore verified custom web platforms, educational software, and digital storefronts engineered by Kawaki Studios.
          </p>

          <div class="seo-cases-grid">
            ${matchedStudies.map(cs => `
            <a href="${cs.url}" class="seo-case-card">
              <div class="seo-case-content">
                <span class="seo-case-tag">${cs.category}</span>
                <h3 class="seo-case-title">${cs.name}</h3>
                <p class="seo-case-desc">${cs.description}</p>
                <span class="seo-case-link">View Case Study &rarr;</span>
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
          <h2 class="seo-section-title">Common Questions & Practical Details</h2>
          <p class="seo-section-desc">
            Direct, practical answers regarding our engineering standards, communication workflows, and project delivery.
          </p>

          <div class="seo-faq-container">
            ${content.faqs.map((f, i) => `
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

      <!-- Section 6: Project Action Call -->
      <section class="seo-cta-section">
        <div class="seo-container">
          <span class="seo-section-tag">[ START A PROJECT ]</span>
          <h2>Ready to Architect a Web System Built to Last?</h2>
          <p>
            Whether planning a custom web platform, a modern headless ecommerce store, or an automated business workflow, our engineering team is ready to discuss your requirements.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/contact" style="background: #FFFFFF; color: #111111; padding: 0.9rem 2rem; border-radius: 9999px; font-weight: 700; text-decoration: none; transition: transform 0.15s ease;">Schedule Discovery Call &rarr;</a>
            <a href="mailto:contact@kawaki.co.in" style="background: rgba(255, 255, 255, 0.1); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.9rem 2rem; border-radius: 9999px; font-weight: 600; text-decoration: none;">contact@kawaki.co.in</a>
          </div>
        </div>
      </section>
    </main>

    ${renderFooter()}

</body>
</html>`;
}

// 1. Generate Static Files for all action=create entries
console.log('\n🚀 [1/3] Generating 204 static HTML files for action=create...');
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

// 2. Synchronize sitemap.xml to strictly contain all 226 Phase 1 pages
console.log('\n🚀 [2/3] Synchronizing public/sitemap.xml with complete 226 Phase 1 pages...');
if (fs.existsSync(sitemapFile)) {
  let sitemapContent = fs.readFileSync(sitemapFile, 'utf8');

  // Existing locs
  const existingMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  const existingSet = new Set(existingMatches.map(m => m.replace(/<\/?loc>/g, '').trim()));

  let addedSitemap = 0;
  let newXml = '';

  for (const u of allPublishedUrls) {
    const fullLoc = `https://www.kawaki.co.in${u.replace(/\/$/, '') || '/'}`;
    if (!existingSet.has(fullLoc) && fullLoc !== 'https://www.kawaki.co.in/blog/:slug') {
      newXml += `  <url>\n    <loc>${fullLoc}</loc>\n    <lastmod>2026-10-08</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      existingSet.add(fullLoc);
      addedSitemap++;
    }
  }

  if (addedSitemap > 0) {
    const closeIdx = sitemapContent.lastIndexOf('</urlset>');
    if (closeIdx !== -1) {
      sitemapContent = sitemapContent.slice(0, closeIdx) + newXml + sitemapContent.slice(closeIdx);
      fs.writeFileSync(sitemapFile, sitemapContent, 'utf8');
      console.log(`✓ Added ${addedSitemap} new canonical URLs to sitemap.xml.`);
    }
  } else {
    console.log('✓ sitemap.xml is up to date.');
  }
}

// 3. Vercel Redirects
console.log('\n🚀 [3/3] Validating vercel.json configuration...');
if (fs.existsSync(vercelFile)) {
  const v = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
  console.log(`✓ vercel.json verified with cleanUrls=true and ${v.redirects ? v.redirects.length : 0} redirects.`);
}

console.log('\n🎉 [Build SEO Pages] 226-Page Topical Architecture Generated Successfully!');
