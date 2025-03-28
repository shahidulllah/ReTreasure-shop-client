import {
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from "@/redux/features/wishListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IListing } from "@/types";
import { getTimeAgo } from "@/utils/getTime";
import { Bookmark, Layers, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ListingCardProps {
  listing: IListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlist);

  //check wish item is already added
  const isInWishlist = wishlist.some((item) => item._id === listing._id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(listing._id));
    } else {
      dispatch(addToWishlist(listing));
      toast.success('Saved successfully..!')
    }
  };
  return (
    <div className=" border border-purple-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow space-y-3 max-h-[370px]">
      <div
        onClick={() => router.push(`/listings/${listing._id}`)}
        className="w-full h-48 relative cursor-pointer"
      >
        <Image src={listing.image} alt={listing.title} layout="fill" priority />
      </div>
      <div className="p-4">
        <p className="text-red-600 font-bold text-lg">
          {listing.price} <span className="font-extrabold">৳</span>
        </p>
        <h2 className="text-lg font-semibold truncate">{listing.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <MapPin size={16} className="mr-1" />
          <span>{listing.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Layers size={16} className="mr-1" />
          <span>{listing.category}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-xs text-gray-400 mt-2">
            {getTimeAgo(listing.createdAt)}
          </p>
          <Bookmark
            className={`cursor-pointer transition ${
              isInWishlist ? "text-purple-700 fill-purple-700" : "text-gray-500"
            }`}
            onClick={handleWishlistToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
