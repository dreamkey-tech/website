'use client';
import React from 'react';
import Select from '@/components/ui/Select';

const typologyOptions = [
  { value: 'all', label: 'All Typologies' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Penthouse', label: 'Sky Penthouse' },
  { value: 'Villa', label: 'Luxury Villa' },
  { value: 'Heritage', label: 'Heritage Suite' },
];

const budgetOptions = [
  { value: 'all', label: 'Any Budget' },
  { value: 'under-25k', label: 'Up to ₹25,000/mo' },
  { value: '25k-50k', label: '₹25k – ₹50k/mo' },
  { value: '50k-1L', label: '₹50k – ₹1L/mo' },
  { value: 'above-1L', label: '₹1L+ /mo' },
];

const bhkOptions = [
  { value: 'all', label: 'Any BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '4 BHK' },
  { value: '5', label: '5+ BHK' },
];

export default function RentPropertySearch() {
  return (
    <div className="sticky top-0 z-30 w-full bg-surface/95 backdrop-blur-md pb-4 pt-4 border-b border-border-subtle/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-4 md:p-6 border border-secondary/10">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-end" onSubmit={(e) => e.preventDefault()}>
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              <label className="font-label-ui text-label-ui text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                Search Locality / Project
              </label>
              <div className="relative flex items-center">
                <input
                  className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface placeholder:text-secondary rounded-lg px-3 py-2.5 font-body-default text-body-default focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-surface-container-lowest border border-transparent transition-all duration-200 shadow-inner"
                  placeholder="e.g. New Town, Ballygunge, Alipore..."
                  type="text"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <Select
                options={typologyOptions}
                label="Typology"
                icon="apartment"
                placeholder="All Typologies"
              />
            </div>

            <div className="lg:col-span-3">
              <Select
                options={budgetOptions}
                label="Budget Band"
                icon="currency_rupee"
                placeholder="Any Budget"
              />
            </div>

            <div className="lg:col-span-1">
              <Select
                options={bhkOptions}
                label="BHK"
                icon="bed"
                placeholder="Any"
              />
            </div>

            <div className="lg:col-span-2">
              <button
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm font-label-ui text-label-ui hover:shadow-md active:scale-[0.98]"
                type="submit"
              >
                <span>Find Properties</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
