"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { motion, Variants, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    title: "Student, DU",
    quote:
      "This platform helped me sell my old books and electronics so easily. Loved the experience!",
    image: "https://i.ibb.co.com/7rSY3pn/team4.jpg",
  },
  {
    name: "Mehedi Hasan",
    title: "Freelancer",
    quote:
      "The posting process was smooth, and I got buyers within a few hours. Highly recommended!",
    image: "https://i.ibb.co.com/1TWjy8W/team1.jpg",
  },
  {
    name: "Sharmin Akter",
    title: "Teacher",
    quote:
      "Great user dashboard and wishlist feature. I found exactly what I needed at a great price.",
    image: "https://i.ibb.co.com/7rSY3pn/team4.jpg",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Testimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gray-50 dark:bg-gray-400 py-16 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
          What Our Users Say ?
        </h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md dark:hover:shadow-lg transition text-left cursor-pointer"
            >
              <Quote
                className="text-purple-500 dark:text-purple-300 mb-4"
                size={24}
              />
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center gap-4">
                {testimonial.image && (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover border"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
