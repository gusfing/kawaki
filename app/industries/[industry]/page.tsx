import { notFound } from "next/navigation";
import { Metadata } from "next";
import { INDUSTRIES } from "@/lib/data/industries";
import { SERVICES } from "@/lib/data/services";
import { getCaseStudies } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({
    industry: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const content = INDUSTRIES.find((ind) => ind.slug === industry);
  if (!content) return {};

  return buildMetadata({
    title: `${content.name} Web Development & Design | Kawaki Studios`,
    description: content.challenge,
    path: `/industries/${industry}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { industry } = await params;
  const content = INDUSTRIES.find((ind) => ind.slug === industry);

  if (!content) {
    notFound();
  }

  // Get relevant services
  const relevantServices = SERVICES.filter((s) =>
    content.relevantServices.includes(s.slug)
  );

  // Get case studies in this industry
  const allCaseStudies = getCaseStudies();
  const industryCaseStudies = allCaseStudies.filter(
    (cs) => cs.industry === industry
  );

  const displayCaseStudies = industryCaseStudies.length > 0 ? industryCaseStudies : allCaseStudies.slice(0, 3);
  const isFallback = industryCaseStudies.length === 0;

  return (
    <>
      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label={`Sector — ${content.name}`} className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              {content.name} teams build with us for {content.challenge.toLowerCase().replace(/\.$/, "")}.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              {content.details}
            </p>
          </div>
        </div>
      </section>

      {/* Considerations Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow label="Standards" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink leading-tight">
              Core considerations we bring to {content.name.toLowerCase()}.
            </h2>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-6 border-t border-line pt-6 lg:pt-0 lg:border-t-0">
              {content.considerations.map((item, idx) => {
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

      {/* Relevant Services Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-field border-b border-line">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <Eyebrow label="Capabilities" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink">
              Services mapped to this sector
            </h2>
          </div>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relevantServices.map((service, idx) => (
              <div key={service.slug} className="h-full">
                <Card
                  eyebrow={`CAPABILITY 0${idx + 1}`}
                  title={service.name}
                  description={service.description}
                  href={`/services/${service.slug}`}
                />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <Eyebrow label="Work" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl text-ink">
              {isFallback ? "Featured studio work" : `Recent projects in ${content.name}`}
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

      {/* CTA Section */}
      <CTASection
        heading={`Have a ${content.name.toLowerCase()} project in mind?`}
        subhead={`Let's discuss how we can address your technical and compliance constraints with a secure custom codebase.`}
        primaryButtonText="Start a project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
