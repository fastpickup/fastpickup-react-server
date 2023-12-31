import { useEffect, useState } from "react";

const ListSearchComponent = ({ queryObj, moveSearch }) => {
  const [searchObj, setSearchObj] = useState({ type: "", keyword: "" });

  useEffect(() => {
    // queryObj는 공용
    // searchObj는 Board 페이지에서 사용
    // searchObj가 바뀔때마다 useEffect가 일어나고 type과 keyword가 변경되면서 useState => 랜더링 된다.
    searchObj.type = queryObj.type || "";
    searchObj.keyword = queryObj.keyword || "";

    setSearchObj({ ...searchObj });
  }, [queryObj]);

  return (
<div className="m-2 p-2 bg-gray-100 border">
  <select
    className="border m-2 p-2"
    value={searchObj.type}
    onChange={(e) => setSearchObj({ ...searchObj, type: e.target.value })}
  >
    <option value={""}>---</option>
    <option value={"p"}>주문음식</option>
    <option value={"s"}>음식점</option>
    <option value={"t"}>제목</option>
   
  </select>

  <input
    type="text"
    className="rounded-md border p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    value={searchObj.keyword}
    onChange={(e) => setSearchObj({ ...searchObj, keyword: e.target.value })}
  />

  <button
    className="border m-2 p-2"
    onClick={(e) => moveSearch(searchObj.type, searchObj.keyword)}
  >
    SEARCH
  </button>
</div>
  );
};

export default ListSearchComponent;
