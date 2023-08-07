import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import { Link, useSearchParams } from "react-router-dom"

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





  return (
    <div>
      <div><Link to={"/qna/list"}>1:1문의</Link></div>
      <div> <Link to={"/review/list"}>내 리뷰 정보</Link></div>
      <div> <Link to={"/order/list"}>내 주문 내역</Link></div>
      <div> <Link to={"/member/update"}>내 정보 수정</Link></div>

    </div>
  );
}

export default MyComponent;