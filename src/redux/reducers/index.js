import {combineReducers} from 'redux'
import headerReducer from './header'
import loginReducer from './login'
import categoryReducer from './category'
//combineReducers传入的那个对象就是redux中那个大状态对象
export default combineReducers({
  userInfo:loginReducer,
  title:headerReducer,
  categoryList:categoryReducer
})


