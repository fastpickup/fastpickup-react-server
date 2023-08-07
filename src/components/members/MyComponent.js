import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import queryString from "query-string"
import { useSearchParams } from "react-router-dom"

const MyComponent = () => {

  //const [query, setQuery] = useState({});

  const [params] = useSearchParams()

  const dataStr = params.get("data")

  console.log(dataStr)

  const dataObj = JSON.parse(dataStr)

  console.log(dataObj)


  useEffect(() => {
    let parsed = queryString.parse(window.location.search);

    if (Object.keys(parsed).length === 0) return;
    const loadCookie = () => {
      const loginObj = getCookie("login")

      console.log("login……………cookie……………")
      console.log(loginObj)

      if (loginObj) {
        return
      }

      return setCookie("login", JSON.stringify(parsed), 1)
    }

    loadCookie()
    //setQuery(parsed)
  }, [])



  return (
    <div>
      내 정보 페이지
    </div>
  );
}

export default MyComponent;