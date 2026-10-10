"use client";

import { useState } from "react";
import { ArrowUpRightIcon, MapPinIcon } from "@phosphor-icons/react";
import OfficeMap from "@/components/maps/OfficeMap";
import styles from "./Interior.module.css";

export default function ContactMap() {
  const [showMap, setShowMap] = useState(true);
  if (showMap) {
    return <OfficeMap className={styles.map} />;
  }
  return (
    <div className={styles.mapPreview}>
      <MapPinIcon size={30} weight="light" aria-hidden="true" />
      <p>
        AA 52, st-69, AA block, Newtown
        <br />
        Kolkata, West Bengal 700156
      </p>
      <button
        className={styles.secondaryButton}
        type="button"
        onClick={() => setShowMap(true)}
      >
        Show interactive map
        <ArrowUpRightIcon size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
