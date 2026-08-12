"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { SERVICES } from "@/lib/data/services";
import { staggerChildren, fadeUp } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

export function ServiceGrid() {
  const mounted = useHydrated();

  return (
    <section className="w-full py-24 md:py-32 px-5 md:px-16 bg-field">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={fadeUp}
          className="mb-16"
        >
          <Eyebrow label="What we do" className="mb-6" />
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink max-w-[20ch]">
            Eight services, one team.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          initial={mounted ? "hidden" : false}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerChildren}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.slug} variants={fadeUp} className="h-full">
              <Card
                eyebrow="CAPABILITY"
                title={service.name}
                description={service.description}
                href={`/services/${service.slug}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
