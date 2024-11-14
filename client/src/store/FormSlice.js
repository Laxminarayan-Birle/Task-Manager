import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const FormSlice = createSlice({
  name: "formdata",
  initialState: [],
  reducers: {
    addFormdata: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFormdata } = FormSlice.actions;
export default FormSlice.reducer;
