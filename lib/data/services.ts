export type FAQItem = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  summary: string;
  included: string[];
  tech: string[];
  faqs: FAQItem[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    headline: "Custom websites that hold up past launch day.",
    description: "Custom, high-performance websites built for scale and speed.",
    summary: "We design and build bespoke marketing websites, landing pages, and corporate sites from scratch. We avoid slow templates and heavy visual builders, ensuring that pages load instantly, rank higher on search engines, and are fully responsive.",
    included: [
      "Discovery & information architecture — mapping the site before any design starts",
      "Custom design, not a theme — designed specifically for your brand positioning",
      "Built on modern frameworks (Next.js, or your CMS of choice) for real performance",
      "Launch support and a handoff you can actually maintain"
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    faqs: [
      {
        question: "How long does a custom site take?",
        answer: "Typically 6 to 10 weeks depending on complexity, page count, and asset readiness."
      },
      {
        question: "Do you work with an existing brand/design system, or start from scratch?",
        answer: "Both. We can ingest Figma libraries from your design team or build a custom style guide from the ground up."
      },
      {
        question: "What happens after launch?",
        answer: "We transition you to a maintenance & support agreement covering speed audits, dependency upgrades, and small feature adjustments."
      }
    ]
  },
  {
    slug: "ecommerce-development",
    name: "Ecommerce Development",
    headline: "Storefronts built to convert, not just load.",
    description: "Conversion-optimized storefronts that handle high traffic.",
    summary: "Custom ecommerce builds and integrations for teams past the point where a template checkout is good enough. We construct responsive, accessible shopping journeys that load instantly even under high traffic events.",
    included: [
      "Platform selection — matched to your catalog size and ops, not a default recommendation",
      "Custom storefront design and checkout optimization to reduce cart abandonment",
      "Payments, inventory, and fulfillment integrations to streamline operations",
      "Performance and Core Web Vitals tuning for product pages"
    ],
    tech: ["Shopify", "Next.js Commerce", "Stripe", "headless commerce"],
    faqs: [
      {
        question: "Do you build on Shopify or fully custom?",
        answer: "We build custom Shopify storefronts or headless builds. We guide you on the performance vs complexity trade-offs before starting."
      },
      {
        question: "Can you migrate our existing store without downtime?",
        answer: "Yes. We run dual-run migrations and setup redirects carefully to prevent organic traffic loss and order interruption."
      },
      {
        question: "Do you handle payment/tax integrations?",
        answer: "Yes, including Stripe, Adyen, Avalara, and custom regional payment gateways."
      }
    ]
  },
  {
    slug: "shopify-development",
    name: "Shopify Development",
    headline: "Shopify, built the way Shopify's meant to be built.",
    description: "Bespoke Shopify themes and custom app integrations.",
    summary: "Custom themes, apps, and integrations on Shopify and Shopify Plus — no bloated third-party app stack held together with duct tape. We focus on clean Liquid code and native features.",
    included: [
      "Custom theme development (Online Store 2.0 / sections)",
      "Custom app development where the App Store doesn't cover it",
      "Shopify Plus / checkout extensibility work",
      "Migration to Shopify from another legacy platform"
    ],
    tech: ["Shopify", "Liquid", "Shopify Plus", "Hydrogen"],
    faqs: [
      {
        question: "Are you a Shopify Partner?",
        answer: "Yes, we are verified Shopify Partners and have built themes and apps for high-volume stores."
      },
      {
        question: "Custom theme or existing theme customized?",
        answer: "We build custom themes from scratch. Existing themes carry design baggage and speed bottlenecks that degrade conversion rates."
      },
      {
        question: "Do you support Shopify Plus checkout customization?",
        answer: "Yes, we specialize in Checkout Extensibility, custom pixels, and Shopify functions for custom discounts and routing."
      }
    ]
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    headline: "WordPress that doesn't feel like 2012.",
    description: "Headless WordPress architectures for editorial teams.",
    summary: "Custom WordPress builds for teams who want an editor their content team will actually enjoy using. We design clean block editors (Gutenberg) or headless structures.",
    included: [
      "Custom theme and block-editor (Gutenberg) development",
      "Headless WordPress where performance demands it",
      "Plugin audits and custom plugin development to reduce vulnerability risks",
      "Editorial workflow setup for content/marketing teams"
    ],
    tech: ["WordPress", "Gutenberg", "ACF", "headless WP + Next.js"],
    faqs: [
      {
        question: "Headless or traditional WordPress?",
        answer: "Traditional Gutenberg is great for content agility. Headless is preferred if security compliance or extreme speed is the priority."
      },
      {
        question: "Can you fix/rebuild an existing slow WordPress site?",
        answer: "Yes. We run a database and plugin audit, strip out visual page-builders, and rebuild the interface with custom blocks."
      },
      {
        question: "Do you provide ongoing WordPress maintenance?",
        answer: "Yes, WordPress needs regular security patches and backup testing. We cover this under support plans."
      }
    ]
  },
  {
    slug: "web-app-development",
    name: "Web App Development",
    headline: "Internal tools and products, not just marketing sites.",
    description: "Complex web applications with rigorous technical requirements.",
    summary: "Custom web applications — dashboards, portals, internal tools — built to handle real business logic, not just display content. We build robust systems that scale.",
    included: [
      "Product discovery and technical scoping to validate complexity",
      "Full-stack build (frontend, backend, database, auth)",
      "Third-party API and internal system integrations",
      "Ongoing iteration post-launch, not a one-time handoff"
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    faqs: [
      {
        question: "Is this different from your web development service?",
        answer: "Yes. Web development is for marketing sites. Web app development involves database structures, user authentication, and interactive state management."
      },
      {
        question: "Can you work with our existing backend/API?",
        answer: "Yes. We can design and implement a custom frontend that communicates securely with your REST or GraphQL APIs."
      },
      {
        question: "Do you do ongoing product development, or just launch and leave?",
        answer: "We build long-term partnerships, offering dedicated support retainers to iterate on features month-over-month."
      }
    ]
  },
  {
    slug: "frontend-development",
    name: "Frontend Development",
    headline: "Interfaces built by people who read the spec twice.",
    description: "Pixel-perfect, accessible UI implementation.",
    summary: "Frontend engineering for teams who already have a design system (or need one built) and need it implemented precisely — pixel accuracy, accessibility, and performance included, not optional.",
    included: [
      "Design-to-code implementation, including design systems and component libraries",
      "Accessibility built in from the start, not audited in after",
      "Performance budgets and Core Web Vitals as a deliverable, not an afterthought",
      "Works alongside your existing backend/API team"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    faqs: [
      {
        question: "Do you need our designs in Figma, or can you design too?",
        answer: "Both. We can ingest Figma blueprints and write clean code, or we can lead the UI/UX design process."
      },
      {
        question: "Can you work inside our existing codebase?",
        answer: "Yes, we onboard onto client codebases regularly, establishing standard linting and component boundaries."
      },
      {
        question: "Do you handle accessibility compliance (WCAG)?",
        answer: "Yes, we build and test to WCAG 2.2 AA standards as our baseline, verifying keyboard focus, aria labels, and screen reader flow."
      }
    ]
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    headline: "The part of the site nobody sees, built to not fall over.",
    description: "Robust APIs and database architectures.",
    summary: "APIs, databases, and infrastructure for products that need to handle real traffic and real data, not just a contact form. We optimize for latency and safety.",
    included: [
      "API design and development (REST or GraphQL)",
      "Database architecture and data modeling",
      "Authentication, authorization, and third-party integrations",
      "Infrastructure and deployment setup (CI/CD included)"
    ],
    tech: ["Node.js", "PostgreSQL", "GraphQL", "AWS"],
    faqs: [
      {
        question: "Can you build the backend for a frontend we already have?",
        answer: "Yes. We build clean, documented APIs (Swagger/OpenAPI) that easily plug into your existing client applications."
      },
      {
        question: "Do you handle hosting/infrastructure, or just code?",
        answer: "We design cloud setups on AWS, GCP, or Vercel, setting up automated CI/CD pipelines, staging environments, and monitoring."
      },
      {
        question: "What about scaling as we grow?",
        answer: "We build stateless API instances, design clean index/database strategies, and configure CDN caches to ensure capacity scales dynamically."
      }
    ]
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & Support",
    headline: "Your site, kept running after we ship it.",
    description: "Ongoing technical partnerships and SLA-backed support.",
    summary: "Ongoing maintenance, monitoring, and small-scope development for sites and apps we've built — or ones we haven't, after an audit. We keep systems running.",
    included: [
      "Uptime and performance monitoring",
      "Security patches and dependency updates",
      "Small feature requests and content updates, batched or on-demand",
      "A real point of contact, not a ticket queue into a void"
    ],
    tech: [],
    faqs: [
      {
        question: "Do you only maintain sites you built?",
        answer: "No. We can take over existing Next.js, React, or WordPress codebases after performing a code audit to identify security issues."
      },
      {
        question: "What's your response time?",
        answer: "Our standard SLA response time is 4 hours for critical blockages, and 24-48 hours for general maintenance tasks."
      },
      {
        question: "Can we start with a one-time audit before committing to a plan?",
        answer: "Yes, we offer a standalone codebase audit covering security, performance bottlenecks, and accessibility."
      }
    ]
  }
];
