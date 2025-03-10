import React from "react";
import {
  Smartphone,
  Tv,
  Car,
  Home,
  PawPrint,
  Shirt,
  HeartHandshake,
  Dumbbell,
  Baby,
} from "lucide-react";

const CategoryNav = () => {
  const categories = [
    { name: "Mobiles", icon: <Smartphone className="w-8 h-8" /> },
    { name: "Electronics", icon: <Tv className="w-8 h-8" /> },
    { name: "Vehicles", icon: <Car className="w-8 h-8" /> },
    { name: "Property", icon: <Home className="w-8 h-8" /> },
    { name: "Home Living", icon: <Home className="w-8 h-8" /> },
    { name: "Pets & Animals", icon: <PawPrint className="w-8 h-8" /> },
    { name: "Men's Fashion", icon: <Shirt className="w-8 h-8" /> },
    { name: "Women's Fashion", icon: <HeartHandshake className="w-8 h-8" /> },
    { name: "Hobbies & Sports", icon: <Dumbbell className="w-8 h-8" /> },
    { name: "Kids", icon: <Baby className="w-8 h-8" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-6 bg-gray-50 rounded-lg">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="text-blue-500">{category.icon}</div>
          <span className="mt-2 text-sm font-medium text-gray-700">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
