import Image from "next/image";
import HeroCopy from "./HeroCopy";
import HeroPropertySearch from "./HeroPropertySearch";

export default function HeroSection() {
  return (
    <section className="home-hero-frame" id="home-content" aria-labelledby="hero-heading">
      <div className="home-hero">
        <Image
          src="/images/kolkata-urbana-inspired-hero.webp"
          alt="Generated illustration of Urbana-inspired residential high-rise towers above the Kolkata skyline."
          fill
          sizes="(max-width: 767px) calc(100vw - 24px), (min-width: 1600px) 1568px, calc(100vw - 32px)"
          loading="eager"
          fetchPriority="high"
          className="home-hero__image"
        />
        <div className="home-hero__scrim" aria-hidden="true" />
        <HeroCopy />
        <div className="home-hero__search"><HeroPropertySearch /></div>
      </div>
    </section>
  );
}
