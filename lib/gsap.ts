"use client";

/*
 * Central GSAP entrypoint. Registers ScrollTrigger + the useGSAP React hook
 * once, on the client only. Import gsap/ScrollTrigger/useGSAP from here so
 * plugin registration is guaranteed and never duplicated.
 *
 * ScrollTrigger is kept in sync with Lenis smooth scroll in
 * components/layout/SmoothScroll.tsx (single source of truth for the ticker).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** True when the visitor asked the OS to minimise motion. Gate every effect on this. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
