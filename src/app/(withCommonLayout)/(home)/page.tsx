import Hero from "@/components/pages/home/Hero";
import TopCategories from "@/components/pages/home/TopCategory";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="lg:max-w-7xl mx-auto px-4">
        <TopCategories />
      </div>
    </div>
  );
}
