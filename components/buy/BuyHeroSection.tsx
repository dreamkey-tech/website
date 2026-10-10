import React from 'react';

export default function BuyHeroSection() {
  return (
    <section className="relative w-full bg-inverse-surface text-inverse-on-surface overflow-hidden pt-6 pb-20 shadow-md">
      {/* Architectural Backdrop Scrim */}
      <div 
        className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity bg-cover bg-center" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdDhmqfll4q5NKV3r0uIHJliecCWnCC_qJAmi6GpgQaTXv9Du1new51CII5G2wQIvM1OCFPxWMewovUDNCjuqhsTz1laNuZ1kKu2qn_lgio_z_RCoNHttmNhSoNljVcE5PxLNFK-y_6uD5a5ImBCf5E9zWWYX-ldzrjyspnrpSlfx5RQVnEG8t04eQPIv4el7oMAXzBmZsIcIWpWrWsHyMPJSyIPvhIsa89gK1QVzYh9XTyM6-AvVAqV6G3UK-sNvAuw')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#061225] via-[#061225]/90 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-4 font-label-ui text-label-ui">
          <a className="text-surface-container-high hover:text-surface-lowest transition-colors" href="/">Home</a>
          <span className="material-symbols-outlined text-xs text-tertiary-fixed-dim">chevron_right</span>
          <span className="text-primary-fixed">Buy Residential</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-inverse-on-surface tracking-tight font-semibold">
              Find Your Next Home in Kolkata
            </h1>
            <p className="mt-2 font-body-lead text-body-default md:text-body-lead text-surface-container-high/90 max-w-2xl font-light">
              Explore our curated collection of verified luxury homes, lakefront penthouses, and heritage suites available across prime Kolkata corridors & metro outposts.
            </p>
          </div>
          
          {/* Live Stat Pill */}
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-lowest/10 backdrop-blur-md rounded-lg self-start lg:self-auto shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-spec-numeral text-base text-inverse-on-surface font-semibold leading-none">120+ Listings</span>
              <span className="font-label-ui text-label-ui text-surface-container-high/80">Active & Verified Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
