import { createSlice } from "@reduxjs/toolkit"

const initState = {
  qty: 1
}

const countSlice = createSlice({
  name: "CountSlice",
  initialState: initState,
  reducers: {
    inc: (state, param) => {
      console.log("INC: ", state, param.payload)
      if(state.qty > 9){
        return
      }

      return {qty: state.qty + param.payload}
    },
    dec: (state, param) => {
      console.log("DEC: ", state, param.payload)
      if(state.qty < 2){
        return
      }
      return {qty: state.qty - param.payload}
    }
  }
})

export const { inc, dec } = countSlice.actions

export default countSlice.reducer