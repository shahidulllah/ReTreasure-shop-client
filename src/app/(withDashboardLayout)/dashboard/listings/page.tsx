"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchListings } from "@/services/listingService";

export default function ManageListingsPage() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  if (loading) {
    <p className="text-black dark:text-white text-center">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <Card key={listing._id}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={listing.image}
                alt={listing.title}
                width={200}
                height={150}
                className="rounded-lg"
              />
              <p>{listing.description}</p>
              <p className="text-sm text-gray-500">Price: ${listing.price}</p>
              <p className="text-sm text-gray-500">
                Category: {listing.category}
              </p>
              <p className="text-sm text-gray-500">
                Condition: {listing.condition}
              </p>
              <div className="flex justify-between mt-3">
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
