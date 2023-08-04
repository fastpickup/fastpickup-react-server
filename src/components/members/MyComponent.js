import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../../util/cookieUtil"
import queryString from "query-string"

const MyComponent = () => {

//const [query, setQuery] = useState({});

useEffect(() => {
  let parsed = queryString.parse(window.location.search);
  if(Object.keys(parsed).length === 0) return;
  const loadCookie = () => {
    const loginObj = getCookie("login")
  
    console.log("login……………cookie……………")
    console.log(loginObj)
  
    if(loginObj){
      return
    }
  
    return setCookie("login", JSON.stringify(parsed), 1)
  }
  
  loadCookie()
  //setQuery(parsed)
},[])

// useEffect(() => {
//   const loadCookie = () => {
//     const loginObj = getCookie("login")
  
//     console.log("login……………cookie……………")
//     console.log(loginObj)
  
//     if(loginObj){
//       return
//     }
  
//     return setCookie("login", JSON.stringify({...query}), 1)
//   }
  
//   loadCookie()
// },[query])

  return (
    <div>
      Component
    </div>
  );
}

export default MyComponent;