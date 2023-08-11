import { useEffect, useState } from "react";
import { getReivewSelectOne, getReviewStoreReview } from "../../api/reviewAPI";

const initStateMyReview = {
  rno: 0,
  reviewTitle: "",
  reviewContent: "",
  email: "",
  reviewDate: "",
  storeName: "",
  fileNames: [],
};

const initStateStoreReview = {
  reviewDate: "",
  reviewContent : "",
  reviewTitle: "",
  storeName: ""
}


const ReadComponent = ({ rno, moveUpdate, moveList }) => {

  const [review, setReview] = useState(initStateMyReview);

  const [storeReview, setStoreReview] = useState(initStateStoreReview);

  useEffect(() => {
    getReivewSelectOne(rno).then((res) => {
      setReview(res);

    });

    getReviewStoreReview(rno).then(res => {
      setStoreReview(res)
    }) 

  }, [rno]);

  return (
    <div>
      {review.fileNames.length > 0 ? (
        <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3">
          {review.fileNames.map((fname, idx) => (
            <li
              key={idx}
              className="inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md overflow-hidden"
            >
              <img
                src={`http://localhost/${fname}`}
                className="w-[130px]"
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      <div className="text-xl font-medium mt-3">
        {review.reviewTitle}
        <span className="text-[15px] font-normal text-[#5f5f5f] ml-2">{review.reviewDate.split('T')[0]}</span>
      </div>
      <div className="text-[#757575] mt-3">
        {review.reviewContent}
      </div>
      <div className="flex mt-5 justify-end">
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2"
          onClick={moveList}
        >
          목록
        </button>
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
          onClick={() => moveUpdate(review.rno)}
        >
          수정
        </button>
      </div>

      {/* 리뷰에 대한 가맹점 답글 */}
      {storeReview.reviewDate && (
        <div className="border p-5 mt-5 border-[#eee] bg-gray-100 rounded-md">
          <div className="text-xl font-medium">
            {storeReview.storeName}
            <span className="text-[15px] font-normal text-[#5f5f5f] ml-2">{storeReview.reviewDate.split('T')[0]}</span>
          </div>
          <div className="text-[#757575] mt-3">
            {storeReview.reviewContent}
          </div>
        </div>
      )}
  
    </div>
  );
};

export default ReadComponent;
