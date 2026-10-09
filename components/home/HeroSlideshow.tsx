"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO_IMAGE_SIZES, HERO_SLIDES } from "./hero-slides";
import useHeroRotation from "./useHeroRotation";
import HeroSlideControls from "./HeroSlideControls";
import styles from "./HeroSlideshow.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

export default function HeroSlideshow({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLDivElement>(null);
  const [prepareNext, setPrepareNext] = useState(false);
  const [loaded, setLoaded] = useState(() => HERO_SLIDES.map(() => false));
  const [failed, setFailed] = useState(() => HERO_SLIDES.map(() => false));
  const ready = loaded.every(Boolean) && !failed.some(Boolean);
  const rotation = useHeroRotation(hero, ready, HERO_SLIDES.length);

  useEffect(() => {
    if (!loaded[0] || prepareNext) return;
    // Give the first view and its fonts time to settle before fetching more photos.
    const timer = window.setTimeout(() => setPrepareNext(true), 2000);
    return () => window.clearTimeout(timer);
  }, [loaded, prepareNext]);

  useGSAP(
    () => {
      const photos = hero.current?.querySelectorAll("[data-hero-photo]");
      if (!photos) return;
      gsap.to(photos, {
        opacity: (index) => (index === rotation.active ? 1 : 0),
        duration: rotation.reducedMotion ? 0 : 1.2,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    },
    {
      scope: hero,
      dependencies: [rotation.active, rotation.reducedMotion, prepareNext],
    },
  );

  return (
    <div
      className={styles.frame}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-hero-controls]"))
          rotation.setFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          rotation.setFocused(false);
      }}
    >
      <div className="home-hero" ref={hero}>
        <div
          role="region"
          aria-label="Kolkata residential views"
          aria-roledescription="carousel"
        >
          {HERO_SLIDES.map(
            (slide, index) =>
              (index === 0 || prepareNext) && (
                <div
                  key={slide.src}
                  className={styles.photo}
                  data-hero-photo={index}
                  aria-hidden={rotation.active !== index}
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes={HERO_IMAGE_SIZES}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    className="home-hero__image"
                    quality={50}
                    onLoad={() => {
                      setLoaded((current) =>
                        current.map((value, item) => item === index || value),
                      );
                      if (failed[rotation.active]) rotation.showFallback(index);
                    }}
                    onError={() => {
                      setFailed((current) =>
                        current.map((value, item) => item === index || value),
                      );
                      setPrepareNext(true);
                      const fallback = loaded.findIndex(
                        (value, item) => value && item !== index,
                      );
                      if (rotation.active === index && fallback !== -1)
                        rotation.showFallback(fallback);
                    }}
                  />
                </div>
              ),
          )}
        </div>
        {children}
      </div>
      {ready && (
        <HeroSlideControls
          active={rotation.active}
          paused={rotation.paused}
          reducedMotion={rotation.reducedMotion}
          onSelect={rotation.select}
          onToggle={rotation.toggle}
        />
      )}
    </div>
  );
}
