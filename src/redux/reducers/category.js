import {SAVE_CATEGORY_LIST} from '../action_types'
export default function headerReducer(preState=[],action){
  const {type,data } = action
  let newState
  switch (type) {
    case SAVE_CATEGORY_LIST://如果是保存列表
      newState=[...data.reverse()]
      return newState 
    default:
      return preState
  } 
}