import { useEffect, useState } from "react";
import { readQna, updateQna } from "../../api/qnaAPI";

// QnaDTO
const initState = {
  qno : 0,
  qnaTitle : '',
  qnaContent : '',
  registDate : 0,
  updateDate : 0,
  email : ''
}

const UpdateComponent = ({qno, moveRead, moveList}) => {

  const [qna, setQna] = useState(initState)

  useEffect(() => {
    readQna(qno).then(data => {
      console.log(data)
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
    setQna({...qna})

  }

  return (
    <div>
<div className="m-2 p-2 border-2 rounded-md bg-gray-100">
  <p className="text-lg text-gray-800">문의 번호 : {qna.qno}</p>
</div>

<div className="m-2 p-2 border-2 rounded-md bg-gray-100">
  <p className="text-lg text-gray-800">문의자 : {qna.email}</p>
</div>

<div className="m-2 p-2 border-2 bg-gray-100 rounded-md"> 문의 제목 :
  <input
    type="text" 
    name="qnaTitle"
    value={qna.qnaTitle}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-md mt-2 "
  />
</div>

<div className="m-2 p-2 border-2 bg-gray-100 rounded-md"> 문의 내용 :
  <input 
    type="text" 
    name="qnaContent"
    value={qna.qnaContent}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-md mt-2"
  />
</div>


  <div className="flex justify-end">
    <button className="bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded-sm" onClick={handleClickUpdate}>
      수정
    </button>

    <button className="bg-gray-800 text-white font-bold py-2 px-4 m-2 rounded-sm" onClick={moveList}>
      목록
    </button>
  </div>
</div>
);
}

export default UpdateComponent;