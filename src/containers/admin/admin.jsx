import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createDeleteUserAction} from '../../redux/actions/login'
import { Layout } from 'antd';
import './css/admin.less'
import Header from '../header/header'
const {Footer, Sider, Content } = Layout;


class Admin extends Component {
  // logOut = ()=>{
  //   this.props.logout()
  // }
  render() {
    //登录了没有？
    if(!this.props.isLogin) return <Redirect to = '/login'/>
    return (
        <Layout className="admin-root">
          <Sider className="admin-sider">Sider</Sider>
          <Layout>
            <Header/>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    )
  }
}

export default connect(
  //state是redux总的状态对象 传递状态
  (state)=>({
    name:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {
    logout:createDeleteUserAction
  }//传操作对象的方法
)(Admin)
