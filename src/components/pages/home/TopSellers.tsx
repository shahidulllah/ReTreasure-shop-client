"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Seller {
  id: string;
  name: string;
  avatar: string;
  totalSales: number;
  rating: number;
}

const topSellers: Seller[] = [
  {
    id: "1",
    name: "Amina Rahman",
    avatar: "/avatars/user1.jpg",
    totalSales: 52,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Niaz Ahmed",
    avatar: "/avatars/user2.jpg",
    totalSales: 45,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Sadia Hasan",
    avatar: "/avatars/user3.jpg",
    totalSales: 38,
    rating: 4.9,
  },
];

const TopSellers = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Top Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center border border-purple-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition"
            >
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  className="rounded-full object-cover border"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {seller.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {seller.totalSales} items sold
              </p>
              <div className="flex items-center mt-2 text-yellow-500 dark:text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm font-medium">
                  {seller.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
