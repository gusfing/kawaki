import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | Kawaki Studios",
  description: "Direct answers about our development process, pricing, Shopify vs custom builds, headless WordPress, WCAG accessibility, and support SLAs.",
  path: "/faqs",
});

export default function FAQsPage() {
  const workingWithUs = [
    {
      question: "Do you work with an existing brand/design system, or start from scratch?",
      answer: "Both. We can ingest Figma design systems from your internal designers and implement them precisely, or design a custom, clean-sheet brand identity and component library from scratch."
    },
    {
      question: "Do you only maintain sites you built?",
      answer: "No. We can take over existing Next.js, React, or WordPress codebases after a technical scoping audit to verify codebase health, security vulnerabilities, and build alignment."
    },
    {
      question: "What happens after a site is launched?",
      answer: "We transition clients onto a monthly maintenance & support SLA. This covers active uptime monitoring, automated security/dependency patches, and on-demand dev hours for incremental updates."
    }
  ];

  const pricingAndProcess = [
    {
      question: "How long does a custom web build take?",
      answer: "A custom marketing site typically takes 6 to 10 weeks. A complex web application, custom database migration, or headless ecommerce migration takes 10 to 14 weeks from discovery to deployment."
    },
    {
      question: "What is your scoping and pricing structure?",
      answer: "We work on a fixed-scope, fixed-price model. We map out all deliverables, APIs, and pages before any code is written, ensuring zero surprise fees. Technical scoping calls and audits are completely free."
    },
    {
      question: "What is your standard support SLA response time?",
      answer: "Our standard support plans cover critical bugs within 4 hours, and general updates/maintenance tasks within 24 to 48 hours."
    }
  ];

  const technicalDecisions = [
    {
      question: "Do you build on Shopify or fully custom storefronts?",
      answer: "We build custom Liquid themes on Shopify or headless storefronts (Next.js/Hydrogen) depending on scale. Headless is preferred for speed and design freedom, while custom Liquid fits teams desiring simple shop operations."
    },
    {
      question: "Do you recommend traditional or headless WordPress?",
      answer: "Traditional Gutenberg blocks are great for content editor flexibility. We recommend headless WordPress (decoupled Next.js frontend) if you have strict security, performance, or multi-platform distribution requirements."
    },
    {
      question: "Can you build frontends for our existing backend APIs?",
      answer: "Yes. We regularly build high-performance React/Next.js client applications that communicate securely with client-provided REST, GraphQL, or database APIs."
    },
    {
      question: "Do you handle WCAG accessibility compliance?",
      answer: "Yes. Accessibility is a core deliverable. We build websites and web apps matching WCAG 2.2 AA standards as our baseline, verifying keyboard navigability, semantic markup, and screen reader flow."
    }
  ];

  const allFaqsForSchema = [...workingWithUs, ...pricingAndProcess, ...technicalDecisions];
  const jsonLd = faqPageJsonLd(allFaqsForSchema);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Support" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Questions we get asked a lot.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              Clear, direct answers about how we build software, how we price engagements,
              and what we expect from partners. No sales jargon.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Main Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto space-y-24">

          {/* Group 1: Working With Us */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <Eyebrow label="01 / RELATIONSHIP" className="mb-4" />
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink leading-tight">
                  Working with our studio.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8">
              <ScrollReveal className="bg-field p-6 md:p-8 border border-line">
                <Accordion
                  items={workingWithUs.map((faq, idx) => ({
                    id: `us-${idx}`,
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />
              </ScrollReveal>
            </div>
          </div>

          {/* Group 2: Pricing & Process */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <Eyebrow label="02 / BUSINESS" className="mb-4" />
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink leading-tight">
                  Pricing & workflows.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8">
              <ScrollReveal className="bg-field p-6 md:p-8 border border-line">
                <Accordion
                  items={pricingAndProcess.map((faq, idx) => ({
                    id: `price-${idx}`,
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />
              </ScrollReveal>
            </div>
          </div>

          {/* Group 3: Technical Decisions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <Eyebrow label="03 / STACK" className="mb-4" />
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink leading-tight">
                  Technical decisions.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8">
              <ScrollReveal className="bg-field p-6 md:p-8 border border-line">
                <Accordion
                  items={technicalDecisions.map((faq, idx) => ({
                    id: `tech-${idx}`,
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
