import { useEffect, useState } from "react"
import { listQna } from "../../api/qnaAPI"

const initState = {
  list : [],
  totla : 0,
  page : 0,
  size : 0,
  startNum : 0,
  endNum : 0,
  prevBtn : false,
  nextBtn : false,
  pageNum : []

}


const ListComponent = ({queryObj, moveRead, movePage}) => {

  const [qnaList, setQnaList] = useState(initState)

  useEffect(()=>{
    listQna(queryObj).then(data => {
      console.log("-----------")
      console.log(data)

    })

  }, [queryObj])

  return (
    <div>
      <div className="bg-gray-100 py-4">
        <h1 className="text-3xl font-bold mb-4 text-blue-500 text-center">Qna List</h1>
        <ul className="flex flex-wrap justify-center">
          {qnaList.list.map((dto) => (
            <li
              key={dto.qno}
              onClick={() => moveRead(dto.qno)}
              className="w-1/6 mx-2 my-4 cursor-pointer bg-white rounded-lg shadow-md p-4"
            >
              <div className="text-center">
                <div className="font-bold text-lg mb-2">{dto.qno}</div>
                <div className="font-bold text-blue-500">
                  {dto.qnaTitle}
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
}

export default ListComponent;