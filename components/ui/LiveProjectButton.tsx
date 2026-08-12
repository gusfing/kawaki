"use client";

import Link from "next/link";
import React from "react";

interface LiveProjectButtonProps {
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function LiveProjectButton({ href = "#", className = "", onClick }: LiveProjectButtonProps) {
  const baseClasses = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest inline-block transition-colors duration-200 hover:bg-[#D7E2EA]/10 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-kanit ${className}`;

  if (href && href !== "#") {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        Live Project
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} type="button">
      Live Project
    </button>
  );
}
