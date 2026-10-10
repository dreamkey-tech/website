"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HOLD_MS = 4500;

function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function subscribeVisibility(listener: () => void) {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

export default function useHeroRotation(
  hero: RefObject<HTMLDivElement | null>,
  ready: boolean,
  count: number,
) {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [selectionVersion, setSelectionVersion] = useState(0);
  const [inView, setInView] = useState(true);
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

  useEffect(() => {
    if (!hero.current) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15),
      { threshold: 0.15 },
    );
    observer.observe(hero.current);
    return () => observer.disconnect();
  }, [hero]);

  useEffect(() => {
    if (
      !ready ||
      count < 2 ||
      focused ||
      reducedMotion ||
      !inView ||
      !tabVisible
    )
      return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [
    active,
    ready,
    focused,
    selectionVersion,
    reducedMotion,
    inView,
    tabVisible,
    count,
  ]);

  return {
    active,
    reducedMotion,
    setFocused,
    select: (index: number) => {
      setActive(index);
      setFocused(false);
      // Restart the full hold even when the visitor selects the current image.
      setSelectionVersion((current) => current + 1);
    },
    showFallback: (index: number) => setActive(index),
  };
}
