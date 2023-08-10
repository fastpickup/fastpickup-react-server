import MyComponent from "../../components/members/MyComponent";
import queryString from 'query-string';
import { getCookie, setCookie } from "../../util/cookieUtil";
import { useEffect, useState } from "react";

const MyPage = () => {
  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">마이페이지</div>
      <MyComponent></MyComponent>
    </div>
  );
}

export default MyPage;