"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  Accessibility, 
  Sparkles, 
  ArrowRight,
  LucideIcon 
} from "lucide-react";

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  meta: string;
  tag: string;
  icon: LucideIcon;
  stats: { value: string; label: string }[];
}

const FEATURES: Feature[] = [
  {
    title: "Uncompromising Quality",
    subtitle: "Precision Engineering",
    description: "Every line of code and pixel is meticulously crafted to ensure the highest standards of reliability, clean architecture, and long-term durability.",
    meta: "FEATURE 01/05",
    tag: "ARCHITECTURE",
    icon: ShieldCheck,
    stats: [
      { value: "100%", label: "Type Safety" },
      { value: "0", label: "Runtime Regressions" }
    ]
  },
  {
    title: "Built for Speed",
    subtitle: "Sub-second Performance",
    description: "Performance is not an afterthought. We build platforms that load instantly, score >95 on Core Web Vitals, and handle heavy user traffic effortlessly.",
    meta: "FEATURE 02/05",
    tag: "PERFORMANCE",
    icon: Zap,
    stats: [
      { value: "<100ms", label: "TTFB Latency" },
      { value: "99+", label: "Lighthouse Score" }
    ]
  },
  {
    title: "Scalable Architecture",
    subtitle: "Modular & Decoupled",
    description: "Our solutions are engineered to grow with your business. Decoupled backends, static caching rails, and resilient API boundaries prevent bottlenecks.",
    meta: "FEATURE 03/05",
    tag: "SCALABILITY",
    icon: Layers,
    stats: [
      { value: "10x", label: "Traffic Tolerance" },
      { value: "99.99%", label: "Target Uptime" }
    ]
  },
  {
    title: "Accessible by Default",
    subtitle: "Inclusive UX Design",
    description: "We believe the web should be accessible to everyone. Complete WCAG 2.2 Level AA compliance, screen-reader semantics, and visible keyboard focus states.",
    meta: "FEATURE 04/05",
    tag: "ACCESSIBILITY",
    icon: Accessibility,
    stats: [
      { value: "WCAG 2.2", label: "Level AA Standard" },
      { value: "100%", label: "Keyboard Navigable" }
    ]
  },
  {
    title: "Future-proof Stack",
    subtitle: "Next.js & Modern Web",
    description: "We utilize cutting-edge, battle-tested technologies that won't become legacy tech overnight. Modern React Server Components, TypeScript, and Tailwind CSS.",
    meta: "FEATURE 05/05",
    tag: "TECHNOLOGY",
    icon: Sparkles,
    stats: [
      { value: "Next.js 16", label: "Turbopack Engine" },
      { value: "Zero", label: "Lock-in Dependencies" }
    ]
  }
];

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate exact scroll overflow distance in pixels
  useEffect(() => {
    const calculateScrollDistance = () => {
      if (trackRef.current) {
        // Total track scrollable width minus window width plus padding margin
        const totalTrackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollAmount(Math.max(0, totalTrackWidth - viewportWidth + 64));
      }
    };

    calculateScrollDistance();
    window.addEventListener("resize", calculateScrollDistance);
    return () => window.removeEventListener("resize", calculateScrollDistance);
  }, []);

  // Transform X axis dynamically from 0 to -scrollAmount
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollAmount]);

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-paper border-t border-line">
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full px-5 md:px-16 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              02 — Core Capabilities
            </span>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-ink tracking-tight">
              Engineering standards that scale.
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate max-w-sm hidden md:block">
            Scroll down to navigate through all 5 core capability panels →
          </p>
        </div>
        
        {/* Horizontal Full-Screen Cards Track */}
        <motion.div 
          ref={trackRef}
          style={{ x }} 
          className="flex gap-6 md:gap-10 px-5 md:px-16 my-auto items-center"
        >
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div 
                key={index} 
                className="w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-[60vw] h-[52vh] max-h-[500px] min-h-[380px] flex-shrink-0"
              >
                <CornerFrame label={feature.meta} alwaysVisible={true} className="w-full h-full">
                  <div className="bg-field border border-line p-6 md:p-10 h-full flex flex-col justify-between relative overflow-hidden group shadow-lg">
                    
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

                    {/* Top Row: Icon + Tag */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-12 h-12 border border-line bg-paper text-accent flex items-center justify-center rounded-none shadow-sm">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 bg-paper border border-line text-slate font-semibold">
                        {feature.tag}
                      </span>
                    </div>

                    {/* Middle Row: Big Headline & Paragraph */}
                    <div className="relative z-10 max-w-2xl my-auto">
                      <span className="font-mono text-xs uppercase tracking-widest text-accent mb-1.5 block font-semibold">
                        {feature.subtitle}
                      </span>
                      <h3 className="font-display font-bold text-2xl md:text-4xl text-ink tracking-tight mb-3 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-slate leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom Row: Key Metrics Badges */}
                    <div className="relative z-10 pt-4 border-t border-line/80 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      {feature.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="font-display font-bold text-xl md:text-2xl text-accent">
                            {stat.value}
                          </span>
                          <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-slate mt-0.5">
                            {stat.label}
                          </span>
                        </div>
                      ))}

                      <div className="col-span-2 md:col-span-2 flex items-center justify-end font-mono text-xs uppercase tracking-wider font-semibold text-ink group-hover:text-accent transition-colors">
                        <span>Explore Spec</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform text-accent" />
                      </div>
                    </div>

                  </div>
                </CornerFrame>
              </div>
            );
          })}
          
          {/* End Spacer */}
          <div className="w-[8vw] flex-shrink-0" />
        </motion.div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto w-full px-5 md:px-16 z-10 flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-widest text-slate border-t border-line/60 pt-3">
          <span>PANELS: 05 TOTAL</span>
          <span className="hidden md:inline">SYSTEM: ACTIVE</span>
          <span>KAWAKI // 2026</span>
        </div>

      </div>
    </section>
  );
}
