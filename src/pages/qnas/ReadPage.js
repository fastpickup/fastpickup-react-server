import { useParams } from "react-router-dom";
import ReadComponent from "../../components/qnas/ReadComponent";
import useQueryObj from "../../hooks/useQueryObj"

const ReadPage = () => {

  const {queryObj, setSearch, moveRead, moveList, moveUpdate} = useQueryObj()

  // params.qno를 구조분해할당
  const {qno} = useParams()


  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">문의 상세</div>
      <ReadComponent qno={qno} moveList={moveList} moveUpdate={moveUpdate}></ReadComponent>
    </div>
  );
}

export default ReadPage;