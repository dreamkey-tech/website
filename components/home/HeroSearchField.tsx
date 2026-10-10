import type { ReactNode } from "react";
import Select from "@/components/ui/Select";

export interface SearchOption {
  value: string;
  label: string;
}

interface HeroSearchFieldProps {
  name: string;
  label: string;
  icon: ReactNode;
  options: readonly SearchOption[];
}

/** Shared themed controls retain native GET form fallbacks. */
export default function HeroSearchField({
  name,
  label,
  icon,
  options,
}: HeroSearchFieldProps) {
  return (
    <div className="hero-search__field">
      <span className="hero-search__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="hero-search__field-content">
        <span className="hero-search__label">{label}</span>
        <Select
          name={name}
          options={options}
          defaultValue={options[0].value}
          variant="inline"
          ariaLabel={label}
        />
      </div>
    </div>
  );
}
