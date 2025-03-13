"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/shared/ListingCard";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchListings } from "@/services/listingService";
import { categories, locations } from "@/components/shared/listsOFArray";

export default function ListingsPage() {
  const dispatch = useAppDispatch();
  const { listings, loading } = useAppSelector(
    (state: RootState) => state.listings
  );

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [priceRange, setPriceRange] = useState(200);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleLocationFocus = () => {
    setLocationSuggestions(locations);
    setShowSuggestions(true);
  };

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    // Filter locations based on input
    if (value) {
      const filteredLocations = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filteredLocations);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle location selection from suggestions
  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setLocationSuggestions([]);
    setShowSuggestions(false);
  };

  //Handle condition
  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
  };

  useEffect(() => {
    const payload = {
      search: searchTerm,
      location,
      maxPrice: priceRange,
      ...(selectedCondition !== "All" && {
        condition: selectedCondition,
      }),
      ...(selectedCategory !== "All Category" && {
        category: selectedCategory,
      }),
    };
    dispatch(fetchListings(payload));
  }, [
    dispatch,
    searchTerm,
    location,
    selectedCategory,
    priceRange,
    selectedCondition,
  ]);

  return (
    <div className="flex px-4 lg:max-w-7xl mx-auto my-8">
      <div className="flex-1 p-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Filer button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${
              showFilters ? "bg-purple-300" : "bg-white"
            } flex items-center gap-2 border border-purple-300 px-4 py-2 rounded-lg shadow-sm`}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Search, location */}
          <div className="flex gap-2 w-full justify-center">
            {/* Search */}
            <div className="relative w-5/12">
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
            {/* location */}
            <div className="relative w-5/12">
              <MapPin
                className="absolute left-2 top-3 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
                onFocus={handleLocationFocus}
                className="pl-8 pr-4 w-full py-2 border border-purple-300 rounded-lg"
              />
              {/* Location Suggestions Dropdown */}
              {showSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-purple-300 rounded-lg mt-1 shadow-lg">
                  {locationSuggestions.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter with condition */}
          <div className="flex gap-2 border border-purple-300 rounded-lg">
            <button
              onClick={() => handleConditionSelect("All")}
              className={`px-4 py-2 rounded-l-md ${
                selectedCondition === "All"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "bg-white hover:bg-purple-100"
              } cursor-pointer`}
            >
              All
            </button>
            <button
              onClick={() => handleConditionSelect("New")}
              className={`px-4 py-2 ${
                selectedCondition === "New"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "bg-white hover:bg-purple-100"
              } cursor-pointer`}
            >
              New
            </button>
            <button
              onClick={() => handleConditionSelect("Used")}
              className={`px-4 py-2 ${
                selectedCondition === "Used"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "bg-white hover:bg-purple-100"
              } cursor-pointer`}
            >
              Used
            </button>
            <button
              onClick={() => handleConditionSelect("Repaired")}
              className={`px-4 py-2 rounded-r-md ${
                selectedCondition === "Repaired"
                  ? "border-b-purple-600 border-b-3 text-black"
                  : "bg-white hover:bg-purple-100"
              } cursor-pointer`}
            >
              Repaired
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 p-4 border h-[100%] border-purple-300 bg-purple-100 rounded-lg shadow-lg">
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
                <p className="text-md text-gray-800 font-semibold">
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
                        onChange={() => setSelectedCategory(category)}
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
            className={`grid gap-4 w-full${
              showFilters ? " grid-cols-3" : " grid-cols-4"
            }`}
          >
            {loading ? (
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
          <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
            Load More Listings..
          </Button>
        </div>
      </div>
    </div>
  );
}
