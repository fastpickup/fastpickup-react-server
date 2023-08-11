import ListComponent from "../../components/orders/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

  const { setSearch, queryObj, moveRead } = useQueryObj();

  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">제목</div>
      <ListComponent setSearch={setSearch}
        queryObj={queryObj}
        moveRead={moveRead}
        movePage={movePage}></ListComponent>
    </div>
  );
}

export default ListPage;