"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, smoothTransition, viewportOnce } from "@/lib/animations";

// Animated counter hook
function useCounter(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function AnimatedStat({ value, label, suffix = "", color = "text-primary" }: { value: number; label: string; suffix?: string; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="flex flex-col">
      <span className={`font-spec-numeral text-spec-numeral ${color}`}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="font-body-dense text-body-dense text-secondary">{label}</span>
    </div>
  );
}

export default function ValueProposition() {
  return (
    <section className="w-full py-space-2xl bg-surface-container-low overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Image */}
          <motion.div
            className="lg:col-span-6 relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={smoothTransition}
          >
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg bg-surface-clean p-2"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <img
                className="w-full h-[460px] object-cover rounded-lg"
                alt="Warm welcoming interior of a contemporary upscale apartment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMgnjC1WGZ9LDQq6ZojZg5FOj0TLkNgEzauCsUqVPJz5zFAJ3-77IAWnshpTaYCp-FOqvg7cqEvXdfOS-Exa69klLsCGwPxPjScqet-RKruXfjYJIUB3dhZYSKHkjUJGejk63Ennn_ttx85xaYNDkZbqwnLbURllbq9gmj7Pmq6xMjGmYg5zN8ehcgHWeiU05jPyhM9lRHDCwXkvNxdH2Kj5j4H1dQHJOz7sZN7dTM60Xkjpx7W1wG"
              />
            </motion.div>
            {/* Experience Seal */}
            <motion.div
              className="absolute -bottom-6 -right-3 md:right-6 bg-charcoal-pure text-surface-clean p-space-lg rounded-xl shadow-xl max-w-[240px]"
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-gold-light text-[22px]">verified</span>
                <span className="font-label-ui text-label-ui font-semibold text-tertiary-fixed">10+ Years Trust</span>
              </div>
              <p className="font-body-dense text-body-dense text-secondary-fixed-dim leading-snug">
                Empowering transparent home ownership across Bengal since 2014.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-space-md"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeRight} transition={smoothTransition}>
              <span className="font-label-ui text-label-ui uppercase tracking-widest text-primary font-semibold">
                Real Estate Made Simple
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-on-surface font-bold md:font-semibold leading-tight">
                Helping You Find the Right Property Within Your Budget
              </h2>
              <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed mt-2">
                Navigating Kolkata's real estate ecosystem requires more than just
                browsing listings. From unravelling century-old clear title deeds in
                Ballygunge to evaluating master-plan developments in New Town Action
                Area III, our experienced team provides deep fiduciary clarity at
                every milestone.
              </p>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              className="grid grid-cols-3 gap-space-md pt-space-sm pb-space-sm"
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.15 }}
            >
              <AnimatedStat value={1200} label="Families Settled" suffix="+" color="text-primary" />
              <AnimatedStat value={98} label="Client Satisfaction" suffix="%" color="text-on-surface" />
              <AnimatedStat value={40} label="Premier Projects" suffix="+" color="text-tertiary" />
            </motion.div>

            <motion.div variants={fadeUp} transition={{ ...smoothTransition, delay: 0.2 }}>
              <Link
                href="/buy"
                className="inline-flex items-center gap-space-xs bg-charcoal-pure hover:bg-on-surface text-surface-clean font-label-ui text-body-default px-space-xl py-3 rounded transition-all duration-200 shadow-sm hover:-translate-y-[2px] active:scale-[0.98]"
              >
                <span>Find Your Property</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
