import { RootState } from "../store";
import { IListing } from "@/types";

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
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.whisList.items;

export default wishlistSlice.reducer;
