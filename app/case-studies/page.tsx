import { buildMetadata } from "@/lib/seo";
import { getCaseStudies } from "@/lib/mdx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CaseStudiesList } from "@/components/sections/CaseStudiesList";

export const metadata = buildMetadata({
  title: "Recent Work & Case Studies | Kawaki Studios",
  description: "Real software and web development results: headless commerce migrations, custom web tools, brand redesigns, and API integrations.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Case Studies" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Recent work.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              We judge ourselves by speed, test coverage, design fidelity, and client business outcomes.
              Below is the index of web projects we have designed, built, and launched.
            </p>
          </div>
        </div>
      </section>

      {/* Main List Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          <CaseStudiesList initialStudies={caseStudies} />
        </div>
      </section>
    </>
  );
}
