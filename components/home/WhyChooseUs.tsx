"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: "explore",
      title: "Local Expertise",
      desc: "Hyper-local valuation intelligence spanning North heritage, South boulevards, and East corridors.",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      icon: "tune",
      title: "Tailored Recommendations",
      desc: "Zero algorithmic mass spam. Every match fits your exact commute, family layout, and budget.",
      colorClass: "bg-tertiary/10 text-tertiary",
    },
    {
      icon: "gavel",
      title: "Legal & Title Verification",
      desc: "Dedicated real estate advocates examine 30+ years of mother deeds, sanctions, and encumbrances.",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      icon: "handshake",
      title: "Transparent Pricing",
      desc: "Zero hidden fees or marked-up rates. Developer price sheets shared directly with complete parity.",
      colorClass: "bg-charcoal-pure/10 text-charcoal-pure",
    },
  ];

  return (
    <section className="w-full py-space-2xl bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: Why Choose Details */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div>
              <span className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold">
                Why Dream <span className="text-primary">Key</span>
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-on-surface font-bold md:font-semibold leading-tight mt-1 md:mt-2">
                Authentic Advisory Backed by Legal Rigor
              </h2>
              <p className="font-body-default text-body-default text-secondary mt-2">
                We replace aggressive property push with principled, hyper-local
                consultation built on verifiable property records.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-surface-clean p-space-md rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div
                    className={`w-10 h-10 rounded flex items-center justify-center mb-3 ${benefit.colorClass}`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {benefit.icon}
                    </span>
                  </div>
                  <h3 className="font-title-property text-title-property text-on-surface mb-1">
                    {benefit.title}
                  </h3>
                  <p className="font-body-dense text-body-dense text-secondary">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Modern 3-Image Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-space-md">
            <div className="col-span-7 flex flex-col gap-space-md">
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-56 object-cover"
                  alt="Modern architectural balcony overlooking greenery in Kolkata"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZK-esgHbtGZPhwzEnSmW6Prqjp2fBKYFn1k0vLlFHhQ0v8JEqkrxB0jPqMsQb5YHqtuKL2ft_gNyvxyCIfYNOOkViGKvoVdRzk5FruTrk6T_00Fie9kFIjPhxrmypWNK40oeUMqkZGRZNT9Z4-UN3SY-5VLbm56k1qJ8ZsR1j2kvhz0-neyYYLZnHXlh572MtQmcw-ga0pkn83_ebzhuwLdlFf9O03bp0lzWarK4lm2353ENMp5c"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-44 object-cover"
                  alt="Architectural detail of contemporary Kolkata residential high-rise building"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChbVK2-Up1I8kRbhZ3wBVZ1JiTSwplYoLvQNp9gLhFh61PkfPviiSIe1Xe_ytuQPpV9Cc8f8ZgMLoBdtkWMUsQbfhsChqIpWX8WTtQbWORk66i0LebaN8EV-2KE97Td6GovnKwrFxgZiX8qrSvZFwTj0XbjMFDEyv12nD1a6XwuXBqbJartOpuM4woQzqJ8rLBntr2tTxkUO59u1-xyrwGxNv_xjyEfbN_Mni_TrvZzKLUPPAqfv1B"
                />
              </div>
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="rounded-xl overflow-hidden shadow-md h-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Sophisticated modern interior of a luxury master bedroom in Kolkata"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfwzJkmDAbNaFvPCr3sXmzlWzdl-pBU3men7HfQForXgqBbmPpFws-gS0ho-LtigMQe1PPPzncobV7dN33CezXXr0SGmc6uYZlbvxRcfndKtRmAc4jHcmHIISDes3yY-XYAXUdanF16NoqdIoEWkqzEAGJ83gejIo6SvhTXxw1t3CvEuh8VwzWM9ODF3-9uScsMHSrMHruX48PJR8HIuDNj0huygEd70zJb4QWsEhuY2QtD3Q-zT4t"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
