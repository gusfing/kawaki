"use client";

import { useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <div className={cn("w-full border-t border-line", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        
        return (
          <div key={item.id} className="border-b border-line">
            <button
              id={`accordion-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="flex w-full items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 rounded-sm"
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
            >
              <span className="font-display font-medium text-xl text-ink">
                {item.question}
              </span>
              <span 
                className={cn(
                  "ml-4 flex h-6 w-6 shrink-0 items-center justify-center border border-line rounded-full transition-transform duration-200",
                  isOpen ? "rotate-45 border-ink bg-ink text-ink-inverse" : "text-ink"
                )}
                aria-hidden="true"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
              )}
            >
              <p className="font-body text-base text-slate max-w-[68ch]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
