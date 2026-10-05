import React from 'react';
import RentPropertySearch from '@/components/rent/RentPropertySearch';
import FilterSidebar from '@/components/rent/FilterSidebar';
import PropertyGrid from '@/components/rent/PropertyGrid';
import TrustAssurance from '@/components/buy/TrustAssurance'; // Reuse TrustAssurance from buy

export default function RentPage() {
  return (
    <div className="flex flex-col w-full">
      <RentPropertySearch />
      
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
