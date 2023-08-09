import { useEffect, useState } from "react";
import { readMyOrderAndHistory } from "../../api/orderAPI";
import { useNavigate, useParams } from "react-router-dom";

const initState = {
  ono: 0,
  memberName: "",
  email: "",
  pno: "",
  sno: "",
  orderCount: 0,
  storeName: "",
  productName:"",
  storeAddress: "",
  registDate: "",
  orderStatus: "",
  totalPrice: 0,
  fileName: [],
};

const ReadComponent = () => {
  const { ono } = useParams();

  const [readOrder, setReadOrder] = useState(initState);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ono", ono);
    readMyOrderAndHistory(ono).then((res) => {
      console.log("내 주문정보 데이터: ", res);
      const updatedOrder = { ...res.result, fileName: [res.result.fileName] };
      // const updatedOrder = { ...res.result, fileName: [res.result.fileName] };
      setReadOrder(updatedOrder);
    });
  }, [ono]);

  // 리뷰 작성 버튼 클릭 시
  const handleClickReivewBtn = () => {
    navigate(`/review/register`, {
      state: {
        sno: readOrder.sno,
        ono: readOrder.ono,
        email: readOrder.email,
        productName : readOrder.productName,
        storeName : readOrder.storeName
      },
    })
  }

  return (
    <div>
      주문 상세 페이지
      <div>
        <label>주문 번호: </label>
        {readOrder.ono}
      </div>
      <div>
        <label>주문 상품: </label>
        {readOrder.productName}
      </div>
      <div>
        <label>주문 개수: </label>
        {readOrder.orderCount}
      </div>
      <div>
        <label>총 가격: </label>
        {readOrder.totalPrice}
      </div>
      <div>
        <label>주문자: </label>
        {readOrder.memberName}
      </div>
      <div>
        <label>가맹점 이름: </label>
        {readOrder.storeName}
      </div>
      <div>
        <label>가맹점 번호: </label>
        {readOrder.storePhone}
      </div>
      <div>
        <label>가맹점 주소: </label>
        {readOrder.storeAddress}
      </div>
      <div>
        <label>주문 상태: </label>
        {readOrder.orderStatus}
      </div>
      <div>
        <label>Product Image: </label>
        <ul>
          {readOrder.fileName.map((fileName, idx) => {
            return (
              <li key={idx}>
                <img
                  src={`http://192.168.0.64/${fileName}`}
                  alt={fileName}
                  className="shadow-lg"
                />
              </li>
            );
          })}
        </ul>
      </div>
      {readOrder.orderStatus === "주문 준비 완료" && (
        <div>
          <button
            className="bg-gray-700 text-white font-bold py-1 px-2 m-2 rounded-sm"
            onClick={handleClickReivewBtn}
          >
            리뷰 작성
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadComponent;
