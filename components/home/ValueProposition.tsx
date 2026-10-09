"use client";

import { useRef } from "react";
import { Check, X as XIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ComparisonRow {
  feature: string;
  dreamkey: boolean | string;
  traditional: boolean | string;
  online: boolean | string;
}

const ROWS: ComparisonRow[] = [
  { feature: "Verified Property Listings",       dreamkey: true,         traditional: "Partial", online: "Partial"  },
  { feature: "Dedicated Personal Agent",         dreamkey: true,         traditional: true,      online: false      },
  { feature: "Legal & Documentation Support",    dreamkey: true,         traditional: false,     online: false      },
  { feature: "Transparent Pricing, No Surprises",dreamkey: true,         traditional: false,     online: "Partial"  },
  { feature: "Post-Purchase Support",            dreamkey: true,         traditional: false,     online: false      },
  { feature: "Property Shortlisting in 24 hrs",  dreamkey: true,         traditional: false,     online: true       },
  { feature: "Home Loan Assistance",             dreamkey: true,         traditional: false,     online: false      },
  { feature: "Zero Hidden Brokerage",            dreamkey: true,         traditional: false,     online: true       },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/15 border border-gold/30">
          <Check size={14} weight="bold" className="text-gold" />
        </span>
      </div>
    );
  if (value === false)
    return (
      <div className="flex justify-center">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-border-dark">
          <XIcon size={14} weight="bold" className="text-text-dark-muted" />
        </span>
      </div>
    );
  return (
    <div className="flex justify-center">
      <span className="text-[12px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
        {value}
      </span>
    </div>
  );
}

export default function AgencyComparison() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.from(".anim-header", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-header",
        start: "top 80%",
      }
    });

    gsap.from(".anim-table", {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-table",
        start: "top 80%",
      }
    });

    gsap.from(".anim-cta", {
      y: 16,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-table",
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-raised relative overflow-hidden" id="why-dreamkey">
      {/* Border top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="anim-header text-center mb-14">
          <h2 className="font-display text-headline-lg text-white leading-tight">
            Dream Key vs. <span className="text-gold">The Rest</span>
          </h2>
          <p className="text-text-dark-secondary text-body-default mt-3 max-w-lg mx-auto">
            We built our process around you, not commissions. See how we compare.
          </p>
        </div>

        {/* Comparison table */}
        <div className="anim-table overflow-x-auto rounded-2xl border border-border-dark">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border-dark">
                <th className="text-left px-6 py-5 text-[12px] uppercase tracking-[0.1em] text-text-dark-secondary font-semibold w-[40%]">
                  Feature
                </th>
                {/* Dream Key column - highlighted */}
                <th className="px-4 py-5 text-center relative">
                  <div className="absolute inset-0 bg-gold/6 border-x border-gold/20" />
                  <span className="relative font-display text-[15px] font-bold text-gold">Dream Key</span>
                </th>
                <th className="px-4 py-5 text-center text-[14px] font-semibold text-text-dark-secondary">
                  Traditional Agent
                </th>
                <th className="px-4 py-5 text-center text-[14px] font-semibold text-text-dark-secondary">
                  Online Portals
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border-dark/60 transition-colors hover:bg-dark-elevated/60 ${
                    i === ROWS.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-[14px] text-white font-medium">{row.feature}</td>
                  <td className="px-4 py-4 relative">
                    <div className="absolute inset-0 bg-gold/6 border-x border-gold/20" />
                    <div className="relative"><Cell value={row.dreamkey} /></div>
                  </td>
                  <td className="px-4 py-4"><Cell value={row.traditional} /></td>
                  <td className="px-4 py-4"><Cell value={row.online} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="anim-cta mt-10 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-8 bg-gold hover:bg-gold-light text-dark-base font-bold text-[14px] rounded-full transition-all duration-200 active:scale-[0.97]"
          >
            Start with Dream Key
          </a>
        </div>
      </div>

      {/* Border bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
