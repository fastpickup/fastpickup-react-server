import Notification from "../components/firebases/Notification";
import HeaderNav from "../nav/HeaderNav";

const BasicLayout = ({children}) => {
  return (
    <>
      <div className="fixed w-full h-[70px] bg-[#ae2d33]">

        <HeaderNav></HeaderNav>
      </div>
      <div className="pt-[70px] px-3">
        <Notification></Notification>
        {children}
      </div>
    </>
  );
}

export default BasicLayout;