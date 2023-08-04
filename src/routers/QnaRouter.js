import { Suspense, lazy } from "react";

const Qna_List = lazy(() => import("../pages/qnas/ListPage"))
const Qna_Read = lazy(() => import("../pages/qnas/ReadPage"))
const Qna_Register = lazy(() => import("../pages/qnas/RegisterPage"))
const Qna_Update = lazy(() => import("../pages/qnas/UpdatePage"))

const QnaRouter = ({Loading}) => {
  return ([
    {
      path: "list",
      element: <Suspense fallback={Loading}><Qna_List/></Suspense>
    },
    {
      path: "read/:qno",
      element: <Suspense fallback={Loading}><Qna_Read/></Suspense>
    },
    {
      path: "register",
      element: <Suspense fallback={Loading}><Qna_Register/></Suspense>
    },
    {
      path: "update/:qno",
      element: <Suspense fallback={Loading}><Qna_Update/></Suspense>
    }
  ]);
}

export default QnaRouter;