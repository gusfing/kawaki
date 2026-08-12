import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "inverse";
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", href, children, ...props }, ref) => {
    const baseStyles = "group/btn inline-flex items-center justify-center gap-2 font-body font-medium text-[15px] tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-[2px]";

    const paddingStyles = variant !== "ghost" ? "py-[13px] px-6" : "py-2";

    const variants = {
      primary: `
        bg-ink text-ink-inverse
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-accent)]
        focus-visible:-translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:shadow-[4px_4px_0_var(--color-accent)]
        active:translate-x-0 active:translate-y-0 active:shadow-none
      `,
      secondary: `
        bg-transparent border border-ink text-ink
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-ink)]
        focus-visible:-translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:shadow-[4px_4px_0_var(--color-ink)]
        active:translate-x-0 active:translate-y-0 active:shadow-none
      `,
      ghost: `
        bg-transparent text-ink hover:text-accent-strong focus-visible:text-accent-strong
      `,
      accent: `
        bg-accent text-accent-ink
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-paper)]
        focus-visible:-translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:shadow-[4px_4px_0_var(--color-paper)]
        active:translate-x-0 active:translate-y-0 active:shadow-none
      `,
      inverse: `
        bg-paper text-ink
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-accent)]
        focus-visible:-translate-x-[2px] focus-visible:-translate-y-[2px] focus-visible:shadow-[4px_4px_0_var(--color-accent)]
        active:translate-x-0 active:translate-y-0 active:shadow-none
      `
    };

    const combinedClassName = cn(baseStyles, paddingStyles, variants[variant], className);

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
