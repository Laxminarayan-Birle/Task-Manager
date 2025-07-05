import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const FormSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    addFormdata: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFormdata } = FormSlice.actions;
export default FormSlice.reducer;
