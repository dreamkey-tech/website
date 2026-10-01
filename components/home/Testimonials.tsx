"use client";

import { motion } from "motion/react";

export default function Testimonials() {
  const testimonials = [
    {
      text: '"Dream Key handled everything from builder negotiations to stamp registration seamlessly. As an IT professional in New Town, their transparency saved me months of legwork."',
      initials: "AM",
      name: "Anirban Mukherjee",
      role: "Bought 3 BHK in New Town",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      text: '"Authentic advice without high-pressure sales tactics. They understood our elderly parents\' accessibility needs in Ballygunge and curated the perfect low-density project."',
      initials: "RS",
      name: "Shweta & Rajesh Singhania",
      role: "Bought Flat in Ballygunge",
      colorClass: "bg-tertiary/10 text-tertiary",
    },
    {
      text: '"Their legal diligence team detected a title irregularity on an unapproved plot I was considering elsewhere and saved me from financial catastrophe. Absolute integrity."',
      initials: "DS",
      name: "Dr. Debjit Sen",
      role: "Invested in Rajarhat Corridor",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      text: '"Moving back from Bangalore was daunting, but their 360-degree virtual video tours and coordinated family visits in Salt Lake made closing our home seamless before relocating."',
      initials: "PR",
      name: "Priyadarshini Roy",
      role: "Relocated to Salt Lake",
      colorClass: "bg-charcoal-pure/10 text-charcoal-pure",
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
            Verified Feedback
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            What Our Customers Say
          </h2>
          <p className="font-body-default text-body-default text-secondary mt-2">
            Real homeowners and NRI investors share their buying experiences
            across Kolkata.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="bg-surface-clean rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-gold-light">
                  <span className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    star
                  </span>
                </div>
                <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed italic">
                  {test.text}
                </p>
              </div>
              <div className="pt-space-md flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${test.colorClass}`}
                >
                  {test.initials}
                </div>
                <div>
                  <p className="font-title-property text-body-default text-on-surface font-semibold leading-tight">
                    {test.name}
                  </p>
                  <p className="font-label-ui text-[11px] text-secondary">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
