import { useNavigate } from "react-router-dom";
import Notification from "../components/firebases/Notification";
import HeaderNav from "../nav/HeaderNav";

const BasicLayout = ({children}) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="fixed w-full h-[70px] bg-[#ae2d33] shadow-lg z-50">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 w-10 h-[70px] flex justify-center items-center"
        >
          <img src={require("../images/header_backbtn.png")} className="w-[30px]" />
        </button>
        <HeaderNav></HeaderNav>
      </div>
      <div className="pt-[70px] px-3 pb-10">
        <Notification></Notification>
        {children}
      </div>
    </>
  );
}

export default BasicLayout;