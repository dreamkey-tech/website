import React from 'react';
import BuyHeroSection from '@/components/buy/BuyHeroSection';
import BuyPropertySearch from '@/components/buy/BuyPropertySearch';
import FilterSidebar from '@/components/buy/FilterSidebar';
import PropertyGrid from '@/components/buy/PropertyGrid';
import TrustAssurance from '@/components/buy/TrustAssurance';

export default function BuyPage() {
  return (
    <div className="flex flex-col w-full">
      <BuyHeroSection />
      <BuyPropertySearch />
      
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin mt-10 w-full mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FilterSidebar />
          <PropertyGrid />
        </div>
      </div>
      
      <TrustAssurance />
    </div>
  );
}
