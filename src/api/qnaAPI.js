import axios from "axios"
import { createSearchParams } from "react-router-dom"

// List
export const listQna = async (queryObj) => {

    // queryObj를 URL 쿼리 문자열로 변환한 후 문자열로 저장
    const queryString = createSearchParams(queryObj)

    // QueryString을 axios.get 메소드 요청 URL 파라미터로 사용
    const res = await axios.get(`http://localhost:8081/api/qna/list?${queryString}`)

    return res.data

}

// create
export const createQna = async (qna) => {

    const res = await axios.post(`http://localhost:8081/api/qna/create`, qna)

    return res.data

}

// read
export const readQna = async (qno) => {

    const res = await axios.get(`http://localhost:8081/api/qna/read/${qno}`)

    return res.data
}

// update
export const updateQna = async (qna) => {

    const res = await axios.put(`http://localhost:8081/api/qna/update`, qna)

    return res.data
}

// delete
export const deleteQna = async (qno) => {

    const res = await axios.delete(`http://localhost:8081/api/qna/delete/${qno}`)

    return res.data
}

// read reply
export const readQnaReply = async (qno) => {

    const res = await axios.get(`http://localhost:8081/api/qna/replies/${qno}`)

    return res.data
}

