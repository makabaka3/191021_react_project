import axios from 'axios'
import qs from 'querystring'
import {message } from 'antd';
import NProgress from 'nprogress'
import {createDeleteUserAction} from '../redux/actions/login'
import {createSaveTitleAction} from '../redux/actions/header'
import store from '../redux/stroe'
import 'nprogress/nprogress.css'


//默认地址
axios.defaults.baseURL = 'http://localhost:4000'
//请求拦截器
axios.interceptors.request.use((config)=>{
  NProgress.start()
  let {method,data} = config
  // 获取token，redux中。
  let {token} = store.getState().userInfo
  if(token){
    config.headers.Authorization = 'atguigu_'+token
  }
  //携带token
  if(method.toLowerCase()==='post'&& data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})
//响应拦截器
axios.interceptors.response.use(
    (response)=>{
      NProgress.done()
      return response.data
    },
    (err)=>{
      NProgress.done()
      //服务器没给响应，服务器返回状态不是2开头
      if(err.response.status === 401){
        message.error('身份过期，请重新登录')
        store.dispatch(createDeleteUserAction())
        store.dispatch(createSaveTitleAction(''))
      }else{
        message.error(err.message)
      }
      return new Promise(()=>{})
    }
  )

  export default axios
  