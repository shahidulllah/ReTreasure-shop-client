"use client"

import { categories } from "@/components/shared/listsOFArray";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryNavbar() {
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/listings?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="hidden lg:flex bg-purple-800 dark:bg-slate-900 text-white py-3">
      <div className="relative lg:max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide">
          <Link href={"/listings"}>
            <button className="flex items-center space-x-2 font-semibold cursor-pointer">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hover:text-gray-300">All Listings</span>
            </button>
          </Link>
          {categories.slice(1).map((category, index) => (
            <span
              onClick={() => handleCategorySelect(category)}
              key={index}
              className="cursor-pointer hover:text-gray-300"
            >
              {category}
            </span>
          ))}
          <button className="ml-auto bg-white text-blue-900 p-1 rounded-full hover:bg-gray-200">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
