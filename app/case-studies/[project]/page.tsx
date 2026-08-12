import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudies } from "@/lib/mdx";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { SERVICES } from "@/lib/data/services";
import { INDUSTRIES } from "@/lib/data/industries";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { StatBlock } from "@/components/ui/StatBlock";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ project: string }>;
};

export async function generateStaticParams() {
  const caseStudies = getCaseStudies();
  return caseStudies.map((study) => ({
    project: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const study = getCaseStudies().find((cs) => cs.slug === project);
  if (!study) return {};

  return buildMetadata({
    title: `${study.client} — Case Study | Kawaki Studios`,
    description: study.summary,
    path: `/case-studies/${project}`,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { project } = await params;
  const allStudies = getCaseStudies();
  const study = allStudies.find((cs) => cs.slug === project);

  if (!study) {
    notFound();
  }

  // Resolve service names for tags
  const resolvedServices = study.services.map((slug) => {
    const s = SERVICES.find((service) => service.slug === slug);
    return { slug, name: s ? s.name : slug };
  });

  // Resolve industry name
  const resolvedIndustry = INDUSTRIES.find((ind) => ind.slug === study.industry);

  // Find 2 related case studies (sharing service or industry, excluding current)
  const relatedStudies = allStudies
    .filter((cs) => cs.slug !== project)
    .filter((cs) => cs.industry === study.industry || cs.services.some((s) => study.services.includes(s)))
    .slice(0, 2);

  // Fallback to any other 2 studies if no matches
  const displayRelated = relatedStudies.length > 0 ? relatedStudies : allStudies.filter((cs) => cs.slug !== project).slice(0, 2);

  // Build JSON-LD structured data
  const jsonLd = articleJsonLd({
    title: study.title,
    description: study.summary,
    datePublished: "2026-07-29",
    authorName: "Kawaki Engineering",
    url: `https://kawaki.co.in/case-studies/${project}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label={`Case Study — Build ${study.year}`} className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-3 block">
              {study.client} &bull; {resolvedIndustry ? resolvedIndustry.name : study.industry}
            </span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              {study.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-6">
              {resolvedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <Tag className="hover:bg-accent hover:text-accent-ink transition-colors cursor-pointer">
                    {s.name}
                  </Tag>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results / Metrics Band */}
      {study.results.length > 0 && (
        <section className="w-full py-16 px-5 md:px-16 bg-field border-b border-line">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {study.results.map((res, idx) => (
                <StatBlock
                  key={idx}
                  value={res.value}
                  label={res.label}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body Content */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-[800px] mx-auto">
          <div className="prose font-body text-base text-slate leading-relaxed space-y-8 [&>h1]:font-display [&>h1]:font-semibold [&>h1]:text-2xl [&>h1]:text-ink [&>h1]:pt-4 [&>h2]:font-display [&>h2]:font-semibold [&>h2]:text-xl [&>h2]:text-ink">
            <MDXRemote source={study.content} />
          </div>

          <div className="border-t border-line mt-16 pt-12 flex justify-between items-center">
            <Button href="/case-studies" variant="secondary">← Back to all work</Button>
            <Button href="/contact">Start your project</Button>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {displayRelated.length > 0 && (
        <section className="w-full py-24 px-5 md:px-16 bg-paper">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-12">
              <Eyebrow label="Related Work" className="mb-4" />
              <h2 className="font-display font-semibold text-3xl text-ink">
                Other projects you might check out.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayRelated.map((cs, idx) => (
                <div key={cs.slug} className="h-full">
                  <Card
                    meta={`CASE 0${idx + 1} — ${cs.client}, ${cs.year}`}
                    title={cs.title}
                    description={cs.summary}
                    href={`/case-studies/${cs.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <CTASection
        heading="Want results like this?"
        subhead="Let's build a custom web solution aligned with your goals. No template code, no performance shortcuts."
        primaryButtonText="Start your project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
