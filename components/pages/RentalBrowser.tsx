"use client";

import { useState, type FormEvent } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  RENTAL_HOMES,
  EMPTY_RENTAL_FILTERS,
  filterRentalHomes,
  type RentalFilters,
} from "./rental-data";
import RentalCard from "./RentalCard";
import styles from "./Interior.module.css";

export default function RentalBrowser() {
  const [draft, setDraft] = useState<RentalFilters>(EMPTY_RENTAL_FILTERS);
  const [filters, setFilters] = useState<RentalFilters>(EMPTY_RENTAL_FILTERS);
  const [sort, setSort] = useState("recommended");
  const homes = filterRentalHomes(RENTAL_HOMES, filters, sort);
  const update = (name: keyof RentalFilters, value: string) =>
    setDraft({ ...draft, [name]: value });
  const reset = () => {
    setDraft(EMPTY_RENTAL_FILTERS);
    setFilters(EMPTY_RENTAL_FILTERS);
    setSort("recommended");
  };
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ ...draft });
  };
  return (
    <div className={styles.rentalBrowser}>
      <form
        className={styles.rentalFilters}
        onSubmit={search}
        aria-label="Filter rental collection"
      >
        <div className={styles.filter}>
          <label htmlFor="rent-location">Neighbourhood</label>
          <select
            id="rent-location"
            value={draft.location}
            onChange={(event) => update("location", event.target.value)}
          >
            <option value="">All Kolkata locations</option>
            <option>New Town</option>
            <option>Salt Lake</option>
            <option>EM Bypass</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-budget">Monthly budget</label>
          <select
            id="rent-budget"
            value={draft.budget}
            onChange={(event) => update("budget", event.target.value)}
          >
            <option value="">Any budget</option>
            <option value="30000">Up to ₹30,000</option>
            <option value="50000">Up to ₹50,000</option>
            <option value="75000">Up to ₹75,000</option>
            <option value="100000">Up to ₹1,00,000</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-bedrooms">Bedrooms</label>
          <select
            id="rent-bedrooms"
            value={draft.bedrooms}
            onChange={(event) => update("bedrooms", event.target.value)}
          >
            <option value="">Any size</option>
            <option value="2">2 bedrooms</option>
            <option value="3">3 bedrooms</option>
            <option value="4">4 bedrooms</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-furnishing">Furnishing</label>
          <select
            id="rent-furnishing"
            value={draft.furnishing}
            onChange={(event) => update("furnishing", event.target.value)}
          >
            <option value="">Any furnishing</option>
            <option>Furnished</option>
            <option>Semi-furnished</option>
            <option>Unfurnished</option>
          </select>
        </div>
        <button className={styles.primaryButton} type="submit">
          <MagnifyingGlass size={17} aria-hidden="true" />
          Find homes
        </button>
      </form>
      <div className={styles.collectionHeader}>
        <div>
          <p className={styles.eyebrow}>The rental edit</p>
          <h2 className={styles.sectionTitle}>
            Find your kind of <em>everyday.</em>
          </h2>
          <p>
            Illustrative homes, rents, and imagery for this preview. Contact our
            team for current listings, availability, and property photographs.
          </p>
        </div>
        <div className={styles.sortControls}>
          <label htmlFor="rent-sort">Sort by</label>
          <select
            id="rent-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Rent: low to high</option>
            <option value="price-high">Rent: high to low</option>
          </select>
          <button className={styles.resetButton} onClick={reset} type="button">
            Reset filters
          </button>
        </div>
      </div>
      <p className={styles.resultsCount} aria-live="polite">
        {homes.length} {homes.length === 1 ? "home" : "homes"} in the sample
        collection
      </p>
      {homes.length ? (
        <div className={styles.rentalGrid}>
          {homes.map((home) => (
            <RentalCard home={home} key={home.id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>A different starting point?</h3>
          <p>
            No sample homes match these filters. Try a broader search, or share
            your requirements with our team.
          </p>
          <button
            className={styles.secondaryButton}
            onClick={reset}
            type="button"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
