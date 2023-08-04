import OrderComponent from "../../components/orders/OrderComponent";

const OrderPage = () => {
  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">제목</div>
      <OrderComponent></OrderComponent>
    </div>
  );
}

export default OrderPage;