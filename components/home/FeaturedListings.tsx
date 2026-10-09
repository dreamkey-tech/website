"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Bed,
  Bathtub,
  ArrowsOut,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
  tagColor: string;
  img: string;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Horizon Penthouse",
    location: "New Town, Action Area II",
    price: "₹4.8 Cr",
    priceLabel: "onwards",
    beds: 4,
    baths: 4,
    sqft: "3,200",
    tag: "Featured",
    tagColor: "bg-gold text-dark-base",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6d4f0384?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Greenwood Residences",
    location: "Rajarhat, New Town",
    price: "₹1.2 Cr",
    priceLabel: "onwards",
    beds: 3,
    baths: 2,
    sqft: "1,650",
    tag: "New Launch",
    tagColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Southgate Elite",
    location: "South Kolkata, Tollygunge",
    price: "₹2.4 Cr",
    priceLabel: "onwards",
    beds: 3,
    baths: 3,
    sqft: "2,100",
    tag: "Ready to Move",
    tagColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Park Avenue Heights",
    location: "Ballygunge, Central Kolkata",
    price: "₹3.6 Cr",
    priceLabel: "onwards",
    beds: 4,
    baths: 3,
    sqft: "2,750",
    tag: "Premium",
    tagColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Salt Lake Skyline",
    location: "Salt Lake, Sector V",
    price: "₹1.8 Cr",
    priceLabel: "onwards",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    tag: "Hot Deal",
    tagColor: "bg-red-500/20 text-red-400 border border-red-500/30",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Garden City Villas",
    location: "Joka, Diamond Harbour Road",
    price: "₹2.1 Cr",
    priceLabel: "onwards",
    beds: 3,
    baths: 3,
    sqft: "2,400",
    tag: "Limited",
    tagColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
];

function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group relative flex flex-col bg-dark-raised border border-border-dark rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] hover:border-gold/25 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${property.img}')` }}
          role="img"
          aria-label={property.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-raised/80 via-transparent to-transparent" />

        {/* Tag */}
        <span className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${property.tagColor}`}>
          {property.tag}
        </span>

        {/* Quick action */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-dark-base/80 backdrop-blur-sm border border-border-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowSquareOut size={14} className="text-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-[16px] font-semibold text-white leading-snug group-hover:text-gold transition-colors duration-200">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={12} weight="fill" className="text-gold shrink-0" />
            <span className="text-[12px] text-text-dark-secondary truncate">{property.location}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-[12px] text-text-dark-secondary">
          <span className="flex items-center gap-1.5">
            <Bed size={14} className="text-text-dark-muted" />
            {property.beds} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bathtub size={14} className="text-text-dark-muted" />
            {property.baths} Bath
          </span>
          <span className="flex items-center gap-1.5">
            <ArrowsOut size={14} className="text-text-dark-muted" />
            {property.sqft} sq.ft
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-2 border-t border-border-dark">
          <div>
            <span className="font-display text-[20px] font-bold text-gold">{property.price}</span>
            <span className="text-[11px] text-text-dark-secondary ml-1">{property.priceLabel}</span>
          </div>
          <Link
            href="/buy"
            className="text-[12px] font-semibold text-gold hover:text-gold-light transition-colors flex items-center gap-1 group/link"
          >
            View Details
            <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedListings() {
  const containerRef = useRef<HTMLElement>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const autoplay = Autoplay({ delay: 3500, stopOnInteraction: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    prefersReducedMotion ? [] : [autoplay]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from(".anim-header", {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-header",
        start: "top 80%",
      }
    });

    gsap.from(".anim-controls", {
      x: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".anim-header",
        start: "top 80%",
      }
    });
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-dark-base relative overflow-hidden" id="properties">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(223,158,4,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="anim-header">
            <h2 className="font-display text-headline-lg text-white leading-tight">
              Featured{" "}
              <span className="text-gold">Properties</span>
            </h2>
            <p className="text-text-dark-secondary text-body-default mt-2 max-w-md">
              Hand-picked listings across Kolkata&#39;s most sought-after neighbourhoods.
            </p>
          </div>

          <div className="anim-controls flex items-center gap-3 shrink-0">
            <Link
              href="/buy"
              className="text-[13px] font-semibold text-text-dark-secondary hover:text-gold transition-colors underline underline-offset-4 mr-1"
            >
              View all listings
            </Link>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 rounded-full border border-border-dark bg-dark-raised flex items-center justify-center text-text-dark-secondary hover:text-gold hover:border-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 rounded-full border border-border-dark bg-dark-raised flex items-center justify-center text-text-dark-secondary hover:text-gold hover:border-gold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-5">
            {PROPERTIES.map((property) => (
              <div
                key={property.id}
                className="embla__slide shrink-0"
                style={{ flex: "0 0 calc(100% / 1.1)", maxWidth: "380px" }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Properties navigation">
          {PROPERTIES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === selectedIndex
                  ? "bg-gold w-6"
                  : "bg-border-dark w-1.5 hover:bg-text-dark-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
