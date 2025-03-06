"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Listings", path: "/listings" },
  { title: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 bg-white shadow-md dark:bg-black border-b border-gray-300 dark:border-gray-600 py-3">
      <div className="flex items-center justify-between lg:max-w-7xl mx-auto px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-semibold text-2xl"> 🛒 ReTreasure</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-1 py-1 text-black dark:text-white transition duration-300 hover:text-gray-700 dark:hover:text-gray-300 ${
                pathname === link.path ? "border-b-2 border-blue-500" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden lg:flex"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {/* Login/Profile Section */}
          {!session ? (
            <>
             <Link href="/auth/register">
              <button className="bg-slate-800 text-white px-4 py-1 font-semibold rounded-xl">
                Register
              </button>
            </Link>
             <Link href="/auth/login">
              <button className="bg-slate-700 text-white px-4 py-1 font-semibold rounded-xl">
                Login
              </button>
            </Link>
            </>
           
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User"
                  width={35}
                  height={35}
                  className="rounded-full border border-gray-400"
                  priority
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-md rounded-lg py-3 px-4 z-50 transition-all duration-300">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-center text-black dark:text-white">
                      {session.user?.name || "User Name"}
                    </h4>
                    <p className="text-sm text-gray-500 text-center">
                      {session.user?.email || "user@example.com"}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-md border-b-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut className="inline-block w-5 h-5 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="lg:hidden"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 rounded-md text-black dark:text-white border border-gray-400"
          >
            {navbarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {navbarOpen && (
        <div className="absolute top-[57px] left-0 w-full bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600 shadow-md md:hidden text-center">
          <ul className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`px-3 py-1 justify-center text-gray-700 dark:text-gray-300 text-lg transition duration-300 hover:text-black dark:hover:text-white ${
                    pathname === link.path
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : ""
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
