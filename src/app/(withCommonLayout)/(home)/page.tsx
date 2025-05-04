import FeaturedListings from "@/components/pages/home/FeaturedListing";
import Hero from "@/components/pages/home/Hero";
import LatestListings from "@/components/pages/home/LatestListing";
import TopCategories from "@/components/pages/home/TopCategory";
import TopSellers from "@/components/pages/home/TopSellers";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopCategories/>
      <FeaturedListings/>
      <LatestListings/>
      <TopSellers/>
    </div>
  );
}
