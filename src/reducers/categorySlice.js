import { createSlice } from "@reduxjs/toolkit";

const initState = {
  categoryName: ""
}

const categorySlice = createSlice({
  name: "CategorySlice",
  initialState: initState,
  reducers: {
    storeList: (state, param) => {
      //console.log("storeList....", param.payload)
      return {categoryName: param.payload}
    }
  }
})

export const { storeList } = categorySlice.actions

export default categorySlice.reducer