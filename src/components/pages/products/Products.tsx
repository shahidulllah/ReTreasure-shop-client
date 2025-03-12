"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { fetchListings } from "@/redux/features/listingSlice";
import CreateListingForm from "@/components/pages/dashboard/CreateListingForm";
import ListingCard from "@/components/shared/ListingCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { listings } = useAppSelector((state: RootState) => state.listings);

  useEffect(() => {
    dispatch(fetchListings({}) as any);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Listings</h1>
      <CreateListingForm />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {listings.map((item: any) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
