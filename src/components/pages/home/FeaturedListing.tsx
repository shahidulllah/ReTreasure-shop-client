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

export default function FeaturedListings() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  if (loading) {
    <p className="text-center mt-12">loading..</p>;
  }

  // Sort featured listings based on lower price
  const sortedListings = [...listings].sort((a, b) => a.price - b.price);

  return (
    <div className="lg:max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-3xl text-black dark:text-white font-bold mb-6 text-center">
        Featured Listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {sortedListings.slice(0, 3).map((listing) => (
          <div
            onClick={() => router.push(`/listings/${listing._id}`)}
            key={listing._id}
            className="rounded-lg shadow-lg overflow-hidden border cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={listing.image}
                alt={listing.title}
                layout="fill"
                priority
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <p className="text-red-600 font-bold text-lg">
                {listing.price} <span className="font-extrabold">৳</span>
              </p>
              <h3 className="font-semibold truncate">{listing.title}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
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
          </div>
        ))}
      </div>
    </div>
  );
}
