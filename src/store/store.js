import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/loginSlice";
import categorySlice from "../reducers/categorySlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    cate: categorySlice
  }
})