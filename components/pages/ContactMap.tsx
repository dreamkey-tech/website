"use client";

import { useState } from "react";
import { ArrowUpRightIcon, MapPinIcon } from "@phosphor-icons/react";
import styles from "./Interior.module.css";

export default function ContactMap({ src }: { src: string }) {
  const [showMap, setShowMap] = useState(false);
  if (showMap) {
    return <iframe className={styles.map} src={src} title="Map showing Dream Key Reality’s New Town contact address" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />;
  }
  return <div className={styles.mapPreview}>
    <MapPinIcon size={30} weight="light" aria-hidden="true" />
    <p>AA 52, st-69, AA block, Newtown<br />Kolkata, West Bengal 700156</p>
    <button className={styles.secondaryButton} type="button" onClick={() => setShowMap(true)}>Show interactive map<ArrowUpRightIcon size={17} aria-hidden="true" /></button>
  </div>;
}
