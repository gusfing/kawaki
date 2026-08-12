import { buildMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessContent } from "./ProcessContent";

export const metadata = buildMetadata({
  title: "Our Process & Workflow | Kawaki Studios",
  description:
    "A disciplined, four-stage scoping and development sequence: Discover, Design, Build, and Launch. Timelines and client ownership transparently outlined.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      {/* Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Workflow" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              How a project actually goes.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              We run each project in deliberate, structured stages so there are no surprises on launch
              day. Every stage has concrete timelines, deliverables, and client checkpoints.
            </p>
          </div>
        </div>
      </section>

      <ProcessContent />

      <CTASection
        heading="Ready to start the first step?"
        subhead="Tell us about your project requirements and code constraints. Scoping calls are completely free."
        primaryButtonText="Start a project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
