import { useParams } from "react-router-dom";
import ReadComponent from "../../components/reviews/ReadComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ReadPage = () => {

  const{queryObj,moveUpdate ,moveList} = useQueryObj();
  // router 설정에 path: "read/:rno"로 처리해서 rno값을 가져오려고 => 객체라 구조분해 할당
  //list와 read는 부모 자식의 개념이 아니라 평등한 page라 아래와 같이 rno를 뽑아낸다.
  const {rno} = useParams()

  console.log(rno)
  console.log(queryObj)

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">리뷰 상세 페이지</div>
      <ReadComponent rno = {rno} moveUpdate={moveUpdate} moveList={moveList}></ReadComponent>
    </div>
  );
}

export default ReadPage;