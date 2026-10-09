"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "How much does Dream Key charge as a brokerage fee?",
    a: "Our standard brokerage is 1-2% of the property value, disclosed before any engagement begins. There are no hidden charges, administrative fees, or post-closing surprises.",
  },
  {
    q: "How long does the entire property buying process take?",
    a: "From initial consultation to key handover, a typical transaction takes 30-90 days depending on property type, loan processing, and registration queues. Our agents keep the timeline moving.",
  },
  {
    q: "Do you assist with home loans?",
    a: "Yes. We have partnerships with major banks and NBFCs in Kolkata. Our team will compare loan offers for you, assist with paperwork, and coordinate with the lender throughout the process.",
  },
  {
    q: "Can I list my property for sale or rent through Dream Key?",
    a: "Absolutely. We list seller and landlord properties after a physical inspection. Fill out our Contact form or call us, and a listing specialist will visit within 48 hours.",
  },
  {
    q: "Do you cover areas outside Kolkata?",
    a: "Currently we operate exclusively within the Greater Kolkata region, covering New Town, Salt Lake, Rajarhat, South Kolkata, Ballygunge, and surrounding areas. We plan to expand in 2025.",
  },
  {
    q: "What types of properties do you deal with?",
    a: "We handle residential apartments, penthouses, villas, row houses, commercial spaces, and land plots across Kolkata. Our primary strength is premium and mid-premium residential properties.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-border-dark last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-display text-[15px] font-medium transition-colors duration-200 ${isOpen ? "text-gold" : "text-white group-hover:text-gold"}`}>
          {faq.q}
        </span>
        <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
          isOpen
            ? "bg-gold/15 border-gold/30 text-gold"
            : "border-border-dark text-text-dark-secondary group-hover:border-gold/30 group-hover:text-gold"
        }`}>
          {isOpen ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-text-dark-secondary text-body-default leading-relaxed pb-5 max-w-2xl">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from(".anim-left", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-left",
        start: "top 80%",
      }
    });

    gsap.from(".anim-right", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-left",
        start: "top 80%",
      }
    });
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-raised relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column - heading */}
          <div className="anim-left lg:col-span-4">
            <h2 className="font-display text-headline-lg text-white leading-tight">
              Frequently Asked{" "}
              <span className="text-gold">Questions</span>
            </h2>
            <p className="text-text-dark-secondary text-body-default mt-4 leading-relaxed">
              Have more questions? Call us directly or drop us a message.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 h-11 px-6 bg-dark-elevated border border-border-dark hover:border-gold/40 text-text-dark-secondary hover:text-gold text-[13px] font-semibold rounded-full transition-all duration-200"
            >
              Contact Us
            </a>
          </div>

          {/* Right column - FAQs */}
          <div className="anim-right lg:col-span-8">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
