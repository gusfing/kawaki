#!/usr/bin/env node
/*
 * hero-invariants.mjs — zero-dependency static check of the Hero section
 * baseline. No test framework. Reads Hero.tsx, Button.tsx, globals.css and
 * asserts the invariants below. Exits 1 (non-zero) if any check fails, 0 if
 * all pass. Run: node scripts/hero-invariants.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const hero = read("components/sections/Hero.tsx");
const button = read("components/ui/Button.tsx");
const css = read("app/globals.css");

const checks = [];

// --- a11y ---
checks.push({
  name: "h1 present",
  pass: /<h1\b[\s\S]*?>/.test(hero),
});
checks.push({
  name: "image has alt attribute",
  pass: /<Image\b[\s\S]*?\balt=["'][^"']+["']/.test(hero),
});
checks.push({
  name: "decorative parallax index aria-hidden",
  pass: /aria-hidden[\s\S]*?hero-parallax|hero-parallax[\s\S]*?aria-hidden/.test(hero),
});
checks.push({
  name: "decorative pulse dot aria-hidden",
  pass: /animate-data-pulse[\s\S]*?aria-hidden|aria-hidden[\s\S]*?animate-data-pulse/.test(hero),
});
checks.push({
  name: "button focus-visible ring present",
  pass: /focus-visible:ring-2\s+focus-visible:ring-accent/.test(button),
});

// --- reduced motion ---
checks.push({
  name: "globals.css prefers-reduced-motion block exists",
  pass: /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css),
});
checks.push({
  name: "reduced-motion block forces reveal-line visible",
  pass: /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.reveal-line\s*\{\s*transform:\s*none\s*!important;\s*opacity:\s*1\s*!important;/m.test(css),
});
checks.push({
  name: "Hero gates GSAP on prefersReducedMotion()",
  pass: /prefersReducedMotion\(\)\s*\)\s*return;/.test(hero),
});

// --- JS failsafe ---
checks.push({
  name: "reveal lines NOT hidden by default CSS",
  pass: !/\.reveal-line[^{}]*\{[^}]*\b(transform|opacity|visibility)\s*:/.test(
    css.slice(0, css.indexOf("@media"))
  ),
});
checks.push({
  name: "failsafe forces timeline to end",
  pass: /tl\.progress\(1\)/.test(hero) && /setTimeout/.test(hero),
});

// --- CLS ---
checks.push({
  name: "image wrapper has aspect-ratio classes",
  pass: /aspect-\[16\/9\]\s+md:aspect-\[21\/9\]/.test(hero),
});
checks.push({
  name: "next/image fill with capped sizes + priority",
  pass: /<Image\b[\s\S]*?\bfill[\s\S]*?\bsizes=["']\(min-width: 80rem\) 80rem, 100vw["'][\s\S]*?\bpriority/.test(hero),
});

// --- reveal scaffolding ---
checks.push({
  name: ".reveal-mask present",
  pass: /\.reveal-mask/.test(css),
});
checks.push({
  name: ".reveal-line present",
  pass: /\.reveal-line/.test(css),
});

let failed = 0;
for (const c of checks) {
  const label = c.pass ? "PASS" : "FAIL";
  if (!c.pass) failed++;
  console.log(`[${label}] ${c.name}`);
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed > 0) {
  console.error(`${failed} invariant(s) FAILED`);
  process.exit(1);
}
