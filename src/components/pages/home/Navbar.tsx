"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  MapPin,
  PlusCircle,
  MessageCircleMore,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Profile from "@/components/shared/Profile";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 bg-white shadow-md dark:bg-black border-b border-gray-300 dark:border-gray-600 py-3">
      <div className="flex items-center justify-between lg:max-w-7xl mx-auto px-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-semibold text-3xl"> 🛒 ReTreasure</h1>
        </Link>
        <div className="hidden lg:flex items-center bg-white dark:bg-gray-700 text-black rounded-md p-1 border">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-300 mx-2" />
          <input
            className="border-none outline-none focus:-none w-40 dark:text-gray-200"
            placeholder="Search "
          />
          <MapPin className="h-5 w-5 text-gray-500 mx-2 dark:text-gray-300" />
          <input
            className="border-none outline-none w-32 dark:text-gray-200"
            placeholder="Location"
          />
          <Button className="bg-green-500 text-white px-4 rounded-md">
            Search
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
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

          <Button className="flex items-center bg-white border text-green-600 px-3 py-1 rounded-md">
            <PlusCircle className="h-5 w-5 mr-1" /> Post Listing
          </Button>
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
      <div className="md:hidden flex bg-slate-200 items-center px-4 py-2 justify-between space-x-4">
        <Search className="h-5 w-5 text-gray-500 ml-2" />

        <div className="flex gap-2 items-center">
          <MessageCircleMore className="h-5 w-5" />
          <Profile />

          <Button className="flex items-center bg-white border text-green-600 px-3 py-1 rounded-md">
            <PlusCircle className="h-5 w-5 mr-1" /> Post Listing
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {navbarOpen && (
        <div className="absolute left-0 w-full top-12 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600 shadow-md md:hidden text-center">
          <div>
            <ul>
              <li>cetegory</li>
              <li>cetegory</li>
              <li>cetegory</li>
              <li>cetegory</li>
              <li>cetegory</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
