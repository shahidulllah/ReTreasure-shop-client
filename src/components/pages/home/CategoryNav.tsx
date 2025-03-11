import { Menu } from "lucide-react";

export const categories = [
  "All Category",
  "Mobiles",
  "Electronics",
  "Vehicles",
  "Property",
  "Home Living",
  "Pets Animals",
  "Mens Fashion",
  "Womens Fashion",
  "Hobbies Sports Kids",
];

export default function CategoryNavbar() {
  return (
    <div className="bg-purple-900 text-white p-3 relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 overflow-x-auto scrollbar-hide">
        <button className="flex items-center space-x-2 font-semibold">
          <Menu className="w-5 h-5" />
          <span>All Category</span>
        </button>
        {categories.slice(1).map((category, index) => (
          <span key={index} className="cursor-pointer hover:text-gray-300">
            {category}
          </span>
        ))}
        <button className="ml-auto bg-white text-blue-900 p-1 rounded-full hover:bg-gray-200">
          <span className="sr-only">Next</span>▶
        </button>
      </div>
    </div>
  );
}
