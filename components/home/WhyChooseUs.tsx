"use client";

import { useRef } from "react";
import {
  ShieldCheck,
  Medal,
  HandCoins,
  ClockCounterClockwise,
  Globe,
  HeartStraight,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}

const FEATURES: Feature[] = [
  {
    icon: <ShieldCheck size={24} weight="duotone" />,
    title: "100% Verified Listings",
    description:
      "Every property on our platform is physically inspected, legally vetted, and documented before you see it.",
    accent: "text-emerald-400",
  },
  {
    icon: <Medal size={24} weight="duotone" />,
    title: "12+ Years of Expertise",
    description:
      "A decade of navigating Kolkata's property market gives us the edge to find deals others miss.",
    accent: "text-gold",
  },
  {
    icon: <HandCoins size={24} weight="duotone" />,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Our fee structure is disclosed upfront. What you see is what you pay.",
    accent: "text-blue-400",
  },
  {
    icon: <ClockCounterClockwise size={24} weight="duotone" />,
    title: "24-Hour Shortlisting",
    description:
      "Share your requirements in the morning. Receive a curated property list by evening, guaranteed.",
    accent: "text-purple-400",
  },
  {
    icon: <Globe size={24} weight="duotone" />,
    title: "City-Wide Network",
    description:
      "From New Town and Salt Lake to South Kolkata, our network covers every major residential corridor.",
    accent: "text-cyan-400",
  },
  {
    icon: <HeartStraight size={24} weight="duotone" />,
    title: "Long-Term Relationship",
    description:
      "We do not vanish after handover. Resale, rental, or legal queries, your agent stays reachable.",
    accent: "text-rose-400",
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.from(".anim-header-1", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-header-1",
        start: "top 80%",
      }
    });

    gsap.from(".anim-header-2", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-header-2",
        start: "top 80%",
      }
    });

    ScrollTrigger.batch(".anim-card", {
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 24,
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-raised relative overflow-hidden" id="about">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div className="anim-header-1">
            <h2 className="font-display text-headline-lg text-white leading-tight">
              Why Choose{" "}
              <span className="text-gold">Dream Key</span>
            </h2>
          </div>
          <p className="anim-header-2 text-text-dark-secondary text-body-lead leading-relaxed">
            We are a full-service real estate broker, not just a listing portal.
            Our clients stay with us because of the results and the trust we build together.
          </p>
        </div>

        {/* Features grid - 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="anim-card opacity-0 group flex flex-col gap-4 p-6 bg-dark-elevated border border-border-dark rounded-2xl transition-all duration-300 hover:border-gold/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl bg-dark-float border border-border-dark flex items-center justify-center transition-all duration-300 group-hover:border-gold/30 group-hover:bg-dark-raised ${feature.accent}`}>
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display text-[16px] font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-text-dark-secondary text-body-dense leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
