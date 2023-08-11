import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { createSearchParams } from "react-router-dom";

// Get Api list Store
export const listStore = async (categoryName, queryObj) => {
    // Pagigng
    const queryString = createSearchParams(queryObj).toString();
    const res = await jwtAxios.get(`http://localhost:8081/api/store/list/${categoryName}?${queryString}`)
    return res.data;
}

// Get Api Read Store 
export const readStoreApi = async(sno) => {
    const res = await jwtAxios.get(`http://localhost:8081/api/store/read/${sno}`)
    return res.data;
}

// Get Api Store Like Count 
export const fetchStoreLikeCount = async(sno) => {
    const res = await jwtAxios.get(`http://localhost:8081/api/like/sno/${sno}`)
    return res.data;
}