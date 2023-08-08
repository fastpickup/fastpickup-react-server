import { useEffect, useState } from "react";
import { getOrderList } from "../../api/productAPI";
import { useDispatch } from "react-redux";
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

  console.log('오더컴포넌트',order)

  const dispatch = useDispatch()

  useEffect(() => {
    getOrderList(pno).then(data => {
      //console.log(data.dto)
      setOrder(data.dto)
    })
  }, [pno])

  //console.log(pno)
  console.log(order)

  const handleClickInc = () => {
    dispatch(inc(1))
  }

  const handleClickDec = () => {
    dispatch(dec(1))
  }

  return (
    <div>
      <ul className="overflow-y-hidden overflow-x-auto whitespace-nowrap">
        {order.fileNames.map( idx => 
          <li
            key={idx}
            className="inline-block"
          >
            <img src={`http://192.168.0.64/${idx}`} className="h-[150px]" />
          </li>
        )}
      </ul>
      <div>{order.productName}</div>
      <div>{order.productContent}</div>
      <div>{(order.productPrice).toLocaleString()}</div>
      <div>{order.storeName}</div>
      <div>{order.email}</div>
      <div>
        <button
          onClick={handleClickInc}
        >
          증가
        </button>
        <button
          onClick={handleClickDec}
        >
          감소
        </button>
      </div>

      <OrderButtonComponent {...order}></OrderButtonComponent>
    </div>
  );
}

export default OrderComponent;