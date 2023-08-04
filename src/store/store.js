import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/loginSlice";

export default configureStore({
  reducer: {
    login: loginSlice
  }
})