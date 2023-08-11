const ListPageComponent = ({movePage, startNum, endNum, prevBtn, nextBtn, pageNums, page}) => {

  const handleClickPage = (pageNum) => {
    movePage(pageNum)
  }

  return (
    <div className="mt-10 px-5 border-3">
      <ul className="flex justify-center">
        {prevBtn ? <li
          className="mx-2 px-2 h-8 flex items-center bg-[#ccc] border border-[#f4f4f2] text-white font-medium rounded"
          onClick={() => handleClickPage(startNum - 1)}
        >
          &lt;
        </li> : <></>}

      {pageNums.map( num =>
        <li
          className="mx-1 bg-[#ccc] border border-[#f4f4f2] text-white font-medium rounded"
          onClick={() => handleClickPage(num)}
          key={num}
        >
          {num === page ? <span className="block px-2 h-8 leading-8 text-[#dc4a51] bg-black rounded">{num}</span> : <span className="block px-2 h-8 leading-8 text-white hover:text-[#690] hover:bg-[#2C2A29] rounded transition-all">{num}</span>}
        </li>
      )}

      {nextBtn ? <li
          className="mx-2 px-2 h-8 flex items-center bg-[#ccc] border border-[#f4f4f2] text-white font-medium rounded"
          onClick={() => handleClickPage(endNum + 1)}
        >
          &gt;
        </li> : <></>}
      </ul>
    </div>
  );
}

export default ListPageComponent;