"use client";

import Link from "next/link";
import React from "react";
import {
  ShoppingCart,
  PhoneCall,
  Mail,
  Facebook,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 shadow-md dark:bg-gray-900">
      <footer className="container mx-auto py-10 px-5 lg:px-20 text-gray-700 dark:text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Branding */}
          <div className="flex flex-col justify-center items-center">
            <Link href="/">
              <div className="text-3xl font-semibold">🛒 ReTreasure</div>
            </Link>
            <p className="mt-3 text-center md:text-left">
              Buy & Sell Pre-Owned Items Easily & Securely.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <h3 className="font-semibold">Quick Links</h3>
            <Link href="/">Home</Link>
            <Link href="/products">Browse Products</Link>
            <Link href="/sell">Sell an Item</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col space-y-3 text-center md:text-left">
            <h3 className="font-semibold">Customer Support</h3>
            <div className="flex flex-col space-y-3 text-center md:text-left">
              <p className="flex items-center gap-2">
                <PhoneCall size={18} /> +880 1234 567 890
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} /> support@marketplace.com
              </p>
            </div>
            <div className="flex justify-center md:justify-start space-x-5 mt-3">
              <Link href="https://facebook.com" target="_blank">
                <Facebook size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin size={24} />
              </Link>
              <Link href="/cart">
                <ShoppingCart size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 border-t pt-5 text-sm">
          <p>
            &copy; {new Date().getFullYear()} ReTreasure. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
