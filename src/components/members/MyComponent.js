import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import { Link, useSearchParams } from "react-router-dom"
import { getMemberREad } from "../../api/memberAPI"
import axios from "axios"



const MyComponent = () => {

  //const [query, setQuery] = useState({});

  const [params] = useSearchParams()

  const dataStr = params.get("data")

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