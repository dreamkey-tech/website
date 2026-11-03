"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "./Buy.module.css";

export default function BuyBudget({ initial }: { initial: string }) {
  const [cap, setCap] = useState(initial);
  const dirty = useRef(false);
  const committedCap = useRef(initial);
  const trackCap = (next: string) => {
    if (committedCap.current === next) return;
    committedCap.current = next;
    trackEvent("property_search", {
      component_name: "buy_filters",
      filter_name: "maxPrice",
      filter_value: next ? String(Math.round(Number(next) * 10000000)) : "any",
      transaction_type: "buy",
      interaction_type: "filter_change",
    });
  };
  const commit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!dirty.current) return;
    dirty.current = false;
    trackCap(event.currentTarget.value);
  };
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
        onChange={(event) => {
          dirty.current = true;
          setCap(event.target.value);
        }}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
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
          onClick={() => {
            dirty.current = false;
            trackCap("");
            setCap("");
          }}
        >
          Remove price cap
        </button>
      )}
    </div>
  );
}
