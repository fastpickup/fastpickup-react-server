import { useEffect, useState } from "react";
import { deleteQna, readQna, updateQna } from "../../api/qnaAPI";

// QnaDTO
const initState = {
  qno: 0,
  qnaTitle: '',
  qnaContent: '',
  registDate: 0,
  updateDate: 0,
  email: ''
}

const UpdateComponent = ({ qno, moveRead, moveList }) => {

  const [qna, setQna] = useState(initState)

  useEffect(() => {
    readQna(qno).then(data => {
      //console.log(data)
      setQna(data)
    })
  }, [qno])

  const handleClickUpdate = () => {
    updateQna(qna).then(data => {
      alert("수정 되었습니다.")
      moveRead(qno)
    })
  }

  const handleChange = (e) => {
    qna[e.target.name] = e.target.value
    setQna({ ...qna })
  }

  const handleClickDelete = () => {
    deleteQna(qno).then(data => {
      alert("삭제 되었습니다.")
      moveList()
    })
  }

  return (
    <div>
      <dl>
        <dt className="mt-5">문의자</dt>
        <dd className="mt-2">
          {qna.email}
        </dd>
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
        <button className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2" onClick={() => moveRead(qno)}>
          상세
        </button>
        <button className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2" onClick={handleClickUpdate}>
          수정
        </button>
        <button
          className="w-20 h-10 text-white bg-black rounded-md"
          onClick={handleClickDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default UpdateComponent;