"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CaretDown,
  SlidersHorizontal,
  ArrowUpRight,
} from "@phosphor-icons/react";
import {
  LOCATIONS,
  STATUSES,
  AMENITIES,
  activeBuyFilters,
  buyQueryEntries,
  type BuyFilters as Filters,
} from "./buy-data";
import BuyBudget from "./BuyBudget";
import styles from "./Buy.module.css";

export default function BuyFilters({ filters }: { filters: Filters }) {
  const [open, setOpen] = useState(false);
  const count = activeBuyFilters(filters).length;
  return (
    <aside className={styles.sidebar} aria-label="Refine your property search">
      <div className={styles.filterHeading}>
        <h2>
          <SlidersHorizontal size={18} aria-hidden="true" />
          Refine your search
        </h2>
        <Link href="/buy#homes" className={styles.linkButton}>
          Clear all
        </Link>
      </div>
      <button
        className={styles.mobileToggle}
        type="button"
        aria-expanded={open}
        aria-controls="buy-filter-body"
        onClick={() => setOpen(!open)}
      >
        <span>
          <SlidersHorizontal size={18} aria-hidden="true" /> Filters
          {count ? ` (${count})` : ""}
        </span>
        <CaretDown size={17} aria-hidden="true" />
      </button>
      <div id="buy-filter-body" className={styles.filterBody} data-open={open}>
        <form action="/buy#homes" method="get">
          {buyQueryEntries(filters)
            .filter(
              ([name]) =>
                !["location", "amenity", "status", "maxPrice", "page"].includes(
                  name,
                ),
            )
            .map(([name, value], index) => (
              <input type="hidden" name={name} value={value} key={index} />
            ))}
          <fieldset className={styles.filterGroup}>
            <legend>Neighbourhood</legend>
            {LOCATIONS.map(([value, label]) => (
              <label className={styles.choice} key={value}>
                <input
                  type="checkbox"
                  name="location"
                  value={value}
                  defaultChecked={filters.locations.includes(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className={styles.filterGroup}>
            <BuyBudget initial={filters.maxPrice} />
          </div>
          <fieldset className={styles.filterGroup}>
            <legend>Possession status</legend>
            <label className={styles.choice}>
              <input
                type="radio"
                name="status-filter"
                value=""
                defaultChecked={!filters.status}
              />
              <span>All statuses</span>
            </label>
            {STATUSES.map(([value, label]) => (
              <label className={styles.choice} key={value}>
                <input
                  type="radio"
                  name="status-filter"
                  value={value}
                  defaultChecked={filters.status === value}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <details
            className={styles.amenities}
            open={filters.amenities.length > 0 || undefined}
          >
            <summary>
              Amenities <CaretDown size={15} aria-hidden="true" />
            </summary>
            <fieldset>
              <legend className={styles.srOnly}>Required amenities</legend>
              {AMENITIES.map(([value, label]) => (
                <label className={styles.choice} key={value}>
                  <input
                    type="checkbox"
                    name="amenity"
                    value={value}
                    defaultChecked={filters.amenities.includes(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
          </details>
          <button type="submit" className={styles.applyButton}>
            Apply filters
          </button>
          <Link href="/buy#homes" className={styles.resetLink}>
            Reset filters
          </Link>
        </form>
        <div className={styles.advice}>
          <h3>A little guidance?</h3>
          <p>
            Tell us what matters to you. We’ll help you put together a
            shortlist.
          </p>
          <Link href="/contact?purpose=buy">
            Talk to our team <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
