import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/global.slice";
import tempSlice from "./slices/temp.slice";
import assetSlice from "./slices/asset.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    global: globalSlice,
    temp: tempSlice,
    asset: assetSlice,
  },
});
