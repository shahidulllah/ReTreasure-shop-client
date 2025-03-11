import FeaturedListings from "@/components/pages/home/FeaturedListing";
import Hero from "@/components/pages/home/Hero";
import LatestListings from "@/components/pages/home/LatestListing";
import TopCategories from "@/components/pages/home/TopCategory";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopCategories/>
      <FeaturedListings/>
      <LatestListings/>
    </div>
  );
}
