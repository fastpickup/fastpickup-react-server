import { useEffect, useState } from "react";
import ListPageComponent from "../common/ListPageComponent";
import { getProductList } from "../../api/productAPI";
import { useNavigate } from "react-router-dom";

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

const ListComponent = ({sno, queryObj, movePage, moveRead}) => {

  const [productList, setProductList] = useState(initState)

  const navigate = useNavigate()

  useEffect(() => {
    getProductList(sno, queryObj).then(data => {
      //console.log(data.list)
      setProductList(data.list)
    })
  }, [queryObj])

  const handleClickOrder = (pno) => {
    navigate(`/order/order/${pno}`)
  }

  return (
    <div>
      상품 리스트 컴포넌트
      <ul>
        {productList.list.map(({pno, productName, productPrice, recStatus, registDate, fileName, likeCount}) => 
          <li
            key={pno}
            onClick={() => handleClickOrder(pno)}
          >
            <div>{productName}</div>
            <div>{productPrice}</div>
            <div>{registDate}</div>
            <div>{recStatus === 1 ? "추천상품" : ""}</div>
            <div>{likeCount}</div>
            <div><img src={`http://192.168.0.64/s_${fileName}`} /></div>
          </li>
        )}
      </ul>

      <ListPageComponent movePage={movePage} {...productList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;