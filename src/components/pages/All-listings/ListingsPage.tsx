"use client";
import { useState } from "react";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/shared/ListingCard";
import { listings } from "../home/LatestListing";

export default function ListingsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex px-4 lg:max-w-7xl mx-auto">
      <div className="flex-1 p-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm bg-white"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute left-2 top-2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="relative">
              <MapPin
                className="absolute left-2 top-2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Location"
                className="pl-8 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-lg shadow-sm bg-white">
              Featured
            </button>
            <button className="border px-4 py-2 rounded-lg shadow-sm bg-white">
              Urgent
            </button>
            <button className="border px-4 py-2 rounded-lg shadow-sm bg-white">
              Latest
            </button>
          </div>
        </div>
        
       <div className="flex gap-5">
         {/* Sidebar Filters */}
         {showFilters && (
          <div className="w-80 p-4 border-r bg-white shadow-lg">
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
                <li>
                  <input type="radio" name="category" defaultChecked /> All
                  Categories
                </li>
                <li>
                  <input type="radio" name="category" /> Mobiles
                </li>
                <li>
                  <input type="radio" name="category" /> Electronics
                </li>
                <li>
                  <input type="radio" name="category" /> Vehicles
                </li>
                <li>
                  <input type="radio" name="category" /> Property
                </li>
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
      </div>
    </div>
  );
}
