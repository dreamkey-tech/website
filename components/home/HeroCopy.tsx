import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

export default function HeroCopy() {
  return (
    <div className="home-hero__copy">
      <h1 id="hero-heading" className="home-hero__title">
        <span>Homes That Match</span>{" "}
        <em>Your Pace,</em>{" "}
        <span className="home-hero__title-ending">Not Just Your Budget.</span>
      </h1>
      <p className="home-hero__description">
        Find your place in Kolkata. Thoughtfully chosen homes,
        in neighbourhoods that feel like you.
      </p>
      <Link href="/contact" className="home-hero__consultation">
        Let’s find your home <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
    </div>
  );
}
