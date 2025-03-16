"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Smartphone XYZ",
      price: "25,000৳",
      imageUrl: "/smartphone.jpg",
    },
    {
      id: 2,
      title: "Gaming Laptop ABC",
      price: "120,000৳",
      imageUrl: "/laptop.jpg",
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border p-4 bg-gray-100 rounded-lg shadow-lg relative"
            >
              <XCircle
                size={20}
                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                onClick={() => removeFromWishlist(item.id)}
              />
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={200}
                height={150}
                className="rounded-lg w-full border border-purple-300"
              />
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600">{item.price}</p>
              <Link
                href={`/listings/${item.id}`}
                className="border border-purple-700 hover:bg-purple-300 text-purple-700 px-4 py-2 rounded-md block text-center mt-2"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
