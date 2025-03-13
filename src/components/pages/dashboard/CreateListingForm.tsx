"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createListing } from "@/services/listingService";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function CreateListingForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const userId = session?.user?.id;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category: value });
  };

  const handleConditionChange = (value: string) => {
    setForm({ ...form, condition: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error("You must be logged in to post a listing.");
      setLoading(false);
      return;
    }

    try {
      const listingData = {
        ...form,
        price: parseFloat(form.price),
        sellerId: userId,
      };

      await createListing(listingData, token);
      toast.success("Listing posted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post the listing. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-xl p-6 bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Post an Item for Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Enter the title of your item"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Describe your item"
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <Input
                type="number"
                name="price"
                placeholder="Enter the price"
                onChange={handleChange}
                required
              />
            </div>

            {/* Category and Condition */}
            <div className="flex justify-between gap-3">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <Select onValueChange={handleConditionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Input
                type="text"
                name="image"
                placeholder="Enter the image URL"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full border-purple-600 bg-white border font-semibold rounded-full text-purple-700 hover:bg-purple-100 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Post Item"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
