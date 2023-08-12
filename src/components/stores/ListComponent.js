import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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

const ListComponent = ({ movePage, moveRead, queryObj, categoryName }) => {

  const navigate = useNavigate();

  const [storeList, setStoreList] = useState({ ...initState });

  // const { sno } = useParams();

  // console.log("sno", sno);

  //console.log("storeList: ", storeList)
  //console.log("queryObj", queryObj)

  // Store List 
  useEffect(() => {
    listStore(categoryName, queryObj).then(data => {
      //console.log("data", data)
      setStoreList(data)
    });
  }, [categoryName, queryObj]);


  // 가맹점 상세페이지 가기
  const moveStoreRead = (sno) => {
    //console.log("Navigating to Store", sno)
    navigate(`/store/read/${sno}`)
  }

  return (
    <div>
      <ul className="mt-5">
        {storeList.list.map(({ sno, storeName, categoryName, fileName }) => {
          return (
            <li
              key={sno}
              className="mt-5 rounded-xl overflow-hidden shadow-custom"
              onClick={() => moveStoreRead(sno)}
            >
              <div className="max-h-48 overflow-hidden">
                <img className="w-full" src={`http://192.168.0.64/${fileName}`} />
              </div>
              <div className="p-5 min-h-[50px]">
                <div className="text-[18px]">{storeName}</div>
                {/* Likes: {likeCounts[sno] || 0} */}
              </div>
            </li>
          );
        })}
      </ul>
      <ListPageComponent movePage={movePage} {...storeList}></ListPageComponent>
    </div>

  );
}

export default ListComponent;