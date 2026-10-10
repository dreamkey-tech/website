"use client";

import { useState, type FormEvent } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  RENTAL_HOMES,
  EMPTY_RENTAL_FILTERS,
  filterRentalHomes,
  type RentalFilters,
} from "./rental-data";
import Select from "@/components/ui/Select";
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
          <Select
            id="rent-location"
            value={draft.location}
            onChange={(value) => update("location", value)}
            variant="inline"
            options={[
              { value: "", label: "All Kolkata locations" },
              { value: "New Town", label: "New Town" },
              { value: "Salt Lake", label: "Salt Lake" },
              { value: "EM Bypass", label: "EM Bypass" },
            ]}
          />
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-budget">Monthly budget</label>
          <Select
            id="rent-budget"
            value={draft.budget}
            onChange={(value) => update("budget", value)}
            variant="inline"
            options={[
              { value: "", label: "Any budget" },
              { value: "30000", label: "Up to ₹30,000" },
              { value: "50000", label: "Up to ₹50,000" },
              { value: "75000", label: "Up to ₹75,000" },
              { value: "100000", label: "Up to ₹1,00,000" },
            ]}
          />
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-bedrooms">Bedrooms</label>
          <Select
            id="rent-bedrooms"
            value={draft.bedrooms}
            onChange={(value) => update("bedrooms", value)}
            variant="inline"
            options={[
              { value: "", label: "Any size" },
              { value: "2", label: "2 bedrooms" },
              { value: "3", label: "3 bedrooms" },
              { value: "4", label: "4 bedrooms" },
            ]}
          />
        </div>
        <div className={styles.filter}>
          <label htmlFor="rent-furnishing">Furnishing</label>
          <Select
            id="rent-furnishing"
            value={draft.furnishing}
            onChange={(value) => update("furnishing", value)}
            variant="inline"
            options={[
              { value: "", label: "Any furnishing" },
              { value: "Furnished", label: "Furnished" },
              { value: "Semi-furnished", label: "Semi-furnished" },
              { value: "Unfurnished", label: "Unfurnished" },
            ]}
          />
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
          <Select
            className={styles.sortSelect}
            id="rent-sort"
            value={sort}
            onChange={setSort}
            variant="compact"
            options={[
              { value: "recommended", label: "Recommended" },
              { value: "price-low", label: "Rent: low to high" },
              { value: "price-high", label: "Rent: high to low" },
            ]}
          />
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
