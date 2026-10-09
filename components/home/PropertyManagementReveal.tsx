"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Raise and widen the banner without scaling its copy or changing page height. */
export default function PropertyManagementReveal({
  children,
}: {
  children: ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = container.current?.querySelector<HTMLElement>(
        "[data-management-panel]",
      );
      const copy = panel?.querySelector<HTMLElement>("[data-management-copy]");
      if (!panel || !copy) return;

      const media = gsap.matchMedia();
      media.add(
        {
          mobile: "(max-width: 767px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.motion) return;

          const inset = context.conditions.mobile ? 2 : 8;
          const rise = context.conditions.mobile ? 32 : 80;
          const radius = getComputedStyle(panel).borderTopLeftRadius;

          gsap
            .timeline({
              defaults: { duration: 1, ease: "none" },
              scrollTrigger: {
                // Measure the stationary wrapper while its child moves upward.
                trigger: container.current,
                start: "clamp(top 90%)",
                end: "clamp(top 35%)",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              panel,
              {
                y: rise,
                clipPath: `inset(0% ${inset}% 0% ${inset}% round ${radius})`,
              },
              { y: 0, clipPath: `inset(0% 0% 0% 0% round ${radius})` },
              0,
            )
            .fromTo(
              copy,
              { x: () => (panel.clientWidth * inset) / 100 },
              { x: 0 },
              0,
            );
        },
        container,
      );

      // Font loading can change the height of sections above the trigger.
      let mounted = true;
      if (document.fonts.status === "loading") {
        void document.fonts.ready.then(() => {
          if (mounted) ScrollTrigger.refresh();
        });
      }

      return () => {
        mounted = false;
        media.revert();
      };
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
