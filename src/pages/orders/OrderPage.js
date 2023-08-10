import { useParams } from "react-router-dom";
import OrderComponent from "../../components/orders/OrderComponent";

const OrderPage = () => {
  
  const {pno} = useParams()

  //console.log(pno)

  return (
    <div>
      <OrderComponent
        pno={pno}
      >
      </OrderComponent>
    </div>
  );
}

export default OrderPage;