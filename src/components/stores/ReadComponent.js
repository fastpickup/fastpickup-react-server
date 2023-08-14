import { useParams } from "react-router-dom";
import ListComponent from "../products/ListComponent";
import { useEffect, useRef, useState } from "react";
import { fetchStoreLikeCount, readStoreApi } from "../../api/storeAPI";
import useQueryObj from "../../hooks/useQueryObj";
import ListByStoreComponent from "../reviews/ListByStoreComponent";
import jwtAxios from "../../util/jwtUtil";


const initState = {
  sno: '',
  storeNumber: '',
  storeAddress: '',
  storePhone: '',
  email: '',
  storeName: ''
}

const ReadComponent = () => {

  const { setSearch, queryObj, moveRead } = useQueryObj();

  const { sno } = useParams();

  const [readStore, setReadStore] = useState(initState)
  const [likeCount, setLikeCount] = useState(0);


  useEffect(() => {
    //console.log('sno', sno)
    readStoreApi(sno).then(res => {
      //console.log('가맹점 Read Data:', res)
      setReadStore(res)
    })
    fetchStoreLikeCount(sno).then(res => {
      setLikeCount(res.result)
    })
  }, [sno])

  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  const [mapPosition, setMapPosition] = useState(null);
  useEffect(() => {
    if (!readStore.storeAddress) return;
    jwtAxios.get(`http://localhost:8081/api/map/getMapData?query=${readStore.storeAddress}`)
      .then(response => {
        const data = response.data;
        if (data.documents && data.documents[0]) {
          const position = {
            x: data.documents[0].x,
            y: data.documents[0].y
          };
          setMapPosition(position);
        }
        console.log('카카오맵 데이터:', data);
      })
      .catch(error => {
        console.error("API 호출 중 에러 발생:", error);
      });
  }, [readStore.storeAddress]);

  useEffect(() => {
    async function loadKakaoSDK() {
      console.log('앱키 받아오기')
      // 서버에서 앱 키 받아오기
      const response = await fetch(`http://localhost:8081/api/map/getKakaoApiKey`);
      const appKey = await response.text();
    
      // Kakao Maps SDK 동적 로드
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}`;
      document.body.appendChild(script);
      
      script.onload = () => {
        // SDK 로드 완료 후 수행할 로직
        console.log("Kakao Maps SDK loaded successfully");
      };
    }
  
    loadKakaoSDK();
  
  }, []); // 빈 의존성 배열을 넣어 컴포넌트 마운트 시
  
  


  return (
    <div>
      <div className="relative py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
        {readStore.storeName}
        {/* <div id="map" style={{ width: '100%', height: '400px' }}></div> */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <img src={require(`../../images/like_icon_on.png`)} className="inline-block w-[24px] bg-[#ae2d33]" />
          <span className="text-[16px] font-normal ml-1">{likeCount}</span>
        </div>
      </div>
      <dl className="mt-3">
        <dt className="inline-block text-[18px] font-medium">
          가맹점 전화번호 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readStore.storePhone}
        </dd>
      </dl>
      <dl className="pb-3 border-b border-[#ccc]">
        <dt className="inline-block text-[18px] font-medium">
          가맹점 주소 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readStore.storeAddress}
        </dd>
      </dl>
      <div>
        <ListComponent
          sno={sno}
          queryObj={queryObj}
          movePage={movePage}
          moveRead={moveRead}
        ></ListComponent>
      </div>
      <ListByStoreComponent sno={sno}></ListByStoreComponent>
    </div>
  );
}

export default ReadComponent;