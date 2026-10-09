"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { HERO_SLIDES } from "./hero-slides";
import styles from "./HeroSlideshow.module.css";

export default function HeroSlideControls({
  active,
  paused,
  reducedMotion,
  onSelect,
  onToggle,
}: {
  active: number;
  paused: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onToggle: () => void;
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
      <button
        type="button"
        data-rotation-toggle
        className={styles.rotationButton}
        disabled={reducedMotion}
        aria-label={
          reducedMotion
            ? "Autoplay disabled for reduced motion"
            : paused
              ? "Play hero slideshow"
              : "Pause hero slideshow"
        }
        onClick={onToggle}
      >
        {paused || reducedMotion ? (
          <Play size={16} weight="fill" aria-hidden="true" />
        ) : (
          <Pause size={16} weight="fill" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
