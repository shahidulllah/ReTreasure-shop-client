import { Layers, MapPin } from "lucide-react";
import Image from "next/image";

interface IListing {
  id: number;
  image: string;
  title: string;
  price: string;
  location: string;
  category: string;
  time: string;
}

interface ListingCardProps {
  listing: IListing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div
      key={listing.id}
      className=" border border-purple-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow space-y-3"
    >
      <div className="w-full h-48 relative">
        <Image src={listing.image} alt={listing.title} layout="fill" priority />
      </div>
      <div className="p-4">
        <p className="text-red-600 font-bold text-lg">{listing.price}</p>
        <h2 className="text-lg font-semibold truncate">{listing.title}</h2>
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
  );
};

export default ListingCard;
