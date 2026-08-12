"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

interface CTASectionProps {
  heading: string;
  subhead: string;
  primaryButtonText: string;
  primaryButtonHref: string;
}

export function CTASection({
  heading,
  subhead,
  primaryButtonText,
  primaryButtonHref,
}: CTASectionProps) {
  const mounted = useHydrated();

  return (
    <section
      id="contact-cta"
      className="w-full py-32 md:py-48 px-5 md:px-16 dark-section bg-grid-inverse border-t border-line-inverse relative overflow-hidden flex items-center justify-center"
    >
      {/* Decorative oversized background text */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-bold leading-none tracking-tighter text-ink-inverse/[0.03] whitespace-nowrap select-none"
      >
        INITIATE
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          {/* Accent Eyebrow */}
          <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-accent mb-8 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-data-pulse" aria-hidden />
            Project Request
          </div>
          
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.03em] text-ink-inverse mb-8 max-w-[15ch] leading-[1.05]">
            {heading}
          </h2>
          
          <p className="font-body text-lg md:text-xl text-ink-inverse/70 max-w-[48ch] mb-12 leading-relaxed">
            {subhead}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="accent" href={primaryButtonHref}>
              {primaryButtonText}
            </Button>
            <Button variant="ghost" href="/services" className="text-ink-inverse hover:text-accent-dim focus-visible:text-accent-dim">
              Explore services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
