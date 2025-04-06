"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { IUser } from "@/types";
import { updateProfile } from "@/services/userService";
import { toast } from "sonner";

const ProfileManagement = () => {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>(user || {});

  useEffect(() => {
    setUpdatedUser(user || {});
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (user) {
      setLoading(true);
      try {
        const updatedProfile = await updateProfile({
          userId: user?.id,
          data: updatedUser,
        });

        await update({
          ...session,
          user: {
            ...session?.user,
            ...updatedProfile,
          },
        });
        toast.success("Profile updated successfully. Please login now...!");
        setEditing(false);
        await signOut({
          callbackUrl: "/dashboard/profile",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to update profile");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-xl mt-16 mx-auto p-8 bg-gray-200 border border-purple-300 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Profile Management
      </h1>
      <div className="mt-6 flex items-center space-x-8">
        <div className="relative w-24 h-24">
          <Image
            src={updatedUser.image || "/default-avatar.png"}
            alt="Profile"
            fill
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {updatedUser?.name}
          </h2>
          <p className="text-gray-600">EMAIL: {updatedUser?.email}</p>
          <p className="text-gray-600">PHONE: {updatedUser?.phone}</p>
        </div>
      </div>

      {editing ? (
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={updatedUser.name || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={updatedUser.phone || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={updatedUser.email || ""}
              onChange={handleChange}
              disabled
              className="w-full p-3 border cursor-not-allowed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={updatedUser.image || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-8 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileManagement;
