"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function GlobalPreloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isItalic, setIsItalic] = useState(false);
  const pathname = usePathname();

  // Alternating NOW italic stroke effect
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setIsItalic((prev) => !prev);
    }, 280);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    // Check if preloader already ran in this session
    const hasLoaded = sessionStorage.getItem("kawaki_preloaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setCount(0);
    
    // Disable scroll while loading
    document.documentElement.style.overflow = "hidden";
    
    // Smooth progress count up to 100
    let startTimestamp: number;
    const duration = 2200; // 2.2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const currentCount = Math.min(Math.floor((progress / duration) * 100), 100);
      
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          document.documentElement.style.overflow = "";
          sessionStorage.setItem("kawaki_preloaded", "true");
        }, 400); // 0.4s pause at 100% before curtain slide
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2147483647] bg-[#000] text-white flex flex-col justify-between select-none pointer-events-auto"
          style={{
            padding: "clamp(2rem, 5vw, 5rem)",
            fontFamily: "var(--sans), -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          {/* Top Row: Counter and "YOUR" */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-2 font-mono text-sm tracking-wider">
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1
                }}
              >
                {count < 10 ? `0${count}` : count}
              </span>
              <span className="text-white/40 text-xs tracking-widest font-mono"> — 100</span>
            </div>
            <span className="text-white/50 text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
              YOUR
            </span>
          </div>
          
          {/* Center Message: Giant Typography */}
          <div className="my-auto flex flex-col gap-1 tracking-tight leading-[0.95]">
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-bold tracking-[-0.03em] uppercase"
              >
                WEB EXPERIENCE
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.5rem,7.5vw,7.5rem)] font-bold tracking-[-0.03em] uppercase flex items-center flex-wrap gap-x-4 gap-y-1"
              >
                <span>IS LOADING RIGHT</span>
                <span className="relative inline-flex items-center min-w-[3.5ch]">
                  {isItalic ? (
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        WebkitTextStroke: "1.5px #fff",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      NOW
                    </span>
                  ) : (
                    <span style={{ fontWeight: 800 }}>
                      NOW
                    </span>
                  )}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between w-full border-t border-white/10 pt-4 text-xs font-mono tracking-widest text-white/40 uppercase">
            <span>KAWAKI STUDIOS · EST. 2019</span>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-right"
            >
              Please wait a few seconds
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
