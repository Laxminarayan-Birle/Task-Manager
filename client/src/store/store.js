import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import FormSlice from "./FormSlice";
import Loadslice from "./Loadslice";
import ShowFormSlice from "./ShowFormSlice";
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    formdata: FormSlice,
    loadui: Loadslice,
    showform: ShowFormSlice,
  },
});
