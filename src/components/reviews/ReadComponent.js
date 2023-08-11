import { useEffect, useState } from "react";
import { getReivewSelectOne, getReviewStoreReview } from "../../api/reviewAPI";

const initStateMyReview = {
  rno: 0,
  reviewTitle: "",
  reviewContent: "",
  email: "",
  reviewDate: "",
  fileNames: [],
};

const initStateStoreReview = {
  reviewDate: "",
  reviewContent : ""
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
      <div className="m-2 p-2 border-2  rounded-lg">
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Date:</span> <span>{review.reviewDate.split('T')[0]}</span>
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Title:</span> {review.reviewTitle}
        </div>

        {review.fileNames.length > 0 ? (
          <div className="m-2 p-2 border-b-2">
            <ul className="list-none flex flex-wrap gap-2">
              {review.fileNames.map((fname, idx) => (
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
        ) : (
          <div className="m-2 p-2 border-b-2 text-center">No Images</div>
        )}

        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Content</span> <br />
          <textarea
            name="reviewContent"
            value={review.reviewContent}
            className="w-full h-40 border-0"
            readOnly
          />
        </div>

        <div className="m-2 p-2 flex justify-end">
          <button
            className="bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
            onClick={() => moveUpdate(review.rno)}
          >
            수정
          </button>

          <button
            className="bg-gray-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
            onClick={moveList}
          >
            목록
          </button>
        </div>
      </div>

      {/* 리뷰에 대한 가맹점 답글 */}
      {storeReview.reviewDate && (
        <div className="m-2 p-2 border-2 bg-gray-100 rounded-lg">
          <div className="m-2 p-2 border-b-2">
            <span className="font-bold">Date:</span> {storeReview.reviewDate.split('T')[0]}
          </div>
          <div className="m-2 p-2 border-b-2">
            <span className="font-bold">Name:</span> 사장님
          </div>
          <div className="m-2 p-2 border-b-2">
            <span className="font-bold">Title:</span> {storeReview.reviewTitle}
          </div>
          <div className="m-2 p-2 border-b-2">
            <span className="font-bold">Content</span> <br />
            <textarea
              name="reviewContent"
              value={storeReview.reviewContent}
              className="w-full h-40 border-0 bg-gray-100"
              readOnly
            />
          </div>
        </div>
      )}
  
    </div>
  );
};

export default ReadComponent;
