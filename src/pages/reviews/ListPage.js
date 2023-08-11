import ListByStoreComponent from "../../components/reviews/ListByStoreComponent";
import ListComponent from "../../components/reviews/ListComponent";
import ListSearchComponent from "../../components/reviews/ListSearchComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

  console.log("List Page.................")

  const {queryObj, setSearch, moveRead} = useQueryObj();

  console.log(useQueryObj())

  const movePage = (num) => {

    console.log("NUM------------" + num)
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  // 검색 시
  const moveSearch = (type, keyword) => {

    // 검색 후 page = 1
    queryObj.page = 1
    queryObj.type = type
    queryObj.keyword = keyword

    setSearch({ ...queryObj })
  }


  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">리뷰 목록</div>
      {/* <ListSearchComponent queryObj={queryObj} moveSearch={moveSearch}></ListSearchComponent> */}
      <ListComponent queryObj={queryObj} movePage={movePage} moveRead={moveRead}></ListComponent>
    </div>
  );
}

export default ListPage;