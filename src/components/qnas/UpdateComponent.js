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

  const [qnaData, setQnaData] = useState(initState)

  useEffect(() => {
    readQna(qno).then(data => {
      setQnaData(qno)
    })
  })

  const handleClickUpdate = () => {
    updateQna(qna).then(data => {
      alert("수정 되었습니다.")
      moveRead(qno)
    })
  }

  const handleChange = (e) => {
    qnaData[e.target.name] = e.target.value
    setQnaData({...qnaData})

  }

  return (
    <div>
      Component
    </div>
  );
}

export default UpdateComponent;