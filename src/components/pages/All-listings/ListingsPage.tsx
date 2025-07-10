"use client";
import { Suspense, useEffect, useState } from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/shared/ListingCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchListings } from "@/services/listingService";
import { categories, locations } from "@/components/shared/listsOFArray";
import { useRouter, useSearchParams } from "next/navigation";

// Wrap the ListingsPage component in a Suspense boundary
export default function ListingsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListingsPage />
    </Suspense>
  );
}

export function ListingsPage() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category") || "All Category";

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(15000);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Handle location selection from dropdown
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  // Handle condition selection
  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    router.push(`/listings?category=${encodeURIComponent(category)}`);
  };

  // Fetch listings based on filters
  useEffect(() => {
    const payload = {
      search: searchTerm,
      location,
      page,
      limit: 8,
      maxPrice: priceRange,
      ...(selectedCondition !== "All" && {
        condition: selectedCondition,
      }),
      ...(selectedCategory !== "All Category" && {
        category: selectedCategory,
      }),
    };
    dispatch(fetchListings(payload)).then((action) => {
      if (action.payload.length < 8) {
        setHasMore(false);
      }
    });
  }, [
    dispatch,
    searchTerm,
    location,
    selectedCategory,
    priceRange,
    selectedCondition,
    page,
  ]);

  return (
    <div className="px-4 lg:max-w-7xl mx-auto my-8">
      <div className="flex-1 p-4">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Filer button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${
              showFilters ? "" : ""
            } flex items-center gap-2 border border-purple-300 dark:text-white px-4 py-2 rounded-lg shadow-sm w-full md:w-auto`}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Search, location */}
          <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
            {/* Search */}
            <div className="relative w-full md:w-5/12">
              <Search
                className="absolute left-2 top-3 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 w-full border border-purple-300 rounded-lg"
              />
            </div>
            {/* Location Dropdown */}
            <div className="relative w-full md:w-5/12">
              <MapPin
                className="absolute left-2 top-3 text-gray-500"
                size={16}
              />
              <select
                value={location}
                onChange={handleLocationChange}
                className="pl-8 pr-4 py-2 w-full text-gray-500 border border-purple-300 rounded-lg appearance-none"
              >
                <option value="" className="font-semibold">
                  <></> Search by location
                </option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter with condition */}
          <div className="flex gap-2 border border-purple-300 rounded-lg w-full md:w-auto">
            <button
              onClick={() => handleConditionSelect("All")}
              className={`px-4 py-2 rounded-l-md ${
                selectedCondition === "All"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "hover:bg-purple-100 hover:text-black"
              } cursor-pointer`}
            >
              All
            </button>
            <button
              onClick={() => handleConditionSelect("New")}
              className={`px-4 py-2 ${
                selectedCondition === "New"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "hover:bg-purple-100 hover:text-black"
              } cursor-pointer`}
            >
              New
            </button>
            <button
              onClick={() => handleConditionSelect("Used")}
              className={`px-4 py-2 ${
                selectedCondition === "Used"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "hover:bg-purple-100 hover:text-black"
              } cursor-pointer`}
            >
              Used
            </button>
            <button
              onClick={() => handleConditionSelect("Repaired")}
              className={`px-4 py-2 rounded-r-md ${
                selectedCondition === "Repaired"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "hover:bg-purple-100 hover:text-black"
              } cursor-pointer`}
            >
              Repaired
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-full md:w-80 p-4 border border-purple-300 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="font-medium">Price</label>
                <input
                  type="range"
                  className="w-full mt-2"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  min="0"
                  max="15000"
                />
                <p className="text-md text-gray-800 dark:text-white font-semibold">
                  <span className="font-extrabold">৳ </span>0 -{" "}
                  <span className="font-extrabold">৳ </span>
                  {priceRange.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="font-medium">Category</label>
                <ul className="mt-2 space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategorySelect(category)}
                        defaultChecked={index === 0}
                      />
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Listings Grid */}
          <div
            className={`grid gap-4 w-full ${
              showFilters
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-3 lg:grid-cols-4"
            } grid-cols-1`}
          >
            {loading && page === 1 ? (
              <p className="text-center mt-12 text-black dark:text-white">
                Loading listings...
              </p>
            ) : (
              listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))
            )}
          </div>
        </div>
        <div className="text-center mt-8">
          {hasMore && (
            <Button
              onClick={handleLoadMore}
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
            >
              Load More ..
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
