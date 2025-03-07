import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "../redux/features/listingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      listings: listingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
