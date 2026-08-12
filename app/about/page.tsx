"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { Button } from "@/components/ui/Button";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProofBand } from "@/components/sections/ProofBand";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import {
  Code2,
  Zap,
  Layers,
  Users,
  Compass,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Globe2,
} from "lucide-react";

const TEAM = [
  {
    name: "Kunal Sharma",
    role: "Founder & Lead Architect",
    bio: "Directs technical scoping, Next.js architecture, and high-stakes performance engineering.",
    icon: Cpu,
    tag: "DELHI, IN",
  },
  {
    name: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    bio: "Specializes in design system token engines, fluid Framer/GSAP motion, and WCAG AA accessibility.",
    icon: Code2,
    tag: "REMOTE",
  },
  {
    name: "Vikram Patel",
    role: "Senior Systems Engineer",
    bio: "Handles API route infrastructures, PostgreSQL indexing, and Cloudflare/AWS edge deployments.",
    icon: Layers,
    tag: "REMOTE",
  },
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "Code Quality First",
    eyebrow: "ENGINEERING",
    desc: "We lean on native platform capabilities before introducing heavy dependencies. Clean semantic HTML, custom CSS variables, and zero bloated frameworks.",
    icon: Code2,
  },
  {
    num: "02",
    title: "Conversion & Performance",
    eyebrow: "DISCIPLINE",
    desc: "A stunning website that doesn't load instantly or convert is a failed design. Every build is benchmarked for >90 Core Web Vitals and SEO search rank.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Transparent & Predictable",
    eyebrow: "PROCESS",
    desc: "No surprises or hidden fees. We scope database constraints and Figma blueprints upfront before writing a line of production code.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Direct Engineer Access",
    eyebrow: "INTEGRITY",
    desc: "Work directly with the senior engineers building your platform. Zero account managers, zero translation loss, 100% technical clarity.",
    icon: Users,
  },
];

