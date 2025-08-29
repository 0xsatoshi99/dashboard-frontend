import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  coldkeys: any[];
  taoPrice: number;
  team: any[];
  history: any[];
} = {
  coldkeys: [],
  taoPrice: 0,
  team: [],
  history: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    
    setColdkeys: (state, action) => {
      const coldkeys = action.payload;
      state.coldkeys = coldkeys
        .map((item: any) => {
          item.hotkeys = item.hotkeys.sort((a: any, b: any) => a.name.localeCompare(b.name));
          return item;
        })
        .sort((a: any, b: any) => b.name.localeCompare(a.name));
    },
    setTaoPrice: (state, action) => {
      state.taoPrice = action.payload;
    },
    setTeamColdkeys: (state, action) => {
      state.team = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
});

export const {  setColdkeys, setTaoPrice, setTeamColdkeys, setHistory } = globalSlice.actions;

export default globalSlice.reducer;
