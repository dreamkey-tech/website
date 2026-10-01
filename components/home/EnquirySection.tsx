"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function EnquirySection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you! Your enquiry has been received. Our Kolkata property specialist will call you shortly."
    );
  };

  return (
    <section
      className="relative w-full py-space-2xl bg-charcoal-pure overflow-hidden"
      id="enquiry-section"
    >
      {/* Architectural Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        title="Interior architectural rendering of a grand high ceiling Kolkata clubhouse lounge"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsw3fdpMABq241LdzEhvpYCP4XOm-KksPeLSF5IGRb52yqR15hB_EXlzM-aVTyAAsEzZXn354Rz-716KMDsIayA4g2pdT-hrf4XDPLDIvA4wlndXdoqs_XnBvJZaVGir1Mz3Xn88I6n5joEb0H13GOrcOlGhmCNz1RXluSH0oQ38_JEkZ5a2HfNoEUTP54oBIPzxLL-2r1l7WK9hL_IocfudquYTNdRCfhUNyZzomDrD5fvhQkKt2M')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-pure via-charcoal-pure/95 to-charcoal-pure/80"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col gap-space-md text-surface-clean">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded bg-surface/10 w-fit">
              <span className="material-symbols-outlined text-gold-light text-[18px]">
                verified_user
              </span>
              <span className="font-label-ui text-label-ui text-tertiary-fixed tracking-wider uppercase font-semibold">
                Priority Booking Desk
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-surface-clean leading-tight">
              Discover a Smarter Way to Buy & Sell Property in Kolkata
            </h2>
            <p className="font-body-default text-body-default text-secondary-fixed-dim leading-relaxed">
              Eliminate conflicting developer claims and opaque pricing tiers. Our
              verified property consultants provide transparent comparative
              evaluations, arrange chauffeured inspection tours, and assist with
              institutional home loan sanctioning.
            </p>
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  100% Zero Brokerage on direct partner developer inventory
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  Complimentary title search & municipal sanction assessment
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  Bank tie-ups with SBI, HDFC & ICICI at preferential rates
                </span>
              </div>
            </div>
            <div className="pt-space-sm">
              <a
                href="tel:+919830012345"
                className="inline-flex items-center gap-space-sm text-gold-light hover:text-surface-clean font-title-property text-headline-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">
                  phone_in_talk
                </span>
                <span className="">+91 98300 12345</span>
              </a>
            </div>
          </div>
          
          {/* Right Floating Clean White Enquiry Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-surface-clean rounded-xl p-space-xl shadow-2xl">
              <div className="mb-space-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Make an Enquiry
                </h3>
                <p className="font-body-dense text-body-dense text-secondary mt-0.5">
                  Our dedicated Kolkata relationship manager will connect within 2
                  hours.
                </p>
              </div>
              <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Full Name *
                    </label>
                    <input
                      className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean"
                      placeholder="Subrata Banerjee"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 bg-surface-container text-secondary text-body-dense rounded-l font-semibold">
                        +91
                      </span>
                      <input
                        className="h-11 px-3 w-full bg-surface-container-low text-on-surface font-body-default rounded-r focus:outline-none focus:bg-surface-clean"
                        placeholder="98300 XXXXX"
                        required
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Email Address
                  </label>
                  <input
                    className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean"
                    placeholder="subrata.b@gmail.com"
                    type="email"
                  />
                </div>
                {/* Property Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Property Type
                    </label>
                    <select className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean">
                      <option>2 BHK Apartment</option>
                      <option>3 BHK Luxury Flat</option>
                      <option>4+ BHK Penthouse</option>
                      <option>Independent Bungalow</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Preferred Location
                    </label>
                    <select className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean">
                      <option>New Town (Action Area I / II / III)</option>
                      <option>Ballygunge / Alipore</option>
                      <option>Salt Lake (Sector I - V)</option>
                      <option>EM Bypass / Ruby</option>
                      <option>Rajarhat Main Road</option>
                    </select>
                  </div>
                </div>
                {/* Budget Range */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Estimated Budget Band
                  </label>
                  <select className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean">
                    <option>₹50 Lakhs - ₹85 Lakhs</option>
                    <option>₹85 Lakhs - ₹1.5 Crore</option>
                    <option>₹1.5 Crore - ₹3 Crore</option>
                    <option>₹3 Crore & Above (Ultra Luxury)</option>
                  </select>
                </div>
                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Specific Requirements
                  </label>
                  <textarea
                    className="p-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean resize-none"
                    placeholder="e.g. South-facing balcony, ready-to-move by Diwali..."
                    rows={2}
                  ></textarea>
                </div>
                {/* Submit */}
                <button
                  className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-ui text-body-default font-semibold rounded shadow-md transition-all duration-200 mt-1 flex items-center justify-center gap-2 hover:-translate-y-[2px] active:scale-[0.98]"
                  type="submit"
                >
                  <span className="">Submit Enquiry</span>
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
