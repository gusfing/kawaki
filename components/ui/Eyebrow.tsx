import { cn } from "@/lib/utils";

interface EyebrowProps {
  label: string;
  index?: string | number;
  className?: string;
}

/*
 * Section eyebrow — mono label with a short ignition tick to its left and an
 * optional two-digit index. The tick is the only accent it carries.
 */
export function Eyebrow({ label, index, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-slate",
        className
      )}
    >
      <span className="h-px w-6 bg-accent" aria-hidden />
      <span>
        {index !== undefined && (
          <span className="text-ink">
            {String(index).padStart(2, "0")}
            <span className="text-slate"> / </span>
          </span>
        )}
        {label}
      </span>
    </div>
  );
}
