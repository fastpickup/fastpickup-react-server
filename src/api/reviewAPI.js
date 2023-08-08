import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { createSearchParams } from "react-router-dom"

// List
export const getReviewList = async (email ,queryObj) => {

    // queryObj를 URL 쿼리 문자열로 변환한 후 문자열로 저장
    const queryString = createSearchParams(queryObj)

    // QueryString을 axios.get 메소드 요청 URL 파라미터로 사용
    const res = await jwtAxios.get(`http://localhost:8081/api/review/member/${email}?${queryString}`)

    return res.data

}

// Read

export const getReivewSelectOne = async(rno, queryObj) => {

    const queryString = createSearchParams(queryObj)

    const res = await jwtAxios.get(`http://localhost:8081/api/review/read/${rno}?${queryString}`)
    
    return res.data

}

// file upload
export const uploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await jwtAxios.post(`http://localhost:8081/api/files/upload`,formData, header)

    return res.data

}