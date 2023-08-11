import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReviewList } from "../../api/reviewAPI";
import ListPageComponent from "../common/ListPageComponent";

const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 0,
  size: 0,
  requestDTO: null,
};

const ListComponent = ({ queryObj, movePage, moveRead }) => {
  const [reviewList, setReviewList] = useState(initState);
  const { email } = useSelector((state) => state.login);

  //console.log("회원 email", email);
  useEffect(() => {
    getReviewList(email, queryObj).then((data) => {
      //console.log(data);
      setReviewList(data);
    });
  }, [email, queryObj]);

  return (
    <div>
      <dl className="py-3 border-b border-[#ccc]">
        <dt className="inline-block text-[18px] font-medium">
          내가 쓴 총 리뷰 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {reviewList.total}개
        </dd>
      </dl>
      <ul>
        {reviewList.list.map(
          ({
            rno,
            storeName,
            productName,
            reviewTitle,
            reviewImg,
            reviewDate,
          }) => (
            <li
              key={rno}
              onClick={() => moveRead(rno)}
              className="my-3 py-3 flex justify-between border-b border-[#eee]"
            >
              <div className="w-[calc(100%-100px)]">
                <div className="text-[17px] font-medium">
                  {storeName}
                </div>
                <div className="mt-1 text-[15px] font-normal text-[#5f5f5f]">
                  {reviewTitle}
                </div>
                {reviewImg && ( // 이미지가 있을 때만 렌더링
                  <div className="mt-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="inline-block">
                      <img src={`http://192.168.0.64/${reviewImg}`} className="w-[120px]" />
                    </div>
                  </div>
                )}
                <div className="inline-block mt-3 text-[15px] text-center py-1 px-3 border border-[#ccc] rounded-full">
                  {productName}
                </div>
              </div>
              <div className="w-[90px]">
                <p className="text-sm leading-6 text-gray-900">{reviewDate.split('T')[0]}</p>
              </div>
            </li>
          )
        )}
      </ul>
      <ListPageComponent
        movePage={movePage}
        {...reviewList}
      ></ListPageComponent>
    </div>
  );
};

export default ListComponent;
