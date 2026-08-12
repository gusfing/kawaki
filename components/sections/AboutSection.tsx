"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";

export function AboutSection() {
  return (
    <section className="relative min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-32 md:pt-40 pb-24 flex flex-col justify-center items-center overflow-hidden font-kanit scroll-mt-24 z-10">
      {/* Decorative 3D images in 4 corners */}
      {/* Top-left: Moon icon */}
      <div className="absolute top-[6%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none opacity-80 sm:opacity-100">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[100px] sm:w-[150px] md:w-[200px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[6%] left-[2%] sm:left-[5%] md:left-[8%] z-10 pointer-events-none opacity-80 sm:opacity-100">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[90px] sm:w-[130px] md:w-[170px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[6%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none opacity-80 sm:opacity-100">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[100px] sm:w-[150px] md:w-[200px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[6%] right-[2%] sm:right-[5%] md:right-[8%] z-10 pointer-events-none opacity-80 sm:opacity-100">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[110px] sm:w-[160px] md:w-[210px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Optimized Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(2.8rem,8vw,96px)] mb-4">
            About me
          </h2>
        </FadeIn>

        <div className="mt-8 sm:mt-12 md:mt-14 flex flex-col items-center gap-12 sm:gap-16 md:gap-20 w-full">
          {/* Animated paragraph */}
          <div className="max-w-[560px]">
            <AnimatedText
              text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
              className="text-center leading-relaxed text-[clamp(1rem,1.8vw,1.3rem)]"
            />
          </div>

          {/* Contact Button */}
          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
