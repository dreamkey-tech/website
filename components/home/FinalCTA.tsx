"use client";

import { PhoneCall, Envelope, MapPin, ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { useState, FormEvent, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  type: "buy" | "sell" | "rent" | "other";
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
    type: "buy",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Animate success message
  useGSAP(() => {
    if (submitted && successRef.current && !prefersReducedMotion) {
      gsap.fromTo(successRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, { scope: containerRef, dependencies: [submitted, prefersReducedMotion] });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-base relative overflow-hidden" id="contact">
      {/* Background accents */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right, rgba(223,158,4,0.04) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - info */}
          <div className="anim-left flex flex-col gap-8">
            <div>
              <h2 className="font-display text-headline-lg text-white leading-tight">
                Let&#39;s Find Your{" "}
                <span className="text-gold">Perfect Home</span>
              </h2>
              <p className="text-text-dark-secondary text-body-lead mt-4 leading-relaxed max-w-lg">
                Reach out and a dedicated Dream Key agent will contact you within a few hours.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <a
                href="tel:+918697559123"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-dark-raised border border-border-dark flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-200">
                  <PhoneCall size={20} weight="duotone" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-dark-secondary font-semibold">Call Us</p>
                  <p className="text-white font-medium text-[15px] group-hover:text-gold transition-colors">+91 86975 59123</p>
                </div>
              </a>

              <a
                href="mailto:info@dreamkeykol.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-dark-raised border border-border-dark flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-200">
                  <Envelope size={20} weight="duotone" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-dark-secondary font-semibold">Email Us</p>
                  <p className="text-white font-medium text-[15px] group-hover:text-gold transition-colors">info@dreamkeykol.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-dark-raised border border-border-dark flex items-center justify-center text-gold">
                  <MapPin size={20} weight="duotone" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-dark-secondary font-semibold">Office</p>
                  <p className="text-white font-medium text-[15px]">New Town, Kolkata - 700156</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://api.whatsapp.com/send?phone=918697559123&text=Hi%2C%20I%20am%20interested%20in%20a%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-12 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 font-semibold text-[14px] rounded-full w-fit transition-all duration-200 active:scale-[0.97]"
            >
              <WhatsappLogo size={20} weight="fill" />
              Chat on WhatsApp
              <ArrowRight size={14} />
            </a>

            {/* Office hours */}
            <p className="text-[12px] text-text-dark-muted">
              Mon - Sat: 10:00 AM to 7:00 PM IST
            </p>
          </div>

          {/* Right - contact form */}
          <div className="anim-right bg-dark-raised border border-border-dark rounded-2xl p-6 md:p-8">
            {submitted ? (
              <div
                ref={successRef}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <PhoneCall size={28} weight="duotone" className="text-gold" />
                </div>
                <h3 className="font-display text-[20px] font-semibold text-white">We&#39;ll be in touch!</h3>
                <p className="text-text-dark-secondary text-body-default max-w-xs">
                  Your enquiry has been received. An agent will call you within a few hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="contact-form" noValidate>
                <h3 className="font-display text-[18px] font-semibold text-white mb-1">
                  Send an Enquiry
                </h3>

                {/* Enquiry type */}
                <div className="flex flex-wrap gap-2">
                  {(["buy", "sell", "rent", "other"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((d) => ({ ...d, type }))}
                      className={`h-8 px-4 rounded-full text-[12px] font-semibold capitalize transition-all duration-200 ${
                        formData.type === type
                          ? "bg-gold text-dark-base"
                          : "bg-dark-elevated border border-border-dark text-text-dark-secondary hover:text-white hover:border-gold/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="text-[11px] uppercase tracking-wider font-semibold text-text-dark-secondary block mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    className="w-full h-11 bg-dark-elevated border border-border-dark hover:border-gold/30 focus:border-gold/50 outline-none rounded-xl px-4 text-[14px] text-white placeholder:text-text-dark-muted transition-colors duration-200"
                  />
                </div>

                {/* Phone + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="text-[11px] uppercase tracking-wider font-semibold text-text-dark-secondary block mb-1.5">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                      className="w-full h-11 bg-dark-elevated border border-border-dark hover:border-gold/30 focus:border-gold/50 outline-none rounded-xl px-4 text-[14px] text-white placeholder:text-text-dark-muted transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[11px] uppercase tracking-wider font-semibold text-text-dark-secondary block mb-1.5">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className="w-full h-11 bg-dark-elevated border border-border-dark hover:border-gold/30 focus:border-gold/50 outline-none rounded-xl px-4 text-[14px] text-white placeholder:text-text-dark-muted transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="text-[11px] uppercase tracking-wider font-semibold text-text-dark-secondary block mb-1.5">
                    Message (optional)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tell us your budget, preferred location, BHK type..."
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    className="w-full bg-dark-elevated border border-border-dark hover:border-gold/30 focus:border-gold/50 outline-none rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-text-dark-muted transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 bg-gold hover:bg-gold-light disabled:opacity-60 text-dark-base font-bold text-[14px] rounded-xl transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-dark-base/30 border-t-dark-base rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Enquiry
                      <ArrowRight size={16} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
