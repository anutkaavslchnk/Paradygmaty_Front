import { configureStore } from "@reduxjs/toolkit";
import { toDoSliceReducer } from "./slice.js";

export const store=configureStore({
    reducer:{
      todo:  toDoSliceReducer
    },
})