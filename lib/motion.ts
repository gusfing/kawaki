import type { Variants } from "framer-motion";

/*
 * One motion language for the whole site.
 * spring — entrances, hover pops (slight overshoot)
 * glide  — large moves, panels, reveals
 */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;
export const EASE_GLIDE = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Standard section/card entrance: rise + fade. Compositor-only props. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_GLIDE },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Shared viewport config so every section reveals consistently. */
export const VIEWPORT_ONCE = { once: true, margin: "-15% 0px" } as const;
