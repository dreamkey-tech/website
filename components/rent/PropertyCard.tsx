import React from 'react';

interface PropertyCardProps {
  image: string;
  badgeText?: string;
  badgeColor?: string;
  amenitiesText: string;
  location: string;
  title: string;
  description: string;
  bhk: string;
  size: string;
  price: string;
}

export default function PropertyCard({ image, badgeText, badgeColor = 'bg-inverse-surface/90 text-inverse-on-surface', amenitiesText, location, title, description, bhk, size, price }: PropertyCardProps) {
  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
        <img alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={image} />
        {badgeText && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded font-label-ui text-label-ui ${badgeColor}`}>
            {badgeText}
          </div>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors shadow-xs">
          <span className="material-symbols-outlined text-base">favorite_border</span>
        </button>
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-ui text-xs text-primary font-bold">
          {amenitiesText}
        </div>
      </div>
      
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-body-dense text-xs mb-1">
            <span className="material-symbols-outlined text-xs text-primary">pin_drop</span>
            <span>{location}</span>
          </div>
          <h3 className="font-title-property text-title-property font-semibold text-on-surface group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body-dense text-body-dense text-on-surface-variant mt-1">{description}</p>
          <div className="flex items-center gap-3 mt-3 pt-3 text-body-dense text-on-surface-variant">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span> {bhk}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">square_foot</span> {size}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant block font-label-ui uppercase">Indicative Price</span>
            <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold">{price} <span className="text-xs font-normal text-on-surface-variant">onwards</span></span>
          </div>
          <a className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-surface-container hover:bg-primary hover:text-on-primary font-label-ui text-label-ui font-semibold text-on-surface transition-all" href="#">
            <span>Inquire</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </a>
        </div>
      </div>
    </article>
  );
}
