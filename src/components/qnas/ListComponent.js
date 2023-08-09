import { useEffect, useState } from "react"
import { listQna } from "../../api/qnaAPI"
import { Link } from "react-router-dom"
import ListPageComponent from "../common/ListPageComponent"
import { useSelector } from "react-redux"

// PageResponseDTO
const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 0,
  size: 0,
  requestDTO: null
}


const ListComponent = ({ queryObj, moveRead, movePage }) => {

  const [qnaList, setQnaList] = useState(initState)

  const { email } = useSelector(state => state.login)

  console.log(qnaList)

  console.log(email)

  useEffect(() => {
    listQna(email, queryObj).then(data => {
      console.log("-----------")
      console.log(data)

      setQnaList(data)

    })

  }, [email, queryObj])

  return (
    <div>
      <div>
      <ul>
        {qnaList.list.map((dto) => (
            <li
            key={dto.qno}
            onClick={() => moveRead(dto.qno)}
            className="flex justify-between gap-x-6 py-2"
          >
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 ">
                {dto.qno}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {dto.qnaTitle}
                </p>

              </div>
            </div>
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{dto.registDate}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end"> 
        <Link to="/qna/register" className="px-4 py-2 ml-3 bg-black text-white rounded-md">문의 등록</Link> {/* 버튼으로 꾸미기 */}
      </div>
      </div>

      <ListPageComponent movePage={movePage} {...qnaList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;