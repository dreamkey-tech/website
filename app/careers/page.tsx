"use client";

import { motion } from "motion/react";
import Link from "next/link";

const benefits = [
  {
    icon: "trending_up",
    title: "Customer-Focused Work",
    description:
      "Understand each customer's preferred location, budget and property priorities before discussing relevant options and next steps.",
  },
  {
    icon: "laptop_mac",
    title: "Local Property Connections",
    description:
      "Explore real estate work that connects customer requirements with property information from local brokers and consultants in Kolkata.",
  },
  {
    icon: "handshake",
    title: "A Connected Approach",
    description:
      "Property consultancy brings together customers, owners and local professionals. Clear coordination helps everyone understand the next step.",
  },
  {
    icon: "account_balance_wallet",
    title: "Clear Communication",
    description:
      "Help customers understand property information and the assistance available. Discuss fees and service scope rather than making assumptions.",
  },
];

const positions = [
  {
    title: "Senior Property Consultant",
    type: "Enquire for details",
    location: "Kolkata",
    experience: "Confirm requirements",
    description:
      "Property consulting involves understanding buyer, tenant and owner requirements and coordinating with relevant local property contacts.",
  },
  {
    title: "Inside Sales Agent (ISA)",
    type: "Enquire for details",
    location: "Kolkata",
    experience: "Confirm requirements",
    description:
      "Sales support can involve discussing enquiries, coordinating property visits and helping the consultancy team follow up on customer needs.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Enquire for details",
    location: "Kolkata",
    experience: "Confirm requirements",
    description:
      "Property marketing focuses on clear, accurate content and helping people discover relevant real estate services and opportunities in Kolkata.",
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
            Interested in real estate work in Kolkata? Get to know DreamkeyKol Reality LLP, a consultancy connecting property requirements with local brokers and consultants.
          </motion.p>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-space-2xl bg-surface px-margin-mobile md:px-margin">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
              What Shapes Our Work?
            </h2>
            <p className="font-body-default text-body-default text-secondary">
              Our work starts with customer priorities, local property connections and clear communication. Discuss current opportunities with our team.
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
              Roles to Discuss
            </h2>
            <p className="font-body-default text-body-default text-secondary">
              These role profiles describe areas of work. Contact our team to confirm current openings, requirements and terms before applying.
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
                    Enquire
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
            Don’t see a perfect fit?
          </h2>
          <p className="font-body-default text-body-default text-secondary-fixed-dim mb-space-lg">
            Tell us about your experience and interest in Kolkata real estate. Our team can confirm whether there is a suitable current opening.
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
