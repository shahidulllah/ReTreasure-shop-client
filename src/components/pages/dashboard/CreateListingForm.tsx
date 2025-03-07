"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { createListing } from "@/services/listingService";

export default function ListingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const userId = session?.user?.id
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    image: "",
    sellerId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        title: form.title,
        description: form.description,
        price: parseFloat(form.price), 
        category: form.category,
        condition: form.condition,
        image: form.image, 
        sellerId: userId,
      };


      await createListing(listingData, token);
      toast.success("Listing posted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to post the listing. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle>Post an Item for Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="condition"
              placeholder="Condition (New/Used)"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Posting..." : "Post Item"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
