"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

const LOGOS = [
  {
    name: "ACME",
    mark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 22H22L12 2Z" />
        <circle cx="12" cy="14" r="3" fill="currentColor" />
      </svg>
    ),
    className: "font-display font-bold tracking-widest uppercase",
  },
  {
    name: "GLOBEX",
    mark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    className: "font-body font-semibold tracking-tight uppercase",
  },
  {
    name: "VERTEX",
    mark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 21h18M12 3v18" />
        <path d="M12 3L6 11h12L12 3Z" fill="currentColor" />
      </svg>
    ),
    className: "font-display font-medium tracking-[0.15em] uppercase",
  },
  {
    name: "KRONOS",
    mark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    className: "font-mono font-bold tracking-wider uppercase",
  },
  {
    name: "APEX",
    mark: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    className: "font-display font-black tracking-tight italic uppercase",
  },
];

export function LogoStrip() {
  const mounted = useHydrated();

  return (
    <motion.section
      className="w-full py-14 border-y border-line overflow-hidden"
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={fadeUp}
      aria-label="Trusted by teams at"
    >
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-paper to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-paper to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24 text-slate/70"
              aria-hidden={copy === 1}
            >
              {LOGOS.map((logo) => (
                <div key={logo.name} className="flex items-center gap-2 shrink-0">
                  {logo.mark}
                  <span className={`${logo.className} text-base`}>{logo.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
