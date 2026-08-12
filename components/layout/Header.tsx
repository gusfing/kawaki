"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";
import { EASE_GLIDE } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/case-studies" },
  { label: "Resources", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 px-5 md:px-16",
          isScrolled
            ? "bg-paper/95 backdrop-blur-xl border-b border-line shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto w-full h-20 flex items-center justify-between relative">
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_GLIDE, delay: 0.1 }}
          >
            <Link
              href="/"
              className="font-display font-bold text-xl tracking-[-0.02em] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
              aria-label="Kawaki Studios — home"
            >
              Kawaki<span className="text-accent">*</span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links — Centered */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "group relative font-mono text-xs uppercase tracking-wider transition-colors",
                    pathname === link.href ? "text-ink" : "text-slate hover:text-ink"
                  )}
                >
                  <span className="opacity-40 mr-1 text-[10px]">0{i + 1}</span>
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <Button variant="primary" href="/contact">Start a project</Button>
          </motion.div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
