"use client";

import Link from "next/link";
import React from "react";

interface ContactButtonProps {
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function ContactButton({ href = "/contact", className = "", onClick }: ContactButtonProps) {
  const buttonStyle = {
    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
    outline: "2px solid #FFFFFF",
    outlineOffset: "-3px",
  };

  const content = (
    <span className="relative z-10 block text-center">Contact Me</span>
  );

  const baseClasses = `rounded-full text-white font-medium uppercase tracking-widest inline-block transition-transform duration-200 hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-kanit ${className}`;

  if (href) {
    return (
      <Link href={href} style={buttonStyle} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button style={buttonStyle} className={baseClasses} onClick={onClick} type="button">
      {content}
    </button>
  );
}
