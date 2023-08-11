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
<div>
      <div className="m-2 p-2 border-2  rounded-lg">
      <div className="m-2 p-2 border-b-2">
          <span className="font-bold under">문의자:</span> {readData.email}
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">문의 날짜:</span> {readData.registDate}
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">문의 제목:</span> {readData.qnaTitle}
        </div>

        <div className="m-2 p-2 bg-white rounded-lg">
        <label className=" text-gray-800 font-semibold mb-2">문의 내용:</label>
        <textarea
          name="qnaContent"
          value={readData.qnaContent}
          className="w-full px-4 py-2 border rounded-lg h-32 mt-3"
          readOnly
        ></textarea>

  <div className="mb-4 flex justify-end">
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-sm "
      onClick={() => moveUpdate(readData.qno)}
    >
      수정
    </button>
    <button
      className="bg-gray-800 text-white font-bold py-2 px-4 rounded-sm ml-2"
      onClick={moveList}
    >
      목록
    </button>
    <button
      className="bg-red-800 text-white font-bold py-2 px-4 rounded-sm ml-2"
      onClick={handleClickDelete}
    >
      삭제
    </button>
  </div>
  </div>

  <div className="max-w-md mx-auto border-2 border-red-700 bg-white shadow-md p-6 rounded-md mt-5">
    {reply.rno > 1 ? (
      <div>
      <div className="m-2 p-2 border-b-2">
      <span className="font-bold">답변자:</span> 관리자
    </div>
    <div className="m-2 p-2 border-b-2">
      <span className="font-bold">답변 날짜:</span> {reply.replyDate}
    </div>

    <div className="m-2 p-2 border-b-2">
      <span className="font-bold">답변 내용</span> <br />
      <textarea
        name="reviewContent"
        value={reply.reply}
        className="w-full h-40 border-0 mt-2"
        readOnly
      />
    </div>
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
</div>
  );
}

export default ReadComponent;