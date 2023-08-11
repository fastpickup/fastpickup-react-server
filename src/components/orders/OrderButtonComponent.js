import { useSelector } from "react-redux";
import axios from "axios"
import { useState } from "react";
import { createSearchParams } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import { createFcmOrderAndToken } from "../../api/fcmTokenAPI";

const OrderButtonComponent = ({pno, sno, productPrice, email}) => {

const token = getCookie("Token");

  const count = useSelector(state => state.count)
  const userEmail = useSelector(state => state.login)
  
  // console.log("어드민 이메일:", email)
  // console.log(count)
  // console.log("유저 이메일: :",userEmail.email)

  const user = {
    email: userEmail,
    fcmToken: token
  }

  const message = {
    email: email,
    title: "주문 접수 알람",
    body: "주문이 접수 되었습니다."
  }

  const handlePayment = () => {
    // FCM Message 
    //console.log('Sending FCM message:', message); // 메시지 내용 출력
    createFcmOrderAndToken(message)
      .then(response => {
        //console.log('FCM message sent successfully:', response); // 성공 응답 출력
        const payState = {pno, sno, email: userEmail.email, total: (productPrice * count.qty), orderCount: count.qty}
        //console.log(payState)
        const queryString = createSearchParams(payState).toString();
        axios.post(`http://localhost:8081/kakaoPay/pay?${queryString}`)
          .then(response => {
            //console.log('Response:', response.data);
            const url = response.data; // 서버로부터 받은 URL
            window.location.href = url; // 받은 URL로 리다이렉트
          })
          .catch(error => {
            console.error('There was an error calling the endpoint:', error);
          });
      })
      .catch(error => {
        console.error('There was an error sending the FCM message:', error);
      });
  };

  return (
    <div className="w-[calc(100%-125px)] h-[50px] bg-[#ae2d33] rounded-lg">
      <button
        className="block text-center w-full px-3 leading-[50px] text-lg text-white font-medium"
        onClick={handlePayment}
      >
        <span className="text-xl">{(productPrice * count.qty).toLocaleString()}</span> 결제
      </button>
    </div>
  );
}

export default OrderButtonComponent;