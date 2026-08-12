"use client";

import { motion } from "framer-motion";
import { Quote } from "@/components/ui/Quote";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

const TESTIMONIALS = [
  {
    quote: "They actually delivered on time and the codebase isn't a mess. We were able to take it over easily.",
    attribution: "Jane Doe, CTO, Acme Corp"
  },
  {
    quote: "The fastest site we've ever had. Conversion is up 40% simply because pages load instantly now.",
    attribution: "John Smith, Head of Digital, Globex"
  }
];

export function Testimonials() {
  const mounted = useHydrated();

  return (
    <section className="w-full py-24 md:py-32 px-5 md:px-16 bg-paper">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8"
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={staggerChildren}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Quote
                quote={testimonial.quote}
                attribution={testimonial.attribution}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
