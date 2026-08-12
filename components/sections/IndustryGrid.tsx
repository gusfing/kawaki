"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { INDUSTRIES } from "@/lib/data/industries";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { useHydrated } from "@/lib/use-hydrated";
import { 
  ShoppingBag, 
  HeartPulse, 
  Cpu, 
  Landmark, 
  Compass, 
  ArrowUpRight,
  LucideIcon 
} from "lucide-react";

// Map industry slugs to matching icons
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  retail: ShoppingBag,
  healthcare: HeartPulse,
  saas: Cpu,
  finance: Landmark,
  architecture: Compass,
};

export function IndustryGrid() {
  const mounted = useHydrated();

  return (
    <section className="w-full py-24 md:py-36 px-5 md:px-16 bg-paper border-t border-line scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-16">

        {/* Section Heading */}
        <motion.div
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={fadeUp}
          className="w-full md:w-1/3 shrink-0"
        >
          <Eyebrow label="Who we work with" className="mb-6" />
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink mb-8 leading-tight">
            Built for complexity.
          </h2>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-accent hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
          >
            See all industries <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Industry Cards Grid */}
        <motion.div
          className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5"
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerChildren}
        >
          {INDUSTRIES.map((industry) => {
            const IconComponent = INDUSTRY_ICONS[industry.slug] || Cpu;

            return (
              <motion.div key={industry.slug} variants={fadeUp}>
                <Link 
                  href={`/industries/${industry.slug}`} 
                  className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
                >
                  <CornerFrame className="h-full block">
                    <div className="bg-field border border-line p-6 flex items-center justify-between h-full transition-all duration-300 group-hover:border-accent/50 group-hover:bg-paper shadow-sm">
                      <div className="flex items-center gap-4">
                        {/* Icon Container with Accent Glow */}
                        <div className="w-12 h-12 border border-line bg-paper text-accent flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent-dim">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="font-display font-semibold text-lg text-ink group-hover:text-accent transition-colors">
                            {industry.name}
                          </span>
                          <span className="font-mono text-[11px] text-slate line-clamp-1 mt-0.5">
                            {industry.challenge}
                          </span>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowUpRight className="w-5 h-5 text-slate group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-2" />
                    </div>
                  </CornerFrame>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
