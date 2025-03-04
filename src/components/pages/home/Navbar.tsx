"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        SecondHand 🛒
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
            <Link href="/login" className="mr-4">
              Login
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
