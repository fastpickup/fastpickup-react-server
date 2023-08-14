import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useCustomLogin = (fn) => {

    // selector가 필요하다 
    // login 이라는 state를 뽑아온다 
    const loginInfo = useSelector(state => state.login)
    
    const navigate = useNavigate();

    useEffect(() => {
        // 받은 함수가 있으면 실행한다 
        if (fn) {
            if (!loginInfo.email) {
                fn(navigate)
            }
            return
        }

        //console.log("signed:" + loginInfo.email)
        if (!loginInfo.email) {
            navigate("/member/login")
        }
    }, [loginInfo.email])


    return { loginInfo }

}

export default useCustomLogin;