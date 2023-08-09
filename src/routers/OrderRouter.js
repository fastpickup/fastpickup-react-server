import { Suspense, lazy } from "react";

const Order_List = lazy(() => import("../pages/orders/ListPage"))
const Order_Read = lazy(() => import("../pages/orders/ReadPage"))
const Order_Order = lazy(() => import("../pages/orders/OrderPage"))
const Order_Complete = lazy(() => import("../pages/orders/CompletePage"))

const OrderRouter = ({Loading}) => {
  return ([
    {
      path: "list",
      element: <Suspense fallback={Loading}><Order_List/></Suspense>
    },
    {
      path: "read/:ono",
      element: <Suspense fallback={Loading}><Order_Read/></Suspense>
    },
    {
      path: "order/:pno",
      element: <Suspense fallback={Loading}><Order_Order/></Suspense>
    },
    {
      path: "complete/:ono",
      element: <Suspense fallback={Loading}><Order_Complete/></Suspense>
    }
  ]);
}

export default OrderRouter;