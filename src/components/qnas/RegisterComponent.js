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

  console.log(email)

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
      console.log(data)

      alert("등록되었습니다.")

      navigate("/qna/list")
    })
  }

  return (
    <div>
        <div className="m-2">
          <div className="text-xl font-bold">
            문의 제목
          </div>
          <input
            type="text"
            name="qnaTitle"
            value={qna.qnaTitle}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
            placeholder="입력해주세요."
          />
        </div>
        <div className="m-2 mt-4">
          <div className="text-xl font-bold">
            문의 내용
          </div>
          <textarea
            name="qnaContent"
            value={qna.qnaContent}
            onChange={handleChange}
            className="border p-2 rounded w-full h-32 mt-2"
            placeholder="입력해주세요."
          />
        </div>
        <button
          className="m-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded"
          onClick={handleClickRegist}
        >
          문의 등록
        </button>
    </div>
  );
}

export default RegisterComponent;