"use client";
import { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/shared/ListingCard";
import { listings } from "../home/LatestListing";
import { categories } from "../home/CategoryNav";
import { Button } from "@/components/ui/button";

export default function ListingsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex px-4 lg:max-w-7xl mx-auto my-8">
      <div className="flex-1 p-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-purple-300 px-4 py-2 rounded-lg shadow-sm bg-white"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="flex gap-2 w-full justify-center">
            <div className="relative w-5/12">
              <Search
                className="absolute left-2 top-3 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 py-2 w-full border border-purple-300 rounded-lg"
              />
            </div>
            <div className="relative w-5/12">
              <MapPin
                className="absolute left-2 top-3 text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Location"
                className="pl-8 pr-4 w-full py-2 border border-purple-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2 border border-purple-300 rounded-lg">
            <button className="px-4 py-2 rounded-lg  bg-white hover:bg-purple-100 cursor-pointer">
              Featured
            </button>
            <button className=" px-4 py-2 rounded-lg  bg-white hover:bg-purple-100 cursor-pointer">
              Urgent
            </button>
            <button className=" px-4 py-2 rounded-lg bg-white hover:bg-purple-100 cursor-pointer">
              Latest
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 p-4 border border-purple-300 bg-white shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="font-medium">Price</label>
                <input
                  type="range"
                  className="w-full mt-2"
                  min="0"
                  max="250000000"
                />
                <p className="text-sm text-gray-500">$0 - $250,000,000</p>
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
          <div className="grid grid-cols-4 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
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
