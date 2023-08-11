import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registReview, removeFile, uploadFile } from "../../api/reviewAPI";


const RegisterComponent = ({moveList}) => {

  const location = useLocation();
  const { sno, ono, email, productName, storeName } = location.state;

  const initState = {
    sno: sno,
    ono: ono,
    email: email,
    reviewTitle: "",
    reviewContent: "",
    fileNames: [],
  };

  const[review, setReview] = useState({...initState})
  const navigate = useNavigate()
  const fileRef = useRef()

  const handleChange = (e) => {
    review[e.target.name] = e.target.value

    setReview({ ...review })
  }

  const handleRegistReview = () => {
    
    registReview(review).then(res => {
      moveList()
    })

  }

  const handleCancelBtn = () => {
    navigate(-1)
  }

  const handleClickDelImg = (fname) => {
    const newArr = review.fileNames.filter((ele) => ele !== fname)

    review.fileNames = newArr

    setReview({ ...review });

    removeFile(fname)
  }

  const handleChangeFile = () => {
    const formData = new FormData()

    // // 새로 추가되는 파일 추가
    const arr = fileRef.current.files
    for (let file of arr) {
      formData.append("files", file)
    }

    console.dir(fileRef.current);

    // uploadFile 함수를 호출하여 파일 업로드
    uploadFile(formData)
      .then((res) => {
        const result = res
        console.log(result)

        const link = result.map((item) => item.link);
        const upDatefileNames = link.map((link) => link.substring(2)) // "s_" 제외한 부분 추출

        console.log(upDatefileNames)
        const updatedFileNames = [...review.fileNames, ...upDatefileNames]

        // 상태 업데이트
        setReview({
          ...review,
          fileNames: updatedFileNames,
        });
      })
      .catch((error) => {
        console.error("File upload error:", error)
      })

    fileRef.current.value = null
  }


  return (
    <div>
      <dl>
        <dt className="mt-5">가맹점명</dt>
        <dd className="mt-2">
          {storeName}
        </dd>
        <dt className="mt-5">상품명</dt>
        <dd className="mt-2">
          {productName}
        </dd>
        <dt className="mt-5">제목</dt>
        <dd className="mt-2">
          <input className="w-full h-10 px-2 border border-[#ccc]" type="text" name="reviewTitle" value={review.reviewTitle} required onChange={handleChange} />
        </dd>
        <dt className="mt-5">내용</dt>
        <dd className="mt-2">
          <textarea
            name="reviewContent"
            value={review.reviewContent}
            onChange={handleChange}
            className="w-full h-[100px] px-2 border border-[#ccc] resize-none"
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
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
          onClick={handleRegistReview}
        >
          등록
        </button>
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md"
          onClick={handleCancelBtn}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default RegisterComponent;