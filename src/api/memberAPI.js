import axios from "axios"

export const postLogin = async(params) => {
  const formData = new URLSearchParams();
  formData.append('username', params.username);
  formData.append('password', params.password);

  const res = await axios.post("http://localhost:8081/api/member/login", formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return res.data
}