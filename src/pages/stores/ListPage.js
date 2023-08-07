import ListComponent from "../../components/stores/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

  const { setSearch, queryObj, moveRead } = useQueryObj();

  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">가맹점 목록</div>
      <ListComponent movePage={movePage}></ListComponent>
    </div>
  );
}

export default ListPage;