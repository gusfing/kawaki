import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-display font-semibold text-3xl md:text-5xl text-ink mb-2">
        {value}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
        {label}
      </span>
    </div>
  );
}
