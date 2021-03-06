//所有发送请求的方法都会写在这里
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import store from '../redux/stroe'
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
//请求商品分类信息
export const reqCategoryList = () => myAxios.get('/manage/category/list')
//请求添加一个分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add',{categoryName})
	//请求修改分类名称
  export const reqUpdateCategory = (categoryId,categoryName) => 
  myAxios.post('/manage/category/update',{categoryId,categoryName})
  //请求商品列表
  export const reqProductList =(pageNum,pageSize)=> myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
  //请求商品上架或下架
  export const reqChangeProdStatus = (productId,status) => myAxios.post('/manage/product/updateStatus',{productId,status})
  //搜索商品
  export const reqSearchProduct = (searchType,keyWord,pageNum,pageSize) =>myAxios.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
  //根据商品id获取商品详细信息
  export const reqProductInfoById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})
  //请求删除一个图片
  export const reqDeletePicture = (name)=> myAxios.post('/manage/img/delete',{name})
  //请求添加商品
  export const reqAddProduct = (productObj)=> myAxios.post('/manage/product/add',productObj)
  //请求修改商品
  export const reqUpdateProduct = (productObj) => myAxios.post('/manage/product/update',productObj)
  //请求所有角色列表
  export const reqRoleList = () => myAxios.get('/manage/role/list')
  //请求添加角色
  export const reqAddRole = ({roleName}) =>myAxios.post('/manage/role/add',{roleName})
  //请求给某个角色授权
  export const reqAuthRole = (_id,menus) => {
    const {username} = store.getState().userInfo.user
    return myAxios.post('/manage/role/update',{_id,menus,auth_name:username,auth_time:Date.now()})
  }
  //请求角色列表，也包含角色列表
  export const reqUserList = () => myAxios.get('/manage/user/list')
  //添加用户
  export const reqAddUser = (userObj) => myAxios.post('/manage/user/add',userObj)
  // 获取所有用户的列表
  // export const reqUsers = () => myAxios.get('/manage/user/list')
  // 删除指定用户
  export const reqDeleteUser = (userId) =>myAxios.post('/manage/user/delete', {userId})
  // // 添加/更新用户
  // export const reqAddOrUpdateUser = (user) => myAxios.post('/manage/user/'+(user._id ? 'update' : 'add'), user)