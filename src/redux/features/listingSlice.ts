import { createSlice } from "@reduxjs/toolkit";
import {
  updateListing,
  fetchListings,
  removeListing,
  fetchListingDetails,
} from "@/services/listingService";
import { IListing } from "@/types";

interface ListingState {
  listings: IListing[];
  listingDetails: IListing | null;
  loading: boolean;
  status: string;
  error: string | null | undefined;
}

const initialState: ListingState = {
  listings: [],
  listingDetails: null,
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

      // Fetch Listing Details
      .addCase(fetchListingDetails.pending, (state) => {
        state.loading = true;
        state.listingDetails = null;
      })
      .addCase(fetchListingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.listingDetails = action.payload;
      })
      .addCase(fetchListingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Update
      .addCase(updateListing.fulfilled, (state, action) => {
        state.listings = state.listings.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      //Remove
      .addCase(removeListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default listingSlice.reducer;
