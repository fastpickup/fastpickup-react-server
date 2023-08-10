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
    loginInfo[e.target.name] = e.target.value
    setloginInfo({ ...loginInfo })
  }


  return (
    <div>
      {errorMsg ? <div className="text-3xl bg-blue-300">이메일과 패스워드를 다시 확인해 주세요</div> : <></>}
      <dl className="mt-5">
        <dt>이메일</dt>
        <dd className="mt-2">
          <input
            className="w-full h-10 px-2 border border-[#ccc]"
            type="email"
            name="username"
            value={loginInfo.username}
            onChange={handleChange}
          />
        </dd>
        <dt className="mt-5">비밀번호</dt>
        <dd className="mt-2">
          <input
            className="w-full h-10 px-2 border border-[#ccc]"
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <div className="mt-5 flex justify-between">
        <button
          className="w-[49%] h-10 border border-[#ae2d33] rounded-md"
          onClick={() => {
            dispatch(postLoginThunk(loginInfo)).then(() => {
              //console.log(loginInfo)
              navigate("/member/mypage")
            })
          }}
        >
          로그인
        </button>
        <Link
          className="w-[49%] h-10 leading-10 text-center bg-[#FEE500] rounded-md"
          to={"http://localhost:8081/oauth2/authorization/kakao"}
        >
          <img src={require("../../images/kakao.png")} className="inline-block h-[18px] mr-2" />
          Kakao 로그인
        </Link>
      </div>

      <div className="mt-5">
        <Link
          className="block w-full h-10 leading-10 text-center text-white bg-[#ae2d33] rounded-md"
          to={"/member/join"}
        >
          회원가입
        </Link>
      </div>

    </div>
  );
}

export default LoginComponent;