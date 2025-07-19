"use client";

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
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TopCategories = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const handleCategorySelect = (category: string) => {
    router.push(`/listings?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 rounded-lg my-10">
      <div className="py-10 lg:max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6 text-center">
          Top Category
        </h1>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategorySelect(category.name)}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer"
            >
              <div className="text-purple-700">{category.icon}</div>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {category.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopCategories;
