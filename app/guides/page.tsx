import { buildMetadata } from "@/lib/seo";
import { getGuides } from "@/lib/mdx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata = buildMetadata({
  title: "Evergreen Technical Guides | Kawaki Studios",
  description: "Comprehensive blueprints and guides on selecting web development partners, planning site migrations, and optimization frameworks.",
  path: "/guides",
});

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <>
      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Resources" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Guides.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              Detailed frameworks and decision blueprints to help engineering leaders and founders
              scope, execute, and launch web products without friction.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          {guides.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-line bg-field">
              <p className="font-body text-slate text-base">No guides published yet.</p>
            </div>
          ) : (
            <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.map((guide, idx) => (
                <div key={guide.slug} className="h-full">
                  <Card
                    eyebrow={`GUIDE 0${idx + 1}`}
                    title={guide.title}
                    description={
                      <div className="flex flex-col h-full justify-between items-start">
                        <p className="font-body text-base text-slate leading-relaxed flex-1">{guide.excerpt}</p>
                        <span className="font-mono text-[10px] text-slate mt-4">Last updated &bull; {guide.updatedDate}</span>
                      </div>
                    }
                    href={`/guides/${guide.slug}`}
                  />
                </div>
              ))}
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
