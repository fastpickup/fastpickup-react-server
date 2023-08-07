import { useState } from "react";

// QnaRegistDTO
const initState = {
  qnaTitle : '',
  qnaContent : ''
}

const RegisterComponent = () => {

  // 오류나지 않게 초기값 설정
  const [qna , setQna] = useState({...initState})

  return (
    <div>
      Component
    </div>
  );
}

export default RegisterComponent;