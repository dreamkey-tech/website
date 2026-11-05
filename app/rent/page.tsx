import type { Metadata } from "next";
import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/page-schema";
import JsonLd from "@/components/seo/JsonLd";
// import Image from "next/image"; // Restore with the intro section below.
import { connection } from "next/server";
import RentalBrowser from "@/components/pages/RentalBrowser";
import RentalSearch from "@/components/pages/RentalSearch";
import RentalFilters from "@/components/pages/RentalFilters";
import RentalCard from "@/components/pages/RentalCard";
import RentalPagination from "@/components/pages/RentalPagination";
import BuyCatalogueError from "@/components/buy/BuyCatalogueError";
import { getRentalCatalogue } from "@/lib/website-properties.server";
import {
  activeRentFilters,
  parseRentFilters,
  rentHref,
  rentQueryEntries,
  type RentSearchParams,
} from "@/components/pages/rental-filters";
import PageCTA from "@/components/pages/PageCTA";
import styles from "@/components/pages/Interior.module.css";
import catalogue from "@/components/buy/Buy.module.css";

type Props = { searchParams: Promise<RentSearchParams> };
async function catalogueFor(searchParams: Promise<RentSearchParams>) {
  const filters = parseRentFilters(await searchParams);
  return getRentalCatalogue(
    new URLSearchParams(rentQueryEntries(filters)).toString(),
  );
}
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const result = await catalogueFor(searchParams);
  const filters = result.filters;
  const noIndex =
    activeRentFilters(filters).length > 0 || filters.sort !== "recommended";
  return pageMetadata("/rent", {
    canonical: noIndex ? "/rent" : rentHref(filters).split("#")[0],
    noIndex,
    title:
      !noIndex && filters.page > 1
        ? `Rent Property in Kolkata — Page ${filters.page} | DreamkeyKol Reality`
        : undefined,
    description:
      !noIndex && filters.page > 1
        ? `Browse page ${filters.page} of Kolkata rental properties with DreamkeyKol Reality. Confirm availability, rental terms and pricing with our local consultants.`
        : undefined,
  });
}

export default async function RentPage({ searchParams }: Props) {
  await connection();
  const result = await catalogueFor(searchParams);
  const filters = result.filters;
  const chips = activeRentFilters(filters);
  const formKey = rentHref(filters);
  const pages =
    result.kind === "ready" ? Math.max(1, result.pagination.totalPages) : 1;
  const shown = result.kind === "ready" ? result.properties : [];
  const start =
    result.kind === "ready"
      ? (result.pagination.page - 1) * result.pagination.limit
      : 0;
  return (
    <div className={styles.page} id="page-content">
      <JsonLd
        id="dreamkey-rent-page"
        data={pageSchema(
          "/rent",
          chips.length === 0 && filters.sort === "recommended"
            ? filters.page
            : 1,
        )}
      />
      <div className={styles.container}>
        <h1 className={styles.srOnly} id="rent-title">
          Flats and homes for rent in Kolkata
        </h1>
        {/* Temporarily hidden intro. To restore: remove the hidden h1 above, uncomment this section and restore the Image import.
        <section aria-labelledby="rent-title">
          <div className={styles.rentIntro}>
            <div>
              <p className={styles.eyebrow}>Rent in Kolkata</p>
              <h1 className={styles.title} id="rent-title">
                A home for the way
                <br />
                you <em>live.</em>
              </h1>
            </div>
            <p className={styles.lead}>
              Closer to work. Room for the family. A neighbourhood that feels
              like you. Let’s find a place that fits your everyday.
            </p>
          </div>
          <div className={styles.rentPhoto}>
            <Image
              src="/images/pages/rent-living.webp"
              alt="Illustrative sunlit apartment with a comfortable living room and Kolkata-inspired skyline"
              fill
              sizes="(max-width: 1400px) 100vw, 1328px"
              loading="eager"
              fetchPriority="high"
            />
            <span className={styles.rentPhotoCaption}>
              Settle into your kind of Kolkata
            </span>
          </div>
        </section>
        */}
        <RentalSearch key={formKey} filters={filters} />
        <section
          id="rental-homes"
          className={catalogue.collection}
          aria-label="Properties to rent"
        >
          <p className={catalogue.catalogNote}>
            Explore properties for rent in Kolkata. Confirm availability, rental
            terms and final pricing with our local consultants.
          </p>
          {chips.length > 0 && (
            <div
              className={catalogue.activeFilters}
              aria-label="Active rental filters"
            >
              {chips.map((chip) => (
                <Link
                  href={chip.href}
                  key={chip.key}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  {chip.label}
                  <X size="0.8125rem" aria-hidden="true" />
                </Link>
              ))}
              <Link
                href="/rent#rental-homes"
                className={catalogue.clearFilters}
              >
                Clear all
              </Link>
            </div>
          )}
          <div className={catalogue.collectionLayout}>
            <RentalFilters key={formKey} filters={filters} />
            <div>
              {result.kind === "error" ? (
                <BuyCatalogueError purpose="rent" />
              ) : (
                <>
                  <RentalBrowser
                    filters={filters}
                    total={result.pagination.total}
                    first={shown.length ? start + 1 : 0}
                    last={start + shown.length}
                  >
                    {shown.length ? (
                      shown.map((property) => (
                        <RentalCard property={property} key={property.id} />
                      ))
                    ) : (
                      <div className={catalogue.emptyState}>
                        <h3>A different starting point?</h3>
                        <p>
                          No rental properties match your filters. Try widening
                          the search, or tell us what you’re looking for.
                        </p>
                        <div>
                          <Link
                            href="/rent#rental-homes"
                            className={styles.secondaryButton}
                          >
                            Clear filters
                          </Link>
                          <Link
                            href="/contact?purpose=rent"
                            className={styles.textLink}
                          >
                            Help me find a home
                          </Link>
                        </div>
                      </div>
                    )}
                  </RentalBrowser>
                  <RentalPagination filters={filters} pages={pages} />
                </>
              )}
            </div>
          </div>
        </section>
        <PageCTA
          title="Still finding your neighbourhood?"
          copy="Share your preferred locality, budget and rental needs. Our local network helps you explore suitable options."
          label="Help me find a home"
          href="/contact?purpose=rent"
        />
      </div>
    </div>
  );
}
