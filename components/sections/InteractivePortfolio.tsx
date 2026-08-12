"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CaseStudyData } from "@/lib/mdx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CornerFrame } from "@/components/ui/CornerFrame";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Sparkles, X, ExternalLink, Layers, Award } from "lucide-react";

interface InteractivePortfolioProps {
  studies: CaseStudyData[];
  showHeading?: boolean;
  title?: string;
  eyebrow?: string;
}

export function InteractivePortfolio({
  studies,
  showHeading = true,
  title = "Proof is in the shipping.",
  eyebrow = "Recent Work & Case Studies",
}: InteractivePortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeStudy, setActiveStudy] = useState<CaseStudyData | null>(null);

  // Extract unique industries & service categories
  const categories = ["all", ...Array.from(new Set(studies.map((s) => s.industry.toLowerCase())))];

  const filteredStudies = activeFilter === "all" 
    ? studies 
    : studies.filter((s) => s.industry.toLowerCase() === activeFilter);

  return (
    <div className="w-full">
      {showHeading && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <Eyebrow label={eyebrow} className="mb-4" />
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink max-w-[20ch] leading-tight tracking-tight">
              {title}
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-field/80 backdrop-blur-md p-1.5 border border-line rounded-md">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors z-10 rounded ${
                    isActive ? "text-ink-inverse" : "text-slate hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-ink rounded z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Portfolio Grid with AnimatePresence */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study, idx) => (
            <PortfolioCard
              key={study.slug}
              study={study}
              index={idx}
              onSelect={() => setActiveStudy(study)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Detail Modal Drawer */}
      <AnimatePresence>
        {activeStudy && (
          <PortfolioModal
            study={activeStudy}
            onClose={() => setActiveStudy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Portfolio Card                               */
/* -------------------------------------------------------------------------- */

function PortfolioCard({
  study,
  index,
  onSelect,
}: {
  study: CaseStudyData;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-field border border-line p-6 md:p-8 h-full flex flex-col justify-between cursor-pointer transition-shadow hover:shadow-2xl hover:border-accent/40 rounded-none overflow-hidden"
        onClick={onSelect}
      >
        {/* Subtle Ambient Radial Glow on Hover */}
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(232,69,29,0.08),transparent_80%)]" />

        <div>
          {/* Header Metadata */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-slate flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CASE 0{index + 1} — {study.client}
            </span>
            <span className="font-mono text-xs text-slate border border-line px-2 py-0.5 rounded">
              {study.year}
            </span>
          </div>

          {/* Project Image Preview with Gradient Overlay */}
          {study.image ? (
            <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden border border-line bg-ink-900 group">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-3 right-3 bg-ink-900/90 text-ink-inverse backdrop-blur-md p-2 rounded-full border border-line-inverse/30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden border border-line bg-gradient-to-br from-paper to-field p-6 flex flex-col justify-end group">
              <div className="font-mono text-[10px] uppercase text-accent mb-1 tracking-widest">
                {study.industry}
              </div>
              <div className="font-display font-semibold text-lg text-ink">
                {study.title}
              </div>
              <div className="absolute top-3 right-3 bg-ink text-ink-inverse p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
            </div>
          )}

          {/* Title & Summary */}
          <h3 className="font-display font-semibold text-xl md:text-2xl text-ink mb-3 group-hover:text-accent transition-colors">
            {study.title}
          </h3>
          <p className="font-body text-sm md:text-base text-slate leading-relaxed mb-6 line-clamp-3">
            {study.summary}
          </p>
        </div>

        {/* Results / Key Metrics */}
        <div>
          {study.results && study.results.length > 0 && (
            <div className="pt-4 border-t border-line/70 grid grid-cols-2 gap-4 mb-6">
              {study.results.slice(0, 2).map((res, rIdx) => (
                <div key={rIdx} className="bg-paper/60 p-2.5 rounded border border-line/40">
                  <strong className="font-display font-bold text-lg text-accent block leading-none">
                    {res.value}
                  </strong>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate mt-1 block">
                    {res.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Services Tags */}
          {study.services && study.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {study.services.slice(0, 3).map((srv) => (
                <span
                  key={srv}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-paper border border-line text-slate rounded-sm"
                >
                  {srv.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}

          {/* Card Footer Action */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-ink group-hover:text-accent transition-colors">
            <span>Explore Case Study</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Modal Drawer                                 */
/* -------------------------------------------------------------------------- */

function PortfolioModal({
  study,
  onClose,
}: {
  study: CaseStudyData;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-ink-900/80 backdrop-blur-xl">
      {/* Backdrop click to close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-paper border border-line shadow-2xl z-10 p-6 md:p-10 rounded-none text-ink"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate hover:text-ink hover:bg-field border border-line rounded transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-2.5 py-1 bg-accent-dim rounded-sm">
                {study.industry}
              </span>
              <span className="font-mono text-xs text-slate border border-line px-2.5 py-1 rounded-sm">
                {study.year}
              </span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight mb-4">
              {study.title}
            </h2>
            <p className="font-body text-lg text-slate leading-relaxed">
              {study.summary}
            </p>
          </div>

          {/* Results Grid */}
          {study.results && study.results.length > 0 && (
            <div className="bg-field p-6 border border-line">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" /> Key Metrics & Performance Gains
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {study.results.map((res, idx) => (
                  <div key={idx} className="bg-paper p-4 border border-line">
                    <span className="font-display font-bold text-3xl text-accent block mb-1">
                      {res.value}
                    </span>
                    <span className="font-mono text-xs uppercase text-slate tracking-wider block">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Stack */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" /> Deliverables & Scope
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.services.map((srv) => (
                <span
                  key={srv}
                  className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 bg-field border border-line text-ink"
                >
                  {srv.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/case-studies/${study.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-ink font-mono text-xs uppercase tracking-widest font-semibold hover:bg-accent-strong transition-colors"
            >
              Read Full Case Study <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase tracking-widest text-slate hover:text-ink border border-line hover:border-ink transition-colors text-center"
            >
              Close Window
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
