"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import styles from "./DesignGallery.module.css";

const TRACK_ID = "design-gallery-track";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const pad = (value: number) => String(value).padStart(2, "0");

export default function DesignGalleryCarousel({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const [viewportRef, carousel] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    duration: 28,
    skipSnaps: true,
    inViewThreshold: 0.6,
    breakpoints: { [MOTION_QUERY]: { duration: 0 } },
  });

  const subscribe = useCallback(
    (listener: () => void) => {
      if (!carousel) return () => {};
      carousel
        .on("select", listener)
        .on("settle", listener)
        .on("slidesInView", listener)
        .on("reInit", listener);
      return () => {
        carousel
          .off("select", listener)
          .off("settle", listener)
          .off("slidesInView", listener)
          .off("reInit", listener);
      };
    },
    [carousel],
  );
  const getSnapshot = useCallback(() => {
    if (!carousel) return "0,0,0,0";
    const visible = carousel.slidesInView();
    return [
      Number(carousel.canScrollPrev()),
      Number(carousel.canScrollNext()),
      visible.length ? visible[0] + 1 : 1,
      visible.length ? visible[visible.length - 1] + 1 : 1,
    ].join(",");
  }, [carousel]);
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "0,0,0,0",
  );
  const [previous, next, first, last] = snapshot.split(",").map(Number);

  const move = useCallback(
    (direction: "previous" | "next") => {
      const jump = window.matchMedia(MOTION_QUERY).matches;
      if (direction === "previous") carousel?.scrollPrev(jump);
      else carousel?.scrollNext(jump);
    },
    [carousel],
  );

  useEffect(() => {
    if (!carousel) return;
    const viewport = carousel.rootNode();
    let distance = 0;
    let lastMove = -Infinity;
    const onWheel = (event: WheelEvent) => {
      // Leave vertical page scrolling alone. Horizontal gestures browse cards.
      if (event.ctrlKey) return;
      if (!event.shiftKey && Math.abs(event.deltaX) <= Math.abs(event.deltaY))
        return;
      event.preventDefault();
      const delta = event.shiftKey
        ? event.deltaY || event.deltaX
        : event.deltaX;
      const multiplier =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? viewport.clientWidth
            : 1;
      if (Math.sign(delta) !== Math.sign(distance)) distance = 0;
      distance += delta * multiplier;
      if (Math.abs(distance) < 30 || performance.now() - lastMove < 280) return;
      move(distance > 0 ? "next" : "previous");
      distance = 0;
      lastMove = performance.now();
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [carousel, move]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.stage}
        data-can-previous={Boolean(previous)}
        data-can-next={carousel ? Boolean(next) : count > 1}
      >
        <div
          ref={viewportRef}
          className={styles.viewport}
          data-enhanced={Boolean(carousel)}
          role="group"
          aria-label="Browse homes by design"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(event) => {
            if (!carousel || event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? "previous" : "next");
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              carousel.scrollTo(
                event.key === "Home" ? 0 : carousel.scrollSnapList().length - 1,
                window.matchMedia(MOTION_QUERY).matches,
              );
            }
          }}
        >
          <ul id={TRACK_ID} className={styles.gallery}>
            {children}
          </ul>
        </div>
      </div>
      <div className={styles.controls}>
        <p className={styles.position} aria-live="polite" aria-atomic="true">
          {first ? (
            <>
              <span className="sr-only">Showing home styles </span>
              {pad(first)}–{pad(last)}
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> of </span>
              {pad(count)}
            </>
          ) : (
            `${count} home styles`
          )}
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            aria-label="Previous home styles"
            aria-controls={TRACK_ID}
            disabled={!previous}
            onClick={() => move("previous")}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next home styles"
            aria-controls={TRACK_ID}
            disabled={!next}
            onClick={() => move("next")}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
