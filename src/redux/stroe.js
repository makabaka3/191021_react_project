import {createStore,applyMiddleware} from 'redux'
import reducer from './reducers'
//异步编码的
import thunk from 'redux-thunk'
//开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
