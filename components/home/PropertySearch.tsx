"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="bg-surface-clean rounded-xl p-space-lg shadow-xl shadow-charcoal-pure/10"
    >
      {/* Purpose Tabs */}
      <div className="flex md:items-center gap-1 md:gap-space-lg mb-4 md:mb-space-md bg-surface-container-low md:bg-transparent p-1 md:p-0 rounded-lg md:rounded-none">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 md:flex-none text-center py-2 md:py-0 md:pb-2 text-[12px] md:text-title-property md:font-headline-sm font-bold relative transition-all rounded md:rounded-none ${
            activeTab === "buy"
              ? "text-charcoal-pure md:text-primary bg-surface-clean md:bg-transparent shadow-sm md:shadow-none"
              : "text-secondary hover:text-on-surface"
          }`}
        >
          Buy Residential
          {activeTab === "buy" && (
            <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("rent")}
          className={`flex-1 md:flex-none text-center py-2 md:py-0 md:pb-2 text-[12px] md:text-title-property md:font-headline-sm font-bold relative transition-all rounded md:rounded-none ${
            activeTab === "rent"
              ? "text-charcoal-pure md:text-primary bg-surface-clean md:bg-transparent shadow-sm md:shadow-none"
              : "text-secondary hover:text-on-surface"
          }`}
        >
          Rent / Lease
          {activeTab === "rent" && (
            <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
          )}
        </button>
      </div>

      {/* 5 Field Search Grid */}
      <form
        className="grid grid-cols-2 lg:grid-cols-12 gap-x-2 gap-y-3 md:gap-space-md items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Location */}
        <div className="col-span-2 lg:col-span-3 flex flex-col gap-1 md:gap-1.5">
          <label className="text-[11px] md:text-label-ui md:font-label-ui font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] md:text-[15px] text-primary">
              location_on
            </span>{" "}
            Location
          </label>
          <div className="relative">
            <select className="w-full h-11 md:h-12 px-3 md:px-space-md bg-surface-container-low text-on-surface text-[13px] md:text-body-default font-medium md:font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean focus:ring-1 focus:ring-primary cursor-pointer border-0">
              <option value="">Select Location</option>
              <option value="new-town">New Town & Action Area</option>
              <option value="salt-lake">Salt Lake (Sector I - V)</option>
              <option value="ballygunge">Ballygunge & Alipore</option>
              <option value="em-bypass">EM Bypass Corridor</option>
              <option value="rajarhat">Rajarhat Main Road</option>
              <option value="central-kolkata">Park Street & Central</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 md:right-3 top-3 md:top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Property Type */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-1 md:gap-1.5">
          <label className="text-[11px] md:text-label-ui md:font-label-ui font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] md:text-[15px] text-primary">
              apartment
            </span>{" "}
            Type
          </label>
          <div className="relative">
            <select className="w-full h-11 md:h-12 px-2.5 md:px-space-md bg-surface-container-low text-on-surface text-[13px] md:text-body-default font-medium md:font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean focus:ring-1 focus:ring-primary cursor-pointer border-0">
              <option value="">Any Type</option>
              <option value="apartment">Gated Apt</option>
              <option value="penthouse">Penthouse</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 md:right-3 top-3 md:top-3.5 pointer-events-none text-secondary text-[16px] md:text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-1 md:gap-1.5">
          <label className="text-[11px] md:text-label-ui md:font-label-ui font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] md:text-[15px] text-primary">
              bed
            </span>{" "}
            Bedrooms
          </label>
          <div className="relative">
            <select className="w-full h-11 md:h-12 px-2.5 md:px-space-md bg-surface-container-low text-on-surface text-[13px] md:text-body-default font-medium md:font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean focus:ring-1 focus:ring-primary cursor-pointer border-0">
              <option value="">Any BHK</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              <option value="4bhk">4+ BHK</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 md:right-3 top-3 md:top-3.5 pointer-events-none text-secondary text-[16px] md:text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Budget */}
        <div className="col-span-2 lg:col-span-2 flex flex-col gap-1 md:gap-1.5">
          <label className="text-[11px] md:text-label-ui md:font-label-ui font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] md:text-[15px] text-primary">
              currency_rupee
            </span>{" "}
            Budget
          </label>
          <div className="relative">
            <select className="w-full h-11 md:h-12 px-3 md:px-space-md bg-surface-container-low text-on-surface text-[13px] md:text-body-default font-medium md:font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean focus:ring-1 focus:ring-primary cursor-pointer border-0">
              <option value="">Any Range</option>
              <option value="35l-75l">₹35L - ₹75L</option>
              <option value="75l-1.5cr">₹75L - ₹1.5 Cr</option>
              <option value="1.5cr-3cr">₹1.5 Cr - ₹3 Cr</option>
              <option value="3cr+">₹3 Cr & Above</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 md:right-3 top-3 md:top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Search CTA */}
        <div className="col-span-2 lg:col-span-2">
          <button
            className="w-full h-12 bg-[#e94f37] hover:bg-[#d33f29] active:scale-[0.99] text-white font-bold text-[14px] rounded shadow-md flex items-center justify-center gap-2 transition-all"
            type="submit"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
            <span className="">Search Properties</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
