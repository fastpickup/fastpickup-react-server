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
    //console.log("Sending member Create", member)
    const result = await postMemberCreate(member)
    alert("회원 가입 완료")
    navigate("/") // return main 
  }

  return (
    <div>
      <dl>
        <dt className="mt-5">이메일</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="email" name="email" value={member.email} required onChange={handleChange} />
        </dd>
        <dt className="mt-5">이름</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="text" name="memberName" value={member.memberName} required onChange={handleChange} />
        </dd>
        <dt className="mt-5">비밀번호</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="password" name="memberPw" value={member.memberPw} required onChange={handleChange} />
        </dd>
        <dt className="mt-5">전화번호</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="text" name="memberPhone" value={member.memberPhone} required onChange={handleChange} />
        </dd>
      </dl>
      <div className="mt-5">
        <button className="block w-full h-10 leading-10 text-center text-white bg-[#ae2d33] rounded-md" onClick={handleClickSave}>회원 가입</button>
      </div>
    </div>
  );
}

export default JoinComponent;