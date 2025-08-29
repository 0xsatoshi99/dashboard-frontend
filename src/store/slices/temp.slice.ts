import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedColdKeyId: null | { coldkey: string; name: string };
} = {
  selectedColdKeyId: null,
};

export const globalSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setSelectedColdKeyId: (state, action) => {
      state.selectedColdKeyId = action.payload;
    },
  },
});

export const { setSelectedColdKeyId } = globalSlice.actions;

export default globalSlice.reducer;
