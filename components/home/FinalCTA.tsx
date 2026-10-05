"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function FinalCTA() {
  return (
    <section className="w-full py-space-2xl bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="bg-gradient-to-r from-charcoal-pure via-charcoal-pure to-primary/90 text-surface-clean rounded-xl p-space-xl md:p-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-xl shadow-xl">
          <div className="max-w-2xl flex flex-col gap-space-sm text-center md:text-left">
            <span className="font-label-ui text-label-ui uppercase tracking-widest text-gold-light font-semibold">
              Start Your Journey Today
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-surface-clean font-bold md:font-semibold leading-tight">
              Ready to Find Your Next Home in Kolkata?
            </h2>
            <p className="font-body-lead text-body-lead text-secondary-fixed-dim">
              Tell us what you're looking for and our Kolkata property experts
              will curate the perfect match for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0">
            <Link
              href="/buy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-ui text-body-default px-space-xl py-3.5 rounded shadow transition-all duration-200 font-semibold hover:-translate-y-[2px] active:scale-[0.98]"
            >
              <span className="">Explore Properties</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-clean/10 hover:bg-surface-clean/20 text-surface-clean font-label-ui text-body-default px-space-lg py-3.5 rounded transition-all duration-200 hover:-translate-y-[2px] active:scale-[0.98]"
            >
              <span className="">Contact Us</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
