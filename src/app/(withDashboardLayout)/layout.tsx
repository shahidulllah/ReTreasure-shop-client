"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-80 p-5 space-y-4 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-lg font-bold">Dashboard</h2>
        <nav className="space-y-2 min-h-screen">
          <div>
            <Link
              href="/dashboard/listings"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <ShoppingCart size={20} /> Listings
            </Link>
            <Link
              href="/dashboard/purchases"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <User size={20} /> Purchases
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded"
            >
              <User size={20} /> Profile
            </Link>
          </div>
          <div>
            <Button
              onClick={()=>signOut()}
              className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-700"
            >
              <LogOut size={20} /> Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Button className="md:hidden mb-4" onClick={toggleSidebar}>
          <Menu size={20} /> Menu
        </Button>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
