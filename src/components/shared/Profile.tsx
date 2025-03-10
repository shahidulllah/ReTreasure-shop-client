import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Profile = () => {
      const { data: session } = useSession();
      const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div>
             {/* Login/Profile Section */}
          {!session?.user ? (
            <>
              <Link href="/auth/login">
                <button className="bg-green-600 text-white px-4 py-1 font-semibold rounded-md">
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
                  src={session.user?.image || "https://ibb.co.com/KWD7nJQ"}
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
    );
};

export default Profile;