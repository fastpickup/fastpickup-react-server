import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/loginSlice";
import countSlice from "../reducers/countSlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    count: countSlice
  }
})