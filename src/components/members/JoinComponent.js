import { useState } from "react";
import { postMemberCreate } from "../../api/memberAPI";
import { useNavigate } from "react-router-dom";

const initState = {
  email: '',
  memberName: '',
  memberPw: '',
  memberPhone: ''
};


const JoinComponent = () => {

  const navigate = useNavigate();

  const [member, setMember] = useState({...initState})

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({...member})
  }

  const handleClickSave = async () => {
    console.log("Sending member Create", member)
    const result = await postMemberCreate(member)
    alert("회원 가입 완료")
    navigate("/") // return main 
  }

  return (
    <div>
     <div>회원가입 페이지</div>
     <div>
        이메일:
        <input type="email" name="email" value={member.email} required onChange={handleChange} />
      </div>

      <div>
        이름:
        <input type="text" name="memberName" value={member.memberName} required onChange={handleChange} />
      </div>

      <div>
        패스워드:
        <input type="password" name="memberPw" value={member.memberPw} required onChange={handleChange} />
      </div>

      <div>
        전화번호:
        <input type="text" name="memberPhone" value={member.memberPhone} required onChange={handleChange} />
      </div>

      <div>
        <button onClick={handleClickSave}>회원 가입!</button>
      </div>
    </div>
  );
}

export default JoinComponent;