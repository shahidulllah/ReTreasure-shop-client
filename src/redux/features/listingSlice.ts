/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateListing,
  deleteListing,
  fetchListings,
} from "@/services/listingService";
import { IListing } from "@/types";

interface ListingState {
  listings: IListing[];
  loading: boolean;
  status: string;
  error: string | null | undefined;
}

const initialState: ListingState = {
  listings: [],
  status: "idle",
  loading: false,
  error: null,
};


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
      //FatchListins
      .addCase(fetchListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
