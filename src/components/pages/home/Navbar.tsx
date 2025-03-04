"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
      <Link href="/" className="text-xl font-bold">
         🛒 ReTreasure
      </Link>
      <div>
        {session ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <Button onClick={() => signOut()} variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="mr-4">
              Login
            </Link>
            <Link href="/auth/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}
