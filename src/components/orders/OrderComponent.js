import { useEffect, useState } from "react";
import { getOrderList } from "../../api/productAPI";

const initState = {
  fileNames: [],
  productName: "",
  productContent: "",
  productPrice: 0,
  storeName: ""
}

const OrderComponent = ({pno}) => {

  const [order, setOrder] = useState(initState)

  useEffect(() => {
    getOrderList(pno).then(data => {
      //console.log(data.dto)
      setOrder(data.dto)
    })
  }, [pno])

  //console.log(pno)
  //console.log(order)

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
      <div>{order.productPrice}</div>
      <div>{order.storeName}</div>
      <div>
        
      </div>
    </div>
  );
}

export default OrderComponent;