import React from "react";
import Image from "next/image";
import { MapPin, Layers } from "lucide-react";

const LatestListings = () => {
  const listings = [
    {
      id: 1,
      title: "Automatic Voltage Stabilizer",
      price: "1970 ৳",
      location: "Bangladesh",
      category: "Electronics",
      time: "14 hours ago",
      image: "https://i.ibb.co/B3zBZFt/banner-image.png",
    },
    {
      id: 2,
      title: "Healthray The Best Software For...",
      price: "0 ৳",
      location: "India",
      category: "Services",
      time: "1 day ago",
      image: "https://i.ibb.co/LBsJ158/p-2.png",
    },
    {
      id: 3,
      title: "Taxi Services for Salasar Balaji...",
      price: "0 ৳",
      location: "India",
      category: "Vehicles",
      time: "1 day ago",
      image: "https://i.ibb.co/nxGYjTr/banner-1.jpg",
    },
    {
      id: 4,
      title: "Actiza Pharmaceutical Pvt. Ltd.",
      price: "0 ৳",
      location: "India",
      category: "Business Industry",
      time: "1 day ago",
      image: "https://i.ibb.co/B3zBZFt/banner-image.png",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Latest Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-48 relative">
              <Image
                src={listing.image}
                alt={listing.title}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-red-600 font-bold text-lg">{listing.price}</p>
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {listing.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin size={16} className="mr-1" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Layers size={16} className="mr-1" />
                <span>{listing.category}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{listing.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListings;
