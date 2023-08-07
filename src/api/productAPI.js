import axios from "axios"
import jwtAxios from "../util/jwtUtil"

//Category List Get
export const getCateList = async () => {
  const res = await axios.get("http://localhost:8081/api/product/category")
  return res.data
}