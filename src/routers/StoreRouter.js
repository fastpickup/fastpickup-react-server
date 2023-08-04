import { Suspense, lazy } from "react";

const Store_List = lazy(() => import("../pages/stores/ListPage"))
const Store_Read = lazy(() => import("../pages/stores/ReadPage"))

const StoreRouter = ({Loading}) => {
  return ([
    {
      path: "list",
      element: <Suspense fallback={Loading}><Store_List/></Suspense>
    },
    {
      path: "read/:sno",
      element: <Suspense fallback={Loading}><Store_Read/></Suspense>
    }
  ]);
}

export default StoreRouter;