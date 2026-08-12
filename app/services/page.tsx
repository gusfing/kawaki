import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/data/services";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata = buildMetadata({
  title: "Web Development & Engineering Services | Kawaki Studios",
  description: "Custom web development services: high-performance marketing sites, ecommerce storefronts, custom web apps, and backend systems engineered to scale.",
  path: "/services",
});

export default function ServicesPage() {
  const fullBuilds = SERVICES.filter((s) =>
    ["web-development", "ecommerce-development", "shopify-development", "wordpress-development"].includes(s.slug)
  );

  const specializedEngagements = SERVICES.filter((s) =>
    ["web-app-development", "frontend-development", "backend-development", "maintenance-support"].includes(s.slug)
  );

  return (
    <>
      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Capabilities" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Services built around what you&rsquo;re actually trying to ship.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              We categorize our engineering services into full site/storefront builds for complete launches,
              and specialized engagements for products needing dedicated frontend, backend, or ongoing support.
              Every line of code is written with speed, accessibility, and clean architecture as defaults.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto space-y-24">

          {/* Cluster 1: Full Builds */}
          <div>
            <ScrollReveal className="mb-12">
              <Eyebrow label="Full Builds" className="mb-4" />
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink">
                End-to-end digital platforms from strategy to launch.
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fullBuilds.map((service, idx) => (
                <div key={service.slug} className="h-full">
                  <Card
                    eyebrow={`CAPABILITY 0${idx + 1}`}
                    title={service.name}
                    description={service.summary}
                    href={`/services/${service.slug}`}
                    meta="End-to-End Build"
                  />
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Cluster 2: Specialized Engagements */}
          <div>
            <ScrollReveal className="mb-12">
              <Eyebrow label="Specialized Engagements" className="mb-4" />
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink">
                Deep expertise for specific technical bottlenecks.
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specializedEngagements.map((service, idx) => (
                <div key={service.slug} className="h-full">
                  <Card
                    eyebrow={`CAPABILITY 0${idx + 5}`}
                    title={service.name}
                    description={service.summary}
                    href={`/services/${service.slug}`}
                    meta="Specialized Focus"
                  />
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Escape Hatch & Cross-linking */}
          <div className="border-t border-line pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Not sure which one? */}
            <div className="lg:col-span-6 bg-field border border-line p-8 md:p-12 flex flex-col justify-between items-start">
              <div>
                <Eyebrow label="Rerouting" className="mb-6" />
                <h3 className="font-display font-semibold text-2xl text-ink mb-4">
                  Not sure which service is right for you?
                </h3>
                <p className="font-body text-base text-slate leading-relaxed mb-8">
                  We diagnose system bottlenecks first. Tell us what your team is facing and we&rsquo;ll
                  give you an honest roadmap, even if it means writing less code.
                </p>
              </div>
              <Button href="/contact">Talk to us →</Button>
            </div>

            {/* Cross-linking to Industries */}
            <div className="lg:col-span-6 bg-field border border-line p-8 md:p-12 flex flex-col justify-between items-start">
              <div>
                <Eyebrow label="Verticals" className="mb-6" />
                <h3 className="font-display font-semibold text-2xl text-ink mb-4">
                  See how these apply to your sector.
                </h3>
                <p className="font-body text-base text-slate leading-relaxed mb-8">
                  Certain sectors carry strict regulatory requirements or operational constraints.
                  Check out how our capabilities map to retail, SaaS, healthcare, and design agencies.
                </p>
              </div>
              <Button href="/industries" variant="secondary">See industry verticals →</Button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
