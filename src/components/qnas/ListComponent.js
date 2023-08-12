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

  //console.log(qnaList)

  //console.log(email)

  useEffect(() => {
    listQna(email, queryObj).then(data => {
      //console.log("-----------")
      //console.log(data)

      setQnaList(data)

    })

  }, [email, queryObj])

  return (
    <div>
      <ul>
        {qnaList.list.map((dto) => (
            <li
            key={dto.qno}
            onClick={() => moveRead(dto.qno)}
            className="flex justify-between py-2 border-b border-[#ddd]"
          >
            <div className="flex items-center w-[calc(100%-90px)]">
              <div>
                <div className="text-sm text-[#757575]">
                  {dto.replyStatus === 0 ? "미답변" : <span className="text-[#ae2d33]">답변 완료</span>}
                </div>
                <div className="mt-1 truncate text-[16px]">
                  {dto.qnaTitle}
                </div>
              </div>
            </div>
            <div className="w-[80px]">
              <p className="text-sm leading-6 text-gray-900">{dto.registDate.split('T')[0]}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end"> 
        <Link to="/qna/register" className="w-20 h-10 text-white leading-10 text-center bg-[#ae2d33] rounded-md">등록</Link> {/* 버튼으로 꾸미기 */}
      </div>
      <ListPageComponent movePage={movePage} {...qnaList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;