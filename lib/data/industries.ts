export type Industry = {
  slug: string;
  name: string;
  challenge: string;
  details: string;
  considerations: string[];
  relevantServices: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "retail",
    name: "Retail & E-commerce",
    challenge: "High-conversion storefronts designed to scale.",
    details: "In retail, loading speeds correlate directly with drop-offs and revenue loss. We strip out unnecessary heavy scripts and optimize image payloads. We construct responsive, accessible shopping journeys that load instantly even under high traffic events.",
    considerations: [
      "Headless storefront optimization with real-time inventory sync",
      "Custom checkout flow adjustments preventing cart drop-offs",
      "API integrations for ERP and logistics pipelines",
      "Core Web Vitals scores optimized >90 for SEO rankings"
    ],
    relevantServices: ["ecommerce-development", "shopify-development", "web-development"]
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    challenge: "Secure, reliable, and compliant healthcare platforms.",
    details: "Healthcare platforms demand absolute security and reliable access. We focus on clean data validation boundaries, encrypted communication rails, and layout structures that meet modern WCAG 2.2 accessibility criteria for inclusive usage.",
    considerations: [
      "Accessible patient dashboards with clear hierarchy",
      "Secure data boundaries and API keys validation",
      "HIPAA-aligned data handling configurations",
      "Responsive portal pages for mobile check-ins"
    ],
    relevantServices: ["web-app-development", "frontend-development", "backend-development"]
  },
  {
    slug: "saas",
    name: "SaaS & Technology",
    challenge: "Interactive web applications built for rapid growth.",
    details: "For SaaS companies, the product experience starts on the marketing landing page and flows directly into the dashboard. We design and build interactive modules, ROI calculators, and responsive onboarding sequences that prove value instantly to prospective customers.",
    considerations: [
      "Custom interactive ROI calculators and converters",
      "Dynamic dashboards with real-time SVG charting",
      "Optimized user onboarding and registration flows",
      "Clean React state handling and client-side page updates"
    ],
    relevantServices: ["web-app-development", "frontend-development", "backend-development"]
  },
  {
    slug: "finance",
    name: "Financial Services",
    challenge: "Resilient architectures optimized for trust and security.",
    details: "Trust is the key currency in finance. We construct user-facing interfaces with robust security patterns, data validation safeguards, and lightning-fast calculation engines. We ensure financial dashboards are clean, legible, and simple to navigate.",
    considerations: [
      "High-speed data calculations and state updates",
      "Multi-factor verification interfaces",
      "Data compliance validation pipelines",
      "Accessible and clean financial reporting layouts"
    ],
    relevantServices: ["web-app-development", "backend-development", "frontend-development"]
  },
  {
    slug: "architecture",
    name: "Architecture & Design",
    challenge: "Visually striking portfolios that rank on Google.",
    details: "Many design studios rely heavily on referrals or social media, but lose potential clients because their website lacks SEO rankings or load speeds. We build custom media galleries that render high-res project imagery instantly and optimize your Google search visibility.",
    considerations: [
      "SEO implementation attracting qualified project inquiries",
      "Lightning-fast media portfolios that don't lag on mobile",
      "Google local search and organic rankings optimization",
      "Interactive layout grids showcasing project details"
    ],
    relevantServices: ["web-development", "frontend-development", "maintenance-support"]
  }
];
