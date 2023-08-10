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
    page: 0,
    size: 0,
    requestDTO: null,
};

const ListByStoreComponent = ({ sno, movePage }) => {
  const [storeReview, setStoreReview] = useState(initState);

  useEffect(() => {
    getReviewByStore(sno).then((res) => {
      setStoreReview(res);
    });
  }, [sno]);

  return (
    <div>
        {storeReview.list.map(
          ({
            rno,
            email,
            reviewContent,
            reviewTitle,
            fileNames,
            reviewDate,
          }) => (


    <div className="m-2 p-2 border-2  rounded-lg">
             <div className="m-2 p-2 border-b-2">
          <span className="font-bold">sno:</span> {sno}
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Writer:</span> {email}
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Date:</span> {reviewDate}
        </div>
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Title:</span> {reviewTitle}
        </div>

        {fileNames.length > 0 ? (
          <div className="m-2 p-2 border-b-2">
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
        ) : (
          <div></div>
        )}

        <div className="m-2 p-2 border-b-2">
          <span className="font-bold">Content</span> <br />
          <textarea
            name="reviewContent"
            value={reviewContent}
            className="w-full h-40 border-0"
            readOnly
          />
        </div>
        </div>


            )
        )}
        <ListPageComponent
        movePage={movePage}
        {...storeReview}
      ></ListPageComponent>
    </div>
  );
};

export default ListByStoreComponent;
