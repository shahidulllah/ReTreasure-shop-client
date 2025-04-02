/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Add to Wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (
    { userId, listingId }: { userId: string; listingId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/api/wishlist/add`, {
        userId,
        listingId,
      });
      console.log("Add response:", response.data);
      return response.data.listings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error adding to wishlist"
      );
    }
  }
);

//Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/wishlist/${userId}`);

      return response.data.listings;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching wishlist");
    }
  }
);

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (
    { userId, listingId }: { userId: string; listingId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/api/wishlist/remove`, {
        userId,
        listingId,
      });
      console.log("remove response:", response.data.updatedWishlist.listings);
      return response.data.updatedWishlist.listings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error removing from wishlist"
      );
    }
  }
);
