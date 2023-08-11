import { useEffect, useState } from "react";
import { getOrderList } from "../../api/productAPI";
import { useDispatch } from "react-redux";
import { dec, inc } from "../../reducers/countSlice";
import jwtAxios from "../../util/jwtUtil";
import { useSelector } from "react-redux";
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

const OrderComponent = ({ pno }) => {

  const [order, setOrder] = useState(initState)

  // Like 
  const [likeCounts, setLikeCounts] = useState(false);
  const [likeState, setLikeState] = useState(initLikeState)
  const [userLikes, setUserLikes] = useState(false);
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
    console.log("전체 상품 라이크 카운트합니다: ", pno)
    try {
      const response = await jwtAxios.get(`http://localhost:8081/api/like/pno/${pno}/count`);
      console.log('전체 라이크 카운트 응닶값:',response)
      setLikeCounts(response.data.result);
    } catch (error) {
      console.error("Error fetching like count for product:", pno, error);
    }
  };
  // 내가 좋아요 했나 체크 
  const checkUserLikeForProduct = async (pno, email) => {
    console.log('내가 좋아요 했나 확인합니다: ', pno, email)
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
  console.log(order)

  const handleClickInc = () => {
    dispatch(inc(1))
  }

  const handleClickDec = () => {
    dispatch(dec(1))
  }

  useEffect(() => {
    console.log('Like count updated:', likeCounts);
  }, [likeCounts]);

  return (
    <div>
      <ul className="overflow-y-hidden overflow-x-auto whitespace-nowrap border-b border-[#eee]">
        {order.fileNames.map(idx =>
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
        <div className="text-[#757575]">{order.productContent}</div>
        <div>
          {(order.productPrice).toLocaleString()}
        </div>
        <div>{order.storeName}</div>
        <div>{order.email}</div>
        <div className="like-section" onClick={toggleLikeForProduct}>
          <span>Like: {likeCounts}</span>
          <span>Like: {userLikes ? "Like 했어요!" : ""}</span>
        </div>
      </div>
      <div>
        <button
          onClick={handleClickInc}
        >
          증가
        </button>
        <button
          onClick={handleClickDec}
        >
          감소
        </button>
      </div>

      <OrderButtonComponent {...order}></OrderButtonComponent>
    </div>
  );
}

export default OrderComponent;