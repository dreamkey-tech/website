'use client';
import React, { useState } from 'react';

export default function FilterSidebar() {
  const [budget, setBudget] = useState(550);

  return (
    <aside className="lg:col-span-3 flex flex-col gap-6">
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
            <span className="font-title-property text-title-property font-semibold text-on-surface">Refine Catalog</span>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline transition-colors uppercase tracking-wider font-label-ui">Clear All</button>
        </div>

        {/* Corridors & Micro-Markets */}
        <div className="space-y-3">
          <label className="font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wide block">Kolkata Corridors</label>
          <div className="space-y-2 text-body-dense font-body-dense text-on-surface-variant">
            {['New Town & Action Areas', 'Ballygunge & South Kolkata', 'Alipore & Burdwan Park', 'Rajarhat Expressway Belt', 'EM Bypass Waterfront', 'Salt Lake Sector V', 'Central Park Street Vicinity'].map(corridor => (
              <label key={corridor} className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary accent-primary" />
                <span>{corridor}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Typology Pills */}
        <div className="space-y-2.5">
          <label className="font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wide block">Configuration</label>
          <div className="grid grid-cols-3 gap-1.5 font-label-ui text-label-ui">
            <button className="px-2 py-1.5 rounded text-center bg-inverse-surface text-inverse-on-surface font-semibold shadow-xs" type="button">Any</button>
            <button className="px-2 py-1.5 rounded text-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors" type="button">2 BHK</button>
            <button className="px-2 py-1.5 rounded text-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors" type="button">3 BHK</button>
            <button className="px-2 py-1.5 rounded text-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors" type="button">4 BHK</button>
            <button className="px-2 py-1.5 rounded text-center bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors" type="button">5+ BHK</button>
          </div>
        </div>

        {/* Budget Range Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-label-ui text-label-ui">
            <label className="font-semibold text-on-surface uppercase tracking-wide">Budget Cap</label>
            <span className="text-primary font-bold">₹{(budget / 100).toFixed(2)} Cr</span>
          </div>
          <input 
            className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
            max="600" min="80" step="10" type="range" 
            value={budget} 
            onChange={(e) => setBudget(Number(e.target.value))} 
          />
          <div className="flex justify-between text-body-dense text-on-surface-variant font-body-dense">
            <span>₹80 Lakh</span>
            <span>₹6.00 Cr+</span>
          </div>
        </div>

        {/* Property Status */}
        <div className="space-y-2.5">
          <label className="font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wide block">Possession Status</label>
          <div className="space-y-2 text-body-dense font-body-dense text-on-surface-variant">
            {['All Statuses', 'Ready to Move In', 'Under Construction', 'New Phase Launch'].map((status, idx) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input defaultChecked={idx === 0} className="text-primary accent-primary" name="status-filter" type="radio" value={status} />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities Collapsible */}
        <details className="group space-y-2">
          <summary className="flex items-center justify-between cursor-pointer font-label-ui text-label-ui font-semibold text-on-surface uppercase tracking-wide list-none py-1">
            <span>Verified Amenities</span>
            <span className="material-symbols-outlined text-lg transition-transform group-open:rotate-180">expand_more</span>
          </summary>
          <div className="pt-2 space-y-2 text-body-dense font-body-dense text-on-surface-variant">
            {['100% DG Power Backup', 'Private Plunge Pool / Infinity Deck', 'Sky Clubhouse & Lounge', '3-Tier Biometric Security', 'Dual Covered Stilt Parking'].map(amenity => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                <input className="rounded text-primary accent-primary" type="checkbox" />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Sidebar Actions */}
        <div className="pt-2 flex flex-col gap-2">
          <button className="w-full bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded font-label-ui text-label-ui font-semibold transition-colors shadow-sm">
            Apply Filters
          </button>
          <button className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-2 rounded font-label-ui text-label-ui font-medium transition-colors">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Advisory Desk Micro-Card */}
      <div className="bg-surface-container-high/60 p-4 rounded-xl flex items-start gap-3">
        <span className="material-symbols-outlined text-tertiary-container text-2xl mt-0.5">support_agent</span>
        <div>
          <h4 className="font-label-ui text-label-ui font-bold text-on-surface uppercase tracking-wide">Prefer Guided Tours?</h4>
          <p className="text-body-dense text-on-surface-variant mt-0.5 leading-snug">Connect with our Senior Kolkata Portfolio Director for private chauffeured site visits.</p>
          <a className="inline-flex items-center gap-1 text-primary font-bold font-label-ui text-label-ui mt-2 hover:underline" href="tel:+918697559123">
            <span>+91 86975 59123</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
