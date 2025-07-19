"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion, Variants, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

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
    avatar: "https://i.ibb.co.com/1TWjy8W/team1.jpg",
    totalSales: 52,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Niaz Ahmed",
    avatar: "https://i.ibb.co.com/7rSY3pn/team4.jpg",
    totalSales: 45,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Sadia Hasan",
    avatar: "https://i.ibb.co.com/1TWjy8W/team1.jpg",
    totalSales: 38,
    rating: 4.9,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const TopSellers = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="py-12 bg-gray-100 dark:bg-gray-700 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl text-black dark:text-white font-bold mb-8 text-center"
          variants={headingVariants}
        >
          Top Sellers
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {topSellers.map((seller) => (
            <motion.div
              key={seller.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center border border-purple-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg cursor-pointer transition"
            >
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  className="rounded-full object-cover border-2"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TopSellers;
