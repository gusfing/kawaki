"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    id: "01",
    label: "DISCOVER",
    name: "Scoping constraints",
    desc: "We audit your database structures, codebase patterns, and API payloads before drawing a line of design or code.",
  },
  {
    id: "02",
    label: "DESIGN",
    name: "System blueprints",
    desc: "We craft custom interface blueprints in Figma alongside database schema layouts to ensure speed is built into the architecture.",
  },
  {
    id: "03",
    label: "BUILD",
    name: "High-performance build",
    desc: "We engineer pixel-perfect frontends in Next.js/React and secure APIs in Node.js/PostgreSQL. WCAG compliance is baseline.",
  },
  {
    id: "04",
    label: "LAUNCH",
    name: "Verify & maintain",
    desc: "We stress-test site load, verify Core Web Vitals are >90, deploy onto optimized cloud infrastructures, and transition to SLA support.",
  },
];

export function ProcessTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = cardsRef.current?.children;
      if (!cards) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full pt-36 md:pt-48 pb-24 md:pb-36 px-5 md:px-16 bg-paper border-t border-line relative z-10 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <Eyebrow label="Workflow" className="mb-6" />
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink max-w-[20ch] leading-tight">
              A process that doesn&apos;t surprise you.
            </h2>
          </div>
          <Button variant="ghost" href="/process">
            See our full process &rarr;
          </Button>
        </div>

        {/* Process Cards Grid with Spacious Cards & Corner Frames */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step) => (
            <div key={step.id} className="h-full">
              <CornerFrame className="h-full block">
                <div className="p-7 md:p-8 flex flex-col justify-between items-start h-full bg-field border border-line group relative transition-all duration-300 hover:bg-paper hover:border-accent/40 shadow-sm">
                  <div className="w-full">
                    {/* Step Number + Label */}
                    <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-line/60">
                      <span className="font-display font-black text-4xl md:text-5xl text-accent font-bold select-none">
                        {step.id}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest px-2 py-0.5 bg-paper border border-line text-slate font-semibold">
                        {step.label}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="font-display font-semibold text-xl text-ink mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.name}
                    </h3>

                    {/* Step Description */}
                    <p className="font-body text-sm text-slate leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </CornerFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
