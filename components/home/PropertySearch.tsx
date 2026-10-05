"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Select from "@/components/ui/Select";

const locationOptions = [
  { value: "", label: "Select Location" },
  { value: "new-town", label: "New Town & Action Area" },
  { value: "salt-lake", label: "Salt Lake (Sector I - V)" },
  { value: "ballygunge", label: "Ballygunge & Alipore" },
  { value: "em-bypass", label: "EM Bypass Corridor" },
  { value: "rajarhat", label: "Rajarhat Main Road" },
  { value: "central-kolkata", label: "Park Street & Central" },
];

const typeOptions = [
  { value: "", label: "Any Type" },
  { value: "apartment", label: "Gated Apt" },
  { value: "penthouse", label: "Penthouse" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
];

const bedroomOptions = [
  { value: "", label: "Any BHK" },
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "4bhk", label: "4+ BHK" },
];

const budgetOptions = [
  { value: "", label: "Any Range" },
  { value: "35l-75l", label: "₹35L - ₹75L" },
  { value: "75l-1.5cr", label: "₹75L - ₹1.5 Cr" },
  { value: "1.5cr-3cr", label: "₹1.5 Cr - ₹3 Cr" },
  { value: "3cr+", label: "₹3 Cr & Above" },
];

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
        <div className="col-span-2 lg:col-span-3">
          <Select
            options={locationOptions}
            label="Location"
            icon="location_on"
            placeholder="Select Location"
          />
        </div>

        {/* Property Type */}
        <div className="col-span-1 lg:col-span-3">
          <Select
            options={typeOptions}
            label="Type"
            icon="apartment"
            placeholder="Any Type"
          />
        </div>

        {/* Bedrooms */}
        <div className="col-span-1 lg:col-span-2">
          <Select
            options={bedroomOptions}
            label="Bedrooms"
            icon="bed"
            placeholder="Any BHK"
          />
        </div>

        {/* Budget */}
        <div className="col-span-2 lg:col-span-2">
          <Select
            options={budgetOptions}
            label="Budget"
            icon="currency_rupee"
            placeholder="Any Range"
          />
        </div>

        {/* Search CTA */}
        <div className="col-span-2 lg:col-span-2 flex flex-col justify-end">
          <button
            className="w-full h-[42px] bg-[#e94f37] hover:bg-[#d33f29] active:scale-[0.99] text-white font-bold text-[14px] rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
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
