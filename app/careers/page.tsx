"use client";

import { motion } from "motion/react";
import Link from "next/link";

const benefits = [
  {
    icon: "trending_up",
    title: "Unmatched Lead Quality",
    description:
      "Stop cold calling. We provide high-intent, pre-qualified leads powered by our proprietary digital marketing engine.",
  },
  {
    icon: "laptop_mac",
    title: "Industry-Leading Tech",
    description:
      "Access our custom CRM, virtual tour software, and AI-driven market analysis tools to close deals faster.",
  },
  {
    icon: "handshake",
    title: "Mentorship & Growth",
    description:
      "Weekly training sessions with industry veterans, shadowing opportunities, and a clear path to becoming a top producer.",
  },
  {
    icon: "account_balance_wallet",
    title: "Zero Brokerage Advantage",
    description:
      "Leverage our unique '100% Zero Brokerage on direct inventory' proposition to instantly win client trust.",
  },
];

const positions = [
  {
    title: "Senior Property Consultant",
    type: "Full-Time",
    location: "Kolkata (New Town Office)",
    experience: "3+ Years",
    description:
      "Lead high-value transactions in the luxury residential segment. Requires a proven track record in Kolkata real estate.",
  },
  {
    title: "Inside Sales Agent (ISA)",
    type: "Full-Time",
    location: "Kolkata (Hybrid)",
    experience: "1-3 Years",
    description:
      "Engage and qualify inbound leads, schedule property tours, and support the senior consultancy team.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-Time",
    location: "Kolkata",
    experience: "2+ Years",
    description:
      "Drive our digital acquisition strategy, manage ad spend, and optimize conversion funnels for real estate leads.",
  },
];

export default function CareersPage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-charcoal-pure overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsw3fdpMABq241LdzEhvpYCP4XOm-KksPeLSF5IGRb52yqR15hB_EXlzM-aVTyAAsEzZXn354Rz-716KMDsIayA4g2pdT-hrf4XDPLDIvA4wlndXdoqs_XnBvJZaVGir1Mz3Xn88I6n5joEb0H13GOrcOlGhmCNz1RXluSH0oQ38_JEkZ5a2HfNoEUTP54oBIPzxLL-2r1l7WK9hL_IocfudquYTNdRCfhUNyZzomDrD5fvhQkKt2M')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-pure/40 via-charcoal-pure/80 to-charcoal-pure"></div>

        <motion.div
          className="relative z-10 max-w-[800px] mx-auto text-center px-margin-mobile md:px-margin"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-space-xs px-3 py-1 rounded bg-primary/20 mb-space-md">
            <span className="material-symbols-outlined text-primary text-[18px]">work</span>
            <span className="font-label-ui text-label-ui text-primary tracking-wider uppercase font-semibold">Join Dream Key</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-headline-lg-mobile md:font-headline-lg text-[40px] md:text-[64px] text-surface-clean font-bold leading-tight mb-space-md">
            Build Your Legacy in Kolkata Real Estate
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body-default text-[18px] text-secondary-fixed-dim leading-relaxed max-w-2xl mx-auto">
            We are redefining how properties are bought and sold in Bengal. Join a team driven by transparency, cutting-edge tech, and a passion for unlocking dreams.
          </motion.p>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-space-2xl bg-surface px-margin-mobile md:px-margin">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
              Why Build Your Career With Us?
            </h2>
            <p className="font-body-default text-body-default text-secondary">
              We provide the tools, leads, and culture you need to scale your real estate business faster than anywhere else.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-surface-clean p-space-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[24px] text-primary">
                    {benefit.icon}
                  </span>
                </div>
                <h3 className="font-title-property text-title-property text-on-surface mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body-dense text-body-dense text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-space-2xl bg-surface-container-low px-margin-mobile md:px-margin">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-space-xl">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
              Open Positions
            </h2>
            <p className="font-body-default text-body-default text-secondary">
              Find your next role and help us shape the future of real estate in Kolkata.
            </p>
          </div>

          <motion.div
            className="flex flex-col gap-space-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {positions.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-surface-clean p-space-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:border-primary/40 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-secondary font-label-ui text-label-ui uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">work</span>
                      {job.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {job.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {job.experience}
                    </span>
                  </div>
                  <p className="font-body-default text-body-default text-secondary-dim">
                    {job.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`mailto:careers@dreamkeykol.com?subject=Application for ${job.title}`}
                    className="inline-flex items-center justify-center gap-2 px-space-lg py-3 bg-primary text-on-primary font-label-ui font-semibold rounded-lg hover:bg-primary-container transition-colors w-full md:w-auto"
                  >
                    Apply Now
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-space-2xl bg-charcoal-pure px-margin-mobile md:px-margin text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline-md text-headline-md text-surface-clean mb-space-md">
            Don't see a perfect fit?
          </h2>
          <p className="font-body-default text-body-default text-secondary-fixed-dim mb-space-lg">
            We are always looking for driven, talented individuals to join our team. Send us your resume and tell us how you can make an impact.
          </p>
          <Link
            href="mailto:careers@dreamkeykol.com"
            className="inline-flex items-center justify-center gap-2 px-space-xl py-4 bg-surface-clean text-charcoal-pure font-label-ui font-bold rounded-lg hover:bg-surface-container-low transition-colors"
          >
            Email Your Resume
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
