import { useEffect, useState } from "react"
import { listQna } from "../../api/qnaAPI"
import { Link } from "react-router-dom"
import ListPageComponent from "../common/ListPageComponent"
import { useSelector } from "react-redux"

// PageResponseDTO
const initState = {
  list: [],
  total: 0,
  page: 0,
  size: 0,
  startNum: 0,
  endNum: 0,
  prevBtn: false,
  nextBtn: false,
  pageNum: []

}


const ListComponent = ({ queryObj, moveRead, movePage }) => {

  const [qnaList, setQnaList] = useState(initState)

  const { email } = useSelector(state => state.login)

  console.log(email)

  useEffect(() => {
    listQna(email, queryObj).then(data => {
      console.log("-----------")
      console.log(data)

      setQnaList(data)

    })

  }, [queryObj])

  return (
    <div>
      <div className="bg-gray-100 py-4">
      <ul className="flex flex-wrap justify-center ">
        {qnaList.list.map((dto, index) => (
          <li
            key={dto.qno}
            onClick={() => moveRead(dto.qno)}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-4 my-4 cursor-pointer text-left" // 글씨를 왼쪽으로 정렬
          >
            <div className="font-bold text-black">{dto.qno} - {dto.qnaTitle}</div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex "> 
        <Link to="/qna/register" className="px-4 py-2 ml-3 bg-black text-white rounded-md">문의 등록</Link> {/* 버튼으로 꾸미기 */}
      </div>
      </div>

      {/* <ListPageComponent movePage={movePage} {...qnaList}></ListPageComponent> */}
    </div>
  );
}

export default ListComponent;