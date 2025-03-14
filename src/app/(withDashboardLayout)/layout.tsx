"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LogOut,
  LayoutGrid,
  FilePlus,
  List,
  Heart,
  MessageCircle,
  CreditCard,
  Settings,
  Home,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
  { icon: FilePlus, label: "Post Listing", href: "/dashboard/listing" },
  { icon: List, label: "Manage Listings", href: "/dashboard/listings" },
  { icon: Heart, label: "Wishlist Feature", href: "/dashboard/wishlist" },
  { icon: MessageCircle, label: "Message", href: "/dashboard/message" },
  {
    icon: CreditCard,
    label: "Track Sales & Purchases",
    href: "/dashboard/sales-history",
  },
  { icon: Settings, label: "Profile Management", href: "/dashboard/profile" },
  { icon: LogOut, label: "Logout", href: "#" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Mobile Overlay */}
      <div
        className={` min-h-screen bg-purple-900 text-gray-100 shadow-xl px-6 w-96 fixed z-50  transition-transform  border-r border-purple-200 ${
          isOpen
            ? "translate-x-0 bg-purple-200"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className=" font-semibold lg:text-3xl text-xl">🛒 ReTreasure</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-4 border-b">
          <div className="w-12 h-12 rounded-full border overflow-hidden">
            <Image
              src={
                user?.image ||
                "https://th.bing.com/th/id/OIP.8Wzkq9GNyaRz3xf4L_KMAQHaHa?rs=1&pid=ImgDetMain"
              }
              alt="Profile Picture"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <p className="text-sm ">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={item.label === "Logout" ? handleLogout : undefined}
              className={`flex items-center p-2 rounded-lg hover:bg-purple-300 hover:text-black cursor-pointer ${
                pathname === item.href ? "bg-purple-300 text-black" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label === "Logout" ? (
                <span>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-purple-200 lg:ml-96">
        <Button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={20} /> Menu
        </Button>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
