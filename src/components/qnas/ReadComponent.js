import { useEffect, useState } from "react";
import { readQna, readQnaReply } from "../../api/qnaAPI";

// QnaDTO
const initState = {
  qno: 0,
  qnaTitle: '',
  qnaContent: '',
  registDate: "",
  updateDate: "",
  email: ''
}

// replyReadDTO
const initState2 = {
  rno: 0,
  qno: 0,
  email: '',
  reply: '',
  replyDate: ""
}


const ReadComponent = ({ qno, moveList, moveUpdate }) => {

  const [readData, setReadData] = useState(initState)

  const [reply, setReply] = useState(initState2)

  //console.log(qno)

  useEffect(() => {

    readQnaReply(qno).then(data => {
      //console.log('replydata : ', data)
      setReply(data)
    })
  }, [qno])

  useEffect(() => {

    readQna(qno).then(data => {
      //console.log(data)
      setReadData(data)
    })

  }, [qno])

  return (
    <div>
      <div className="text-l font-normal mt-3">
        {readData.email}
        <span className="text-sm font-normal text-[#5f5f5f] ml-2">{readData.registDate.split('T')[0]}</span>
      </div>
      <div className="text-xl font-medium mt-3">
        {readData.qnaTitle}
      </div>
      <div className="text-[#757575] mt-3">
        {readData.qnaContent}
      </div>

      <div className="flex mt-5 justify-end">
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2"
          onClick={moveList}
        >
          목록
        </button>
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
          onClick={() => moveUpdate(readData.qno)}
        >
          수정
        </button>
        
      </div>

      <div className="border p-5 mt-5 border-[#eee] bg-gray-100 rounded-md">
        {reply.rno > 1 ? (
          <>
            <div className="text-xl font-medium">
              관리자
              <span className="text-[15px] font-normal text-[#5f5f5f] ml-2">{reply.replyDate.split('T')[0]}</span>
            </div>
            <div className="text-[#757575] mt-3">
              {reply.reply}
            </div>
          </>
        ) : (
          <>
            <div className="text-xl font-medium">
              관리자
            </div>
            <div className="text-[#757575] mt-3">
              아직 등록된 답변이 없습니다.
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default ReadComponent;