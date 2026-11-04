import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { pageSchema } from "@/lib/page-schema";
import JsonLd from "@/components/seo/JsonLd";
// import Image from "next/image"; // Restore with the intro section below.
import Link from "next/link";
import { connection } from "next/server";
import { X, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import BuySearch from "@/components/buy/BuySearch";
import BuyFilters from "@/components/buy/BuyFilters";
import BuyCard from "@/components/buy/BuyCard";
import BuyResults from "@/components/buy/BuyResults";
import BuyPagination from "@/components/buy/BuyPagination";
import BuyCatalogueError from "@/components/buy/BuyCatalogueError";
import { getSaleCatalogue } from "@/lib/website-properties.server";
import {
  parseBuyFilters,
  activeBuyFilters,
  buyHref,
  buyQueryEntries,
  type BuySearchParams,
} from "@/components/buy/website-filters";
import PageCTA from "@/components/pages/PageCTA";
import interior from "@/components/pages/Interior.module.css";
import styles from "@/components/buy/Buy.module.css";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BuySearchParams>;
}): Promise<Metadata> {
  const initial = parseBuyFilters(await searchParams);
  const catalog = await getSaleCatalogue(
    new URLSearchParams(buyQueryEntries(initial)).toString(),
  );
  const filters = catalog.filters;
  const noIndex =
    activeBuyFilters(filters).length > 0 || filters.sort !== "recommended";

  return pageMetadata("/buy", {
    // Search text is visitor input; never repeat it in public metadata or share URLs.
    canonical: noIndex ? "/buy" : buyHref(filters).split("#")[0],
    noIndex,
    title:
      !noIndex && filters.page > 1
        ? `Buy Flats in Kolkata — Page ${filters.page} | DreamkeyKol Reality`
        : undefined,
    description:
      !noIndex && filters.page > 1
        ? `Browse page ${filters.page} of Kolkata properties for sale with DreamkeyKol Reality. Discuss your preferred area, budget, availability and buying requirements with our team.`
        : undefined,
  });
}

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<BuySearchParams>;
}) {
  await connection();
  const initial = parseBuyFilters(await searchParams);
  const catalog = await getSaleCatalogue(
    new URLSearchParams(buyQueryEntries(initial)).toString(),
  );
  const filters = catalog.filters;
  const pages =
    catalog.kind === "ready" ? Math.max(1, catalog.pagination.totalPages) : 1;
  const start =
    catalog.kind === "ready"
      ? (catalog.pagination.page - 1) * catalog.pagination.limit
      : 0;
  const shown = catalog.kind === "ready" ? catalog.properties : [];
  const chips = activeBuyFilters(filters);
  const formKey = buyHref(filters);
  return (
    <div className={interior.page} id="page-content">
      <JsonLd
        id="dreamkey-buy-page"
        data={pageSchema(
          "/buy",
          chips.length === 0 && filters.sort === "recommended"
            ? filters.page
            : 1,
        )}
      />
      <div className={interior.container}>
        <h1 className={interior.srOnly} id="buy-title">
          Flats and properties for sale in Kolkata
        </h1>
        {/* Temporarily hidden intro. To restore: remove the hidden h1 above, uncomment this section and restore the Image import.
        <section className={styles.intro} aria-labelledby="buy-title">
          <div>
            <p className={interior.eyebrow}>Buy in Kolkata</p>
            <h1 id="buy-title" className={styles.title}>
              Your next chapter,
              <br />
              <em>at home.</em>
            </h1>
            <p className={styles.lead}>
              Explore homes across Kolkata. Start with the neighbourhood,
              budget, and space that fit your plans.
            </p>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src="/images/pages/sell-residence.webp"
              alt="Illustrative sunlit Kolkata-inspired apartment with generous living space and skyline views"
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1440px) 46vw, 600px"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>
        */}
        <BuySearch key={formKey} filters={filters} />
        <section
          id="homes"
          className={styles.collection}
          aria-label="Homes to buy"
        >
          <p className={styles.catalogNote}>
            Explore properties for sale in Kolkata. Confirm availability and
            final pricing with our local consultants.
          </p>
          {chips.length > 0 && (
            <div
              className={styles.activeFilters}
              aria-label="Active search filters"
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
              <Link href="/buy#homes" className={styles.clearFilters}>
                Clear all
              </Link>
            </div>
          )}
          <div className={styles.collectionLayout}>
            <BuyFilters key={formKey} filters={filters} />
            <div>
              {catalog.kind === "error" ? (
                <BuyCatalogueError />
              ) : (
                <BuyResults
                  filters={filters}
                  total={catalog.pagination.total}
                  first={shown.length ? start + 1 : 0}
                  last={start + shown.length}
                >
                  {shown.length ? (
                    shown.map((property) => (
                      <BuyCard key={property.id} property={property} />
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <h3>A different starting point?</h3>
                      <p>
                        No homes in this collection match your filters. Try
                        widening the search, or tell us what you’re looking for.
                      </p>
                      <div>
                        <Link
                          className={interior.secondaryButton}
                          href="/buy#homes"
                        >
                          Clear filters
                        </Link>
                        <Link
                          className={interior.textLink}
                          href="/contact?purpose=buy"
                        >
                          Help me find a home
                          <ArrowUpRight size="1.0625rem" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  )}
                </BuyResults>
              )}
              <BuyPagination filters={filters} pages={pages} />
            </div>
          </div>
        </section>
        <PageCTA
          title="The right home starts with a conversation."
          copy="Share your location, budget and requirements. Our local broker and consultant network helps you explore options."
          label="Let’s find your home"
          href="/contact?purpose=buy"
        />
      </div>
    </div>
  );
}
