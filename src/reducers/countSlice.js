import { createSlice } from "@reduxjs/toolkit"

const initState = {
  qty: 1
}

const countSlice = createSlice({
  name: "CountSlice",
  initialState: initState,
  reducers: {
    inc: (state, param) => {

      if(state > 10){
        return
      }

      return state++
    },
    dec: (state, param) => {
      if(state < 1){
        return
      }
      return state--
    }
  }
})