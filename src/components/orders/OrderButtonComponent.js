import { useSelector } from "react-redux";
import axios from "axios"

const OrderButtonComponent = ({productPrice}) => {

  const count = useSelector(state => state.count)

  //console.log(count)

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
      <button
        onClick={handlePayment}
      >
        주문 금액: {(productPrice * count.qty).toLocaleString()}
      </button>
    </div>
  );
}

export default OrderButtonComponent;