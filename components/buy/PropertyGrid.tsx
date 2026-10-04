'use client';
import React, { useState } from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const properties = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl2aWX4Owovjsf8yhC3E66-yCmQNjq5EDXY9cHafMmf15L4_gp6MEUgDUDkrMtKu6sFHcNOkkjOGrDoB2X8xpC8pA7d5oSym39HA3EbkKU91f6u6lt6ZrWfallkL5G_Jaq9IGZQgVBlrIV_Fy5mpN8jOW-NmoGlzZzeItlluh98ri5d36QAhwRhQgqyQiyYvN8Ua3YG1LMan4BoERZ93shLOCzeL-1JLw4UnAHi6lviKLhBgvjSXFTq1m0cgOBn5l3gQ",
      badgeText: "UNDER CONSTRUCTION",
      badgeColor: "bg-inverse-surface/90 text-inverse-on-surface",
      amenitiesText: "Lake Facing • Sky Lounge",
      location: "New Town Action Area II, Kolkata",
      title: "DreamKey Altura",
      description: "3 & 4 BHK Luxury High-rise Residences",
      bhk: "3 & 4 BHK",
      size: "1,850 - 2,750 sq.ft",
      price: "₹1.85 Cr"
    },
    {
      id: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLQad9L8Jm7nrMlbJZe7oTFgZpEnxGsUDu-MCG5hJv77SjQqITwvgLhqVgOLcNZx-fvfntnZnVK-msnOUHECvJwarDQB8KIPU7y0H0ElNApUT2MwGcqnB_GHc3OOkzmArQOJSWFPwZ6X2FnoAl6d7BQp2bU3Y9c02nlrgiErA0crVrGqgz3cwgd1eTHQLloRrF3Q-mykPLXSomfzXjRXWlsxVSYO9I_yQ2SEdI3_7sm_JSy0jrrYpS",
      badgeText: "READY TO MOVE",
      badgeColor: "bg-tertiary text-on-tertiary",
      amenitiesText: "Private Terrace • Concierge",
      location: "Ballygunge Circular Rd, South Kolkata",
      title: "DreamKey Residences",
      description: "3 & 4 BHK Heritage Inspired Luxury Suites",
      bhk: "3 & 4 BHK",
      size: "1,920 - 3,100 sq.ft",
      price: "₹2.25 Cr"
    },
    {
      id: 3,
      image: "https://lh3.googleusercontent.com/aida/AEtjO1WCiIiaWE7C_7WOVM65xyHWfg6Y2-0yDPWQhPdpD0h6V4MPXV6vkvRUtOWi9HOabjTq0ZpAUWMLAyBZkDvVWFmqKTrxjPNtlADGV-XY1e6_mpGOK2UIFGYPdZ8C0UOONYeqT01xr5Bi2eQZ-yJs5L2_-KoZ7lQrWx6lwEJSnGi_6vo4ZM2ykgtNVuq5dITwzqiJdlGOHMhyYp_Y10I4kzjdmi10QKNTRPcg8dg9kELNHsNnbHDcdj_ef-o",
      badgeText: "UNDER CONSTRUCTION",
      badgeColor: "bg-inverse-surface/90 text-inverse-on-surface",
      amenitiesText: "Airport Corridor • Grand Club",
      location: "Rajarhat Expressway Belt, Kolkata",
      title: "DreamKey Heights",
      description: "3 BHK Contemporary High-speed Corridor Vistas",
      bhk: "3 BHK",
      size: "1,350 - 2,100 sq.ft",
      price: "₹1.45 Cr"
    },
    {
      id: 4,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQue7TjbtP85lkAwiZvKR28dv50kp9iYqtnlDTLVUsQSKDfI8P1j3LfylTMJmzjgXsUJJR7tCxC4vcaAA8SBayVxCM5HVIVDQIZ8aCPKlezCLZwIPBGBgLo7noN1A635Y65P05PsIjc0egIIVbkzq1s3IAreV2ByDKYmulk5fmy32y1vp-Xn4TvdRprToF6iFVkSPLqLzqlykCSX3NmFSykPQdtyc1wuOJLBBPAtsnMGFi7jXD6Ue7",
      badgeText: "READY TO MOVE",
      badgeColor: "bg-tertiary text-on-tertiary",
      amenitiesText: "Plunge Pool • 3 Covered Parks",
      location: "Alipore Green Avenue, Kolkata",
      title: "DreamKey Icon",
      description: "4 BHK Bespoke Penthouse & Sky Haven",
      bhk: "4 BHK",
      size: "2,800 - 4,100 sq.ft",
      price: "₹3.85 Cr"
    },
    {
      id: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1hA3Uoaj0Cr55jU_Eu8KaEzYiAa_c_DWw2DMNBGq-WS9iW88QKJq99CtlhlgMh3AZ2gLSQ2WyK6Kcj5vOZwOLQS-Lmv-XXvPOZoSkwPtArOnrOvgL6e5lprhBQWAubQQSS_CE2WtLvZ7CLo-VYwwMCfNlVvHloFduzF0oKhrDyRE4Stf5C7-fly_JY2aVjL3e3QXGQXqKb6OWvcCVFPd4RyAg0ro2d_Gg__t9t4-BYpdx1hyl-rxe",
      badgeText: "SOLD OUT (WAITLIST)",
      badgeColor: "bg-secondary text-on-secondary",
      amenitiesText: "180° Wetland Panorama",
      location: "EM Bypass Waterfront, Kolkata",
      title: "DreamKey Grand",
      description: "4 BHK Sky Condominiums",
      bhk: "4 BHK",
      size: "2,250 - 3,500 sq.ft",
      price: "₹2.90 Cr"
    },
    {
      id: 6,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxOqGM2pNToMBJXugylu0L_4lZFrapAKCbKxjMRONhJbPciTknaIpYmKkTYGs6k3qLdh111aXgvhemmK9i-Mh_083duwXASjq8-QVNr81QLWVwlpSlhGl_U4Xk7XJdTKaOFqG9Gpmx16YXOlxWzvNFgq0NRCR9CF0LtCEqRjbwZYx7FeRf1Iv3mPMyeqPaIcXn_2o4XoYHKInJ4owKU-qIiUm7x_dGyuruyY3pysHh-s0TnGYuFitJ",
      badgeText: "READY TO MOVE",
      badgeColor: "bg-tertiary text-on-tertiary",
      amenitiesText: "Walk-to-Work • Smart Automation",
      location: "Salt Lake Sector V, Kolkata",
      title: "DreamKey Prime",
      description: "2 & 3 BHK Tech Executive Smart Flats",
      bhk: "2 & 3 BHK",
      size: "1,250 - 1,950 sq.ft",
      price: "₹1.15 Cr"
    },
    {
      id: 7,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvp7OrdIEV7RPci_VNEORVoh4CFQHh51N2dc2Ov7pTxY2uYUU7gVXioqXjsCSKmlRVFj3wQ4adpq4dYUaqzm1mMHcujheVgdYXwFTO_TurcfNe9G_c05bmZ8Z-aNo2_qYf1gWTmDNWrGOaanFWFMSKVSwfvEpozH6qq3XtdXsU5T4WPslhzsS9ChdEkO3JmKuF1mBN7wtiNN1WWRhhNnG6S6y7ZZsyOFH4QM3aGo3VnNGi-dfpa6eL",
      badgeText: "NEW LAUNCH",
      badgeColor: "bg-primary text-on-primary",
      amenitiesText: "Double Height Living • Direct Lift",
      location: "New Town Boulevard, Kolkata",
      title: "DreamKey Sky Mansions",
      description: "4 & 5 BHK Duplex Signature Penthouses",
      bhk: "4 & 5 BHK",
      size: "3,400 - 5,200 sq.ft",
      price: "₹4.20 Cr"
    },
    {
      id: 8,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWfxuOI35gJ4btChEXHtxOxMouxi-LZLG3A0OxQqD4QpQ99aFdm41l4dDIoLzSZD72O_xbOe4Yp9rSxabumHUKYpskmkd6DN09mjR3nBRXrQKnYKy-mwZRM1EP5jbMBkyVh9lDdXl0PIr5T3IL1yiuFBtEyRkeR78tIFhfDWU8-QJuWogKLNI04sQLcey9oabHHi4guN3C6b0pS1W51_Ap4WzHgYRaB1LK9NjLIxELyJTStF0MYhBR",
      badgeText: "READY TO MOVE",
      badgeColor: "bg-tertiary text-on-tertiary",
      amenitiesText: "Private Lawn • Solar Microgrid",
      location: "Vedic Village Corridor, Rajarhat",
      title: "DreamKey Serene Villas",
      description: "4 & 5 BHK Independent Gated Villas",
      bhk: "4 & 5 BHK",
      size: "3,200 - 4,800 sq.ft",
      price: "₹3.40 Cr"
    }
  ];

  return (
    <section className="lg:col-span-9 flex flex-col gap-6">
      <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-title-property text-title-property font-bold text-on-surface">12 Properties Found</h2>
            {/* <span className="px-2 py-0.5 rounded text-xs bg-surface-container-low text-tertiary-container font-semibold">WBRERA Verified</span> */}
          </div>
          <p className="text-body-dense text-on-surface-variant font-body-dense mt-0.5">Showing curated high-trust residential units in Kolkata & Metro outposts</p>
        </div>
        
        <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg hidden sm:inline">sort</span>
            <select className="bg-surface-container-low text-on-surface rounded px-3 py-1.5 font-label-ui text-label-ui focus:outline-none">
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Size: Largest First</option>
            </select>
          </div>
          <div className="flex items-center bg-surface-container-low p-1 rounded">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-surface-container-lowest text-on-surface shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-lg leading-none">grid_view</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-surface-container-lowest text-on-surface shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-lg leading-none">view_list</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-label-ui font-label-ui scrollbar-none">
        <span className="text-on-surface-variant text-xs">Quick Picks:</span>
        {['Ready to Move', 'Lakefront Suites', '3+ BHK', 'New Launch Specials'].map(pick => (
          <button key={pick} className="px-3 py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface shadow-xs transition-colors whitespace-nowrap">
            {pick}
          </button>
        ))}
      </div>

      <div className={`grid gap-6 transition-all duration-300 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {properties.map(p => (
          <PropertyCard key={p.id} {...p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
        <button className="inline-flex items-center gap-1 px-3 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors disabled:opacity-40" disabled>
          <span className="material-symbols-outlined text-sm">chevron_left</span>
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="flex items-center gap-1.5 font-label-ui text-label-ui">
          <button className="w-9 h-9 rounded bg-primary text-on-primary font-bold shadow-xs">1</button>
          <button className="w-9 h-9 rounded hover:bg-surface-container text-on-surface transition-colors">2</button>
          <button className="w-9 h-9 rounded hover:bg-surface-container text-on-surface transition-colors">3</button>
          <span className="px-1 text-on-surface-variant">...</span>
          <button className="w-9 h-9 rounded hover:bg-surface-container text-on-surface transition-colors">10</button>
        </div>
        <button className="inline-flex items-center gap-1 px-3 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors">
          <span className="hidden sm:inline">Next</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
