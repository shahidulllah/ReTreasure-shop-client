"use client";

import Image from "next/image";
import { MapPin, Layers, ArrowUp } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchListings } from "@/services/listingService";
import { getTimeAgo } from "@/utils/getTime";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FeaturedListings() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );
  const router = useRouter();

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  const sortedListings = [...listings].sort((a, b) => a.price - b.price);

  return (
    <div className="lg:max-w-7xl mx-auto my-10 px-4" ref={ref}>
      <motion.h2
        className="text-3xl text-black dark:text-white font-bold mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Featured Listings
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {sortedListings.slice(0, 3).map((listing, index) => (
          <motion.div
            key={listing._id}
            onClick={() => router.push(`/listings/${listing._id}`)}
            className="rounded-lg shadow-lg overflow-hidden border cursor-pointer dark:border-gray-700"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="relative w-full h-48">
              <Image
                src={listing.image}
                alt={listing.title}
                layout="fill"
                className="object-cover"
                priority
              />
            </div>

            <CardContent className="p-4 space-y-2">
              <p className="text-red-600 font-bold text-lg">
                {listing.price} <span className="font-extrabold">৳</span>
              </p>
              <h3 className="font-semibold truncate text-black dark:text-white">
                {listing.title}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Layers className="w-4 h-4 mr-1" />
                {listing.category}
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500 mt-2">
                  {getTimeAgo(listing.createdAt)}
                </p>
                <div className="flex items-center text-purple-700 text-xs font-bold mt-2">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  FEATURED
                </div>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
