import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { createSearchParams } from "react-router-dom"

// My Review List
export const getReviewList = async (email ,queryObj) => {

    // queryObj를 URL 쿼리 문자열로 변환한 후 문자열로 저장
    const queryString = createSearchParams(queryObj)

    // QueryString을 axios.get 메소드 요청 URL 파라미터로 사용
    const res = await jwtAxios.get(`http://localhost:8081/api/review/member/${email}?${queryString}`)

    return res.data

}

// Store Review List
export const getReviewByStore = async (sno, page = 2) => {

    // queryObj를 URL 쿼리 문자열로 변환한 후 문자열로 저장
    // const queryString = createSearchParams(queryObj)

    // QueryString을 axios.get 메소드 요청 URL 파라미터로 사용
    const res = await jwtAxios.get(`http://localhost:8081/api/review/store/${sno}?page=${page}&&size=${20}`)

    return res.data

}

// Read My Review
export const getReivewSelectOne = async(rno, queryObj) => {

    const queryString = createSearchParams(queryObj)

    const res = await jwtAxios.get(`http://localhost:8081/api/review/read/${rno}?${queryString}`)
    
    return res.data
}

// Read My Review - StoreReview
// 내가 쓴 리뷰의 대한 가맹점 답변
export const getReviewStoreReview = async(rno) => {

    const res = await jwtAxios.get(`http://localhost:8081/api/review/store/read/${rno}`)
    
    return res.data
}


// regist Review
export const registReview = async(param) => {

    const res = await jwtAxios.post(`http://localhost:8081/api/review/regist`, param)
    
    return res.data

}

// upload File 
export const uploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await jwtAxios.post(`http://localhost:8081/api/files/upload`,formData, header)

    return res.data

}
// remove File
export const removeFile = async(fileName) => {

    const res = await jwtAxios.delete(`http://localhost:8081/api/files/remove/${fileName}`)

    return res.data

}

// update review
export const updateReview = async(param) => {

    const res = await jwtAxios.put(`http://localhost:8081/api/review/update`, param)
    
    return res.data

}

// remove review
export const removeReview = async(rno) => {

    const res = await jwtAxios.put(`http://localhost:8081/api/review/remove/${rno}`)
    
    return res.data

}

