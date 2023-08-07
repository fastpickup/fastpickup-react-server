import { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getCateList } from "../api/productAPI";
import { useDispatch } from "react-redux";
import { storeList } from "../reducers/categorySlice"
import { useNavigate } from "react-router-dom";

const initState = {
  list: []
}

const MainPage = () => {

  const [cateList, setCateList] = useState(initState)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClickStoreRead = (name) => {
    //dispatch(storeList(name))
    navigate(`/store/list?cate=${encodeURIComponent(name)}`)
  }

  useEffect(() => {
    getCateList().then(data => {
      //console.log(data)
      setCateList(data)
    })
  },[])


  return (
    <BasicLayout>
      <ul>
        {cateList.list.map( ({categoryName}, idx) => 
          <li key={idx}>
            <button
              type="button"
              onClick={() => {
                handleClickStoreRead(categoryName)
              }}
            >
              {categoryName}
            </button>
          </li>
        )}
      </ul>
    </BasicLayout>
  );
}

export default MainPage;