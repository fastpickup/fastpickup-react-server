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

  console.log("회원 email", email);
  useEffect(() => {
    getReviewList(email, queryObj).then((data) => {
      console.log(data);
      setReviewList(data);
    });
  }, [email, queryObj]);

  return (
    <div>
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
              className="flex justify-between gap-x-6 py-2"
            >
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900 ">
                  {reviewTitle}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {storeName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {productName}
                  </p>
                  {reviewImg && ( // 이미지가 있을 때만 렌더링
                    <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                      <div>
                        <img src={`http://localhost/s_${reviewImg}`} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
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
