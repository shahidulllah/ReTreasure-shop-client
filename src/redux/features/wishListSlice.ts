import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IListing } from "@/types";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "@/services/wishlistServices";

interface WishlistState {
  listings: IListing[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  listings: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Fetch wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.loading = false;
      })

      //Remove wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.loading = false;
      });
  },
});

export const selectWishlist = (state: RootState) => state.whisList;

export default wishlistSlice.reducer;
