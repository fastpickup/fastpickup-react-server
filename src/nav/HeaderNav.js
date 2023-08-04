import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div>
      <div className="container h-[70px]">
        <h1 className="h-[70px] text-center flex justify-center items-center">
          <Link to={"/"} className="inline-block">
            <img src={require("../images/logo.png")} className="h-[53px]" />
          </Link>
        </h1>
        <Link to={"/member/login"} className="absolute right-0 top-0 w-10 h-[70px] flex justify-center items-center">
          <img src={require("../images/header_login.png")} className="h-[30px]" />
        </Link>
      </div>
    </div>
  );
}

export default HeaderNav;