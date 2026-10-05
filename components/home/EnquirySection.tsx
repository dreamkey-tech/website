"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Select from "@/components/ui/Select";
import { enquiryApi } from "@/api/enquiry";
import { propertyEnquirySchema } from "@/zod/enquiry";
import { toast } from "sonner";
import { z } from "zod";

const propertyTypeOptions = [
  { value: "2bhk-apt", label: "2 BHK Apartment" },
  { value: "3bhk-luxury", label: "3 BHK Luxury Flat" },
  { value: "4bhk-penthouse", label: "4+ BHK Penthouse" },
  { value: "bungalow", label: "Independent Bungalow" },
];

const locationOptions = [
  { value: "new-town", label: "New Town (Action Area I / II / III)" },
  { value: "ballygunge", label: "Ballygunge / Alipore" },
  { value: "salt-lake", label: "Salt Lake (Sector I - V)" },
  { value: "em-bypass", label: "EM Bypass / Ruby" },
  { value: "rajarhat", label: "Rajarhat Main Road" },
];

const budgetOptions = [
  { value: "50-85", label: "₹50 Lakhs - ₹85 Lakhs" },
  { value: "85-1.5", label: "₹85 Lakhs - ₹1.5 Crore" },
  { value: "1.5-3", label: "₹1.5 Crore - ₹3 Crore" },
  { value: "3+", label: "₹3 Crore & Above (Ultra Luxury)" },
];

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    propertyType: "",
    preferredLocation: "",
    estimatedBudgetBand: "",
    specificRequirements: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const fullMobile = `+91 ${formData.mobileNo}`;
    const validationResult = propertyEnquirySchema.safeParse({
      ...formData,
      mobileNo: fullMobile,
    });

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      const issues = validationResult.error.issues;
      
      if (issues.length > 0) {
        toast.error(issues[0].message);
      } else {
        toast.error("Please fix the validation errors.");
      }

      issues.forEach((err) => {
        if (err.path && err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await enquiryApi.submitPropertyEnquiry(validationResult.data);
      
      if (response.success) {
        toast.success(response.message || "Enquiry submitted successfully.");
        setFormData({
          fullName: "",
          mobileNo: "",
          email: "",
          propertyType: "",
          preferredLocation: "",
          estimatedBudgetBand: "",
          specificRequirements: "",
        });
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      toast.error(errorData?.error || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative w-full py-space-2xl bg-charcoal-pure overflow-hidden"
      id="enquiry-section"
    >
      {/* Architectural Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        title="Interior architectural rendering of a grand high ceiling Kolkata clubhouse lounge"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsw3fdpMABq241LdzEhvpYCP4XOm-KksPeLSF5IGRb52yqR15hB_EXlzM-aVTyAAsEzZXn354Rz-716KMDsIayA4g2pdT-hrf4XDPLDIvA4wlndXdoqs_XnBvJZaVGir1Mz3Xn88I6n5joEb0H13GOrcOlGhmCNz1RXluSH0oQ38_JEkZ5a2HfNoEUTP54oBIPzxLL-2r1l7WK9hL_IocfudquYTNdRCfhUNyZzomDrD5fvhQkKt2M')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-pure via-charcoal-pure/95 to-charcoal-pure/80"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col gap-space-md text-surface-clean">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded bg-surface/10 w-fit">
              <span className="material-symbols-outlined text-gold-light text-[18px]">
                verified_user
              </span>
              <span className="font-label-ui text-label-ui text-tertiary-fixed tracking-wider uppercase font-semibold">
                Priority Booking Desk
              </span>
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-[20px] md:text-headline-lg text-surface-clean font-bold md:font-semibold leading-tight">
              Discover a Smarter Way to Buy & Sell Property in Kolkata
            </h2>
            <p className="font-body-default text-body-default text-secondary-fixed-dim leading-relaxed">
              Eliminate conflicting developer claims and opaque pricing tiers. Our
              verified property consultants provide transparent comparative
              evaluations, arrange chauffeured inspection tours, and assist with
              institutional home loan sanctioning.
            </p>
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  100% Zero Brokerage on direct partner developer inventory
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  Complimentary title search & municipal sanction assessment
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <span className="font-body-default text-surface-clean">
                  Bank tie-ups with SBI, HDFC & ICICI at preferential rates
                </span>
              </div>
            </div>
            <div className="pt-space-sm">
              <a
                href="tel:+919830012345"
                className="inline-flex items-center gap-space-sm text-gold-light hover:text-surface-clean font-title-property text-headline-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">
                  phone_in_talk
                </span>
                <span className="">+91 98300 12345</span>
              </a>
            </div>
          </div>
          
          {/* Right Floating Clean White Enquiry Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-surface-clean rounded-xl p-space-xl shadow-2xl">
              <div className="mb-space-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Make an Enquiry
                </h3>
                <p className="font-body-dense text-body-dense text-secondary mt-0.5">
                  Our dedicated Kolkata relationship manager will connect within 2
                  hours.
                </p>
              </div>
              <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Full Name *
                    </label>
                    <input
                      className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean"
                      placeholder="Subrata Banerjee"
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                    {errors.fullName && <span className="text-error font-label-ui text-xs">{errors.fullName}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 bg-surface-container text-secondary text-body-dense rounded-l font-semibold">
                        +91
                      </span>
                      <input
                        className="h-11 px-3 w-full bg-surface-container-low text-on-surface font-body-default rounded-r focus:outline-none focus:bg-surface-clean"
                        placeholder="98300 XXXXX"
                        required
                        type="tel"
                        value={formData.mobileNo}
                        onChange={(e) => handleChange("mobileNo", e.target.value)}
                      />
                    </div>
                    {errors.mobileNo && <span className="text-error font-label-ui text-xs">{errors.mobileNo}</span>}
                  </div>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Email Address
                  </label>
                  <input
                    className="h-11 px-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean"
                    placeholder="subrata.b@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && <span className="text-error font-label-ui text-xs">{errors.email}</span>}
                </div>
                {/* Property Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Property Type
                    </label>
                    <Select
                      options={propertyTypeOptions}
                      placeholder="Select Type"
                      value={formData.propertyType}
                      onChange={(val) => handleChange("propertyType", val)}
                    />
                    {errors.propertyType && <span className="text-error font-label-ui text-xs">{errors.propertyType}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                      Preferred Location
                    </label>
                    <Select
                      options={locationOptions}
                      placeholder="Select Location"
                      value={formData.preferredLocation}
                      onChange={(val) => handleChange("preferredLocation", val)}
                    />
                    {errors.preferredLocation && <span className="text-error font-label-ui text-xs">{errors.preferredLocation}</span>}
                  </div>
                </div>
                {/* Budget Range */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Estimated Budget Band
                  </label>
                  <Select
                    options={budgetOptions}
                    placeholder="Select Budget"
                    value={formData.estimatedBudgetBand}
                    onChange={(val) => handleChange("estimatedBudgetBand", val)}
                  />
                  {errors.estimatedBudgetBand && <span className="text-error font-label-ui text-xs">{errors.estimatedBudgetBand}</span>}
                </div>
                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui uppercase tracking-wider text-secondary">
                    Specific Requirements
                  </label>
                  <textarea
                    className="p-3 bg-surface-container-low text-on-surface font-body-default rounded focus:outline-none focus:bg-surface-clean resize-none"
                    placeholder="e.g. South-facing balcony, ready-to-move by Diwali..."
                    rows={2}
                    value={formData.specificRequirements}
                    onChange={(e) => handleChange("specificRequirements", e.target.value)}
                  ></textarea>
                  {errors.specificRequirements && <span className="text-error font-label-ui text-xs">{errors.specificRequirements}</span>}
                </div>
                {/* Submit */}
                <button
                  className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-ui text-body-default font-semibold rounded shadow-md transition-all duration-200 mt-1 flex items-center justify-center gap-2 hover:-translate-y-[2px] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="">{isLoading ? "Submitting..." : "Submit Enquiry"}</span>
                  {!isLoading && (
                    <span className="material-symbols-outlined text-[18px]">
                      send
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
