import { useEffect, useState } from "react";
import { getOrderList } from "../../api/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { dec, inc } from "../../reducers/countSlice";
import jwtAxios from "../../util/jwtUtil";
import OrderButtonComponent from "./OrderButtonComponent";

const initState = {
  fileNames: [],
  productName: "",
  productContent: "",
  productPrice: 0,
  storeName: "",
  email: ""
}

const initLike = {
  result: 0
}

const initLikeState = {
  state: false
}

const initQty = {
  qty: 1
}

const OrderComponent = ({ pno }) => {

  const [order, setOrder] = useState(initState)

  //const count = useSelector(state => state.count)
  // Like 
  const [likeCounts, setLikeCounts] = useState(false);
  const [likeState, setLikeState] = useState(initLikeState)
  const [userLikes, setUserLikes] = useState(false);
  const [countQty, setCountQry] = useState({...initQty})
  const { email } = useSelector(state => state.login);

  //console.log('오더컴포넌트',order)

  const dispatch = useDispatch()

  useEffect(() => {
    getOrderList(pno).then(data => {
      //console.log(data.dto)
      setOrder(data.dto)
      fetchLikeCountForProduct(pno);
      checkUserLikeForProduct(pno, email);
    })
  }, [pno])

  // 전체 라이크 카운트 
  const fetchLikeCountForProduct = async (pno) => {
    //console.log("전체 상품 라이크 카운트합니다: ", pno)
    try {
      const response = await jwtAxios.get(`http://localhost:8081/api/like/pno/${pno}/count`);
      //console.log('전체 라이크 카운트 응닶값:',response)
      setLikeCounts(response.data.result);
    } catch (error) {
      console.error("Error fetching like count for product:", pno, error);
    }
  };
  // 내가 좋아요 했나 체크 
  const checkUserLikeForProduct = async (pno, email) => {
    //console.log('내가 좋아요 했나 확인합니다: ', pno, email)
    try {
      const response = await jwtAxios.get(`http://localhost:8081/api/like/pno/${pno}/${email}/check`);
      setUserLikes(response.data.liked);
    } catch (error) {
      console.error("Error checking user like for product:", pno, error);
    }
  };
  
  // 좋아요 누르기 
  const toggleLikeForProduct = async () => {
    try {
      const response = await jwtAxios.post(`http://localhost:8081/api/like/pno/toggle/${pno}/${email}`);
      const { toggleResult, likeCount } = response.data;
      
      // 사용자의 좋아요 상태 토글
      setUserLikes(prev => !prev);
      // 좋아요 카운트 업데이트
      setLikeCounts(likeCount);
    } catch (error) {
      console.error("Error toggling like for product:", pno, error);
    }
};


  //console.log(pno)
  //console.log(order)

  const handleClickInc = () => {
    //dispatch(inc(1))
    //console.log(countQty.qty)
    if(countQty.qty > 9){
      return
    }
    countQty.qty += 1
    setCountQry({...countQty})
  }

  const handleClickDec = () => {
    //dispatch(dec(1))
    if(countQty.qty < 2){
      return
    }
    countQty.qty -= 1
    setCountQry({...countQty})
  }

  useEffect(() => {
    //console.log('Like count updated:', likeCounts);
  }, [likeCounts]);

  return (
    <div>
      <div className="pb-20">
        <ul className="overflow-y-hidden overflow-x-auto whitespace-nowrap border-b border-[#eee]">
          {order.fileNames.map( idx => 
            <li
              key={idx}
              className="inline-block"
            >
              <img src={`http://192.168.0.64/${idx}`} className="w-full" />
            </li>
          )}
        </ul>
        <div className="p-2">
          <div className="text-xl font-medium">
            {order.productName}
            {order.isRecommend === 999999999 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""}
          </div>
          <div className="text-[#757575] mt-2">{order.productContent}</div>
          <div className="flex justify-between text-xl font-medium mt-2">
            <span>가격</span>
            <span>{(order.productPrice).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <div className="fixed left-0 w-full px-3 box-border">
        <div className="flex justify-between items-center h-[60px]">
          <div className="like-section" onClick={toggleLikeForProduct}>
            {userLikes ? <img src={require(`../../images/like_icon_on.png`)} className="inline-block w-[24px] bg-[#ae2d33]" /> : <img src={require(`../../images/like_icon.png`)} className="inline-block w-[24px]" />}
            {/* <span className="text-[16px] font-normal ml-1">{likeCounts}</span> */}
          </div>
          <div className="wi-[110px] h-[40px] flex items-center border border-[#757575] rounded-lg">
            <button
              onClick={handleClickDec}
              className="block w-8 h-full border-r border-[#757575]"
            >
              <span className="block w-4 h-[2px] mx-auto bg-black"></span>
            </button>
            <span className="w-11 text-center text-black">{countQty.qty}</span>
            <button
              onClick={handleClickInc}
              className="relative block w-8 h-full border-l border-[#757575]"
            >
              <span className="block w-4 h-[2px] mx-auto bg-black"></span>
              <span className="absolute left-1/2 top-1/2 rotate-90 w-4 h-[2px] mx-auto bg-black -translate-x-1/2 -translate-y-1/2"></span>
            </button>
          </div>
          <OrderButtonComponent {...order} countQty={countQty}></OrderButtonComponent>
        </div>
      </div>

    </div>
  );
}

export default OrderComponent;