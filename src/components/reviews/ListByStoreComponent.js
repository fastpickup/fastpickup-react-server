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
      console.log(res);

      setStoreReview(res);
    });
  }, [sno, storeReview.page]);

  const movePage = (num) => {
    storeReview.page = num;
    console.log(storeReview.page);
    setStoreReview({ ...storeReview });
  };

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc] mt-5">
        리뷰
      </div>
      {storeReview.list.map(
        ({
          rno,
          gno,
          email,
          reviewContent,
          reviewTitle,
          fileNames,
          reviewDate,
        }) => (
          <div
            className={`p-4 border rounded-lg mb-4 ${
              rno === gno ? "bg-white" : "bg-gray-200"
            } ${rno !== gno ? "ml-6" : ""}`}
            key={rno}
          >
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">
                {rno !== gno ? "사장님" : email}
              </span>
              <span className="text-sm text-gray-600">{reviewDate.split('T')[0]}</span>
            </div>
            {fileNames.length > 0 && (
              <div className="mb-2">
                <ul className="list-none flex flex-wrap gap-2">
                  {fileNames.map((fname, idx) => (
                    <li key={idx}>
                      <img
                        src={`http://localhost/${fname}`}
                        alt={`Review Image ${idx}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-800">{reviewContent}</p>
            </div>
          </div>
        )
      )}
      <ListPageComponent
        {...storeReview}
        movePage={movePage}
      ></ListPageComponent>
    </div>
  );
};

export default ListByStoreComponent;
