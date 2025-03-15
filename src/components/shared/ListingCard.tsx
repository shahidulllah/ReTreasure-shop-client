import { getTimeAgo } from "@/utils/getTime";
import { Layers, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IListing {
  _id: string;
  image: string;
  title: string;
  price: number;
  location: string;
  category: string;
  createdAt: string;
}

interface ListingCardProps {
  listing: IListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const router = useRouter();
  return (
    <div
      className=" border border-purple-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow space-y-3 max-h-[370px] cursor-pointer"
      onClick={() => router.push(`/listings/${listing._id}`)}
    >
      <div className="w-full h-48 relative">
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
        <p className="text-xs text-gray-400 mt-2">
          {getTimeAgo(listing.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
