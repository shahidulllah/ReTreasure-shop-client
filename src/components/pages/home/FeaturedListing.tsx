import Image from "next/image";
import { MapPin, Layers, ArrowUp } from "lucide-react";
import { CardContent } from "@/components/ui/card";

const featuredListings = [
  {
    id: 1,
    image: "https://i.ibb.co.com/TkF4w7g/banner-book.png", 
    price: "47250 ৳",
    title: "New Blood Circulative Massager",
    location: "Bangladesh",
    category: "Healthcare",
    time: "8 months ago",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/xpCMSF7/p-4.webp",
    price: "38500 ৳",
    title: "Premium Massage Chair",
    location: "Dhaka, Bangladesh",
    category: "Wellness",
    time: "5 months ago",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/BV4wc9Ds/p-1.jpg",
    price: "29999 ৳",
    title: "Electric Foot Massager",
    location: "Chittagong, Bangladesh",
    category: "Healthcare",
    time: "6 months ago",
  },
];

export default function FeaturedListings() {
  return (
    <div className="lg:max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-5 text-center">Featured Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {featuredListings.map((listing) => (
          <div
            key={listing.id}
            className="rounded-lg shadow-lg overflow-hidden border"
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
              <p className="text-red-600 font-bold text-lg">{listing.price}</p>
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
                <p className="text-xs text-gray-500 mt-2">{listing.time}</p>
                <div className="flex items-center text-green-600 text-xs font-bold mt-2">
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
