import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import { getMember, getMemberUpdate } from "../../api/memberAPI";
import { getCookie } from "../../util/cookieUtil";
import { json } from "react-router-dom";


const initState = {
  email: '',
  memberName: '',
  memberPw: '',
  memberPhone: ''
};

const UpdateComponent = () => {

  const [userEmail, setUserEmail] = useState("");

  const [member, setMember] = useState(initState)


  const data = useSelector(state => state.login)

  // User Email Cookie 에서 가져온다 
  useEffect(() => {
    setUserEmail(data)
    console.log(data)
  }, []); // 의존성 배열이 비어 있음

  // Get Member Update Data 
  useEffect(() => {
    console.log("=======");
    getMemberUpdate(data.email).then(res => {
      setMember(res);
      console.log(member);
    });
  }, [userEmail]);

  useEffect(() => {
    console.log(member);
  }, [member]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  return (
    <div>

      <div>
        이메일:
        <input type="email" name="email" value={data.email} readOnly onChange={handleInputChange}/>
      </div>

      <div>
        이름:
        <input type="text" name="memberName" value={data.memberName} required onChange={handleInputChange} />
      </div>

      <div>
        패스워드:
        <input type="password" name="memberPw" value={data.memberPw} required onChange={handleInputChange}/>
      </div>

      <div>
        전화번호:
        <input type="text" name="memberPhone" value={data.memberPhone} required onChange={handleInputChange}/>
      </div>

      <div>
        <button>회원 정보 수정</button>
      </div>

    </div>
  );
}

export default UpdateComponent;