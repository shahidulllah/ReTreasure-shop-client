import { createSlice } from "@reduxjs/toolkit";
import {
  updateListing,
  fetchListings,
  removeListing,
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
      .addCase(updateListing.fulfilled, (state, action) => {
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
