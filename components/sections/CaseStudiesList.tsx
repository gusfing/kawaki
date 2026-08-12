"use client";

import { useState } from "react";
import { CaseStudyData } from "@/lib/mdx";
import { Card } from "@/components/ui/Card";
import { SERVICES } from "@/lib/data/services";
import { INDUSTRIES } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

interface CaseStudiesListProps {
  initialStudies: CaseStudyData[];
}

export function CaseStudiesList({ initialStudies }: CaseStudiesListProps) {
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const filteredStudies = initialStudies.filter((study) => {
    const serviceMatch = selectedService === "all" || study.services.includes(selectedService);
    const industryMatch = selectedIndustry === "all" || study.industry === selectedIndustry;
    return serviceMatch && industryMatch;
  });

  const activeServices = SERVICES.filter((s) =>
    initialStudies.some((study) => study.services.includes(s.slug))
  );

  const activeIndustries = INDUSTRIES.filter((ind) =>
    initialStudies.some((study) => study.industry === ind.slug)
  );

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-6 xl:items-end justify-between border-b border-line pb-8">
        {/* Service Filters */}
        <div className="flex flex-col gap-2 max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">Filter by Service</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedService("all")}
              className={cn(
                "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                selectedService === "all"
                  ? "bg-ink border-ink text-ink-inverse"
                  : "border-line bg-field text-slate hover:text-ink hover:border-ink"
              )}
            >
              All Services
            </button>
            {activeServices.map((s) => (
              <button
                key={s.slug}
                onClick={() => setSelectedService(s.slug)}
                className={cn(
                  "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                  selectedService === s.slug
                    ? "bg-ink border-ink text-ink-inverse"
                    : "border-line bg-field text-slate hover:text-ink hover:border-ink"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Filters */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">Filter by Sector</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedIndustry("all")}
              className={cn(
                "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                selectedIndustry === "all"
                  ? "bg-ink border-ink text-ink-inverse"
                  : "border-line bg-field text-slate hover:text-ink hover:border-ink"
              )}
            >
              All Sectors
            </button>
            {activeIndustries.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => setSelectedIndustry(ind.slug)}
                className={cn(
                  "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                  selectedIndustry === ind.slug
                    ? "bg-ink border-ink text-ink-inverse"
                    : "border-line bg-field text-slate hover:text-ink hover:border-ink"
                )}
              >
                {ind.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredStudies.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-line bg-field">
          <p className="font-body text-slate text-base">No case studies match the selected filters.</p>
          <button
            onClick={() => {
              setSelectedService("all");
              setSelectedIndustry("all");
            }}
            className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-signal hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => {
            const resultsDesc = study.results.length > 0 ? (
              <div className="mt-4 pt-4 border-t border-line grid grid-cols-2 gap-4 w-full">
                {study.results.slice(0, 2).map((res, rIdx) => (
                  <div key={rIdx} className="flex flex-col">
                    <span className="font-display font-bold text-lg text-signal">{res.value}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate leading-none mt-1">{res.label}</span>
                  </div>
                ))}
              </div>
            ) : null;

            return (
              <div key={study.slug} className="h-full">
                <Card
                  meta={`CASE 0${idx + 1} — ${study.client}, ${study.year}`}
                  title={study.title}
                  description={
                    <div className="flex flex-col h-full justify-between items-start">
                      <p className="font-body text-base text-slate leading-relaxed flex-1">{study.summary}</p>
                      {resultsDesc}
                    </div>
                  }
                  href={`/case-studies/${study.slug}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
