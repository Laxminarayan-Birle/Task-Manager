import { createSlice } from "@reduxjs/toolkit";

const ShowFormSlice = createSlice({
  name: "showform",
  initialState: false,
  reducers: {
    setshowform: (state, action) => {
      return action.payload;
    },
  },
});

export const { setshowform } = ShowFormSlice.actions;
export default ShowFormSlice.reducer;
