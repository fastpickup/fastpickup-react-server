import { Suspense, lazy } from "react";

const Review_List = lazy(() => import("../pages/reviews/ListPage"))
const Review_Read = lazy(() => import("../pages/reviews/ReadPage"))
const Review_Register = lazy(() => import("../pages/reviews/RegisterPage"))
const Review_Update = lazy(() => import("../pages/reviews/UpdatePage"))

const ReviewRouter = ({Loading}) => {
  return ([
    {
      path: "list",
      element: <Suspense fallback={Loading}><Review_List/></Suspense>
    },
    {
      path: "read/:rno",
      element: <Suspense fallback={Loading}><Review_Read/></Suspense>
    },
    {
      path: "register",
      element: <Suspense fallback={Loading}><Review_Register/></Suspense>
    },
    {
      path: "update/:rno",
      element: <Suspense fallback={Loading}><Review_Update/></Suspense>
    }
  ]);
}

export default ReviewRouter;