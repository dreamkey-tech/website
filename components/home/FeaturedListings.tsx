"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function FeaturedListings() {
  return (
    <section className="w-full py-space-2xl bg-surface" id="featured-listings">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="max-w-2xl">
            <div className="font-label-ui text-[11px] md:text-label-ui text-primary uppercase tracking-widest font-bold md:font-semibold mb-1 md:mb-2">
              Curated Configurations
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-on-surface font-bold md:font-semibold leading-tight">
              Find a Home That Fits Your Life
            </h2>
            <p className="font-body-default text-[12px] md:text-body-default text-secondary mt-1 md:mt-2">
              Choose the residential configuration thoughtfully matched to your
              spatial requirements and investment goals.
            </p>
          </div>
          <Link
            href="#enquiry-section"
            className="inline-flex items-center gap-1 font-label-ui text-body-default text-primary hover:text-primary-container font-semibold transition-colors"
          >
            <span className="">Explore All 240+ Active Units</span>
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* 3 Large Distinct Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* 1 BHK */}
          <div className="group relative rounded-xl overflow-hidden bg-surface-clean shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out flex flex-col">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                alt="1 BHK apartment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSS_Wj9VOgUPMIE8E8MnhD8jJ_8D5CF3nKjsRG9wzaRYfnhrKlHeK8wDwHfY1hLSXyK2Ryye0GC16btX9IsbmRjmICeyss_g2JuO_Dijzjdoamm4yx0IONTiFLTEK8UwsyKlWY0aCEY_FXkJXezy0wOrR3VVyR36kXI8RBDRvtPmWH7L9-8Pi5_4-gU-g-jRVa9PpmqPGZGB2Cv5KCLJGPLbxtVWtYYvZdwfkfrTQvCURiJrCaE-YK"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-charcoal-pure/20 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-surface-clean/90 backdrop-blur-md px-3 py-1 rounded text-on-surface font-label-ui text-label-ui font-semibold">
                Compact & Efficient
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-surface-clean">
                <span className="font-spec-numeral text-spec-numeral">
                  ₹35 Lakhs{" "}
                  <span className="text-body-dense text-secondary-fixed-dim font-normal">
                    onwards
                  </span>
                </span>
                <span className="text-label-ui bg-surface-clean/20 backdrop-blur-sm px-2.5 py-1 rounded">
                  480 - 640 sq.ft
                </span>
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-property text-title-property text-on-surface mb-2">
                  1 BHK Residences
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Smart urban sanctuaries ideal for working professionals, emerging
                  tech talent, and high-yield rental portfolios in New Town &
                  Rajarhat.
                </p>
              </div>
              <div className="pt-space-lg flex items-center justify-between font-label-ui text-label-ui text-primary font-semibold">
                <span className="flex items-center gap-1">
                  Explore 42 units{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
                <span className="text-secondary text-body-dense font-normal">
                  ROI ~6.8% p.a.
                </span>
              </div>
            </div>
          </div>

          {/* 2 BHK (Featured Badge) */}
          <div className="group relative rounded-xl overflow-hidden bg-surface-clean shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out flex flex-col">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                alt="2 BHK apartment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXiiI_rnmy2LKWmOFQJ8rkY1Ty_FhJ94iQV-LB0huLUDEtsINcV1nhL8k3A0RPmkttu8QWzMGTkaLJpe9NVdcIUzrQuVZ73TCyKpAqpLVk-yCGWj2eiMn56kYgZlsaBEhln5bH5j0YXCw2UJQoe45AHz6BKuTfDb9JCF-NFwOrxJc_Hfo64WtxiusW21_Py9kH2YqFVTkD1XAAozlj95m1CJuE90_csAdQdNGD-dmSgpjnTkeLvjJx"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-charcoal-pure/20 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded font-label-ui text-label-ui font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">star</span>{" "}
                Most Popular
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-surface-clean">
                <span className="font-spec-numeral text-spec-numeral">
                  ₹65 Lakhs{" "}
                  <span className="text-body-dense text-secondary-fixed-dim font-normal">
                    onwards
                  </span>
                </span>
                <span className="text-label-ui bg-surface-clean/20 backdrop-blur-sm px-2.5 py-1 rounded">
                  890 - 1,180 sq.ft
                </span>
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-property text-title-property text-on-surface mb-2">
                  2 BHK Homes
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Spacious, cross-ventilated family flats in complete gated
                  communities with swimming pools, gymnasiums, and clubhouse access
                  across Salt Lake and EM Bypass.
                </p>
              </div>
              <div className="pt-space-lg flex items-center justify-between font-label-ui text-label-ui text-primary font-semibold">
                <span className="flex items-center gap-1">
                  Explore 118 units{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
                <span className="text-secondary text-body-dense font-normal">
                  Ready & Under-Const.
                </span>
              </div>
            </div>
          </div>

          {/* 3 BHK & Luxury Suites */}
          <div className="group relative rounded-xl overflow-hidden bg-surface-clean shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out flex flex-col">
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                alt="3 BHK luxury suite"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYtWAhXBIOXXIqgXrpw5Wroh4DLtsbHRIyWILjeYX0xitGVj6E84zTYJvMi3rgxLmAyhFwvIGlHvHSLm5daZag13oTAVX6WiIKPXfr-lvz9HH3Bthgs0tM1tTEyaR4XJKYBKR2je6iQ8ziGlyB0hSa8xObVaP92stY-iKldxnd6eXok2uMgwxlznQRN-JbF22jPZhQFsVGP7vOg7f7m194sUJGpgCr_dvyCslHPR6bGD34eZ5fSTHh"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-charcoal-pure/20 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded font-label-ui text-label-ui font-semibold">
                Luxury Signature
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-surface-clean">
                <span className="font-spec-numeral text-spec-numeral">
                  ₹1.15 Cr{" "}
                  <span className="text-body-dense text-secondary-fixed-dim font-normal">
                    onwards
                  </span>
                </span>
                <span className="text-label-ui bg-surface-clean/20 backdrop-blur-sm px-2.5 py-1 rounded">
                  1,450 - 2,800 sq.ft
                </span>
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-property text-title-property text-on-surface mb-2">
                  3 BHK & Luxury Suites
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Expansive multi-generational living featuring private elevators,
                  wraparound sun decks, and bespoke amenities in South Kolkata and
                  Alipore.
                </p>
              </div>
              <div className="pt-space-lg flex items-center justify-between font-label-ui text-label-ui text-primary font-semibold">
                <span className="flex items-center gap-1">
                  Explore 84 units{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
                <span className="text-secondary text-body-dense font-normal">
                  RERA Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
