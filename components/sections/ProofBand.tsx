"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

const PROOF_STATS = [
  { value: "142", label: "Projects shipped" },
  { value: "5", label: "Years in business" },
  { value: "2M+", label: "Lines of code" },
  { value: "94%", label: "Client retention" },
];

export function ProofBand() {
  const mounted = useHydrated();

  return (
    <section
      id="proof"
      className="w-full py-24 px-5 md:px-16 dark-section border-y border-line-inverse relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={staggerChildren}
        >
          {PROOF_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 md:p-8 border border-line-inverse flex items-center justify-center text-center min-w-0"
            >
              <div className="flex flex-col items-center max-w-full">
                <span 
                  className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] text-ink-inverse mb-2 max-w-full truncate"
                  title={stat.value}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.08em] text-ink-inverse/60 max-w-full truncate">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
