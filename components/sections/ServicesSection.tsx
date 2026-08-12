"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";

const SERVICES_DATA = [
  {
    number: "01",
    name: "3D Modeling",
    description:
      "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    number: "02",
    name: "Rendering",
    description:
      "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    number: "03",
    name: "Motion Design",
    description:
      "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    number: "04",
    name: "Branding",
    description:
      "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    number: "05",
    name: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-28 md:pt-36 pb-20 sm:pb-24 md:pb-32 w-full font-kanit relative z-10 scroll-mt-24">
      <div className="max-w-5xl mx-auto w-full">
        {/* Optimized Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="font-black uppercase text-center text-[#0C0C0C] text-[clamp(2.8rem,8vw,96px)] leading-none tracking-tight mb-14 sm:mb-18 md:mb-24">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 group hover:bg-neutral-50/50 transition-colors duration-200 px-4 rounded-xl">
                {/* Number */}
                <div className="font-black text-[#0C0C0C] text-[clamp(2.5rem,8vw,110px)] leading-none select-none min-w-[100px] md:min-w-[140px] group-hover:text-accent transition-colors duration-200">
                  {service.number}
                </div>

                {/* Name + Description Stack */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1.1rem,2vw,2rem)] leading-snug">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60 text-[clamp(0.88rem,1.4vw,1.18rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
