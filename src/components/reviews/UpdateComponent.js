import { useEffect, useRef, useState } from "react";
import { getReivewSelectOne, uploadFile } from "../../api/reviewAPI";

const initState = {
  rno: 0,
  reviewTitle: "",
  reviewContent: "",
  registDate: 0,
  updateDate: 0,
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
  };

  // 파일 업로드
  // 파일 업로드
const handleChangeFile = () => {
  const formData = new FormData();
  
  // 이미 업로드된 파일명 추가
  if (review.fileNames) {
    for (let ri of review.fileNames) {
      formData.append("fileNames", ri);
    }
  }
  
  // 새로 추가되는 파일 추가
  const newFiles = fileRef.current.files;
  for (let file of newFiles) {
    formData.append("files", file);
  }

  // uploadFile 함수를 호출하여 파일 업로드
  uploadFile(formData)
    .then(res => {
      const result = res.data;
      console.log(result);
    })
    .catch(error => {
      console.error("File upload error:", error);
    });
};

  return (
    <div>
      <div className="m-2 p-2 border-2">{review.rno}</div>
      <div className="m-2 p-2 border-2">
        <input
          type="text"
          name="reviewTitle"
          value={review.reviewTitle}
          onChange={handleChange}
        ></input>
      </div>
      <div className="m-2 p-2 border-2">
        <input
          type="text"
          name="reviewContent"
          value={review.reviewContent}
          onChange={handleChange}
        ></input>
      </div>

      <div className="m-2 p-2 border-2">
        <input type="file" ref={fileRef} multiple name="fileNames" onChange={handleChangeFile}></input>
      </div>

      <div className="m-2 p-2 border-2">
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
    </div>
  );
};

export default UpdateComponent;
