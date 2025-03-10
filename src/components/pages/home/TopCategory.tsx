import React from "react";
import {
  Tv,
  Car,
  Settings,
  Home,
  Smartphone,
  Briefcase,
  Sofa,
  BookOpen,
  Shirt,
  HeartPulse,
  Dumbbell,
  ShoppingCart,
} from "lucide-react";

const TopCategories = () => {
  const categories = [
    { name: "Electronics", icon: <Tv className="w-12 h-12" /> },
    { name: "Vehicles", icon: <Car className="w-12 h-12" /> },
    { name: "Services", icon: <Settings className="w-12 h-12" /> },
    { name: "Property", icon: <Home className="w-12 h-12" /> },
    { name: "Mobiles", icon: <Smartphone className="w-12 h-12" /> },
    { name: "Business Industry", icon: <Briefcase className="w-12 h-12" /> },
    { name: "Home Living", icon: <Sofa className="w-12 h-12" /> },
    { name: "Education", icon: <BookOpen className="w-12 h-12" /> },
    { name: "Men's Fashion", icon: <Shirt className="w-12 h-12" /> },
    { name: "Healthcare", icon: <HeartPulse className="w-12 h-12" /> },
    { name: "Hobbies Sports Kids", icon: <Dumbbell className="w-12 h-12" /> },
    { name: "Essentials", icon: <ShoppingCart className="w-12 h-12" /> },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-green-500">{category.icon}</div>
            <span className="mt-2 text-sm font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
