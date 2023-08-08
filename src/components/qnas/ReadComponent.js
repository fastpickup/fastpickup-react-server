import { useEffect, useState } from "react";
import { deleteQna, readQna, readQnaReply } from "../../api/qnaAPI";

// QnaDTO
const initState = {
  qno : 0,
  qnaTitle : '',
  qnaContent : '',
  registDate : 0,
  updateDate : 0,
  email : ''
}

// replyReadDTO
const initState2 = {
  rno : 0,
  qno : 0,
  email : '',
  reply : '',
  replyDate : 0
}


const ReadComponent = ({qno, moveList, moveUpdate}) => {

  const [readData, setReadData] = useState(initState)

  const [reply, setReply] = useState(initState2)

  const handleClickDelete = () => {

    deleteQna(qno).then(data => {
      alert("삭제 되었습니다.")
      moveList()
    })

  }

  console.log(qno)

  useEffect(() => {

    readQnaReply(qno).then(data => {
      console.log('replydata : ', data)
      setReply(data)
    })
  }, [qno])

  useEffect(() => {

    readQna(qno).then(data => {
      console.log(data)
      setReadData(data)
    })

  }, [qno])

  return (
<div >
  <div className="max-w-md mx-auto border-2 border-gray-200 bg-white shadow-md p-6 rounded-md mt-4">
  <div className="mb-4">
    <h1 className="text-lg font-bold text-gray-800 mb-2">문의 정보</h1>
    <div className="border-b border-gray-300"></div>
  </div>
  <div className="mb-4">
    <p className="text-sm text-gray-600">문의번호: {readData.qno}</p>
    <p className="text-sm text-gray-600">문의자: {readData.email}</p> 
    <p className="text-sm text-gray-600">문의 일자: {readData.updateDate}</p>
    <p className="text-sm text-gray-600">문의 제목: {readData.qnaTitle}</p>
    <p className="text-sm text-gray-600">문의 내용: {readData.qnaContent}</p>
  </div>

  <div className="mb-4 flex justify-end">
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-sm text-sm"
      onClick={() => moveUpdate(readData.qno)}
    >
      수정
    </button>
    <button
      className="bg-gray-800 text-white font-bold py-2 px-4 rounded-sm text-sm ml-2"
      onClick={moveList}
    >
      목록
    </button>
    <button
      className="bg-red-800 text-white font-bold py-2 px-4 rounded-sm text-sm ml-2"
      onClick={handleClickDelete}
    >
      삭제
    </button>
  </div>
  </div>

  <div className="max-w-md mx-auto border-2 border-red-700 bg-white shadow-md p-6 rounded-md mt-5">
    {reply.rno > 1 ? (
      <div>
        <p className="text-lg font-bold text-gray-800 mb-2">등록된 답변</p>
        <div className="border-b border-gray-300"></div>
        <p className="text-sm text-gray-600">답변 작성자: {reply.email}</p>
        <p className="text-sm text-gray-600">답변 내용: {reply.reply}</p>
        <p className="text-sm text-gray-600">답변 일자: {reply.replyDate}</p>
      </div>
    ) : (
      <div>
        <p className="text-lg font-bold text-gray-800 mb-2">등록된 답변</p>
        <div className="border-b border-gray-300"></div>
        <p className="text-sm text-gray-600 mt-2">등록된 답변 없음</p>
      </div>
    )}
  </div>
</div>
  );
}

export default ReadComponent;