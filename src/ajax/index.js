//所有发送请求的方法都会写在这里
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import {LOCATION,KEY,WEATHER_URL} from '../config'

//请求登录

export const reqLogin = (username,password) => myAxios.post('/login',{username,password})
//天气
export const reqWeather = ()=>{
  const url = `${WEATHER_URL}?city=${LOCATION}&key=${KEY}`
  return new Promise((resolve) => {
    jsonp(url,(err,data) => {
      if(!err){
        resolve(data.lives[0]);
      }else{
        message.error(err) 
      }
    })
  })
}