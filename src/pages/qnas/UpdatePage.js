import { useParams } from "react-router-dom";
import UpdateComponent from "../../components/qnas/UpdateComponent";
import useQueryObj from "../../hooks/useQueryObj";

const UpdatePage = () => {

  const {moveRead, moveList} = useQueryObj()
  const {qno} = useParams()

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">문의 수정</div>
      <UpdateComponent qno={qno} moveRead={moveRead} moveList={moveList}></UpdateComponent>
    </div>
  );
}

export default UpdatePage;