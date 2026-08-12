import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SERVICES } from "@/lib/data/services";
import { getCaseStudies } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name} Services | Kawaki Studios`,
    description: service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Get case studies for this service
  const allCaseStudies = getCaseStudies();
  const relatedCaseStudies = allCaseStudies.filter((cs) =>
    cs.services.includes(slug)
  );

  // Fallback if no specific case studies yet
  const displayCaseStudies = relatedCaseStudies.length > 0 ? relatedCaseStudies : allCaseStudies.slice(0, 3);
  const isFallback = relatedCaseStudies.length === 0;

  return (
    <>
      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label={`Service — ${service.name}`} className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              {service.headline}
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              {service.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="#work" variant="ghost">See the work</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Included List Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow label="Deliverables" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink leading-tight">
              What&rsquo;s included in the engagement.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-6 border-t border-line pt-6 lg:pt-0 lg:border-t-0">
              {service.included.map((item, idx) => {
                const colonIndex = item.indexOf(" — ");
                const label = colonIndex > -1 ? item.slice(0, colonIndex) : item;
                const desc = colonIndex > -1 ? item.slice(colonIndex + 3) : "";

                return (
                  <li key={idx} className="flex gap-4 items-start pb-6 border-b border-line last:border-b-0 last:pb-0">
                    <span className="font-mono text-xs text-signal font-bold pt-1">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-ink leading-tight">
                        {label}
                      </h3>
                      {desc && (
                        <p className="font-body text-base text-slate mt-1 leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Section (Skip for maintenance-support since it does not specify tech) */}
      {service.tech.length > 0 && (
        <section className="w-full py-16 px-5 md:px-16 bg-field border-b border-line">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="shrink-0">
              <Eyebrow label="Tooling" className="mb-1" />
              <span className="font-display font-medium text-lg text-ink">
                Our standard technology stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      <section id="work" className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <Eyebrow label="Case Studies" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink">
              {isFallback ? "Our featured work" : `Real solutions in ${service.name}`}
            </h2>
            {isFallback && (
              <p className="font-body text-xs text-slate mt-2 italic">
                Showing featured studio case studies while specific work is cataloged.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCaseStudies.map((study, idx) => (
              <div key={study.slug} className="h-full">
                <Card
                  meta={`CASE 0${idx + 1} — ${study.client}, ${study.year}`}
                  title={study.title}
                  description={study.summary}
                  href={`/case-studies/${study.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow label="FAQ" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink leading-tight">
              Frequently asked questions.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              items={service.faqs.map((faq, idx) => ({
                id: `faq-${idx}`,
                question: faq.question,
                answer: faq.answer,
              }))}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        heading={`Ready to talk about your ${service.name.toLowerCase()} project?`}
        subhead="Tell us what you're building — we'll give you a direct, technical answer within one business day."
        primaryButtonText="Start a project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
