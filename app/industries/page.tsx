import { buildMetadata } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/data/industries";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata = buildMetadata({
  title: "Industry Focus & Sectors | Kawaki Studios",
  description: "Custom web engineering matched to your industry constraints. We build specialized solutions for Retail, SaaS, Healthcare, Finance, and Architecture firms.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Sectors" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Built for how your industry actually works.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              Different verticals face distinct technical realities. Retail storefronts need extreme loading speed
              to prevent cart drop-offs; healthcare platforms require HIPAA-aligned security boundaries; B2B SaaS sites
              need dynamic user calculators; and design agencies demand highly optimized visual portfolios. We design
              for these constraints, not around them.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind, idx) => (
              <div key={ind.slug} className="h-full">
                <Card
                  eyebrow={`SECTOR 0${idx + 1}`}
                  title={ind.name}
                  description={ind.challenge}
                  href={`/industries/${ind.slug}`}
                  meta="Specialized Focus"
                />
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
