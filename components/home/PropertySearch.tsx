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
      <div className="flex items-center gap-space-lg pb-space-md mb-space-md">
        <button
          onClick={() => setActiveTab("buy")}
          className={`font-headline-sm text-title-property relative pb-2 transition-all ${
            activeTab === "buy"
              ? "text-primary"
              : "text-secondary hover:text-on-surface"
          }`}
        >
          Buy Residential
          {activeTab === "buy" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("rent")}
          className={`font-headline-sm text-title-property relative pb-2 transition-all ${
            activeTab === "rent"
              ? "text-primary"
              : "text-secondary hover:text-on-surface"
          }`}
        >
          Rent / Lease
          {activeTab === "rent" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
          )}
        </button>
      </div>

      {/* 5 Field Search Grid */}
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-space-md items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Location */}
        <div className="lg:col-span-3 flex flex-col gap-1.5">
          <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">
              location_on
            </span>{" "}
            Location
          </label>
          <div className="relative">
            <select className="w-full h-12 px-space-md bg-surface-container-low text-on-surface font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean cursor-pointer">
              <option value="">Select Location</option>
              <option value="new-town">New Town & Action Area</option>
              <option value="salt-lake">Salt Lake (Sector I - V)</option>
              <option value="ballygunge">Ballygunge & Alipore</option>
              <option value="em-bypass">EM Bypass Corridor</option>
              <option value="rajarhat">Rajarhat Main Road</option>
              <option value="central-kolkata">Park Street & Central</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Property Type */}
        <div className="lg:col-span-3 flex flex-col gap-1.5">
          <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">
              apartment
            </span>{" "}
            Property Type
          </label>
          <div className="relative">
            <select className="w-full h-12 px-space-md bg-surface-container-low text-on-surface font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean cursor-pointer">
              <option value="">Any Type</option>
              <option value="apartment">Gated Apartment</option>
              <option value="penthouse">Sky Penthouse</option>
              <option value="villa">Bungalow & Villa</option>
              <option value="studio">Executive Studio</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Budget */}
        <div className="lg:col-span-2 flex flex-col gap-1.5">
          <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">
              currency_rupee
            </span>{" "}
            Budget
          </label>
          <div className="relative">
            <select className="w-full h-12 px-space-md bg-surface-container-low text-on-surface font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean cursor-pointer">
              <option value="">Any Range</option>
              <option value="35l-75l">₹35L - ₹75L</option>
              <option value="75l-1.5cr">₹75L - ₹1.5 Cr</option>
              <option value="1.5cr-3cr">₹1.5 Cr - ₹3 Cr</option>
              <option value="3cr+">₹3 Cr & Above</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="lg:col-span-2 flex flex-col gap-1.5">
          <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">
              bed
            </span>{" "}
            Bedrooms
          </label>
          <div className="relative">
            <select className="w-full h-12 px-space-md bg-surface-container-low text-on-surface font-body-default rounded appearance-none focus:outline-none focus:bg-surface-clean cursor-pointer">
              <option value="">Any BHK</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              <option value="4bhk">4+ BHK / Duplex</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-secondary text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Search CTA */}
        <div className="lg:col-span-2">
          <button
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-ui text-body-default font-semibold rounded flex items-center justify-center gap-space-xs transition-all duration-200 shadow-sm hover:-translate-y-[2px] active:scale-[0.98]"
            type="submit"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
            <span className="">Search Property</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
