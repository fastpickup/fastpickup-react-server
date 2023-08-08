import { useSelector } from "react-redux";
import axios from "axios"
import { useState } from "react";
import { createSearchParams } from "react-router-dom";

const OrderButtonComponent = ({pno, sno, productPrice}) => {

  const count = useSelector(state => state.count)

  const {email} = useSelector(state => state.login)


  //console.log(count)

  const handlePayment = () => {
    const payState = {pno, sno, email, total: (productPrice * count.qty), orderCount: count.qty}
    //console.log(payState)
    const queryString = createSearchParams(payState).toString();
    axios.post(`http://localhost:8081/kakaoPay/pay?${queryString}`)
      .then(response => {
        console.log('Response:', response.data);
        const url = response.data; // 서버로부터 받은 URL
        window.location.href = url; // 받은 URL로 리다이렉트
        //window.open(url);
      })
      .catch(error => {
        console.error('There was an error calling the endpoint:', error);
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