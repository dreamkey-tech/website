"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function subscribeVisibility(listener: () => void) {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

export default function useTestimonialRotation(
  root: RefObject<HTMLDivElement | null>,
  count: number,
  holdMs: number = 5000,
) {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [selectionVersion, setSelectionVersion] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => true,
  );
  const tabVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState !== "hidden",
    () => true,
  );
  const running =
    count > 1 &&
    !focused &&
    !hovered &&
    !interacting &&
    !reducedMotion &&
    tabVisible &&
    inView;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      holdMs,
    );
    return () => window.clearTimeout(timer);
  }, [running, index, selectionVersion, count, holdMs]);

  return {
    index,
    running,
    reducedMotion,
    setFocused,
    setHovered,
    setInteracting,
    move: (direction: number) => {
      setIndex((current) => (current + direction + count) % count);
      setSelectionVersion((current) => current + 1);
    },
    select: (next: number) => {
      setIndex(next);
      setSelectionVersion((current) => current + 1);
    },
  };
}
