import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { getMemberREad } from "../../api/memberAPI"
import axios from "axios"
import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux"
import { postUpdateTokenValue } from "../../api/fcmTokenAPI"
import { requestSignOut } from "../../reducers/loginSlice"



const MyComponent = () => {

  const [params] = useSearchParams()

  const dataStr = params.get("data")

  const {email} =  useSelector(state => state.login)

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const dataObj = JSON.parse(dataStr)
  useEffect(() => {

    const loadCookie = () => {
      const loginObj = getCookie("login")

      // console.log("login……………cookie……………")
      // console.log(loginObj)

      if (loginObj) {
        return
      }

      return setCookie("login", JSON.stringify(dataObj), 1)
    }

    loadCookie()
    //setQuery(parsed)
  }, [])

  const firebaseConfig = {
    apiKey: "AIzaSyAHOtZVYBB8hnUq_SYKsEDQwifF0vuFKSM",
    authDomain: "fastpickup-12231.firebaseapp.com",
    projectId: "fastpickup-12231",
    storageBucket: "fastpickup-12231.appspot.com",
    messagingSenderId: "287215754000",
    appId: "1:287215754000:web:18c00a656f4c6443272395",
    measurementId: "G-TWRBB24Q37"
  };

  useEffect(() => {
    // Firebase 초기화
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
  
    // 로컬 스토리지에서 토큰 존재 여부 확인
    const existingToken = localStorage.getItem('fcmToken');
  
    if (existingToken) {
      // 토큰이 이미 존재하면 삭제 후 새 토큰 발급
      deleteToken(messaging).then(() => {
        getTokenAndSend(messaging, email);
      });
    } else {
      // 최초 로그인 시 토큰 발급
      getTokenAndSend(messaging, email);
    }
  }, []);
  
  // 토큰 발급 및 서버로 전송
  const getTokenAndSend = (messaging, email) => {
    getToken(messaging, { vapidKey: 'BM5dOQVKVrBlXo4fzzTzbAoY_2KbPLNl0Q2txRKBBVa69k5d0iP0Wxgip-1z9gNSqkI86VXcCQT7lMU9nHBqFDg' })
      .then((newToken) => {
        console.log('New token:', newToken);
        console.log('EMAIL', email);
        postUpdateTokenValue(newToken, email);
        // 토큰을 로컬 스토리지에 저장
        //localStorage.setItem('fcmToken', newToken);
      })
      .catch((err) => {
        console.error('Error getting new token', err);
      });
  };

  return (
    <div>
      <ul className="mt-5 flex flex-wrap justify-around">
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/qna/list"}
          >
            <img src={require("../../images/mypage_qna.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            문의 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/review/list"}
          >
          <img src={require("../../images/mypage_review.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            리뷰 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/order/list"}
          >
          <img src={require("../../images/mypage_order.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            주문 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/member/update"}
          >
          <img src={require("../../images/mypage_member.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            내 정보 관리
          </Link>
        </li>
      </ul>
      <div className="absolute left-1/2 bottom-5 -translate-x-1/2">
        <button
          className="text-[17px] underline"
          onClick={() => {
            dispatch(requestSignOut())
            navigate("/")
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyComponent;