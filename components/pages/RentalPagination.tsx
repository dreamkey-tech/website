import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { rentHref, type RentFilters } from "./rental-filters";
import styles from "@/components/buy/Buy.module.css";

export default function RentalPagination({
  filters,
  pages,
}: {
  filters: RentFilters;
  pages: number;
}) {
  if (pages < 2) return null;
  return (
    <nav className={styles.pagination} aria-label="Rental property pages">
      {filters.page > 1 ? (
        <Link href={rentHref(filters, { page: filters.page - 1 })}>
          <ArrowLeft size="1rem" aria-hidden="true" />
          <span>Previous</span>
        </Link>
      ) : (
        <span aria-disabled="true">
          <ArrowLeft size="1rem" aria-hidden="true" />
          <span>Previous</span>
        </span>
      )}
      <div>
        {Array.from(
          new Set([1, filters.page - 1, filters.page, filters.page + 1, pages]),
        )
          .filter((page) => page >= 1 && page <= pages)
          .sort((a, b) => a - b)
          .map((page) => (
            <Link
              href={rentHref(filters, { page })}
              key={page}
              aria-current={filters.page === page ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          ))}
      </div>
      {filters.page < pages ? (
        <Link href={rentHref(filters, { page: filters.page + 1 })}>
          <span>Next</span>
          <ArrowRight size="1rem" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true">
          <span>Next</span>
          <ArrowRight size="1rem" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
