"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchListings,
  editListing,
  removeListing,
} from "@/redux/features/listingSlice";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";

export default function ManageListingsPage() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );
  const [editData, setEditData] = useState<Partial<
    (typeof listings)[0]
  > | null>(null);

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  const handleEdit = (listing: (typeof listings)[0]) => {
    setEditData(listing);
  };

  const handleUpdate = async () => {
    if (!editData) return;
    try {
      await dispatch(
        editListing({ id: editData._id, data: editData, token: token })
      ).unwrap();
      toast.success("Listing updated successfully!");
      setEditData(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update listing.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await dispatch(removeListing({ id: id, token: token })).unwrap();
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete listing.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <Card key={listing._id}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={listing.image}
                alt={listing.title}
                width={200}
                height={150}
                className="rounded-lg"
              />
              <p>{listing.description}</p>
              <p className="text-sm text-gray-500">Price: ${listing.price}</p>
              <p className="text-sm text-gray-500">
                Category: {listing.category}
              </p>
              <p className="text-sm text-gray-500">
                Condition: {listing.condition}
              </p>
              <div className="flex justify-between mt-3">
                <Button onClick={() => handleEdit(listing)} size="sm">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(listing._id)}
                  size="sm"
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Listing</h2>
            <Input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <Input
              type="text"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <Input
              type="number"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: Number(e.target.value) })
              }
            />
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="mt-3 w-full"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
            <Button
              onClick={() => setEditData(null)}
              variant="secondary"
              className="mt-2 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
