import Select from "@/components/ui/Select";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import {
  BEDROOMS,
  RENT_BUDGETS,
  PROPERTY_TYPES,
  rentQueryEntries,
  type RentFilters,
} from "./rental-filters";
import styles from "@/components/buy/Buy.module.css";

export default function RentalSearch({ filters }: { filters: RentFilters }) {
  return (
    <form
      action="/rent#rental-homes"
      method="get"
      className={styles.search}
      aria-label="Find a property to rent"
      data-analytics-search="rent"
      data-analytics-component="rent_search"
    >
      {rentQueryEntries(filters)
        .filter(
          ([name]) =>
            !["q", "type", "budget", "bedrooms", "page"].includes(name),
        )
        .map(([name, value]) => (
          <input type="hidden" name={name} value={value} key={name} />
        ))}
      <div className={styles.searchField}>
        <label htmlFor="rent-query">Locality or project</label>
        <input
          id="rent-query"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Try New Town or a project name"
          maxLength={120}
        />
      </div>
      {(
        [
          ["type", "Property type", "All properties", PROPERTY_TYPES],
          ["budget", "Monthly budget", "Any budget", RENT_BUDGETS],
          ["bedrooms", "Bedrooms", "Any BHK", BEDROOMS],
        ] as const
      ).map(([name, label, empty, options]) => (
        <div className={styles.searchField} key={name}>
          <label htmlFor={`rent-${name}`}>{label}</label>
          <Select
            id={`rent-${name}`}
            name={name}
            defaultValue={filters[name]}
            key={filters[name]}
            variant="inline"
            analytics={{
              component: "rent_search",
              filter: name,
              transactionType: "rent",
            }}
            options={[
              { value: "", label: empty },
              ...options.map(([value, label]) => ({ value, label })),
            ]}
          />
        </div>
      ))}
      <button type="submit" className={styles.searchButton}>
        <MagnifyingGlass size="1.125rem" aria-hidden="true" />
        Find homes
      </button>
    </form>
  );
}
