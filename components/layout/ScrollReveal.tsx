"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "stagger";
  className?: string;
}

export function ScrollReveal({ children, variant = "fadeUp", className }: ScrollRevealProps) {
  const chosenVariant = variant === "fadeUp" ? fadeUp : staggerChildren;
  const mounted = useHydrated();

  return (
    <motion.div
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={chosenVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
