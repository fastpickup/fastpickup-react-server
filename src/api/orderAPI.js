import { createSearchParams } from "react-router-dom";
import jwtAxios from "../util/jwtUtil"


// Get Api My Order And Order History 
export const getMyOrderAndHistory = async (email, queryObj) => {
    // Paging 
    const queryString = createSearchParams(queryObj).toString();
    const res = await jwtAxios.get(`http://localhost:8081/api/order/list/${email}?${queryString}`)
    return res.data;
}

// Get Api My Order And Order History Read 
export const readMyOrderAndHistory = async (ono) => {
    const res = await jwtAxios.get(`http://localhost:8081/api/order/read/${ono}`)
    return res.data;
}



