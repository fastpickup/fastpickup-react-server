import { useParams } from "react-router-dom";
import ListComponent from "../products/ListComponent";
import { useEffect, useState } from "react";
import { readStoreApi } from "../../api/storeAPI";

const initState = {
  sno: '',
  storeNumber: '',
  storeAddress: '',
  storePhone: '',
  email:'',
  storeName:''
}

const ReadComponent = () => {

  const {sno} = useParams();

  const [readStore, setReadStore] = useState(initState)

  useEffect(() => {
    console.log('sno', sno)
    readStoreApi(sno).then(res => {
      console.log('가맹점 Read Data:', res)
      setReadStore(res)
    })
  }, [sno])

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
    <ListComponent></ListComponent>
    </div>
      
    </div>
  );
}

export default ReadComponent;