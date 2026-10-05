"use client";

import { motion } from "motion/react";
import Link from "next/link";
import PropertySearch from "./PropertySearch";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-charcoal-pure -mt-[116px] pt-[116px]">
      <div className="relative w-full h-[480px] md:h-[580px] lg:h-[620px] flex items-center md:items-center items-end pb-20 md:pb-8 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhRzQWqmNRDHzL0w0mNiQn-PFZW6oJ29xuBFHRGwrERLu0iPNgXhQXcUGdvDAnSmljwbGym5kugNkiFmpOWI9AYUE3cLeIfhmljgZ7X0r7vSNJAD2JibCNoDL2qrBh6Ul2HOnnkw_AxPivO14oogloLUcMcHlUhHG2dkTjABm4dmxFZoKKeTBtT8KXHa26Q9kYHCPfCNtbt_vX9GTRWWc-aQoPUNGA8euTzW2soMU3l0dE9GRDeDiyDctp4UA7B-U8uQ')",
          }}
        ></div>
        
        {/* Architectural Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal-pure/95 via-charcoal-pure/75 md:via-charcoal-pure/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/90 via-transparent to-charcoal-pure/40 md:to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-margin-mobile md:px-margin md:pt-12 md:pb-24 lg:pb-28">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            initial="hidden"
            animate="visible"
            className="max-w-2xl flex flex-col gap-2 md:gap-space-md"
          >
            <motion.div variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [.23, 1, .32, 1] } }
            }} className="inline-flex items-center gap-1.5 md:gap-space-xs px-2.5 py-1 md:px-3 md:py-1 rounded bg-surface-clean/10 backdrop-blur-md w-fit border border-surface-clean/15 md:border-0">
              <span className="w-2 h-2 rounded-full bg-gold-light animate-pulse"></span>
              <span className="font-label-ui text-[10px] md:text-label-ui text-surface-clean uppercase tracking-widest font-bold">
                Trusted Real Estate Partner in Kolkata
              </span>
            </motion.div>
            
            <motion.h1 variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [.23, 1, .32, 1] } }
            }} className="font-display-hero text-[28px] leading-[1.1] md:text-display-hero text-surface-clean tracking-tight mt-1 md:mt-0">
              Find a Place You’ll Love to Call Home
            </motion.h1>
            
            <motion.p variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [.23, 1, .32, 1] } }
            }} className="font-body-lead text-[13px] leading-snug md:text-body-lead text-secondary-fixed-dim max-w-xl line-clamp-3 md:line-clamp-none">
              Verified luxury apartments, premium high-rises, and prime
              residential developments across New Town, South Kolkata, Salt Lake,
              and Central Kolkata.
            </motion.p>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [.23, 1, .32, 1] } }
              }}
              className="flex flex-wrap items-center gap-2 md:gap-space-md pt-1 md:pt-space-xs"
            >
              <Link
                className="inline-flex items-center gap-1.5 md:gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-bold md:font-label-ui text-[12px] md:text-body-default px-3 py-2 md:px-space-xl md:py-3 rounded shadow-sm md:shadow-md transition-all active:scale-[0.97]"
                href="#featured-listings"
              >
                <span className="">Explore Properties</span>
                <span className="material-symbols-outlined text-[15px] md:text-[18px]">
                  arrow_forward
                </span>
              </Link>
              <Link
                className="inline-flex items-center gap-1 md:gap-space-xs bg-surface-clean/15 hover:bg-surface-clean/25 text-surface-clean font-medium md:font-label-ui text-[12px] md:text-body-default px-3 py-2 md:px-space-lg md:py-3 rounded backdrop-blur-sm transition-all active:scale-[0.97]"
                href="#enquiry-section"
              >
                <span className="material-symbols-outlined text-[15px] md:text-[18px] text-gold-light md:text-surface-clean">
                  support_agent
                </span>
                <span className="">Talk to an Expert</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating Property Search Panel */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-margin-mobile md:px-margin mt-0 md:-mt-16 lg:-mt-20 mb-space-2xl">
        <PropertySearch />
      </div>
    </section>
  );
}
