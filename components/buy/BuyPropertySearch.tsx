'use client';
import React from 'react';

export default function BuyPropertySearch() {
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
                className="w-full bg-surface-container-low text-on-surface placeholder:text-secondary rounded px-3 py-2.5 font-body-default text-body-default focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-inner" 
                placeholder="e.g. New Town, Ballygunge, Alipore..." 
                type="text" 
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="font-label-ui text-label-ui text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-tertiary">apartment</span>
              Typology
            </label>
            <select className="w-full bg-surface-container-low text-on-surface rounded px-3 py-2.5 font-body-default text-body-default focus:outline-none transition-colors">
              <option value="all">All Typologies</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Sky Penthouse</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Heritage">Heritage Suite</option>
            </select>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-1.5">
            <label className="font-label-ui text-label-ui text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">currency_rupee</span>
              Budget Band
            </label>
            <select className="w-full bg-surface-container-low text-on-surface rounded px-3 py-2.5 font-body-default text-body-default focus:outline-none transition-colors">
              <option value="all">Any Budget</option>
              <option value="under-1.5">Up to ₹1.5 Cr</option>
              <option value="1.5-2.5">₹1.5 Cr – ₹2.5 Cr</option>
              <option value="2.5-4">₹2.5 Cr – ₹4.0 Cr</option>
              <option value="above-4">₹4.0 Cr & Above</option>
            </select>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-1.5">
            <label className="font-label-ui text-label-ui text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">bed</span>
              BHK
            </label>
            <select className="w-full bg-surface-container-low text-on-surface rounded px-2.5 py-2.5 font-body-default text-body-default focus:outline-none transition-colors">
              <option value="all">All</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-2.5 px-4 rounded transition-all flex items-center justify-center gap-2 shadow-sm font-label-ui text-label-ui" type="submit">
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
