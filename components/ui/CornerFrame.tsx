"use client";

import { ReactNode, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface CornerFrameProps {
  children: ReactNode;
  label?: string;
  alwaysVisible?: boolean;
  className?: string;
}

export function CornerFrame({ children, label, alwaysVisible, className }: CornerFrameProps) {
  // Track cursor coordinates relative to component bounds
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  const handleMouseLeave = () => {
    setCoords(null);
  };

  return (
    <div
      className={cn("relative group inline-block w-full h-full", className)}
      data-always-visible={alwaysVisible || undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        {children}

        {/* SVG overlay for the 4 corners */}
        <div className="pointer-events-none absolute inset-0 w-full h-full">
          {/* Top Left */}
          <svg width="12" height="12" className="absolute top-0 left-0 overflow-visible">
            <path className="corner-path" d="M 0 12 L 0 0 L 12 0" />
          </svg>
          
          {/* Top Right */}
          <svg width="12" height="12" className="absolute top-0 right-0 overflow-visible">
            <path className="corner-path" d="M 0 0 L 12 0 L 12 12" />
          </svg>
          
          {/* Bottom Right */}
          <svg width="12" height="12" className="absolute bottom-0 right-0 overflow-visible">
            <path className="corner-path" d="M 12 0 L 12 12 L 0 12" />
          </svg>
          
          {/* Bottom Left */}
          <svg width="12" height="12" className="absolute bottom-0 left-0 overflow-visible">
            <path className="corner-path" d="M 12 12 L 0 12 L 0 0" />
          </svg>
        </div>
      </div>

      {/* Optional Meta Label + Live Coordinates */}
      {(label || coords) && (
        <div className="absolute -bottom-6 left-0 mt-2 flex items-center justify-between w-full pointer-events-none select-none">
          <span className="font-mono text-[10px] leading-none uppercase tracking-[0.08em] text-slate transition-all duration-200 group-hover:text-signal">
            {label ? label : "ELEMENT"}
            {coords && (
              <span className="ml-2 font-mono text-[9px] text-signal opacity-80">
                [{coords.x}px, {coords.y}px]
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
