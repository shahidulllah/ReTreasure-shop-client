import React from "react";
import Image from "next/image";

const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      title: "HEAITHR",
      subtitle: "1970 Automatic Voltage Stabilizer",
      location: "Bangladesh",
      category: "Electronics",
      time: "14 hours ago",
      image: "https://i.ibb.co.com/B3zBZFt/banner-image.png",
    },
    {
      id: 2,
      title: "Healthray",
      subtitle: "The Best Software For...",
      location: "India",
      category: "Services",
      time: "1 day ago",
      image: "https://i.ibb.co.com/LBsJ158/p-2.png",
    },
    {
      id: 3,
      title: "Taxi Services",
      subtitle: "for Salasar Balaji...",
      location: "India",
      category: "Vehicles",
      time: "1 day ago",
      image: "https://i.ibb.co.com/nxGYjTr/banner-1.jpg",
    },
    {
      id: 4,
      title: "Actiza Pharmaceutical Pvt. Ltd.",
      subtitle: "",
      location: "India",
      category: "Business Industry",
      time: "1 day ago",
      image: "https://i.ibb.co.com/B3zBZFt/banner-image.png",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Latest Listings</h1>
      <div className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="w-20 h-20 relative">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              {listing.subtitle && (
                <p className="text-gray-600">{listing.subtitle}</p>
              )}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span>{listing.location}</span>
                <span className="mx-2">•</span>
                <span>{listing.category}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{listing.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
