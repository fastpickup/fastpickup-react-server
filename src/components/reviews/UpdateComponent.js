import { useEffect, useRef, useState } from "react";
import {
  getReivewSelectOne,
  reivewUpdate,
  removeFile,
  removeReview,
  updateReview,
  uploadFile,
} from "../../api/reviewAPI";

const initState = {
  rno: 0,
  reviewTitle: "",
  reviewContent: "",
  registDate: 0,
  fileNames: [],
};

const UpdateComponent = ({ rno, moveList, moveRead }) => {
  const fileRef = useRef();
  const [review, setReview] = useState(initState);

  useEffect(() => {
    getReivewSelectOne(rno).then((res) => {
      console.log(res);
      setReview(res);
    });
  }, [rno]);

  // 상품 사진 삭제

  // 상품
  const handleChange = (e) => {
    review[e.target.name] = e.target.value;

    setReview({ ...review });
  };

  const handleClickDelImg = (fname) => {
    const newArr = review.fileNames.filter((ele) => ele !== fname);

    review.fileNames = newArr;

    setReview({ ...review });

    removeFile(fname);
  };

  const handleClickUpdate = () => {
    updateReview(review).then((res) => {
      console.log(res);

      moveRead(rno);
    });
  };

  const handleClickRemove = () => {
    removeReview(rno).then((res) => {
      moveList();
    });
  };

  // 파일 업로드
  const handleChangeFile = () => {
    const formData = new FormData();

    // // 이미 업로드된 파일명 추가
    // if (review.fileNames) {
    //   for (let ri of review.fileNames) {
    //     formData.append("fileNames", ri);
    //   }
    // }

    // // 새로 추가되는 파일 추가
    const arr = fileRef.current.files;
    for (let file of arr) {
      formData.append("files", file);
    }

    console.dir(fileRef.current);

    // uploadFile 함수를 호출하여 파일 업로드
    uploadFile(formData)
      .then((res) => {
        const result = res;
        console.log(result);

        const link = result.map((item) => item.link);
        const upDatefileNames = link.map((link) => link.substring(2)); // "s_" 제외한 부분 추출

        console.log(upDatefileNames);
        const updatedFileNames = [...review.fileNames, ...upDatefileNames];

        // 상태 업데이트
        setReview({
          ...review,
          fileNames: updatedFileNames,
        });
      })
      .catch((error) => {
        console.error("File upload error:", error);
      });

    fileRef.current.value = null;
  };

  return (
    <div>
      <div className="m-2 p-2 border-2 bg-gray-100 rounded-lg">
        <div className="m-2 p-2 border-b-2">
          <span className="font-bold pr-1">Date</span> {review.reviewDate}
        </div>

        <div className="m-2 p-2 border-b-2 flex">
        <span className="font-bold pr-3">Title</span>
          <input
            type="text"
            name="reviewTitle"
            value={review.reviewTitle}
            onChange={handleChange}
            className="w-full border-0 bg-gray-100"
          ></input>
        </div>
        
        <div className="m-2 p-2 border-b-2 flex">
          <span className="font-bold pr-2">Content  </span>
          <textarea
            name="reviewContent"
            value={review.reviewContent}
            onChange={handleChange}
            className="w-full border-0 bg-gray-100"
          />
        </div>

        <div className="m-2 p-2 border-b-2">
          <input
            type="file"
            ref={fileRef}
            multiple
            name="fileName"
            onChange={handleChangeFile}
          ></input>
        </div>

        <div className="m-2 p-2 border-b-2">
          <ul className="list-none flex">
            {review.fileNames.map((fname, idx) => (
              <li key={idx} className="m-2">
                <button
                  className="bg-gray-500 m-2 p-2 text-white"
                  onClick={() => handleClickDelImg(fname)}
                >
                  X
                </button>
                <img src={`http://localhost/s_${fname}`}></img>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
            onClick={handleClickUpdate}
          >
            수정
          </button>

          <button
            className="bg-red-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
            onClick={handleClickRemove}
          >
            삭제
          </button>

          <button
            className="bg-gray-700 text-white font-bold py-2 px-4 m-2 rounded-sm"
            onClick={() => moveRead(rno)}
          >
            리뷰 상세
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateComponent;
