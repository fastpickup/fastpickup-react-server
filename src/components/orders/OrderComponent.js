import { useEffect, useState } from "react";
import { getOrderList } from "../../api/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { dec, inc } from "../../reducers/countSlice";
import OrderButtonComponent from "./OrderButtonComponent";

const initState = {
  fileNames: [],
  productName: "",
  productContent: "",
  productPrice: 0,
  storeName: "",
  email: ""
}

const OrderComponent = ({pno}) => {

  const [order, setOrder] = useState(initState)

  const count = useSelector(state => state.count)

  //console.log('오더컴포넌트',order)

  const dispatch = useDispatch()

  useEffect(() => {
    getOrderList(pno).then(data => {
      //console.log(data.dto)
      setOrder(data.dto)
    })
  }, [pno])

  //console.log(pno)
  //console.log(order)

  const handleClickInc = () => {
    dispatch(inc(1))
  }

  const handleClickDec = () => {
    dispatch(dec(1))
  }

  return (
    <div>
      <div className="pb-20">
        <ul className="overflow-y-hidden overflow-x-auto whitespace-nowrap border-b border-[#eee]">
          {order.fileNames.map( idx => 
            <li
              key={idx}
              className="inline-block"
            >
              <img src={`http://192.168.0.64/${idx}`} className="w-full" />
            </li>
          )}
        </ul>
        <div className="p-2">
          <div className="text-xl font-medium">
            {order.productName}
            {order.isRecommend === 999999999 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""}
          </div>
          <div className="text-[#757575] mt-2">{order.productContent}</div>
          <div className="flex justify-between text-xl font-medium mt-2">
            <span>가격</span>
            <span>{(order.productPrice).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <div className="fixed left-0 w-full px-3 box-border">
        <div className="flex justify-between items-center h-[60px]">
          <div className="wi-[110px] h-[40px] flex items-center border border-[#757575] rounded-lg">
            <button
              onClick={handleClickDec}
              className="block w-8 h-full border-r border-[#757575]"
            >
              <span className="block w-4 h-[2px] mx-auto bg-black"></span>
            </button>
            <span className="w-11 text-center text-black">{count.qty}</span>
            <button
              onClick={handleClickInc}
              className="relative block w-8 h-full border-l border-[#757575]"
            >
              <span className="block w-4 h-[2px] mx-auto bg-black"></span>
              <span className="absolute left-1/2 top-1/2 rotate-90 w-4 h-[2px] mx-auto bg-black -translate-x-1/2 -translate-y-1/2"></span>
            </button>
          </div>
          <OrderButtonComponent {...order}></OrderButtonComponent>
        </div>
      </div>

    </div>
  );
}

export default OrderComponent;