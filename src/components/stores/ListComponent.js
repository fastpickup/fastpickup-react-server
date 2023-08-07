import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listStore } from "../../api/storeAPI";
import ListPageComponent from "../common/ListPageComponent";
import { useSelector } from "react-redux";

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

const ListComponent = ({ movePage, moveRead, queryObj }) => {

  const navigate = useNavigate();

  const [storeList, setStoreList] = useState(initState);

  const [params] = useSearchParams()

  const cate = params.get("cate")
  console.log("카테고리명: ",cate)

  const categoryName = decodeURIComponent(cate);
  console.log("카테고리명: ",categoryName)

  // Store List 
  useEffect(() => {
    console.log(categoryName)
    listStore(categoryName, queryObj).then(res => {
      console.log(res)
      setStoreList(res.list)
    })
  }, [categoryName, queryObj])

  // 가맹점 상세페이지 가기
  const moveStoreRead = (sno) => {
    console.log("Navigating to Store", sno)
    navigate(`/store/read/${sno}`)
  }

  return (
    <div>
      <div>가맹점 리스트</div>
      <div>
        <ul>
          {storeList.list.map(({ cno, sno, pno, categoryName, fileName }) => {
            return (
              <li key={sno}>
                <div onClick={() => moveStoreRead(sno)}>가맹점 번호: {sno}</div>
                <div>카테고리 명: {categoryName}</div>
                <div><img src={`http://192/168.0.64/s_${fileName}`} /></div>
              </li>
            );
          })}
        </ul>
      </div>
      <ListPageComponent movePage={movePage} {...storeList}></ListPageComponent>
    </div>

  );
}

export default ListComponent;