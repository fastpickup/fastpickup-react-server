import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";

//axios에 추가적인 옵션을 추가할 때 axios.create()
const jwtAxios = axios.create()

//https://axios-http.com/kr/docs/interceptors
//요청이 전달되기 전에 작업 수행
const beforeReq = (config) => {
  //console.log("beforeRequest....................................", config)

  const {accessToken} = getCookie("login")
  //console.log("AccessToken 값: ",getCookie("login"))

  if(!accessToken){
    throw new Error("No ACCESS TOKEN")
  }
  
  config.headers.Authorization = `Bearer ${accessToken}`

  return config
}

//요청 오류가 있는 작업 수행
const requestFail = (err) => {
  //console.log("requestFail....................................", err)

  return Promise.reject(err)
}

//2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//응답 데이터가 있는 작업 수행
const beforeRes = async(res) => {
  //console.log("2xx Response....................................", res)

  if(res.data.error === "ERROR_ACCESS_TOKEN"){
    //console.log("Access Token has Expired")

    const newAccessToken = await refreshJWT()

    //console.log("newAccessToken", newAccessToken);
    const originalRequest = res.config

    //console.log("오리지널리퀘스트", originalRequest)

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

    return await axios(originalRequest)
  }

  return res
}

const refreshJWT = async() => {
  const cookieValue = getCookie("login")

  const {accessToken, refreshToken} = cookieValue

  const header = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }

  const res = await axios.post(`http://localhost:8081/api/member/refresh?refreshToken=${refreshToken}`, null, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  
  //console.log("Refresh Token....................................", res)
  //console.log(res.data)

  cookieValue.accessToken = res.data.accessToken
  cookieValue.refreshToken = res.data.refreshToken

  setCookie("login", JSON.stringify(cookieValue), 1)

  return cookieValue.accessToken
}
//2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//응답 오류가 있는 작업 수행
const responseFail = (err) => {
  //console.log("response Fail....................................", err)

  return Promise.reject(err)
}

//jwtAxios로 인터셉터할 때 사용할 것들을 정의
jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios;