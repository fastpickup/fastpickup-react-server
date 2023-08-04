import MyComponent from "../../components/members/MyComponent";

const MyPage = () => {
  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">제목</div>
      <MyComponent></MyComponent>
    </div>
  );
}

export default MyPage;