import { useEffect, useState } from "react";
import { deleteQna, readQna } from "../../api/qnaAPI";

// QnaDTO
const initState = {
  qno : 0,
  qnaTitle : '',
  qnaContent : '',
  registDate : 0,
  updateDate : 0,
  email : ''
}


const ReadComponent = ({qno, moveList, moveUpdate}) => {

  const [readData, setReadData] = useState(initState)

  const handleClickDelete = () => {

    deleteQna(qno).then(data => {
      alert("삭제 되었습니다.")
      moveList()
    })

  }

  console.log(qno)

  useEffect(() => {

    readQna(qno).then(data => {
      setReadData(data)
      console.log(data)
    })

  }, [qno])

  return (
    <div>
      <div className="m-2 p-2 border-2">
                {readData.qno}
            </div>
            <div className="m-2 p-2 border-2">
                {readData.email}
            </div>
            <div className="m-2 p-2 border-2">
                {readData.qnaTitle} 
            </div>
            <div className="m-2 p-2 border-2">
                {readData.qnaContent} 
            </div>
            <div className="m-2 p-2 border-2">
                {readData.updateDate} 
            </div>
            <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
                onClick={() => moveUpdate(readData.qno)}
                >
                    modify
                </button>
                <button className="bg-gray-800 hover:bg-red-800 text-white font-bold py-2 px-4 m-2 rounded-sm"
                onClick={moveList}
                >
                    List
                </button>
                <button className="bg-red-800 hover:bg-red-800 text-white font-bold py-2 px-4 m-2 rounded-sm"
                onClick={handleClickDelete}
                >
                    Delete
                </button>
            </div>
    </div>
  );
}

export default ReadComponent;