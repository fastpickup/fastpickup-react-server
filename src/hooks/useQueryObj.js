import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

//페이징 이동 Custom Hooks

const checkNull = (obj) => {
  const result = {}

  for (const attr in obj) {
    const attrName = attr
    const attrValue = obj[attr]

    if( attrValue && attrValue !== 'null'){
      result[attrName] = attrValue
    }
  }

  return result
}

const useQueryObj = () => {

  const [search, setSearch] = useSearchParams()
  const navigate = useNavigate()

  //console.log(search)

  const page = search.get("page") || 1
  const size = search.get("size") || 10
  const type = search.get("type")
  const keyword = search.get("keyword")

  const queryObj = checkNull({page, size, type, keyword})

  //console.log("queryObj ---------------- ")
  console.log(queryObj)

  const moveList = () => {
    const queryString = createSearchParams(queryObj).toString()

    navigate(`../list?${queryString}`)
  }

  const moveRead = (num) => {
    //console.log("moveRead: ---" + num)

    const queryString = createSearchParams(queryObj).toString()

    navigate(`../read/${num}?${queryString}`)
  }

  const moveUpdate = (num) => {
    //console.log("moveUpdate: ---" + num)

    const queryString = createSearchParams(queryObj).toString()

    navigate(`../update/${num}?${queryString}`)
  }

  return {setSearch, queryObj, moveList, moveRead, moveUpdate}
}

export default useQueryObj