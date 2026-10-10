"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SquaresFour, Rows } from "@phosphor-icons/react";
import { SORTS, buyHref, type BuyFilters } from "./buy-data";
import Select from "@/components/ui/Select";
import styles from "./Buy.module.css";

export default function BuyResults({
  filters,
  total,
  first,
  last,
  children,
}: {
  filters: BuyFilters;
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
          <h2>Explore the collection</h2>
          <p aria-live="polite">
            {total} {total === 1 ? "home" : "homes"}
            {total > 0 ? ` · Showing ${first}-${last}` : ""}
          </p>
        </div>
        <div className={styles.resultControls}>
          <div className={styles.sort}>
            <label htmlFor="buy-sort">Sort by</label>
            <Select
              id="buy-sort"
              value={filters.sort}
              disabled={pending}
              variant="compact"
              options={SORTS.map(([value, label]) => ({ value, label }))}
              onChange={(sort) => {
                startTransition(() =>
                  router.push(buyHref(filters, { sort, page: 1 }), {
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
              <SquaresFour size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <Rows size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {pending && (
        <p className={styles.srOnly} role="status">
          Updating properties…
        </p>
      )}
      <div className={styles.grid}>{children}</div>
    </div>
  );
}
