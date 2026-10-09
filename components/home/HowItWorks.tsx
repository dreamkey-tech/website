"use client";

import { useRef } from "react";
import {
  PhoneCall,
  MagnifyingGlass,
  HandshakeIcon,
  Handshake,
  FileMagnifyingGlass,
  Key,
  ArrowRight,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: <PhoneCall size={22} weight="duotone" />,
    title: "Initial Consultation",
    description:
      "Tell us your requirements, budget, and preferred locations. We assign a dedicated agent within 24 hours.",
    color: "text-blue-400",
  },
  {
    number: "02",
    icon: <MagnifyingGlass size={22} weight="duotone" />,
    title: "Property Shortlisting",
    description:
      "We curate a personalised list of verified properties that match your criteria, saving you weeks of searching.",
    color: "text-purple-400",
  },
  {
    number: "03",
    icon: <FileMagnifyingGlass size={22} weight="duotone" />,
    title: "Site Visits & Due Diligence",
    description:
      "Your agent schedules visits and conducts thorough legal and structural checks on shortlisted properties.",
    color: "text-amber-400",
  },
  {
    number: "04",
    icon: <Handshake size={22} weight="duotone" />,
    title: "Negotiation & Agreement",
    description:
      "We negotiate on your behalf to get the best price and terms, then draft a transparent sale agreement.",
    color: "text-emerald-400",
  },
  {
    number: "05",
    icon: <Key size={22} weight="duotone" />,
    title: "Registration & Handover",
    description:
      "From loan facilitation to property registration, we guide you through every final step to key handover.",
    color: "text-gold",
  },
];

export default function HowItWorks() {
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

    ScrollTrigger.batch(".anim-step", {
      onEnter: (elements) => {
        gsap.from(elements, {
          x: -24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true
        });
      },
      start: "top 85%",
      once: true
    });

    gsap.from(".anim-cta", {
      y: 16,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-cta",
        start: "top 90%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-base relative overflow-hidden" id="process">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="anim-header mb-16">
          <h2 className="font-display text-headline-lg text-white leading-tight">
            How We{" "}
            <span className="text-gold">Work for You</span>
          </h2>
          <p className="text-text-dark-secondary text-body-default mt-3 max-w-lg">
            A clear, five-step process from your first call to collecting your keys.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute left-[calc(2.5rem+1px)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-dark to-transparent hidden md:block" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="anim-step group relative flex gap-6 md:gap-8 pb-10 last:pb-0 opacity-0"
              >
                {/* Step icon / number */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center bg-dark-raised transition-all duration-300 group-hover:border-gold/40 ${
                    i === STEPS.length - 1
                      ? "border-gold/40 bg-gold/10"
                      : "border-border-dark"
                  } ${step.color}`}>
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 text-[9px] font-bold bg-dark-elevated border border-border-dark rounded-full w-5 h-5 flex items-center justify-center text-text-dark-secondary">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <h3 className="font-display text-[17px] font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-text-dark-secondary text-body-default leading-relaxed max-w-xl">
                    {step.description}
                  </p>

                  {/* Connector arrow between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="mt-6 md:hidden flex items-center gap-2 text-text-dark-muted">
                      <ArrowRight size={14} className="text-gold/50" />
                    </div>
                  )}
                </div>

                {/* Step visual highlight (desktop right side) */}
                <div className="hidden xl:block shrink-0 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="anim-cta mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-dark-raised border border-border-dark rounded-2xl">
          <div className="flex-1">
            <p className="font-display text-[17px] font-semibold text-white">Ready to find your home?</p>
            <p className="text-text-dark-secondary text-body-dense mt-0.5">
              Book a free consultation call with our team today.
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=918697559123&text=I%20would%20like%20to%20start%20my%20property%20search."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 bg-gold hover:bg-gold-light text-dark-base font-bold text-[13px] rounded-full transition-all duration-200 active:scale-[0.97] shrink-0"
          >
            <PhoneCall size={16} weight="fill" />
            Book Free Call
          </a>
        </div>
      </div>
    </section>
  );
}
