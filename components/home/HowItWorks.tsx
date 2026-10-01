"use client";

import { motion } from "motion/react";

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
    <section className="w-full py-space-2xl bg-surface-container-low">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold">
            Structured Journey
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            5 Simple Steps to Get Your Dream Home in Kolkata
          </h2>
          <p className="font-body-default text-body-default text-secondary mt-2">
            From finding the right property to completing municipal registration,
            we manage every detail seamlessly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-surface-clean rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <div className="font-spec-numeral text-headline-md text-primary font-bold mb-3">
                {step.num}
              </div>
              <div>
                <h4 className="font-title-property text-title-property text-on-surface mb-1.5">
                  {step.title}
                </h4>
                <p className="font-body-dense text-body-dense text-secondary">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center text-primary font-label-ui text-[11px] uppercase tracking-wider font-semibold">
                {step.badge}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
