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
      //console.log(res);
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
      //console.log(res);

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

    //console.dir(fileRef.current);

    // uploadFile 함수를 호출하여 파일 업로드
    uploadFile(formData)
      .then((res) => {
        const result = res;
        //console.log(result);

        const link = result.map((item) => item.link);
        const upDatefileNames = link.map((link) => link.substring(2)); // "s_" 제외한 부분 추출

        //console.log(upDatefileNames);
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
      <dl>
        <dt className="mt-5">제목</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="email" name="email" value={review.reviewTitle} required onChange={handleChange} />
        </dd>
        <dt className="mt-5">내용</dt>
        <dd className="mt-2">
          <textarea
            name="reviewContent"
            value={review.reviewContent}
            onChange={handleChange}
            className="w-full h-[100px] p-2 border border-[#ccc] resize-none"
          />
        </dd>
        <dt className="mt-5">이미지</dt>
        <dd className="mt-2">
          <input
            type="file"
            ref={fileRef}
            multiple
            name="fileName"
            onChange={handleChangeFile}
          />
        </dd>
      </dl>
      <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3 py-3">
        {review.fileNames.map((fname, idx) => (
          <li
            key={idx}
            className="relative inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md"
          >
            <button
              className="bg-[#ae2d33] absolute -right-1 -top-2 w-7 h-7 text-white rounded-full"
              onClick={() => handleClickDelImg(fname)}
            >
              X
            </button>
            <div className="overflow-hidden w-[130px] h-[130px]">
              <img src={`http://192.168.0.64/${fname}`} className="w-[130px]" />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-5">
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2"
          onClick={() => moveRead(rno)}
        >
          상세
        </button>
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
          onClick={handleClickUpdate}
        >
          수정
        </button>

        <button
          className="w-20 h-10 text-white bg-black rounded-md"
          onClick={handleClickRemove}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default UpdateComponent;
