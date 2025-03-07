/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} from "@/services/listingService";
import { IListing } from "@/types";

interface ListingState {
  listings: IListing[];
  loading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  listings: [],
  loading: false,
  error: null,
};

// Fetch Listings
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (params: any) => {
    return await getListings(params);
  }
);

// Create Listing
export const addListing = createAsyncThunk(
  "listings/addListing",
  async ({ data, token }: any) => {
    return await createListing(data, token);
  }
);

// Update Listing
export const editListing = createAsyncThunk(
  "listings/editListing",
  async ({ id, data, token }: any) => {
    return await updateListing(id, data, token);
  }
);

// Delete Listing
export const removeListing = createAsyncThunk(
  "listings/removeListing",
  async ({ id, token }: any) => {
    await deleteListing(id, token);
    return id;
  }
);

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.listings = action.payload.data;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.listings.push(action.payload);
      })
      .addCase(editListing.fulfilled, (state, action) => {
        state.listings = state.listings.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(removeListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default listingSlice.reducer;
