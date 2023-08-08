import { useSelector } from "react-redux";
import CompleteComponent from "../../components/orders/CompleteComponent";

const CompletePage = () => {

  const {email} = useSelector(state => state.login)

  console.log(email)

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">제목</div>
      <CompleteComponent></CompleteComponent>
    </div>
  );
}

export default CompletePage;