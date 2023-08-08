import { useParams } from "react-router-dom";
import ListComponent from "../products/ListComponent";
import { useEffect, useState } from "react";
import { readStoreApi } from "../../api/storeAPI";
import useQueryObj from "../../hooks/useQueryObj";

const initState = {
  sno: '',
  storeNumber: '',
  storeAddress: '',
  storePhone: '',
  email:'',
  storeName:''
}

const ReadComponent = () => {

  const { setSearch, queryObj, moveRead } = useQueryObj();

  const {sno} = useParams();

  const [readStore, setReadStore] = useState(initState)

  useEffect(() => {
    console.log('sno', sno)
    readStoreApi(sno).then(res => {
      console.log('가맹점 Read Data:', res)
      setReadStore(res)
    })
  }, [sno])
  
  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <div>

      <div>
        스토어 Read Page
        <div>
          <label>가맹점 번호: </label>
          {readStore.sno}
        </div>
        <div>
          <label>가맹점 이름: </label>
          {readStore.storeName}
        </div>
        <div>
          <label>가맹점 전화번호: </label>
          {readStore.storeNumber}
        </div>
        <div>
          <label>가맹점 주소: </label>
          {readStore.storeAddress}
        </div>
      </div>


    <div>
      상품 리스트
      <ListComponent
        sno={sno}
        queryObj={queryObj}
        movePage={movePage}
        moveRead={moveRead}
      ></ListComponent>
    </div>
      
    </div>
  );
}

export default ReadComponent;