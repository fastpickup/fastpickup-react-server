import { useNavigate } from "react-router-dom";
import RegisterComponent from "../../components/reviews/RegisterComponent";

const RegisterPage = () => {

  const navigate = useNavigate()

  const moveList = () => {
    navigate("../list")
  }

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">리뷰 작성</div>
      <RegisterComponent moveList = {moveList}></RegisterComponent>
    </div>
  );
}

export default RegisterPage;