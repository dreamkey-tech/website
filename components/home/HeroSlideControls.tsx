"use client";

import { HERO_SLIDES } from "./hero-slides";
import styles from "./HeroSlideshow.module.css";

export default function HeroSlideControls({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className={styles.controls}
      role="group"
      aria-label="Hero slideshow controls"
      data-hero-controls
    >
      {HERO_SLIDES.map((slide, index) => (
        <button
          type="button"
          key={slide.src}
          aria-label={`Show ${slide.label.toLowerCase()}`}
          aria-pressed={index === active}
          onClick={() => onSelect(index)}
        >
          <span className={styles.dot} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
