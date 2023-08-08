import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { createSearchParams } from "react-router-dom"

//Category List Get
export const getCateList = async () => {
  const res = await axios.get("http://localhost:8081/api/product/category")
  return res.data
}

//Store Product List Get
export const getProductList = async (sno, queryObj) => {
  // Paging 
  const queryString = createSearchParams(queryObj).toString();
  const res = await jwtAxios.get(`http://localhost:8081/api/product/${sno}/list?${queryString}`)
  return res.data
}

//Order Product Read Get
export const getOrderList = async (pno) => {
  const res = await jwtAxios.get(`http://localhost:8081/api/product/read/${pno}`)
  return res.data
}