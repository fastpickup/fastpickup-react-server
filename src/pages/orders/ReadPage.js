import ReadComponent from "../../components/orders/ReadComponent";

const ReadPage = () => {
  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">주문 상세 정보</div>
      <ReadComponent></ReadComponent>
    </div>
  );
}

export default ReadPage;