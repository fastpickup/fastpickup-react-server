import axios from "axios"
import jwtAxios from "../util/jwtUtil"

// Login Form Data UserName , Password Post 
export const postLogin = async (params) => {
  const formData = new URLSearchParams();
  formData.append('username', params.username);
  formData.append('password', params.password);

  const res = await axios.post("http://localhost:8081/api/member/login", formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data
}

// Post Api Member Update 
export const postMemberUpdate = async (params) => {
  const res = await jwtAxios.put(`http://localhost:8081/api/member/update`, params)
  return res.data;
}

// Get API Member Update 
export const getMemberUpdate = async (email) => {
  const res = await jwtAxios.get(`http://localhost:8081/api/member/update/${email}`)
  return res.data;
}

// Post Api Member Create
export const postMemberCreate = async (params) => {
  const res = await jwtAxios.post(`http://localhost:8081/api/member/create`, params)
  return res.data;
}

// Get Api Member Read 
export const getMemberREad = async (email) => {
  const res = await jwtAxios.get(`http://localhost:8081/api/member/read/${email}`)
  return res.data;
}

// Delete Api Member Delete 
export const deleteMember = async (email) => {
  const res = await jwtAxios.delete(`http://localhost:8081/api/member/delete/${email}`)
  return res.data
}

// Get Refresh Token 
export const refreshAccessToken = async (refreshToken) => {
  const res = await jwtAxios.get('http://localhost:8081/api/member/refresh', {
    headers: { 'Authorization': `Bearer ${refreshToken}` }
  });
  return res.data;
}
