"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";

interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    number: "01",
    name: "Nextlevel Studio",
    category: "Client",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    number: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    number: "03",
    name: "Solaris Digital",
    category: "Client",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

function Card({
  project,
  index,
  totalCards,
}: {
  project: ProjectData;
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[70vh] md:min-h-[78vh] sticky flex items-center justify-center mb-10 md:mb-16"
      style={{ top: `${90 + index * 24}px` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden font-kanit"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 md:mb-7 pb-4 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="font-black text-[#D7E2EA] text-[clamp(2.2rem,5vw,70px)] leading-none select-none">
              {project.number}
            </span>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium block">
                {project.category}
              </span>
              <h3 className="font-medium text-lg sm:text-xl md:text-2xl text-[#D7E2EA] uppercase tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton />
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 md:gap-4">
            <div className="rounded-[24px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden bg-neutral-900 border border-neutral-800 h-[130px] sm:h-[160px] md:h-[190px]">
              <img
                src={project.col1Img1}
                alt={`${project.name} image 1`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-[24px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden bg-neutral-900 border border-neutral-800 h-[160px] sm:h-[200px] md:h-[260px]">
              <img
                src={project.col1Img2}
                alt={`${project.name} image 2`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image */}
          <div className="md:col-span-7 rounded-[24px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[260px] md:min-h-[380px] h-full">
            <img
              src={project.col2Img}
              alt={`${project.name} feature image`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 pt-24 md:pt-32 pb-32 font-kanit scroll-mt-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Optimized Heading */}
        <FadeIn delay={0} y={40} className="text-center mb-14 sm:mb-18 md:mb-20">
          <h2 className="hero-heading font-black uppercase text-[clamp(2.8rem,8vw,96px)] leading-none tracking-tight">
            Project
          </h2>
        </FadeIn>

        {/* 3 Sticky Stacking Project Cards */}
        <div className="relative">
          {PROJECTS_DATA.map((project, index) => (
            <Card
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
