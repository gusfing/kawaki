"use client";

import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    id: "01",
    name: "Discover",
    objective: "Scoping business goals & technical constraints.",
    timeline: "1 to 2 weeks",
    clientResponsibility:
      "Provide access to existing codebases, name database bottlenecks, list integration targets, and define business logic boundaries.",
    description:
      "We align on absolute requirements, business constraints, and product goals before writing any code. Our discovery phase starts with a code and database audit. We sit with your technical leads to map user actions, security scopes, and caching limits so there is zero ambiguity down the line.",
  },
  {
    id: "02",
    name: "Design",
    objective: "Structuring layouts, user flows, and database models.",
    timeline: "2 to 3 weeks",
    clientResponsibility:
      "Provide brand assets (logos, guidelines) and participate in weekly design reviews for feedback and approvals.",
    description:
      "We don't use page templates. We design custom responsive layouts in Figma aligned with your positioning. Concurrently, we construct DB schemas, API endpoints, and caching rules to guarantee the visual layout is backed by a highly performant and secure architecture.",
  },
  {
    id: "03",
    name: "Build",
    objective: "Clean, high-performance implementation.",
    timeline: "4 to 8 weeks",
    clientResponsibility:
      "Review weekly demo links, verify logic check-ins, and prepare third-party credentials (gateways, inventory).",
    description:
      "We translate Figma mockups into clean Next.js/React component codebases. We focus heavily on static build optimization, semantic HTML, keyboard focus, and clean state handling. Backend routes are built with robust inputs validation and data layers.",
  },
  {
    id: "04",
    name: "Launch & Support",
    objective: "Verification testing, transfer, & SLA maintenance.",
    timeline: "1 week (Launch)",
    clientResponsibility:
      "Configure DNS records (with our guidance), finalize merchant keys, and designate team contact for SLA support.",
    description:
      "Before going live, we run performance audits. We verify Core Web Vitals score is >90, perform keyboard navigation checks, verify secure headers, and transition DNS. Post-launch, we hand over complete repository access and transition your site onto an SLA maintenance plan.",
  },
];

export function ProcessContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      phaseRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
      <div
        ref={containerRef}
        className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0"
      >
        {/* Left Rail — sticky phase tracker */}
        <div className="lg:col-span-4 lg:pr-12">
          <div className="lg:sticky lg:top-28 space-y-2">
            <Eyebrow label="Phases" className="mb-10" />
            {PHASES.map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => {
                  phaseRefs.current[idx]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={cn(
                  "w-full text-left flex items-baseline gap-5 py-4 border-b border-line transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm group",
                  idx === activeIndex
                    ? "border-accent"
                    : "hover:border-ink/30"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tracking-widest transition-colors duration-300 font-bold",
                    idx === activeIndex ? "text-accent" : "text-slate"
                  )}
                >
                  {phase.id}
                </span>
                <span
                  className={cn(
                    "font-display font-semibold text-xl transition-colors duration-300",
                    idx === activeIndex ? "text-ink" : "text-slate group-hover:text-ink"
                  )}
                >
                  {phase.name}
                </span>
              </button>
            ))}

            <div className="pt-10 font-mono text-[10px] uppercase tracking-[0.12em] text-slate space-y-1">
              <div>DELHI · 28.6139° N</div>
              <div>77.2090° E · EST. 2019</div>
            </div>
          </div>
        </div>

        {/* Right Column — scrollable phase detail cards */}
        <div className="lg:col-span-8 lg:pl-12 lg:border-l border-line space-y-0">
          {PHASES.map((phase, idx) => (
            <div
              key={phase.id}
              ref={(el) => { phaseRefs.current[idx] = el; }}
              className="py-16 border-b border-line last:border-b-0"
            >
              {/* Phase Header */}
              <div className="flex items-start justify-between gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold tracking-widest px-2.5 py-1 rounded-sm transition-colors duration-500",
                        idx === activeIndex
                          ? "bg-accent text-accent-ink"
                          : "bg-field text-slate"
                      )}
                    >
                      PHASE {phase.id}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate">
                      {phase.timeline}
                    </span>
                  </div>
                  <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink leading-tight">
                    {phase.name}
                  </h2>
                  <p className="font-body text-base text-slate mt-2 italic">
                    {phase.objective}
                  </p>
                </div>
              </div>

              {/* Phase Description */}
              <div className="space-y-8">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate mb-3 block">
                    What We Do
                  </span>
                  <p className="font-body text-lg text-ink leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="bg-field border border-line p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink font-bold mb-3 block">
                    Your Responsibilities
                  </span>
                  <p className="font-body text-base text-slate leading-relaxed">
                    {phase.clientResponsibility}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
