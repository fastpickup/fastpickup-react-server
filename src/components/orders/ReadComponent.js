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
    //console.log("ono", ono);
    readMyOrderAndHistory(ono).then((res) => {
      //console.log("내 주문정보 데이터: ", res);
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
      <div className="text-[18px] font-medium mt-3 pb-3 border-b border-[#eee]">
        주문 번호: {readOrder.ono}
        <span className="block text-sm font-normal text-[#5f5f5f]">{readOrder.registDate.split('T')[0]}</span>
      </div>
      <div className="text-[18px] font-medium mt-3 mb-1">
        {readOrder.storeName}
      </div>
      <dl>
        <dt className="inline-block text-[18px] font-medium">
          가맹점 전화번호 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readOrder.storePhone}
        </dd>
      </dl>
      <dl className="pb-3 border-b border-[#eee]">
        <dt className="inline-block text-[18px] font-medium">
          가맹점 주소 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readOrder.storeAddress}
        </dd>
      </dl>
      <div
        className="py-3 px-1 mb-3 border-b border-[#eee] bg-gray-100"
      >
        <div className="flex">
          <div className="w-[120px] overflow-hidden rounded-full">
            {readOrder.fileName.map((fileName, idx) => {
              return (
                <img key={idx} src={`http://192.168.0.64/${fileName}`} className="w-[120px] h-[120px]" />
              );
            })}
            
          </div>
          <div className="flex w-[calc(100%-130px)] ml-[10px] items-center">
            <div className="text-[18px] font-medium">
              <div>
                {readOrder.productName}
              </div>
              <div>
                {readOrder.totalPrice.toLocaleString()}원
                <span className="text-sm font-normal"> (수량 : {readOrder.orderCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <dl className="mt-3">
        <dt className="inline-block text-[18px] font-medium">
          주문자 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readOrder.memberName}
        </dd>
      </dl>
      <dl className="pb-3 border-b border-[#eee]">
        <dt className="inline-block text-[18px] font-medium">
          주문상태 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readOrder.orderStatus}
        </dd>
      </dl>
      {readOrder.orderStatus === "주문 준비 완료" && (
        <div>
          <button
            className="block mt-5 text-center w-full px-3 leading-[50px] text-lg text-white font-medium h-[50px] bg-[#ae2d33] rounded-lg"
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
