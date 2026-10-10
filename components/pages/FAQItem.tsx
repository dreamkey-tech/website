"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Interior.module.css";

/** Native details still works before hydration; hover is an optional enhancement. */
export default function FAQItem({
  summary,
  answer,
}: {
  summary: ReactNode;
  answer: ReactNode;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const hovered = useRef(false);
  const pinned = useRef(false);
  const expanded = useRef(false);

  useEffect(() => () => animation.current?.cancel(), []);

  function reveal(open: boolean) {
    const element = details.current;
    const panel = element?.querySelector<HTMLElement>("[data-faq-answer]");
    if (!element || !panel) return;
    expanded.current = open;

    // Measure before cancelling so quick pointer changes reverse without jumping.
    const startHeight = element.open ? panel.getBoundingClientRect().height : 0;
    animation.current?.cancel();
    animation.current = null;
    if (open) element.open = true;
    if (!element.open) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof panel.animate !== "function"
    ) {
      element.open = open;
      return;
    }

    const tween = panel.animate(
      [
        { height: `${startHeight}px` },
        { height: `${open ? panel.scrollHeight : 0}px` },
      ],
      { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    );
    animation.current = tween;
    tween.onfinish = () => {
      if (animation.current !== tween) return;
      if (!open) element.open = false;
      tween.cancel();
      animation.current = null;
    };
  }

  return (
    <details
      ref={details}
      onPointerEnter={(event) => {
        if (
          event.pointerType === "touch" ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        )
          return;
        hovered.current = true;
        reveal(true);
      }}
      onPointerLeave={() => {
        hovered.current = false;
        if (
          !pinned.current &&
          !details.current?.contains(document.activeElement)
        )
          reveal(false);
      }}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !hovered.current &&
          !pinned.current
        )
          reveal(false);
      }}
      onClick={(event) => {
        const target = event.target;
        if (!(target instanceof Element) || !target.closest("summary")) return;
        event.preventDefault();
        // Click, Enter and Space retain normal toggle behavior; tap stays open.
        const open = animation.current
          ? !expanded.current
          : !event.currentTarget.open;
        pinned.current = open;
        reveal(open);
      }}
    >
      {summary}
      <div className={styles.faqAnswer} data-faq-answer>
        {answer}
      </div>
    </details>
  );
}
