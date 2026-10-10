"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./DirectionalFillLink.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

const MOTION_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function DirectionalFillLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const link = useRef<HTMLAnchorElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const element = link.current;
      if (!element) return;
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () => {
        const x = element.offsetWidth / 2;
        const y = element.offsetHeight / 2;
        gsap.set(element, {
          "--fill-x": `${x}px`,
          "--fill-y": `${y}px`,
          "--fill-radius": element.matches(":hover")
            ? `${Math.hypot(x, y) + 1}px`
            : "0px",
        });
        element.dataset.fillMotion = "true";

        return () => {
          delete element.dataset.fillMotion;
          // Event tweens belong to useGSAP's context; stop them on media changes too.
          gsap.killTweensOf(element);
          gsap.set(element, {
            clearProps: "--fill-x,--fill-y,--fill-radius",
          });
        };
      });
      return () => media.revert();
    },
    { scope: link },
  );

  const animateFill = contextSafe(
    (event: PointerEvent<HTMLAnchorElement>, entering: boolean) => {
      const element = event.currentTarget;
      if (
        element.dataset.fillMotion !== "true" ||
        event.pointerType === "touch"
      )
        return;
      const rect = element.getBoundingClientRect();
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      if (!rect.width || !rect.height) return;
      // Account for the existing press transform and the banner's scroll movement.
      const x = Math.max(
        0,
        Math.min(width, ((event.clientX - rect.left) / rect.width) * width),
      );
      const y = Math.max(
        0,
        Math.min(height, ((event.clientY - rect.top) / rect.height) * height),
      );
      const radius =
        Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + 1;

      // Re-entry during an exit continues from the current fill rather than resetting.
      if (
        entering &&
        parseFloat(String(gsap.getProperty(element, "--fill-radius"))) < 1
      ) {
        gsap.set(element, { "--fill-x": `${x}px`, "--fill-y": `${y}px` });
      }
      gsap.to(element, {
        "--fill-x": `${x}px`,
        "--fill-y": `${y}px`,
        "--fill-radius": entering ? `${radius}px` : "0px",
        duration: entering ? 0.45 : 0.35,
        ease: entering ? "power2.out" : "power2.inOut",
        overwrite: true,
      });
    },
  );

  return (
    <Link
      ref={link}
      href={href}
      className={`${styles.link} ${className}`}
      onPointerEnter={(event) => animateFill(event, true)}
      onPointerLeave={(event) => animateFill(event, false)}
    >
      <span className={styles.content}>{children}</span>
      <span className={styles.fill} aria-hidden="true">
        <span className={styles.content}>{children}</span>
      </span>
    </Link>
  );
}
