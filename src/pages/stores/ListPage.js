import ListComponent from "../../components/stores/ListComponent";

const ListPage = () => {
  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">가맹점 목록</div>
      <ListComponent></ListComponent>
    </div>
  );
}

export default ListPage;