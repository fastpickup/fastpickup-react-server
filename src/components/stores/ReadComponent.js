import { useParams } from "react-router-dom";
import ListComponent from "../products/ListComponent";
import { useEffect, useRef, useState } from "react";
import { fetchStoreLikeCount, readStoreApi } from "../../api/storeAPI";
import useQueryObj from "../../hooks/useQueryObj";
import ListByStoreComponent from "../reviews/ListByStoreComponent";
import jwtAxios from "../../util/jwtUtil";
import Map from "../../components/kakaomap/Map"



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
  const [tabIndex, setTabIndex] = useState(0)

  const handleClickTab = (idx) => {
    setTabIndex(idx)
  }


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

  const tabContArr = [
    {
      tabTitle: "상품",
      tabContent: (<ListComponent sno={sno} queryObj={queryObj} movePage={movePage} moveRead={moveRead}></ListComponent>)
    },
    {
      tabTitle: "리뷰",
      tabContent: (<ListByStoreComponent sno={sno}></ListByStoreComponent>)
    }
  ]

  const [mapPosition, setMapPosition] = useState({x: 'defaultX', y: 'defaultY'});
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    if (!readStore.storeAddress) return;
    jwtAxios.get(`http://localhost:8081/api/map/getMapData?query=${readStore.storeAddress}`)
      .then(response => {
        const data = response.data;
        // console.log("Response Data:", data); // 데이터 확인
        if (data.documents && data.documents[0]) {
          const position = {
            x: data.documents[0].x,
            y: data.documents[0].y
          };
          setMapPosition(position);
          // x와 y 값을 출력
          // console.log("x:", position.x);
          // console.log("y:", position.y);
        }
        setIsDataFetched(true);
        // console.log('카카오맵 데이터:', data);
      })
      .catch(error => {
        console.error("API 호출 중 에러 발생:", error);
      });
  }, [readStore.storeAddress]);




  // useEffect(() => {
  //   async function loadKakaoSDK() {
  //     console.log('SDK URL 받아오기');

  //     // 서버에서 Kakao Maps SDK URL 받아오기
  //     jwtAxios.get(`http://localhost:8081/api/map/getKakaoSdkUrl`)
  //       .then((response) => {
  //         const kakaoSdkUrl = response.data;
  //         console.log(kakaoSdkUrl)
  //         // Kakao Maps SDK 동적 로드
  //         const script = document.createElement("script");
  //         script.src = kakaoSdkUrl;
  //         document.body.appendChild(script);

  //         script.onload = () => {
  //           // SDK 로드 완료 후 수행할 로직
  //           console.log("Kakao Maps SDK loaded successfully");
  //         };
  //       })
  //       .catch(error => {
  //         console.error("API 호출 중 에러 발생:", error);
  //       });
  //   }
  //   loadKakaoSDK();
  // }, []);


  return (
    <div>
      <div className="relative py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
        {readStore.storeName}
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
      {isDataFetched && mapPosition.x !== 'defaultX' && mapPosition.y !== 'defaultY' && <Map x={mapPosition.x} y={mapPosition.y} />}
      <ul className="flex border-b border-[#ddd]">
        {tabContArr.map((data, idx) =>
          <li
            className={`w-1/2 h-10 flex justify-center items-center text-[17px] border-l first:border-0
            ${idx === tabIndex ? "text-[#ae2d33] font-semibold" : "text-[#757575]"}`}
            key={idx}
            onClick={() => handleClickTab(idx)}
          >
            {data.tabTitle}
          </li>
        )}
      </ul>
      <div>
        {tabContArr[tabIndex].tabContent}
      </div>
    </div>
  );
}

export default ReadComponent;