import { useParams } from "react-router-dom";
import OrderComponent from "../../components/orders/OrderComponent";

const OrderPage = () => {
  
  const {pno} = useParams()

  //console.log(pno)

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">제목</div>
      <OrderComponent
        pno={pno}
      >
      </OrderComponent>
    </div>
  );
}

export default OrderPage;