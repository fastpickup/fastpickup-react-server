import { useEffect, useState } from "react";
import ListPageComponent from "../common/ListPageComponent";
import { getProductList } from "../../api/productAPI";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../util/jwtUtil"
import { useSelector } from "react-redux";

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

const initLike = {
  like: 0
}

const ListComponent = ({ sno, queryObj, movePage, moveRead }) => {

  const [productList, setProductList] = useState(initState)
  const [likeCounts, setLikeCounts] = useState(initLike.like);
  const [userLikes, setUserLikes] = useState({});
  const { email } = useSelector(state => state.login);

  const navigate = useNavigate()

  useEffect(() => {
    getProductList(sno, queryObj).then(data => {
      //console.log(data.list)
      setProductList(data)
      // 내 좋아요 이슈 확인
      data.list.forEach(product => {
        checkUserLikeForProduct(product.pno, email);
      });
    })
  }, [queryObj, email])

  const handleClickOrder = (pno) => {
    navigate(`/order/order/${pno}`)
  }

  

  // 전체 라이크 카운트 
  const fetchLikeCountForProduct = async (pno) => {
    //console.log("전체 상품 라이크 카운트합니다: ", pno)
    try {
      const response = await jwtAxios.get(`http://localhost:8081/api/like/pno/${pno}/count`);
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
      setUserLikes(prev => ({ ...prev, [pno]: response.data.liked }));
    } catch (error) {
      console.error("Error checking user like for product:", pno, error);
    }
  };

  return (
    <div>
      <ul className="mt-3">
        {productList.list.map(({ pno, productName, productPrice, recStatus, fileName, likeCount }) =>
          <li
            key={pno}
            onClick={() => handleClickOrder(pno)}
            className="pb-3 mb-3 border-b border-[#eee]"
          >
            <div className="flex">
              <div className="w-[120px] overflow-hidden rounded-full">
                <img src={`http://192.168.0.64/${fileName}`} className="w-[120px] h-[120px]" />
              </div>
              <div className="flex w-[calc(100%-130px)] ml-[10px] items-center">
                <div className="text-[18px] font-medium">
                  <div>
                    {productName}
                    {recStatus === 1 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""}
                  </div>
                  <div>{productPrice.toLocaleString()}원</div>
                </div>
              </div>
            </div>


          </li>
        )}
      </ul>

      <ListPageComponent movePage={movePage} {...productList}></ListPageComponent>
    </div>
  );
}

export default ListComponent;