import { useState } from "react";
import { postLogin } from "../../api/memberAPI";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postLoginThunk } from "../../reducers/loginSlice";

const initState = {
  username: '',
  password: ''
}

const LoginComponent = () => {

  const loginState = useSelector(state => state.login)

  const [loginInfo, setloginInfo] = useState({ ...initState })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errorMsg = loginState.errorMsg
  console.log("errorMsg: " + errorMsg)

  const handleChange = (e) => {
    console.log('a')
    loginInfo[e.target.name] = e.target.value
    setloginInfo({ ...loginInfo })
  }


  return (
    <div>
      {errorMsg ? <div className="text-3xl bg-blue-300">이메일과 패스워드를 다시 확인해 주세요</div> : <></>}
      <div>
        <lable>이메일</lable>
        <input
          type="email"
          name="username"
          value={loginInfo.username}
          onChange={handleChange}
        />
        <lable>Password</lable>
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(postLoginThunk(loginInfo)).then(() => {
              //console.log(loginInfo)
              //navigate("/")
            })
          }}
        >
          로그인
        </button>
        <Link
          to={"http://localhost:8081/oauth2/authorization/kakao"}
        >
          Kakao 로그인
        </Link>
      </div>

      <div>
        <Link to={"/member/join"}> 회원가입 </Link>
      </div>

    </div>
  );
}

export default LoginComponent;