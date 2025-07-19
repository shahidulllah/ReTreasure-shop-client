"use client";

import {
  ClipboardList,
  UploadCloud,
  ShoppingCart,
  UserCheck,
} from "lucide-react";
import { motion, Variants, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

const steps = [
  {
    icon: UploadCloud,
    title: "1. Post Your Item",
    description:
      "List your used item with images, description, category, and price.",
  },
  {
    icon: ClipboardList,
    title: "2. Get Noticed",
    description:
      "Your listing becomes visible to thousands of potential buyers.",
  },
  {
    icon: ShoppingCart,
    title: "3. Sell & Deliver",
    description:
      "Communicate with buyers, finalize the deal, and deliver the item.",
  },
  {
    icon: UserCheck,
    title: "4. Track History",
    description: "View your sales and purchases in the dashboard anytime.",
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

const HowItWorks = () => {
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
      className="py-16 bg-white dark:bg-gray-950 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold text-black dark:text-white mb-10"
          variants={headingVariants}
        >
          How It Works ?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md dark:hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                <step.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
