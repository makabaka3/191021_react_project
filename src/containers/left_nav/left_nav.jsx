import React, { Component } from 'react'
import logo from '../../static/imgs/logo.png'
import {Menu} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../redux/actions/header'
import menus from '../../config/menu_config'


import './css/left_nav.less'
const { SubMenu,Item } = Menu;

class LeftNav extends Component {
 // 创建菜单的方法
  createMenu = (menuArr)=>{
    return menuArr.map((menuObj)=>{
      // 没有children
      if(!menuObj.children){
        return (
          <Item key={menuObj.key} icon={<menuObj.icon />} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
            <Link to={menuObj.path}>
              {menuObj.title}
            </Link>
          </Item>
        )
      }else{
        return(
          <SubMenu key={menuObj.key} icon={<menuObj.icon />} title={menuObj.title}>
          {this.createMenu(menuObj.children)}
          </SubMenu>
        )
        
      }
    })
  
  }

  getTitleByPath=()=>{
    console.log('redux里没title了，只能靠gettitlepath计算了');
  //根据当前浏览器路径最后单词，区菜单数值匹配，得出title
  let pathArr = this.props.location.pathname.split('/')
  let key = pathArr.reverse()[0]
  if(key === 'admin') key = 'home'
  //三级路由导航选中与标题
  if(pathArr.indexOf('product') !== -1) key = 'product'
		console.log(key);
  let title = ''
    menus.forEach((menuObj)=>{
      // 若有children
      if(menuObj.children instanceof Array){
        let result = menuObj.children.find((childrenObj)=>{
          return childrenObj.key === key
        })
        //若找见了结果
        if(result) title = result.title
      }else{
        //no children
        if(menuObj.key === key) title = menuObj.title
      }
    })
    this.props.saveTitle(title)
  }
  
  componentDidMount(){
    //如果没有存储title
    if(!this.props.title){
      this.getTitleByPath()
    }
  }

  render() {
    const currentPathArr = this.props.location.pathname.split('/')
    let currentKey = currentPathArr.reverse()[0]
    if(currentPathArr.indexOf('product') !==-1) currentKey = 'product'
    return (
      <div className='left-nav'>
        <div className="nav-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </div>

        <div>
        <Menu
          selectedKeys={[currentKey]}//一上来就选中谁
          defaultOpenKeys={currentPathArr}//默认打开哪个菜单
          mode="inline"
          theme="dark"
        >
          {this.createMenu(menus)}

        </Menu>
      </div>
      </div>
    )
  }
}



export default connect(
	(state)=>({title:state.title}),//传递状态
	{
		saveTitle:createSaveTitleAction
	}//传递操作状态的方法
)(withRouter(LeftNav))
