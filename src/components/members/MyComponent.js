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

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    // 토큰 삭제
    deleteToken(messaging).then(() => {
      getToken(messaging, { vapidKey: `BM5dOQVKVrBlXo4fzzTzbAoY_2KbPLNl0Q2txRKBBVa69k5d0iP0Wxgip-1z9gNSqkI86VXcCQT7lMU9nHBqFDg` })
      .then((newToken) => {
        console.log('New token:', newToken);
        console.log('EMAIL', email)
        postUpdateTokenValue(newToken, email)
        // 필요한 작업 수행, 예를 들어 토큰을 서버로 보내기 등
      })
      .catch((err) => {
        console.error('Error getting new token', err);
      });
  },);


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