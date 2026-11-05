"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CaretDown,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import {
  AREAS,
  BEDROOMS,
  activeRentFilters,
  rentQueryEntries,
  type RentFilters,
} from "./rental-filters";
import RentalBudget from "./RentalBudget";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/buy/Buy.module.css";

export default function RentalFilters({ filters }: { filters: RentFilters }) {
  const [open, setOpen] = useState(false);
  const selected = useRef({
    location: filters.location,
    bedrooms: filters.bedrooms,
  });
  const count = activeRentFilters(filters).length;
  const change = (name: "location" | "bedrooms", value: string) => {
    if (selected.current[name] === value) return;
    selected.current[name] = value;
    trackEvent("property_search", {
      component_name: "rent_search",
      transaction_type: "rent",
      interaction_type: "filter_change",
      filter_name: name,
      filter_value: value || "any",
    });
  };
  const reset = () => {
    if (count)
      trackEvent("property_search", {
        component_name: "rent_search",
        transaction_type: "rent",
        interaction_type: "reset",
      });
  };
  return (
    <aside className={styles.sidebar} aria-label="Refine your rental search">
      <div className={styles.filterHeading}>
        <h2>
          <SlidersHorizontal size="1.125rem" aria-hidden="true" />
          Refine your search
        </h2>
        <Link
          href="/rent#rental-homes"
          className={styles.linkButton}
          onClick={reset}
          data-analytics-ignore-click
        >
          Clear all
        </Link>
      </div>
      <button
        className={styles.mobileToggle}
        type="button"
        aria-expanded={open}
        aria-controls="rent-filter-body"
        onClick={() => setOpen(!open)}
      >
        <span>
          <SlidersHorizontal size="1.125rem" aria-hidden="true" />
          Filters{count ? ` (${count})` : ""}
        </span>
        <CaretDown size="1.0625rem" aria-hidden="true" />
      </button>
      <div id="rent-filter-body" className={styles.filterBody} data-open={open}>
        <form
          action="/rent#rental-homes"
          method="get"
          aria-label="Refine rental collection"
          data-analytics-search="rent"
          data-analytics-component="rent_search"
        >
          {rentQueryEntries(filters)
            .filter(
              ([name]) =>
                !["location", "bedrooms", "maxPrice", "page"].includes(name),
            )
            .map(([name, value]) => (
              <input type="hidden" name={name} value={value} key={name} />
            ))}
          <fieldset className={styles.filterGroup}>
            <legend>Neighbourhood</legend>
            <label className={styles.choice}>
              <input
                type="radio"
                name="location"
                value=""
                defaultChecked={!filters.location}
                onChange={() => change("location", "")}
              />
              <span>All Kolkata</span>
            </label>
            {AREAS.map(([value, label]) => (
              <label className={styles.choice} key={value}>
                <input
                  type="radio"
                  name="location"
                  value={value}
                  defaultChecked={filters.location === value}
                  onChange={() => change("location", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className={styles.filterGroup}>
            <RentalBudget initial={filters.maxPrice} />
          </div>
          <fieldset className={styles.filterGroup}>
            <legend>Bedrooms</legend>
            <label className={styles.choice}>
              <input
                type="radio"
                name="bedrooms"
                value=""
                defaultChecked={!filters.bedrooms}
                onChange={() => change("bedrooms", "")}
              />
              <span>Any BHK</span>
            </label>
            {BEDROOMS.map(([value, label]) => (
              <label className={styles.choice} key={value}>
                <input
                  type="radio"
                  name="bedrooms"
                  value={value}
                  defaultChecked={filters.bedrooms === value}
                  onChange={() => change("bedrooms", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <button type="submit" className={styles.applyButton}>
            Apply filters
          </button>
          <Link
            href="/rent#rental-homes"
            className={styles.resetLink}
            onClick={reset}
            data-analytics-ignore-click
          >
            Reset filters
          </Link>
        </form>
        <div className={styles.advice}>
          <h3>A little guidance?</h3>
          <p>
            Tell us what matters to you. We’ll help you explore rental options.
          </p>
          <Link href="/contact?purpose=rent">
            Talk to our team <ArrowUpRight size="1rem" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
