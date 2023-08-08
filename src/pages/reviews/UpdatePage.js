import { useParams } from "react-router-dom";
import UpdateComponent from "../../components/reviews/UpdateComponent";
import useQueryObj from "../../hooks/useQueryObj";

const UpdatePage = () => {

  const {moveRead, moveList} = useQueryObj()
  const {rno} = useParams()

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">리뷰 수정</div>
      <UpdateComponent rno = {rno} moveRead={moveRead} moveList={moveList}></UpdateComponent>
    </div>
  );
}

export default UpdatePage;