import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "../redux/features/listingSlice";
import wishListReducer from "../redux/features/wishListSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      listings: listingReducer,
      whisList: wishListReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
