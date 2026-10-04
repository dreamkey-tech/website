"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function ValueProposition() {
  return (
    <section className="w-full py-space-2xl bg-surface-container-low">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-xl overflow-hidden shadow-lg bg-surface-clean p-2">
              <img
                className="w-full h-[460px] object-cover rounded-lg"
                alt="Warm welcoming interior of a contemporary upscale apartment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMgnjC1WGZ9LDQq6ZojZg5FOj0TLkNgEzauCsUqVPJz5zFAJ3-77IAWnshpTaYCp-FOqvg7cqEvXdfOS-Exa69klLsCGwPxPjScqet-RKruXfjYJIUB3dhZYSKHkjUJGejk63Ennn_ttx85xaYNDkZbqwnLbURllbq9gmj7Pmq6xMjGmYg5zN8ehcgHWeiU05jPyhM9lRHDCwXkvNxdH2Kj5j4H1dQHJOz7sZN7dTM60Xkjpx7W1wG"
              />
            </div>
            {/* Overlaid Experience Seal */}
            <div className="absolute -bottom-6 -right-3 md:right-6 bg-charcoal-pure text-surface-clean p-space-lg rounded-xl shadow-xl max-w-[240px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-gold-light text-[22px]">
                  verified
                </span>
                <span className="font-label-ui text-label-ui font-semibold text-tertiary-fixed">
                  10+ Years Trust
                </span>
              </div>
              <p className="font-body-dense text-body-dense text-secondary-fixed-dim leading-snug">
                Empowering transparent home ownership across Bengal since 2014.
              </p>
            </div>
          </div>
          {/* Right Content Block */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <span className="font-label-ui text-label-ui uppercase tracking-widest text-primary font-semibold">
              Real Estate Made Simple
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-on-surface font-bold md:font-semibold leading-tight">
              Helping You Find the Right Property Within Your Budget
            </h2>
            <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed">
              Navigating Kolkata's real estate ecosystem requires more than just
              browsing listings. From unravelling century-old clear title deeds in
              Ballygunge to evaluating master-plan developments in New Town Action
              Area III, our experienced team provides deep fiduciary clarity at
              every milestone.
            </p>
            {/* <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed">
              We partner exclusively with WBRERA-approved builders to ensure zero
              delivery disputes, guaranteed carpet areas, and completely
              transparent pricing schedules with zero hidden consultancy
              commissions for buyers.
            </p> */}
            {/* Key Stat Callouts */}
            <div className="grid grid-cols-3 gap-space-md pt-space-sm pb-space-sm">
              <div className="flex flex-col">
                <span className="font-spec-numeral text-spec-numeral text-primary">
                  1,200+
                </span>
                <span className="font-body-dense text-body-dense text-secondary">
                  Families Settled
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-spec-numeral text-spec-numeral text-on-surface">
                  98%
                </span>
                <span className="font-body-dense text-body-dense text-secondary">
                  Client Satisfaction
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-spec-numeral text-spec-numeral text-tertiary">
                  40+
                </span>
                <span className="font-body-dense text-body-dense text-secondary">
                  Premier Projects
                </span>
              </div>
            </div>
            <div>
              <Link
                href="#search-listings"
                className="inline-flex items-center gap-space-xs bg-charcoal-pure hover:bg-on-surface text-surface-clean font-label-ui text-body-default px-space-xl py-3 rounded transition-all duration-200 shadow-sm hover:-translate-y-[2px] active:scale-[0.98]"
              >
                <span className="">Find Your Property</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
