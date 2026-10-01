import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import ValueProposition from "@/components/home/ValueProposition";
import Developers from "@/components/home/Developers";
import EnquirySection from "@/components/home/EnquirySection";
import Locations from "@/components/home/Locations";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedListings />
      <ValueProposition />
      <Developers />
      <EnquirySection />
      <Locations />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
