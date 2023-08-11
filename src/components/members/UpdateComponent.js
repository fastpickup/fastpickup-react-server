import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import { deleteMember, getMember, getMemberUpdate, postMemberUpdate } from "../../api/memberAPI";
import { getCookie } from "../../util/cookieUtil";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";


const initState = {
  email: '',
  memberName: '',
  memberPw: '',
  memberPhone: ''
};

const UpdateComponent = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  const [member, setMember] = useState(initState)


  const data = useSelector(state => state.login)

  // User Email Cookie 에서 가져온다 
  useEffect(() => {
    setUserEmail(data)
    //console.log(data)
  }, []); // 의존성 배열이 비어 있음

  // Get Member Update Data 
  useEffect(() => {
    //console.log("data.email has changed:", data.email);
    getMemberUpdate(data.email).then(res => {
      setMember({
        ...res.member,
        email: data.email, // 이메일 값을 추가
      });
    });
  }, [data.email]);


  useEffect(() => {
    //console.log(member);
  }, [member]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  // Member Update 
  const handleUpdateClick = async () => {
    //console.log("Sending member update:", member);
    alert("회원 정보 수정 완료")
    const result = await postMemberUpdate(member);
    navigate("/member/mypage")
  }

  // Member Delete 
  const handleDeleteClick = async () => {
    //console.log("sending Email Delete")
    const result = await deleteMember(data.email);
    alert("회원 탈퇴 완료")
    navigate("/")
  }




  return (
    <div>
      <dl>
        <dt className="mt-5">이메일</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="email" name="email" value={member.email} readOnly onChange={handleInputChange} />
        </dd>
        <dt className="mt-5">이름</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="text" name="memberName" value={member.memberName} required onChange={handleInputChange} />
        </dd>
        <dt className="mt-5">비밀번호</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="password" name="memberPw" value={member.memberPw} required onChange={handleInputChange} />
        </dd>
        <dt className="mt-5">전화번호</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="text" name="memberPhone" value={member.memberPhone} required onChange={handleInputChange} />
        </dd>
      </dl>
      <div className="mt-5 flex justify-between">
        <button className="block w-full h-10 leading-10 text-center text-white bg-[#ae2d33] rounded-md" onClick={handleUpdateClick}>회원 정보 수정</button>
      </div>
      <div className="absolute left-1/2 bottom-5 -translate-x-1/2">
        <button className="text-[17px] underline" onClick={handleDeleteClick}>회원 탈퇴</button>
      </div>
    </div>
  );
}

export default UpdateComponent;