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
  
  console.log("어드민 이메일:", email)
  console.log(count)
  console.log("유저 이메일: :",userEmail.email)

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
    createFcmOrderAndToken(message)
      .then(() => {
        const payState = {pno, sno, email: userEmail.email, total: (productPrice * count.qty), orderCount: count.qty}
        //console.log(payState)
        const queryString = createSearchParams(payState).toString();
        axios.post(`http://localhost:8081/kakaoPay/pay?${queryString}`)
          .then(response => {
            console.log('Response:', response.data);
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
    <div>
      <button
        onClick={handlePayment}
      >
        주문 금액: {(productPrice * count.qty).toLocaleString()}
      </button>
    </div>
  );
}

export default OrderButtonComponent;