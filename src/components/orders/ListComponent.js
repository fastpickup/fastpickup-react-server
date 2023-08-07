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
  console.log("회원 이메일", email)

  const navigate = useNavigate();

  const [orderList, setOrderList] = useState(initState);

  // const movePage = (pageNums) => {

  // }

  useEffect(() => {
    console.log(email)
    getMyOrderAndHistory(email, queryObj).then(res => {
      console.log(res)
      setOrderList(res.list)
    })
  }, [email, queryObj])

  // 주문 상세 페이지 가기
  const moveOrderRead = (ono) => {
    console.log("Navigating to order", ono); 
    navigate(`/order/read/${ono}`)
  }

  return (
    <div>
      내 주문 이력
      <div>
        <ul>
          {orderList.list.map(({ memberName, memberPhone, email, ono, pno, sno, registDate, productName, productPrice, fileName }) => (
            <li key={ono}>
              <div>주문자 이름:{memberName}</div>
              <div>주문자 전화번호:{memberPhone}</div>
              <div>이메일: {email}</div>
              <div onClick={() => moveOrderRead(ono)}>주문 번호: {ono}</div>
              <div>상품 번호: {pno}</div>
              <div>가맹점 번호: {sno}</div>
              <div>주문 날짜: {registDate}</div>
              <div>상품 이름: {productName}</div>
              <div>상품 가격: {productPrice}</div>
              <div><img src={`http://192.168.0.64/s_${fileName}`} /></div>
            </li>
          ))}
        </ul>
      </div>

      <ListPageComponent movePage={movePage} {...orderList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;