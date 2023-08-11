import { useSelector } from "react-redux";
import ListPageComponent from "../common/ListPageComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyOrderAndHistory } from "../../api/orderAPI";


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

const ListComponent = ({ movePage, moveRead, queryObj }) => {

  const { email } = useSelector(state => state.login)
  //console.log("회원 이메일", email)

  const navigate = useNavigate();

  const [orderList, setOrderList] = useState(initState);

  // const movePage = (pageNums) => {

  // }

  useEffect(() => {
    //console.log(email)
    getMyOrderAndHistory(email, queryObj).then(res => {
      //console.log(res)
      setOrderList(res.list)
    })
  }, [email, queryObj])

  // 주문 상세 페이지 가기
  const moveOrderRead = (ono) => {
    //console.log("Navigating to order", ono); 
    navigate(`/order/read/${ono}`)
  }

  return (
    <div>
      <ul className="mt-3">
        {orderList.list.map(({ ono, pno, sno, registDate, productName, productPrice, fileName }) => (
          <li
            key={ono}
            onClick={() => moveOrderRead(ono)}
            className="flex pb-3 mb-3 border-b border-[#eee]"
          >
            <div className="overflow-hidden rounded-full">
              <img src={`http://192.168.0.64/s_${fileName}`} />
            </div>
            <div className="flex w-[calc(100%-95px)] ml-[15px] items-center">
              <div className="text-[17px] font-medium">
                <div className="text-[15px] font-normal text-[#5f5f5f]">{registDate.split('T')[0]}</div>
                <div>{productName}</div>
                <div>{productPrice.toLocaleString()}원</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ListPageComponent movePage={movePage} {...orderList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;