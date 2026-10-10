"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { CLIENT_STORIES } from "./client-stories";
import TestimonialCard from "./TestimonialCard";
import useTestimonialRotation from "./useTestimonialRotation";
import styles from "./ClientStories.module.css";

const TRACK_ID = "client-stories-track";
const count = CLIENT_STORIES.length;
const pad = (value: number) => String(value).padStart(2, "0");

const SLIDE_DURATION_MS = 2500;

export default function TestimonialSlider() {
  const root = useRef<HTMLDivElement>(null);
  const rotation = useTestimonialRotation(root, count, SLIDE_DURATION_MS);
  const { index, move, select } = rotation;
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const swiped = useRef(false);

  return (
    <div
      ref={root}
      className={styles.carousel}
      role="region"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") rotation.setHovered(true);
      }}
      onPointerLeave={() => rotation.setHovered(false)}
      onFocusCapture={(event) => {
        rotation.setFocused(event.target.matches(":focus-visible"));
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          rotation.setFocused(false);
      }}
    >
      <div
        id={TRACK_ID}
        ref={stage}
        className={styles.stage}
        role="group"
        tabIndex={0}
        aria-label="Browse testimonials with left and right arrow keys"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            select(event.key === "Home" ? 0 : count - 1);
          }
        }}
        onPointerDown={(event) => {
          swiped.current = false;
          if (event.pointerType === "mouse" || !event.isPrimary) return;
          rotation.setInteracting(true);
          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            id: event.pointerId,
          };
          // Capture on the original element so a tap still reaches a side-card button.
          (event.target as Element).setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          rotation.setInteracting(false);
          const start = gesture.current;
          gesture.current = null;
          if (!start || start.id !== event.pointerId) return;
          const x = event.clientX - start.x;
          const y = event.clientY - start.y;
          if (Math.abs(x) >= 50 && Math.abs(x) > Math.abs(y) * 1.3) {
            swiped.current = true;
            move(x < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          rotation.setInteracting(false);
          gesture.current = null;
        }}
        onClickCapture={(event) => {
          // A completed swipe should not also select the card under the finger.
          if (swiped.current) {
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        {CLIENT_STORIES.map((story, storyIndex) => {
          const offset = (storyIndex - index + count) % count;
          const position =
            offset > Math.floor(count / 2) ? offset - count : offset;
          return (
            <TestimonialCard
              key={story.name}
              story={story}
              position={position}
              onSelect={() => {
                select(storyIndex);
                stage.current?.focus({ preventScroll: true });
              }}
            />
          );
        })}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous testimonial"
          aria-controls={TRACK_ID}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <p className={styles.counter} aria-hidden="true">
          <span>{pad(index + 1)}</span> / {pad(count)}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next testimonial"
          aria-controls={TRACK_ID}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live={rotation.running ? "off" : "polite"}
        aria-atomic="true"
      >
        Testimonial {index + 1} of {count}: {CLIENT_STORIES[index].name}.{" "}
        {CLIENT_STORIES[index].quote}
      </p>
    </div>
  );
}
