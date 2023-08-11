import { useParams } from "react-router-dom";
import ListComponent from "../products/ListComponent";
import { useEffect, useState } from "react";
import { readStoreApi } from "../../api/storeAPI";
import useQueryObj from "../../hooks/useQueryObj";
import ListByStoreComponent from "../reviews/ListByStoreComponent";

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
    //console.log('sno', sno)
    readStoreApi(sno).then(res => {
      //console.log('가맹점 Read Data:', res)
      setReadStore(res)
    })
  }, [sno])
  
  const movePage = (num) => {
    queryObj.page = num
    setSearch({ ...queryObj })
  }

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
        {readStore.storeName}
      </div>
      <dl className="mt-3">
        <dt className="inline-block text-[18px] font-medium">
          가맹점 전화번호 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readStore.storePhone}
        </dd>
      </dl>
      <dl className="pb-3 border-b border-[#ccc]">
        <dt className="inline-block text-[18px] font-medium">
          가맹점 주소 :
        </dt>
        <dd className="inline-block text-[17px] ml-2">
          {readStore.storeAddress}
        </dd>
      </dl>
      <div>
        <ListComponent
          sno={sno}
          queryObj={queryObj}
          movePage={movePage}
          moveRead={moveRead}
        ></ListComponent>
      </div>
    <div>

      <ListByStoreComponent sno = {sno}></ListByStoreComponent>

    </div>
      
    </div>
  );
}

export default ReadComponent;