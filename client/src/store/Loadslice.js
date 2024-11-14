import { createSlice } from "@reduxjs/toolkit";

const Loadslice = createSlice({
  name: "loadui",
  initialState: false,
  reducers: {
    Loadpage: (state, action) => {
      return !state;
    },
  },
});

export const { Loadpage } = Loadslice.actions;
export default Loadslice.reducer;
