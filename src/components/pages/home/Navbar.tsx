"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  PlusCircle,
  MessageCircleMore,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Profile from "@/components/shared/Profile";
import SearchField from "@/components/shared/SearchField";
import { categories } from "@/components/shared/listsOFArray";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchFieldOpen, setSearchFieldrOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/listings?category=${encodeURIComponent(category)}`);
    setNavbarOpen(false)
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 bg-white shadow-md dark:bg-black py-0 lg:py-2">
      <div className="flex items-center justify-between lg:max-w-7xl mx-auto px-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-semibold lg:text-3xl text-xl"> 🛒 ReTreasure</h1>
        </Link>
        <div className="hidden lg:flex">
          <SearchField />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden lg:flex"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          <MessageCircleMore className="h-6 w-6" />

          <Profile />

          <Link href={"dashboard/listing"}>
            <Button className="flex items-center bg-white border hover:bg-purple-100 cursor-pointer border-purple-300 text-purple-700 px-3 py-1 rounded-full">
              <PlusCircle className="h-5 w-5 mr-1" /> Post Listing
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}

        {/* Top navbar*/}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="lg:hidden"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 rounded-md text-black dark:text-white"
          >
            {navbarOpen ? (
              <X className="h-5 w-5 cursor-pointer" />
            ) : (
              <Menu className="h-5 w-5 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom navbar*/}
      <div className="lg:hidden flex bg-purple-900 items-center px-4 py-2 justify-between space-x-4">
        <Search
          onClick={() => setSearchFieldrOpen(!searchFieldOpen)}
          className="h-6 w-6 text-gray-200 ml-2"
        />

        <div className="flex gap-2 items-center">
          <MessageCircleMore className=" text-gray-300 h-6 w-6" />
          <Profile />

          <Link href={"dashboard/listing"}>
            <Button className="flex items-center bg-white border hover:bg-purple-100 border-purple-300 text-purple-700 px-3 py-1 rounded-full">
              <PlusCircle className="h-5 w-5 mr-1" /> Post Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Search field Overlay */}
      {searchFieldOpen && (
        <div className="flex lg:hidden absolute left-0  w-full shadow-md rounded-b-md">
          <SearchField />
        </div>
      )}

      {/* Mobile category Navigation Overlay */}
      {navbarOpen && (
        <div className="absolute left-0 w-full bg-purple-200 text-black shadow-md rounded-b-md p-3">
          {categories.map((category, index) => (
            <p
              onClick={() => handleCategorySelect(category)}
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {category}
            </p>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
