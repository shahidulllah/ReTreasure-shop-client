import { categories } from "@/components/shared/listsOFArray";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

export default function CategoryNavbar() {
  return (
    <div className="hidden lg:flex bg-purple-800 dark:bg-slate-900 text-white py-3">
      <div className="relative lg:max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide">
          <button className="flex items-center space-x-2 font-semibold">
            <SlidersHorizontal className="w-5 h-5" />
            <span>All Category</span>
          </button>
          {categories.slice(1).map((category, index) => (
            <span key={index} className="cursor-pointer hover:text-gray-300">
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
