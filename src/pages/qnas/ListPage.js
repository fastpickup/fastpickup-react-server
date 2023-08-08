import ListComponent from "../../components/qnas/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

      // Custom hooks 사용
      const {queryObj , setSearch , moveRead} = useQueryObj()

      // 페이지 넘어가는 함수
      const movePage= (num) => {
          console.log(num)
          
          // 가져온 num 값으로 페이지를 변경하는 상태로 변경하자
          queryObj.page = num
          setSearch({...queryObj})
      }


  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">내 1:1 문의 목록</div>
      <ListComponent queryObj={queryObj} moveRead={moveRead} movePage={movePage}></ListComponent>
    </div>
  );
}

export default ListPage;