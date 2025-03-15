"use client";

import { useEffect, useState } from "react";
import { fetchListingDetails } from "@/services/listingService";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Layers, MapPin, Mail, MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { fetchSellerDetails } from "@/services/userService";
import { IUser } from "@/types";

const ListingDetails = () => {
  const params = useParams();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const dispatch = useAppDispatch();
  const { listingDetails, loading, error } = useAppSelector(
    (state: RootState) => state.listings
  );
  const [seller, setSeller] = useState<IUser | null>(null);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Fetch listing details
  useEffect(() => {
    if (id && token) {
      dispatch(fetchListingDetails({ id, token })).then((action) => {
        if (action.payload?.sellerId) {
          // Fetch seller details using sellerId
          fetchSellerDetails(action.payload.sellerId, token).then(
            (sellerData) => {
              setSeller(sellerData);
            }
          );
        }
      });
    }
  }, [dispatch, id, token]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {listingDetails ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Listing Details */}
          <div className="border border-gray-300 rounded-lg p-6">
            {/* Listing Image */}
            <div className="w-full h-96 relative">
              <Image
                src={listingDetails.image}
                alt={listingDetails.title}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>

            {/* Listing Title and Description */}
            <h1 className="text-2xl font-bold mt-4">{listingDetails.title}</h1>
            <p className="text-gray-600 mt-2">{listingDetails.description}</p>

            {/* Price */}
            <p className="text-lg font-semibold text-red-600 mt-2">
              {listingDetails.price} <span className="font-extrabold">৳</span>
            </p>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <MapPin size={16} className="mr-1" />
              <span>{listingDetails.location}</span>
            </div>

            {/* Category */}
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Layers size={16} className="mr-1" />
              <span>{listingDetails.category}</span>
            </div>
          </div>

          {/* Right Column: Seller Information and Map */}
          <div className="space-y-6">
            {/* Seller Information */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-semibold">Seller Information</h2>
              {seller ? (
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 relative border rounded-full overflow-hidden">
                    <Image
                      src={seller?.image || "/default-avatar.png"}
                      alt={seller?.name || "Seller"}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">
                      <span>Name:</span> {seller?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span>Email:</span> {seller?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span>Phone:</span> {seller?.phone}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative rounded-full border overflow-hidden"></div>
                    <div className="ml-4">
                      <p className="font-medium">
                        <span>Name:</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        <span>Email:</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        <span>Phone:</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-red-400">
                    <p>Opps!</p>
                    <p>Unfortunately seller info is missing</p>
                  </div>
                </div>
              )}

              {/* Contact Options */}
              <div className="mt-4 flex gap-4">
                <a
                  href={`tel:${seller?.phone}`}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <MessageCircle size={16} />
                  <span>Call Seller</span>
                </a>
                <a
                  href={`mailto:${seller?.email}`}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <Mail size={16} />
                  <span>Email Seller</span>
                </a>
              </div>
            </div>

            {/* Location Map */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-semibold">Location</h2>
              <h4>
                {listingDetails.location}, <span>Bangladesh</span>
              </h4>
              <div className="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                    listingDetails.location
                  )}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No listing found</p>
      )}
    </div>
  );
};

export default ListingDetails;
