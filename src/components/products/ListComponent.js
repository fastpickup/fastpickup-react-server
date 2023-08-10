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
      setProductList(data)
    })
  }, [queryObj])

  const handleClickOrder = (pno) => {
    navigate(`/order/order/${pno}`)
  }

  return (
    <div>
      <ul className="mt-3">
        {productList.list.map(({pno, productName, productPrice, recStatus, fileName, likeCount}) => 
          <li
            key={pno}
            onClick={() => handleClickOrder(pno)}
            className="pb-3 mb-3 border-b border-[#eee]"
          >
            <div className="flex">
              <div className="w-[120px] overflow-hidden rounded-full">
                <img src={`http://192.168.0.64/${fileName}`} className="w-[120px] h-[120px]" />
              </div>
              <div className="flex w-[calc(100%-130px)] ml-[10px] items-center">
                <div className="text-[18px] font-medium">
                  <div>
                    {productName}
                    {recStatus === 1 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""}
                  </div>
                  <div>{productPrice.toLocaleString()}원</div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>

      <ListPageComponent movePage={movePage} {...productList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;