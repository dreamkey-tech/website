"use client";

import { motion } from "motion/react";

const founders = [
  {
    name: "Sayan Dutta",
    role: "Founder",
    image: "/about/Sayan.webp",
    bio: "Visionary leader with a passion for transforming the Kolkata real estate landscape.",
  },
  {
    name: "Mainak Maji",
    role: "Co-Founder",
    image: "/about/mainak.webp",
    bio: "Expert in luxury properties and building long-lasting client relationships.",
  },
  {
    name: "Siddhant Singh",
    role: "Co-Founder",
    image: "/about/siddhart.webp",
    bio: "Ensuring seamless, transparent, and hassle-free transactions for every client.",
  },
];

export default function AboutUsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="w-full flex flex-col bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-charcoal-pure text-surface-clean overflow-hidden">
        {/* Subtle background pattern/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-pure via-charcoal-pure to-primary/20 opacity-40"></div>
        
        <motion.div 
          className="relative z-10 max-w-[900px] mx-auto text-center px-margin-mobile md:px-margin"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeUp}
            className="font-headline-lg-mobile md:font-headline-lg text-[40px] md:text-[56px] font-bold leading-tight mb-space-lg"
          >
            About Us
          </motion.h1>
          <motion.p 
            variants={fadeUp}
            className="font-body-default text-[18px] md:text-[20px] text-secondary-fixed-dim leading-relaxed mb-space-xl"
          >
            DreamKey Reality is a client-focused real estate consultancy dedicated to simplifying the property journey. We help buyers, sellers, tenants, owners, and investors discover the right opportunities through personalized guidance, professional service, and trusted relationships.
          </motion.p>
          <motion.div variants={fadeUp} className="inline-block bg-surface-clean/10 backdrop-blur-sm border border-surface-clean/20 rounded-xl p-space-md md:p-space-lg">
            <h2 className="font-title-property text-[22px] md:text-[28px] text-gold-light font-semibold">
              DreamKey Reality — Real Estate. Simplified. Trusted. Built Around You.
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* Founders Section */}
      <section className="py-space-2xl px-margin-mobile md:px-margin bg-surface-container-low">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
              Meet Our Founders
            </h2>
            <p className="font-body-default text-body-default text-secondary">
              The visionary team behind DreamKey Reality, dedicated to redefining your real estate experience.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-space-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {founders.map((founder, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                className="flex flex-col items-center group"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-space-md shadow-lg relative bg-surface-container">
                  {/* Dummy placeholder images - swap out src later */}
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-headline-sm text-[22px] text-on-surface font-semibold mb-1">
                  {founder.name}
                </h3>
                <p className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold mb-3">
                  {founder.role}
                </p>
                <p className="font-body-default text-body-default text-secondary text-center max-w-sm">
                  {founder.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
