import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { buyHref, type BuyFilters } from "./buy-data";
import styles from "./Buy.module.css";

export default function BuyPagination({
  filters,
  pages,
}: {
  filters: BuyFilters;
  pages: number;
}) {
  if (pages < 2) return null;
  return (
    <nav className={styles.pagination} aria-label="Property pages">
      {filters.page > 1 ? (
        <Link href={buyHref(filters, { page: filters.page - 1 })}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Previous</span>
        </Link>
      ) : (
        <span aria-disabled="true">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Previous</span>
        </span>
      )}
      <div>
        {Array.from({ length: pages }, (_, index) => index + 1).map((page) => (
          <Link
            key={page}
            href={buyHref(filters, { page })}
            aria-current={page === filters.page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </Link>
        ))}
      </div>
      {filters.page < pages ? (
        <Link href={buyHref(filters, { page: filters.page + 1 })}>
          <span>Next</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true">
          <span>Next</span>
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
