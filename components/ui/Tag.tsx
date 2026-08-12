import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn("inline-flex items-center px-2 py-1 bg-signal-dim text-signal-ink font-mono text-xs uppercase tracking-[0.08em] rounded-[2px]", className)}>
      {children}
    </span>
  );
}
