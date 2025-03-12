import React from "react";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/shared/ListingCard";

export const listings = [
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
  {
    id: 3,
    title: "Taxi Services for Salasar Balaji...",
    price: "0 ৳",
    location: "India",
    category: "Vehicles",
    time: "1 day ago",
    image: "https://i.ibb.co/nxGYjTr/banner-1.jpg",
  },
];

const LatestListings = () => {
  return (
    <div className="px-4 rounded-lg lg:max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Listings</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
          Browse All Listings..
        </Button>
      </div>
    </div>
  );
};

export default LatestListings;
