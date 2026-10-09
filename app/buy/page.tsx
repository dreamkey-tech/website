import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { X, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import BuySearch from "@/components/buy/BuySearch";
import BuyFilters from "@/components/buy/BuyFilters";
import BuyCard from "@/components/buy/BuyCard";
import BuyResults from "@/components/buy/BuyResults";
import BuyPagination from "@/components/buy/BuyPagination";
import {
  BUY_HOMES,
  parseBuyFilters,
  filterBuyHomes,
  activeBuyFilters,
  buyHref,
  type BuySearchParams,
} from "@/components/buy/buy-data";
import PageCTA from "@/components/pages/PageCTA";
import interior from "@/components/pages/Interior.module.css";
import styles from "@/components/buy/Buy.module.css";

export const metadata: Metadata = {
  title: "Buy a home in Kolkata | Dream Key Reality",
  description:
    "Explore homes across Kolkata with Dream Key Reality. Refine your search by neighbourhood, budget, property type, bedrooms, and possession status.",
  icons: { icon: "/images/pages/favicon.png" },
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<BuySearchParams>;
}) {
  await connection();
  const initial = parseBuyFilters(await searchParams);
  const homes = filterBuyHomes(BUY_HOMES, initial);
  const perPage = 6;
  const pages = Math.max(1, Math.ceil(homes.length / perPage));
  const filters = { ...initial, page: Math.min(initial.page, pages) };
  const start = (filters.page - 1) * perPage;
  const shown = homes.slice(start, start + perPage);
  const chips = activeBuyFilters(filters);
  const formKey = buyHref(filters);
  return (
    <div className={interior.page} id="page-content">
      <div className={interior.container}>
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
        <BuySearch key={formKey} filters={filters} />
        <section
          id="homes"
          className={styles.collection}
          aria-label="Homes to buy"
        >
          <p className={styles.catalogNote}>
            An illustrative collection. Our team can confirm current
            availability, pricing, and property photographs.
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
                  <X size={13} aria-hidden="true" />
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
              <BuyResults
                filters={filters}
                total={homes.length}
                first={shown.length ? start + 1 : 0}
                last={start + shown.length}
              >
                {shown.length ? (
                  shown.map((home) => <BuyCard key={home.id} home={home} />)
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
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                )}
              </BuyResults>
              <BuyPagination filters={filters} pages={pages} />
            </div>
          </div>
        </section>
        <PageCTA
          title="The right home starts with a conversation."
          copy="Share your priorities with our Kolkata team. We’ll help you work through the possibilities."
          label="Let’s find your home"
          href="/contact?purpose=buy"
        />
      </div>
    </div>
  );
}
