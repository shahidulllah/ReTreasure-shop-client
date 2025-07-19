"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/shared/ListingCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchListings } from "@/services/listingService";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const LatestListings = () => {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  if (loading) {
    return (
      <p className="text-center mt-12 text-lg dark:text-white">Loading...</p>
    );
  }

  const sortedListings = [...listings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="px-4 lg:max-w-7xl mx-auto my-20"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold text-black dark:text-white mb-6 text-center"
        variants={headingVariants}
      >
        Latest Listings
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {sortedListings.slice(0, 8).map((listing) => (
          <motion.div
            key={listing._id}
            variants={cardVariants}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 hover:shadow-lg cursor-pointer transition-shadow duration-300"
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center mt-10">
        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="inline-block"
        >
          <Link href={"/listings"}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 font-semibold rounded-md">
              Browse All Listings..
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LatestListings;
