"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Select from "@/components/ui/Select";

const enquiryOptions = [
  { value: 'buy', label: 'Buy a Property' },
  { value: 'sell', label: 'Sell my Property' },
  { value: 'rent', label: 'Rent/Lease a Property' },
  { value: 'general', label: 'General Inquiry' },
];

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="w-full flex flex-col bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-20 bg-charcoal-pure text-surface-clean">
        <motion.div 
          className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp} className="font-headline-lg-mobile md:font-headline-lg text-[40px] md:text-[56px] font-bold leading-tight mb-space-md">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body-default text-[18px] text-secondary-fixed-dim max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or rent premium real estate in Kolkata, our expert advisors are here to guide you every step of the way.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-space-2xl px-margin-mobile md:px-margin">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          
          {/* Contact Details & Map (Left Column) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-space-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="bg-surface-container-low p-space-lg rounded-2xl border border-secondary/10 shadow-sm">
              <h3 className="font-headline-sm text-on-surface font-semibold mb-space-md">Contact Information</h3>
              
              <div className="flex flex-col gap-space-md">
                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">apartment</span>
                  </div>
                  <div>
                    <p className="font-label-ui text-secondary font-semibold uppercase tracking-wider mb-1">Office Address</p>
                    <p className="font-body-default text-on-surface">AA 52, st-69, AA block, Newtown<br/>Kolkata, West Bengal 700156</p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <p className="font-label-ui text-secondary font-semibold uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+918697559123" className="font-body-default text-on-surface hover:text-primary transition-colors font-semibold">+91 86975 59123</a>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">mail</span>
                  </div>
                  <div>
                    <p className="font-label-ui text-secondary font-semibold uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@dreamkeykol.com" className="font-body-default text-on-surface hover:text-primary transition-colors">info@dreamkeykol.com</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-secondary/20 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29471.98044196126!2d88.44438196017714!3d22.57919476141823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAA%2052%20%2C%20st-69%2C%20AA%20block%2C%20Newtown%20%2Ckolkata%20-700156%2C%20Kolkata%2C%20West%20Bengal%20700156!5e0!3m2!1sen!2sin!4v1791114510980!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form (Right Column) */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.form variants={fadeUp} className="bg-surface-clean p-space-lg md:p-8 rounded-2xl border border-secondary/10 shadow-lg flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-headline-sm text-on-surface font-semibold mb-2">Send us a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-ui text-on-surface-variant font-semibold">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-default text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-ui text-on-surface-variant font-semibold">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-default text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-ui text-on-surface-variant font-semibold">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-default text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
              </div>

              <div className="relative z-20">
                <Select
                  options={enquiryOptions}
                  label="Purpose of Enquiry"
                  icon="help_outline"
                  placeholder="Select a purpose"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-ui text-on-surface-variant font-semibold">Message (Optional)</label>
                <textarea 
                  placeholder="Tell us more about your property requirements..." 
                  rows={4}
                  className="w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-default text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm font-label-ui text-label-ui hover:shadow-md active:scale-[0.98] mt-2">
                <span>Submit Request</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </motion.form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
