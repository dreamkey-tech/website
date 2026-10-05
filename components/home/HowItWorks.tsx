"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer, smoothTransition, viewportOnce } from "@/lib/animations";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Share Needs",
      desc: "Specify preferred locality, unit configuration, and financial blueprint.",
      badge: "10-Min Brief",
    },
    {
      num: "02",
      title: "Explore Units",
      desc: "Receive curated video tours, floor plans & clear title dossiers.",
      badge: "Zero Spam",
    },
    {
      num: "03",
      title: "Private Visit",
      desc: "Chauffeured, pressure-free site inspections with our senior advisors.",
      badge: "Complimentary Cab",
    },
    {
      num: "04",
      title: "Legal Vetting",
      desc: "RERA compliance verification, draft sale agreements & bank loan support.",
      badge: "Full Due Diligence",
    },
    {
      num: "05",
      title: "Handover",
      desc: "Smooth deed registration at Registrar office & key celebration handover.",
      badge: "Key in Hand",
    },
  ];

  return (
    <section className="w-full py-space-2xl bg-surface-container-low overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-space-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={smoothTransition}
        >
          <span className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold">
            Structured Journey
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-on-surface font-bold md:font-semibold leading-tight mt-1 md:mt-2">
            5 Simple Steps to Get Your Dream Home in Kolkata
          </h2>
          <p className="font-body-default text-body-default text-secondary mt-2">
            From finding the right property to completing municipal registration,
            we manage every detail seamlessly.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: index * 0.09 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
              className="bg-surface-clean rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative cursor-default group"
            >
              {/* Connector line on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-[calc(var(--spacing-space-md)/2+1px)] w-[calc(var(--spacing-space-md)+2px)] h-px bg-border-subtle z-10" />
              )}
              <motion.div
                className="font-spec-numeral text-headline-md text-primary font-bold mb-3"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ ...smoothTransition, delay: 0.15 + index * 0.09 }}
              >
                {step.num}
              </motion.div>
              <div>
                <h4 className="font-title-property text-title-property text-on-surface mb-1.5">
                  {step.title}
                </h4>
                <p className="font-body-dense text-body-dense text-secondary">{step.desc}</p>
              </div>
              <div className="mt-4 pt-3 flex items-center text-primary font-label-ui text-[11px] uppercase tracking-wider font-semibold border-t border-border-subtle/60">
                {step.badge}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
