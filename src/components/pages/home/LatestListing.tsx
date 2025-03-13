"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/shared/ListingCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchListings } from "@/services/listingService";
import Link from "next/link";

const LatestListings = () => {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  if (loading) {
    <p className="text-center mt-12">loading..</p>;
  }

  // Sort latest listings
  const sortedListings = [...listings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="px-4 rounded-lg lg:max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Listings</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedListings.slice(0, 8).map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href={"/listings"}>
          <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
            Browse All Listings..
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestListings;
