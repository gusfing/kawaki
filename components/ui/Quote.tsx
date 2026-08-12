import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuoteProps {
  quote: ReactNode;
  attribution: string;
  className?: string;
}

export function Quote({ quote, attribution, className }: QuoteProps) {
  return (
    <figure className={cn("border-l-2 border-signal pl-6 py-1", className)}>
      <blockquote className="font-body text-lg text-ink leading-[1.6] mb-4">
        {quote}
      </blockquote>
      <figcaption className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
        {attribution}
      </figcaption>
    </figure>
  );
}
