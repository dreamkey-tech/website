"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react";
import styles from "./ListingImage.module.css";

export default function ListingImage({
  src,
  alt,
  sizes,
  eager = false,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  ) : (
    <span className={styles.fallback}>
      <ImageSquare size={32} weight="light" aria-hidden="true" />
      <span>Photograph on request</span>
    </span>
  );
}
