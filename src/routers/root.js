import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";
import StoreRouter from "./StoreRouter";
import ReviewRouter from "./ReviewRouter";
import MemberRouter from "./MemberRouter";
import QnaRouter from "./QnaRouter";
import OrderRouter from "./OrderRouter";

//lazy
//로딩
const Loading = <LoadingPage/>

//가맹점
const Store_Index = lazy(() => import("../pages/stores/IndexPage"))

//리뷰
const Review_Index = lazy(() => import("../pages/reviews/IndexPage"))

//회원
const Member_Index = lazy(() => import("../pages/members/IndexPage"))

//문의
const Qna_Index = lazy(() => import("../pages/qnas/IndexPage"))

//주문
const Order_Index = lazy(() => import("../pages/orders/IndexPage"))


const router = createBrowserRouter([
  {
    path: "",
    element: <MainPage></MainPage>
  },
  {
    path: "store",
    element: <Suspense fallback={Loading}><Store_Index/></Suspense>,
    children: StoreRouter(Loading)
  },
  {
    path: "review",
    element: <Suspense fallback={Loading}><Review_Index/></Suspense>,
    children: ReviewRouter(Loading)
  },
  {
    path: "member",
    element: <Suspense fallback={Loading}><Member_Index/></Suspense>,
    children: MemberRouter(Loading)
  },
  {
    path: "qna",
    element: <Suspense fallback={Loading}><Qna_Index/></Suspense>,
    children: QnaRouter(Loading)
  },
  {
    path: "order",
    element: <Suspense fallback={Loading}><Order_Index/></Suspense>,
    children: OrderRouter(Loading)
  }
])

export default router;