"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { RENT_BUDGETS } from "./rental-filters";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/buy/Buy.module.css";

const STEPS: string[] = [...RENT_BUDGETS.map(([value]) => value), ""];
export default function RentalBudget({ initial }: { initial: string }) {
  const [cap, setCap] = useState(initial);
  const dirty = useRef(false);
  const committed = useRef(initial);
  const trackCap = (value: string) => {
    if (committed.current === value) return;
    committed.current = value;
    trackEvent("property_search", {
      component_name: "rent_search",
      transaction_type: "rent",
      interaction_type: "filter_change",
      filter_name: "maxPrice",
      filter_value: value || "any",
    });
  };
  const commit = (event: SyntheticEvent<HTMLInputElement>) => {
    if (!dirty.current) return;
    dirty.current = false;
    trackCap(STEPS[Number(event.currentTarget.value)]);
  };
  return (
    <div className={styles.budgetControl}>
      <div>
        <label htmlFor="rent-price-cap">Maximum monthly rent</label>
        <output htmlFor="rent-price-cap">
          {cap ? `₹${Number(cap).toLocaleString("en-IN")}` : "No cap"}
        </output>
      </div>
      <input type="hidden" name="maxPrice" value={cap} />
      <input
        id="rent-price-cap"
        type="range"
        min={0}
        max={STEPS.length - 1}
        step={1}
        value={STEPS.indexOf(cap)}
        aria-valuetext={
          cap
            ? `Up to ${Number(cap).toLocaleString("en-IN")} rupees rent`
            : "No maximum rent"
        }
        onChange={(event) => {
          dirty.current = true;
          setCap(STEPS[Number(event.target.value)]);
        }}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
      />
      <div className={styles.rangeLabels}>
        <span>₹30,000</span>
        <span>No cap</span>
      </div>
      {cap && (
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => {
            dirty.current = false;
            trackCap("");
            setCap("");
          }}
        >
          Remove rent cap
        </button>
      )}
    </div>
  );
}
