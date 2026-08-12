"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/case-studies" },
  { label: "Resources", href: "/blog" },
  { label: "About", href: "/about" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Basic focus trap
      if (e.key === "Tab" && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent scrolling

    // Auto focus first element (the close button) when opened
    if (overlayRef.current) {
      const closeBtn = overlayRef.current.querySelector("button");
      closeBtn?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      id="mobile-nav"
      className="fixed inset-0 z-50 bg-paper/97 backdrop-blur-xl flex flex-col p-5 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div className="flex justify-between items-center mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
          Menu
        </span>
        <button
          onClick={onClose}
          className="p-2 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col">
        {LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group flex items-baseline gap-4 border-b border-line py-5 font-display font-bold text-4xl tracking-[-0.02em] text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2px]"
          >
            <span className="font-mono text-sm font-normal text-slate group-hover:text-accent transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
            {link.label}
          </Link>
        ))}

        <div className="pt-10">
          <Button href="/contact" className="w-full" onClick={onClose}>
            Start a project
          </Button>
        </div>
      </nav>

      <div className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-slate flex justify-between">
        <span>Delhi, India</span>
        <span>28.61°N / 77.21°E</span>
      </div>
    </div>
  );
}
