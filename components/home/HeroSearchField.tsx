import type { ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";

export interface SearchOption { value: string; label: string }

interface HeroSearchFieldProps {
  name: string;
  label: string;
  icon: ReactNode;
  options: readonly SearchOption[];
}

/** Native selects work with keyboard, touch, and before hydration. */
export default function HeroSearchField({ name, label, icon, options }: HeroSearchFieldProps) {
  return (
    <label className="hero-search__field">
      <span className="hero-search__icon" aria-hidden="true">{icon}</span>
      <span className="hero-search__field-content">
        <span className="hero-search__label">{label}</span>
        <span className="hero-search__select-wrap">
          <select name={name} defaultValue={options[0].value}>
            {options.map(({ value, label: optionLabel }) => <option value={value} key={value}>{optionLabel}</option>)}
          </select>
          <CaretDown size={12} aria-hidden="true" />
        </span>
      </span>
    </label>
  );
}
