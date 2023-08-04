import { Suspense, lazy } from "react";

const Member_Join = lazy(() => import("../pages/reviews/ListPage"))
const Member_Login = lazy(() => import("../pages/reviews/ReadPage"))
const Member_My = lazy(() => import("../pages/reviews/RegisterPage"))
const Member_Update = lazy(() => import("../pages/reviews/UpdatePage"))

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