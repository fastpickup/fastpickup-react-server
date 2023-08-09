import { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getCateList } from "../api/productAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initState = {
  list: []
}

const MainPage = () => {

  const [cateList, setCateList] = useState(initState)

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
      <ul className="flex flex-wrap px-2 mt-5">
        {cateList.list.map( ({categoryName}, idx) => 
          <li
            key={idx}
            className="w-1/3"
          >
            <button
              className="block w-full h-full text-center"
              type="button"
              onClick={() => {
                handleClickStoreRead(categoryName)
              }}
            >
              <span className="block">
                <img src={require(`../images/category_${categoryName}.png`)} className="inline-block w-[64px]" />
              </span>
              <span className="text-xl font-medium">{categoryName}</span>
            </button>
          </li>
        )}
      </ul>
    </BasicLayout>
  );
}

export default MainPage;