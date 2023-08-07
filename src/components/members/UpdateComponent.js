import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import { deleteMember, getMember, getMemberUpdate, postMemberUpdate } from "../../api/memberAPI";
import { getCookie } from "../../util/cookieUtil";
import { json, useNavigate } from "react-router-dom";


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
    console.log(data)
  }, []); // 의존성 배열이 비어 있음

  // Get Member Update Data 
  useEffect(() => {
    console.log("data.email has changed:", data.email);
    getMemberUpdate(data.email).then(res => {
      setMember({
        ...res.member,
        email: data.email, // 이메일 값을 추가
      });
    });
  }, [data.email]);


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

  // Member Update 
  const handleUpdateClick = async () => {
    console.log("Sending member update:", member);
    alert("회원 정보 수정 완료")
    const result = await postMemberUpdate(member);
    navigate("/member/mypage")
  }

  // Member Delete 
  const handleDeleteClick = async () => {
    console.log("sending Email Delete")
    const result = await deleteMember(data.email);
    alert("회원 탈퇴 완료")
    navigate("/")
  }

  // KakaoPay
  const handleKakaoPayClick = () => {
    fetch('http://localhost:8081/joon/pay/kakaopay.cls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.result && data.result !== "NO") {
          // 카카오페이 페이지로 리다이렉트 코드 추가
          // 예: window.location.href = data.next_redirect_url;
        } else {
          alert("카카오페이 결제 준비 실패");
        }
      })
      .catch(error => {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
        console.error(error);
      });
  };



  return (
    <div>

      <div>
        이메일:
        <input type="email" name="email" value={member.email} readOnly onChange={handleInputChange} />
      </div>

      <div>
        이름:
        <input type="text" name="memberName" value={member.memberName} required onChange={handleInputChange} />
      </div>

      <div>
        패스워드:
        <input type="password" name="memberPw" value={member.memberPw} required onChange={handleInputChange} />
      </div>

      <div>
        전화번호:
        <input type="text" name="memberPhone" value={member.memberPhone} required onChange={handleInputChange} />
      </div>

      <div>
        <button onClick={handleUpdateClick}>회원 정보 수정</button>
      </div>

      <div>
        <button onClick={handleDeleteClick}>회원 탈퇴</button>
      </div>

      <div>
        <button onClick={handleKakaoPayClick}>카카오페이로 결제하기</button>
      </div>

    </div>
  );
}

export default UpdateComponent;