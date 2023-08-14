import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { postLogin } from "../api/memberAPI";

export const postLoginThunk = createAsyncThunk("postLoginThunk", (params) => {
  
  return postLogin(params)
})

const loadCookie = () => {
  const loginObj = getCookie("login")

  // console.log("login...............cookie...............")
  // console.log(loginObj)

  if(!loginObj){
    return initState
  }

  return loginObj
}

const initState = {
  username: "",
  memberName: "",
  password:"",
  loading: false,
  errorMsg: null
}

//log먼저 찍고 그 다음 state값 처리
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadCookie(),
  reducers: {
    requestSignOut: (state, action) => {
      const payload = action.payload
      //console.log("signOut: ", payload)
      removeCookie("login")
      return initState
    }
  },
  //extraReducers return을 하지 않아도 나온 값은 상태가됨!
  extraReducers: (builder) => {
    //fulfilled 성공
    builder.addCase(postLoginThunk.fulfilled, (state, action) => {
      //console.log("fulfilled", action.payload)
      const {username, password, memberName, errorMsg} = action.payload

      console.log("action.payload: ", errorMsg)

      if(errorMsg){
        state.errorMsg = errorMsg
        return
      }
      //서버에서 나온 진짜 데이터: action.payload
      state = action.payload

      setCookie("login", JSON.stringify(action.payload), 1)

      return {...action.payload, loading: false}
    })
    //pending 작업중
    .addCase(postLoginThunk.pending, (state, action) => {
      //console.log("pending")
      state.loading = true
    })
    //rejected 예외 발생 (200코드 아님)
    .addCase(postLoginThunk.rejected, (state, action) => {
      //console.log("rejected")
    })
  }
})

export const {requestSignOut} = loginSlice.actions

export default loginSlice.reducer