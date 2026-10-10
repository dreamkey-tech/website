import HeroCopy from "./HeroCopy";
import HeroPropertySearch from "./HeroPropertySearch";
import HeroSlideshow from "./HeroSlideshow";

export default function HeroSection() {
  return (
    <section
      className="home-hero-frame"
      id="home-content"
      aria-labelledby="hero-heading"
    >
      <HeroSlideshow>
        <div className="home-hero__scrim" aria-hidden="true" />
        <HeroCopy />
        <div className="home-hero__search">
          <HeroPropertySearch />
        </div>
      </HeroSlideshow>
    </section>
  );
}
