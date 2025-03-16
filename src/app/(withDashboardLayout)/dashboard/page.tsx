"use client";
import { Box, Check, File, HeartCrack } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-12 ">
      <div className="max-w-4xl mx-auto">
        {/* card */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* 1 */}
          <div className="bg-slate-100 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">08</h2>
              <p className="text-gray-600">Posted Listings</p>
            </div>
            <div className="bg-white text-blue-400 p-4 rounded-lg">
              <File size={36} />
            </div>
          </div>

          {/* 2 */}
          <div className="bg-purple-100 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">05</h2>
              <p className="text-gray-600">Favourite Listings</p>
            </div>
            <div className="bg-white text-green-400 p-4 rounded-lg">
              <HeartCrack size={36} />
            </div>
          </div>

          {/* 3 */}
          <div className="bg-pink-100 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div>
              <h2 className="text-4xl font-bold text-gray-800">12</h2>
              <p className="text-gray-600">Expire Listings</p>
            </div>
            <div className="bg-white text-red-400 p-4 rounded-lg">
              <Box size={36} />
            </div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Current plan expirations and benefits
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-4xl font-bold text-gray-800">100</h2>
            <p className="text-gray-600">Remaining Listings</p>
          </div>
          <div className="bg-slate-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-4xl font-bold text-gray-800">0</h2>
            <p className="text-gray-600">Featured Listings</p>
          </div>
        </div>

        {/* Listings View Graph */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Listings View
          </h3>
          <div className="h-40 bg-gray-200 rounded-lg flex items-end justify-between p-2">
            {[2.0, 1.6, 1.2, 0.8, 0.4, 0.0].map((value, index) => (
              <div
                key={index}
                className="bg-blue-600 w-8 rounded-t-lg"
                style={{ height: `${value * 20}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, index) => (
              <span key={index}>{month}</span>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-600">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              You’re logged in successfully
            </li>
            <li className="flex items-center text-gray-600">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              You’re logged in successfully
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
