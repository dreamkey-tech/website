"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

/** Keep the copy server-rendered; enhance it only after the browser mounts. */
export default function HeroCopyEntrance({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap
            .timeline({
              defaults: {
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
              },
            })
            .from(
              ".home-hero__title > span, .home-hero__title > em",
              { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.14 },
              0,
            )
            .from(
              ".home-hero__description",
              { y: 18, autoAlpha: 0, duration: 0.65 },
              0.38,
            )
            .from(
              ".home-hero__consultation",
              { y: 14, autoAlpha: 0, duration: 0.6 },
              0.56,
            );
        },
        container,
      );
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div className="home-hero__copy" ref={container}>
      {children}
    </div>
  );
}
