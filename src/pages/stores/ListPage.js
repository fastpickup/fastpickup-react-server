import { useParams } from "react-router-dom";
import ListComponent from "../../components/stores/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

  const { setSearch, queryObj, moveRead } = useQueryObj();

  const {categoryName} = useParams()

  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">{categoryName}</div>
      <ListComponent movePage={movePage} queryObj={queryObj} categoryName={categoryName}></ListComponent>
    </div>
  );
}

export default ListPage;