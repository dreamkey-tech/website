"use client";

import { useState } from "react";
import styles from "./Buy.module.css";

export default function BuyBudget({ initial }: { initial: string }) {
  const [cap, setCap] = useState(initial);
  return (
    <div className={styles.budgetControl}>
      <div>
        <label htmlFor="buy-price-cap">Maximum price</label>
        <output htmlFor="buy-price-cap">
          {cap ? `₹${Number(cap).toFixed(2)} Cr` : "No cap"}
        </output>
      </div>
      <input type="hidden" name="maxPrice" value={cap} />
      <input
        id="buy-price-cap"
        type="range"
        min="0.35"
        max="6"
        step="0.05"
        value={cap || "6"}
        onChange={(event) => setCap(event.target.value)}
        aria-valuetext={cap ? `Up to ${cap} crore rupees` : "No maximum price"}
      />
      <div className={styles.rangeLabels}>
        <span>₹35L</span>
        <span>₹6 Cr</span>
      </div>
      {cap && (
        <button
          className={styles.linkButton}
          type="button"
          onClick={() => setCap("")}
        >
          Remove price cap
        </button>
      )}
    </div>
  );
}
