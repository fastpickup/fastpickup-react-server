import { useState } from "react";
import { createQna } from "../../api/qnaAPI";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// QnaRegistDTO
const initState = {
  qnaTitle: '',
  qnaContent: '',
  email: ''
}

const RegisterComponent = () => {

  const {email} = useSelector(state => state.login)

  //console.log(email)

  // 오류나지 않게 초기값 설정
  const [qna, setQna] = useState({ ...initState })

  // navaigate 선언
  const navigate = useNavigate()

  // 값이 변경되는 이벤트 생성
  const handleChange = (e) => {
    qna[e.target.name] = e.target.value
    qna.email=email
    setQna({ ...qna })
  }

  // regist 이벤트 생성
  const handleClickRegist = (e) => {

    createQna(qna).then(data => {
      //console.log(data)

      alert("등록되었습니다.")

      navigate("/qna/list")
    })
  }

  return (
    <div>
      <dl>
        <dt className="mt-5">제목</dt>
        <dd className="mt-2">
          <input
            type="text"
            name="qnaTitle"
            value={qna.qnaTitle}
            onChange={handleChange}
            className="w-full h-10 px-2 border border-[#ccc]"
          />
        </dd>
        <dt className="mt-5">내용</dt>
        <dd className="mt-2">
          <textarea
            name="qnaContent"
            value={qna.qnaContent}
            onChange={handleChange}
            className="w-full h-[100px] p-2 border border-[#ccc] resize-none"
          />
        </dd>
      </dl>
      <div className="flex justify-end mt-5">
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
          onClick={handleClickRegist}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default RegisterComponent;