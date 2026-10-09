"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import { CLIENT_STORIES } from "./client-stories";
import styles from "./Landing.module.css";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const story = CLIENT_STORIES[index];
  const move = (direction: number) =>
    setIndex(
      (current) =>
        (current + direction + CLIENT_STORIES.length) % CLIENT_STORIES.length,
    );
  return (
    <div
      className={styles.testimonial}
      role="region"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
    >
      <Quotes
        size={38}
        weight="light"
        className={styles.quoteIcon}
        aria-hidden="true"
      />
      <div
        className={styles.quoteContent}
        aria-live="polite"
        aria-atomic="true"
      >
        <div key={index} className={styles.quoteTransition}>
          <blockquote>“{story.quote}”</blockquote>
          <div className={styles.quoteAuthor}>
            <span className={styles.authorInitials} aria-hidden="true">
              {story.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </span>
            <div>
              <p>{story.name}</p>
              <span>
                {story.role} · {story.location}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.quoteControls}>
        <p>
          <span>{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(CLIENT_STORIES.length).padStart(2, "0")}
        </p>
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
