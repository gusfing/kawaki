import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { CornerFrame } from "./CornerFrame";
import { cn } from "@/lib/utils";

interface CardProps {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  href?: string;
  meta?: string;
  image?: string;
  className?: string;
}

export function Card({ eyebrow, title, description, href, meta, image, className }: CardProps) {
  const content = (
    <div className={cn("bg-field border border-line rounded-none p-6 md:p-8 h-full flex flex-col items-start justify-between", className)}>
      <div className="w-full flex flex-col flex-1">
        {image && (
          <div className="w-full relative aspect-[4/3] mb-6 overflow-hidden bg-line/10">
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-4 block">
            {eyebrow}
          </span>
        )}
        <h3 className="font-display font-semibold text-xl text-ink mb-2">
          {title}
        </h3>
        <div className="font-body text-base text-slate leading-relaxed">
          {description}
        </div>
      </div>
      {href && (
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-slate group-hover:text-signal transition-colors">
          Open
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  );

  const cardBody = (
    <CornerFrame label={meta} className="w-full h-full block">
      {content}
    </CornerFrame>
  );

  if (href) {
    return (
      <Link href={href} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 w-full h-full">
        {cardBody}
      </Link>
    );
  }

  return (
    <div className="w-full h-full">
      {cardBody}
    </div>
  );
}
