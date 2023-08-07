import axios from "axios"

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
  const res = await axios.get(`http://localhost:8081/api/member/update`, params)
  return res.data;
}

// Get API Member Update 
export const getMemberUpdate = async (email) => {
  const res = await axios.get(`http://localhost:8081/api/member/update/${email}`)
  return res.data;
}

// Get Api Member Read 
export const getMemberREad = async (email) => {
  const res = await axios.get(`http://localhost:8081/api/member/read/${email}`)
  return res.data;
}

// Get Refresh Token 
export const refreshAccessToken = async (refreshToken) => {
  const res = await axios.get('http://localhost:8081/api/member/refresh', {
    headers: { 'Authorization': `Bearer ${refreshToken}` }
  });
  return res.data;
}
