import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import {
  BEDROOMS,
  BUDGETS,
  PROPERTY_TYPES,
  buyQueryEntries,
  type BuyFilters,
} from "./buy-data";
import styles from "./Buy.module.css";

export default function BuySearch({ filters }: { filters: BuyFilters }) {
  const visible = ["q", "type", "budget", "bedrooms", "page"];
  return (
    <form
      action="/buy#homes"
      method="get"
      className={styles.search}
      aria-label="Find a property to buy"
    >
      {buyQueryEntries(filters)
        .filter(([name]) => !visible.includes(name))
        .map(([name, value], index) => (
          <input key={index} type="hidden" name={name} value={value} />
        ))}
      <div className={styles.searchField}>
        <label htmlFor="buy-query">Locality or project</label>
        <input
          id="buy-query"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Try New Town or a project name"
          maxLength={120}
        />
      </div>
      {(
        [
          ["type", "Property type", "All homes", PROPERTY_TYPES],
          ["budget", "Budget", "Any budget", BUDGETS],
          ["bedrooms", "Bedrooms", "Any BHK", BEDROOMS],
        ] as const
      ).map(([name, label, empty, options]) => (
        <div className={styles.searchField} key={name}>
          <label htmlFor={`buy-${name}`}>{label}</label>
          <select id={`buy-${name}`} name={name} defaultValue={filters[name]}>
            <option value="">{empty}</option>
            {options.map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button className={styles.searchButton} type="submit">
        <MagnifyingGlass size={18} aria-hidden="true" />
        Find homes
      </button>
    </form>
  );
}
