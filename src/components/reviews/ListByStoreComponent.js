import { useEffect, useState } from "react";
import { getReviewByStore } from "../../api/reviewAPI";
import ListPageComponent from "../common/ListPageComponent";

const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 1,
  size: 0,
  requestDTO: null,
};

const ListByStoreComponent = ({ sno }) => {
  const [storeReview, setStoreReview] = useState(initState);

  useEffect(() => {
    getReviewByStore(sno, storeReview.page).then((res) => {
      //console.log(res);

      setStoreReview(res);
    });
  }, [sno, storeReview.page]);

  const movePage = (num) => {
    storeReview.page = num;
    //console.log(storeReview.page);
    setStoreReview({ ...storeReview });
  };

  if(storeReview.list.length === 0){
    return (
      <div className="my-10 text-center text-xl">
        등록된 리뷰가 없습니다.
      </div>
    )
  }

  return (
    <div>
      <ul>
        {storeReview.list.map(
          ({ rno, gno, email, reviewContent, reviewTitle, fileNames, reviewDate }) => (
            <li
              className={`my-3 py-3 border-b border-[#eee] ${
                rno === gno ? "bg-white" : "bg-gray-200"
              } ${rno !== gno ? "ml-3 px-3 pb-4 rounded-md" : ""}`}
              key={rno}
            >
              <div className="flex justify-between">
                <div className="w-[calc(100%-100px)]">
                  <div className="mt-1 text-[15px] font-normal text-[#5f5f5f]">
                    {rno !== gno ? "사장님" : email}
                  </div>
                  <div className="text-[17px] font-medium">
                    {reviewContent}
                  </div>
                </div>
                <div className="w-[90px]">
                  <p className="text-sm leading-6 text-gray-900">{reviewDate.split('T')[0]}</p>
                </div>
              </div>
              {fileNames.length > 0 && (
                <ul className="mt-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                  {fileNames.map((fname, idx) => (
                    <li key={idx} className="inline-block h-[120px] overflow-hidden">
                      <img src={`http://192.168.0.64/${fname}`} className="w-[120px]"/>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>
      <ListPageComponent
        {...storeReview}
        movePage={movePage}
      ></ListPageComponent>
    </div>
  );
};

export default ListByStoreComponent;
