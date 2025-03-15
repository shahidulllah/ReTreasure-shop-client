"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  fetchListings,
  removeListing,
  updateListing,
} from "@/services/listingService";
import { Trash, Pencil } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { IListing } from "@/types";
import { UpdateListingModal } from "@/components/modal/UpdateListingModal";
import { useRouter } from "next/navigation";

export default function ManageListingsPage() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 7;

  useEffect(() => {
    dispatch(fetchListings({}));
  }, [dispatch]);

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  const handleDelete = async (id: string) => {
    if (token) {
      try {
        await dispatch(removeListing({ id, token })).unwrap();
        toast.success("Listing deleted successfully");
        dispatch(fetchListings({}));
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete listing");
      }
    }
  };

  const handleEdit = (listing: IListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData: Partial<IListing>) => {
    if (token && selectedListing) {
      try {
        await dispatch(
          updateListing({ id: selectedListing._id, token, data: updatedData })
        ).unwrap();
        toast.success("Listing updated successfully");
        setIsModalOpen(false);
        dispatch(fetchListings({}));
      } catch (error) {
        console.log(error);
        toast.error("Failed to update listing");
      }
    }
  };

  return (
    <div className="p-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">
        Manage Listings ({listings.length})
      </h1>
      <div className="bg-gray-300 p-4 rounded-lg">
        {loading ? (
          <p className="text-black dark:text-white text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentListings.map((listing) => (
                  <TableRow key={listing._id}>
                    <TableCell>
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        width={50}
                        height={50}
                        className="rounded-md border border-purple-400 cursor-pointer"
                        onClick={() => router.push(`/listings/${listing._id}`)}
                      />
                    </TableCell>
                    <TableCell onClick={() => router.push(`/listings/${listing._id}`)} className="hover:underline cursor-pointer">{listing.title}</TableCell>
                    <TableCell>{listing.category}</TableCell>
                    <TableCell>${listing.price}</TableCell>
                    <TableCell>{listing.condition}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(listing)}
                        className="cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(listing._id)}
                        className="cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Update Listing Modal */}
      {selectedListing && (
        <UpdateListingModal
          listing={selectedListing}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
