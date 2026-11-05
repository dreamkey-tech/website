"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Rows, SquaresFour } from "@phosphor-icons/react";
import Select from "@/components/ui/Select";
import { trackEvent } from "@/lib/analytics";
import { RENT_SORTS, rentHref, type RentFilters } from "./rental-filters";
import styles from "@/components/buy/Buy.module.css";

export default function RentalBrowser({
  filters,
  total,
  first,
  last,
  children,
}: {
  filters: RentFilters;
  total: number;
  first: number;
  last: number;
  children: ReactNode;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className={styles.results} data-view={view} aria-busy={pending}>
      <div className={styles.resultsHeading}>
        <div>
          <h2>Explore properties for rent</h2>
          <p aria-live="polite">
            {total} {total === 1 ? "property" : "properties"}
            {total > 0 ? ` · Showing ${first}-${last}` : ""}
          </p>
        </div>
        <div className={styles.resultControls}>
          <div className={styles.sort}>
            <label htmlFor="rent-sort">Sort by</label>
            <Select
              id="rent-sort"
              value={filters.sort}
              disabled={pending}
              variant="compact"
              options={RENT_SORTS.map(([value, label]) => ({ value, label }))}
              onChange={(sort) => {
                if (sort !== filters.sort)
                  trackEvent("property_search", {
                    component_name: "rent_sort",
                    transaction_type: "rent",
                    interaction_type: "sort_change",
                    filter_name: "sort",
                    filter_value: sort,
                  });
                startTransition(() =>
                  router.push(rentHref(filters, { sort, page: 1 }), {
                    scroll: false,
                  }),
                );
              }}
            />
          </div>
          <div
            className={styles.viewToggle}
            role="group"
            aria-label="Property layout"
          >
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <SquaresFour size="1.125rem" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <Rows size="1.125rem" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {pending && (
        <p className={styles.srOnly} role="status">
          Updating rental properties…
        </p>
      )}
      <div className={styles.grid}>{children}</div>
    </div>
  );
}
