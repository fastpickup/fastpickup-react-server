import { Suspense, lazy } from "react";

const Member_Join = lazy(() => import("../pages/members/JoinPage"))
const Member_Login = lazy(() => import("../pages/members/LoginPage"))
const Member_My = lazy(() => import("../pages/members/MyPage"))
const Member_Update = lazy(() => import("../pages/members/UpdatePage"))

const MemberRouter = ({Loading}) => {
  return ([
    {
      path: "join",
      element: <Suspense fallback={Loading}><Member_Join/></Suspense>
    },
    {
      path: "login",
      element: <Suspense fallback={Loading}><Member_Login/></Suspense>
    },
    {
      path: "mypage",
      element: <Suspense fallback={Loading}><Member_My/></Suspense>
    },
    {
      path: "update/:email",
      element: <Suspense fallback={Loading}><Member_Update/></Suspense>
    }
  ]);
}

export default MemberRouter;