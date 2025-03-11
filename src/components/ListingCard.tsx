import { IListing } from "@/types";
import { useSession } from "next-auth/react";

const ListingCard = ({ listing }: { listing: IListing }) => {
  const { data: session } = useSession();

  const handleDelete = () => {
    if (!session) return alert("You must be logged in!");
    // dispatch(removeListing({ id: listing._id, token: session.user.token }));
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-semibold">{listing.title}</h2>
      <p>${listing.price}</p>
      <p className="text-sm text-gray-500">{listing.condition}</p>
      {session && (
        <div className="flex gap-2 mt-2">
          <button className="bg-purple-700 text-white px-3 py-1 rounded">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingCard;
