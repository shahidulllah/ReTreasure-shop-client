"use client";
import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromWishlist, selectWishlist } from "@/redux/features/wishListSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlist);

  console.log(wishlist);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border p-4 bg-gray-100 rounded-lg shadow-lg relative"
            >
              <XCircle
                size={24}
                className="absolute top-3 right-2 text-red-500 cursor-pointer"
                onClick={() => dispatch(removeFromWishlist(item._id))}
              />
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={150}
                className="rounded-lg w-full border border-purple-300"
              />
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600">{item.price}</p>
              <Link
                href={`/listings/${item._id}`}
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
