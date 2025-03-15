"use client";

import { useEffect } from "react";
import { fetchListingDetails } from "@/services/listingService";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Layers, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";

const ListingDetails = () => {
  const params = useParams();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const dispatch = useAppDispatch();
  const { listingDetails, loading, error } = useAppSelector(
    (state: RootState) => state.listings
  );

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id && token) {
      dispatch(fetchListingDetails({ id, token }));
    }
  }, [dispatch, id, token]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {listingDetails ? (
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="w-full h-96 relative">
            <Image
              src={listingDetails.image}
              alt={listingDetails.title}
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold mt-4">{listingDetails.title}</h1>
          <p className="text-gray-600 mt-2">{listingDetails.description}</p>
          <p className="text-lg font-semibold text-red-600 mt-2">
            {listingDetails.price} <span className="font-extrabold">৳</span>
          </p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <MapPin size={16} className="mr-1" />
            <span>{listingDetails.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Layers size={16} className="mr-1" />
            <span>{listingDetails.category}</span>
          </div>
        </div>
      ) : (
        <p>No listing found</p>
      )}
    </div>
  );
};

export default ListingDetails;
