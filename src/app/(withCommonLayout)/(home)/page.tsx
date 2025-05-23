import FeaturedListings from "@/components/pages/home/FeaturedListing";
import Hero from "@/components/pages/home/Hero";
import HowItWorks from "@/components/pages/home/HowItWork";
import LatestListings from "@/components/pages/home/LatestListing";
import Testimonials from "@/components/pages/home/Testimonials";
import TopCategories from "@/components/pages/home/TopCategory";
import TopSellers from "@/components/pages/home/TopSellers";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopCategories />
      <FeaturedListings />
      <LatestListings />
      <TopSellers />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
