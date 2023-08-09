import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import { Link, useSearchParams } from "react-router-dom"
import { getMemberREad } from "../../api/memberAPI"
import axios from "axios"
import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { useSelector } from "react-redux"
import { postUpdateTokenValue } from "../../api/fcmTokenAPI"



const MyComponent = () => {

  //const [query, setQuery] = useState({});

  const [params] = useSearchParams()

  const dataStr = params.get("data")

  const {email} =  useSelector(state => state.login)

  console.log(dataStr)

  const dataObj = JSON.parse(dataStr)

  console.log(dataObj)


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
        localStorage.setItem('fcmToken', newToken);
      })
      .catch((err) => {
        console.error('Error getting new token', err);
      });
  };  

  const handlePayment = () => {
    axios.post('http://localhost:8081/kakaoPay/pay')
      .then(response => {
        console.log('Response:', response.data);
        const url = response.data; // 서버로부터 받은 URL
        window.location.href = url; // 받은 URL로 리다이렉트
      })
      .catch(error => {
        console.error('There was an error calling the endpoint:', error);
      });
  };

 

  

  return (
    <div>
      <div><Link to={"/qna/list"}>1:1문의</Link></div>
      <div> <Link to={"/review/list"}>내 리뷰 정보</Link></div>
      <div> <Link to={"/order/list"}>내 주문 내역</Link></div>
      <div> <Link to={"/member/update"}>내 정보 수정</Link></div>

      <div>
        <button onClick={handlePayment}>카카오페이로 결제하기</button>
      </div>

    </div>
  );
}

export default MyComponent;