const MILESTONES = [
  { year: "2019", title: "Studio Founded", desc: "Started as a boutique engineering laboratory in Delhi." },
  { year: "2021", title: "Headless Architecture", desc: "Pioneered Next.js + Headless Shopify integrations for top D2C brands." },
  { year: "2023", title: "Global Expansion", desc: "Crossed 75+ shipped platforms for SaaS, FinTech, and architecture clients worldwide." },
  { year: "2026", title: "Engineering Excellence", desc: "140+ production systems shipped with SLA monitoring and 99.9% uptime." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <div ref={containerRef} className="w-full bg-paper text-ink font-body">
      {/* Sub-Hero Section */}
      <section className="relative w-full pt-36 md:pt-44 pb-24 px-5 md:px-16 bg-ink-900 text-ink-inverse overflow-hidden border-b border-line-inverse">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-inverse opacity-30 pointer-events-none" />

        <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-data-pulse" />
            <Eyebrow label="About Kawaki Studios" className="text-accent-dim" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-ink-inverse mb-8">
                Web platforms built like they&rsquo;ll actually{" "}
                <span className="text-accent italic">need to last.</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-slate leading-relaxed max-w-2xl">
                Founded by Kunal Sharma, Kawaki Studios is a specialized engineering practice based in Delhi.
                We design and build websites, storefronts, and web apps for teams who&rsquo;ve outgrown
                their last agency&rsquo;s templates. Custom where it matters, fast everywhere else.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-line-inverse pt-8 lg:pt-0 lg:pl-10">
              <div className="font-mono text-xs uppercase tracking-widest text-slate mb-2">Studio Stats</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="font-display font-bold text-3xl md:text-4xl text-accent">142+</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate mt-1">Projects Shipped</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl md:text-4xl text-ink-inverse">99.9%</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate mt-1">Core Vitals Score</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl md:text-4xl text-ink-inverse">2019</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate mt-1">Established</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl md:text-4xl text-accent">100%</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate mt-1">On-Time Launch</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy / Our Standards Grid */}
      <section className="w-full py-28 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
            <div>
              <Eyebrow label="Our Standards" className="mb-4" />
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink max-w-[20ch] leading-tight">
                No templates. No bloat. Just craft.
              </h2>
            </div>
            <p className="font-body text-base text-slate max-w-[40ch] leading-relaxed">
              We eliminate technical debt before it starts with rigorous code standards and direct engineer communication.
            </p>
          </div>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.num} className="h-full">
                  <CornerFrame className="h-full block">
                    <div className="p-8 bg-field border border-line h-full flex flex-col justify-between group hover:border-accent/40 transition-colors duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-line">
                          <span className="font-display font-black text-3xl text-accent select-none">
                            {item.num}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-slate font-semibold px-2 py-0.5 bg-paper border border-line">
                            {item.eyebrow}
                          </span>
                        </div>
                        <IconComp className="w-7 h-7 text-ink mb-4 group-hover:text-accent transition-colors duration-300" />
                        <h3 className="font-display font-semibold text-xl text-ink mb-3">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-slate leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </CornerFrame>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Studio Timeline / Milestones */}
      <section className="w-full py-28 px-5 md:px-16 bg-field border-b border-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <Eyebrow label="Trajectory" className="mb-4" />
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink">
              Building standard-setting web platforms since 2019.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-line pt-12">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="flex flex-col justify-between">
                <div>
                  <span className="font-mono text-4xl font-bold text-accent block mb-3">
                    {m.year}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-ink mb-2">
                    {m.title}
                  </h3>
                  <p className="font-body text-sm text-slate leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="w-full py-28 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Eyebrow label="The Team" className="mb-4" />
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink">
                Craft-focused builders.
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate">
              Direct Access &bull; Zero Intermediaries
            </span>
          </div>

          <ScrollReveal variant="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => {
              const IconC = member.icon;
              return (
                <div key={idx} className="h-full">
                  <CornerFrame className="h-full block">
                    <div className="p-8 bg-field border border-line h-full flex flex-col justify-between group hover:bg-paper transition-colors duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="font-mono text-xs font-bold text-slate uppercase tracking-wider">
                            0{idx + 1} &bull; {member.tag}
                          </span>
                          <IconC className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-ink mb-1 group-hover:text-accent transition-colors duration-300">
                          {member.name}
                        </h3>
                        <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider block mb-4">
                          {member.role}
                        </span>
                        <p className="font-body text-sm text-slate leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-line flex items-center justify-between font-mono text-xs text-slate">
                        <span>FULL-STACK</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300 text-ink font-medium">
                          Contact Direct <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </CornerFrame>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Proof / Stats Band */}
      <ProofBand />

      {/* Testimonials section */}
      <div className="border-b border-line">
        <Testimonials />
      </div>

      {/* Location / Studio Coordinates Bar */}
      <section className="w-full py-24 px-5 md:px-16 bg-field border-b border-line">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe2 className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate">
                STUDIO HEADQUARTERS
              </span>
            </div>
            <h3 className="font-display font-semibold text-2xl md:text-4xl text-ink">
              Based in Delhi, India — engineering globally.
            </h3>
          </div>
          <div className="flex gap-10 font-mono text-xs uppercase tracking-widest text-slate border-t md:border-t-0 border-line pt-6 md:pt-0 w-full md:w-auto">
            <div>
              <span className="block text-ink font-bold text-lg">28.61°N</span>
              <span>77.21°E LAT/LONG</span>
            </div>
            <div>
              <span className="block text-ink font-bold text-lg">UTC +5:30</span>
              <span>IST TIMEZONE</span>
            </div>
            <div>
              <span className="block text-accent font-bold text-lg">ONLINE</span>
              <span>GLOBAL DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection
        heading="Have a project in mind?"
        subhead="Tell us what you're building — we'll tell you honestly whether we're the right fit."
        primaryButtonText="Start a project"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
