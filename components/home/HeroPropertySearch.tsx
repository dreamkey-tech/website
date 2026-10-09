import { Bed, Buildings, CurrencyInr, MagnifyingGlass, MapPin } from "@phosphor-icons/react/ssr";
import HeroSearchField from "./HeroSearchField";

export default function HeroPropertySearch() {
  return (
    <form action="/buy" method="get" className="hero-search" aria-label="Find a home">
      <HeroSearchField name="location" label="Location" icon={<MapPin size={21} />} options={[
        { value: "", label: "Kolkata, West Bengal" },
        { value: "new-town", label: "New Town" },
        { value: "salt-lake", label: "Salt Lake" },
        { value: "ballygunge", label: "Ballygunge" },
        { value: "em-bypass", label: "EM Bypass" },
        { value: "rajarhat", label: "Rajarhat" },
        { value: "central-kolkata", label: "Central Kolkata" },
      ]} />
      <HeroSearchField name="budget" label="Budget" icon={<CurrencyInr size={21} />} options={[
        { value: "", label: "Any budget" },
        { value: "35l-75l", label: "₹35L - ₹75L" },
        { value: "75l-1.5cr", label: "₹75L - ₹1.5 Cr" },
        { value: "1.5cr-3cr", label: "₹1.5 Cr - ₹3 Cr" },
        { value: "3cr+", label: "₹3 Cr & above" },
      ]} />
      <HeroSearchField name="bedrooms" label="Bedrooms" icon={<Bed size={21} />} options={[
        { value: "", label: "Any BHK" },
        { value: "1bhk", label: "1 BHK" },
        { value: "2bhk", label: "2 BHK" },
        { value: "3bhk", label: "3 BHK" },
        { value: "4bhk", label: "4+ BHK" },
      ]} />
      <HeroSearchField name="type" label="Property type" icon={<Buildings size={21} />} options={[
        { value: "", label: "All homes" },
        { value: "apartment", label: "Apartment" },
        { value: "penthouse", label: "Penthouse" },
        { value: "villa", label: "Villa" },
        { value: "studio", label: "Studio" },
      ]} />
      <button type="submit" className="hero-search__submit"><MagnifyingGlass size={19} aria-hidden="true" /><span>Search</span></button>
    </form>
  );
}
