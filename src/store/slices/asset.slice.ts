import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  openai: { name: string; total_available: number; total_used: number; total_granted: number }[];
  vps: any[];
  oblivus: any;
  datacrunch:any;
  shadeform:any;
} = {
  openai: [],
  vps: [],
  oblivus: null,
  datacrunch:null,
  shadeform:null,
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setOpenAIStatus: (state, action) => {
      state.openai = action.payload;
    },
    setVPSStatus: (state, action) => {
      state.vps = action.payload;
    },
    setOblivusStatus: (state, action) => {
      const data = action.payload;
      const credit = Number(data?.credit?.data?.balance) || 0;
      const list = data?.list?.data || [];
      state.oblivus = { credit, list };
    },
    setDataCrunchStatus:(state, action)=> {
      const data = action.payload
      const balance = data?.balance?.amount || 0
      const instances = data?.instances || [];
      state.datacrunch = {balance, instances}
    },
    setShadeformStatus:(state, action)=> {
      const data = action.payload
      const balance = Number(data?.balance) || 0
      const instances = data?.instances || [];
      state.shadeform = {balance, instances}
    }
  },
});

export const { setOpenAIStatus, setVPSStatus, setOblivusStatus, setDataCrunchStatus, setShadeformStatus } = assetSlice.actions;

export default assetSlice.reducer;
