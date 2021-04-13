import React, { Component } from 'react'
import './login.less'
import logo from '../../static/imgs/logo.png'
import { Form, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../ajax/index'
import {createSaveUserAction} from '../../redux/actions/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';


//从Form上获取item（antd）
const {Item} = Form


class Login extends Component {
//表单提交的回调
  onFinish = async(values) => {
    const {username,password}=values
    let result =await reqLogin(username,password)
    const {status,data,msg} = result
    if(status===0){
      //success
      message.success('登录成功！')
      console.log(data);
      this.props.save(data)//向redux保存用户信息
      // this.props.history.replace('/admin') 
    }else{
      //false
      message.warning(msg)
    }
  };

  validatorpwd = (rule,value)=>{
    if(!value){
      return Promise.reject('密码不能为空')
    }else if(value.length<4){
      return Promise.reject('密码必须大于4')
    }
    return Promise.resolve()
  }

  render() {
    if(this.props.isLogin) return <Redirect to = '/admin'/>

    return (
      <div className="login"> 
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
          <Item
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' },
              {max:12,message:'用户名要小于12'},
              {pattern:/^\w+$/,message:'数字字母下划线'}
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Item>
          <Item
            name="password"
            rules={[{validator:this.validatorpwd }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Item>
          
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Item>
        </Form>
          
        </section>
      </div>
    )
  }
}

export default connect(
  (state)=>({isLogin:state.userInfo.isLogin}),//用于传递状态给ui
  {save:createSaveUserAction}//用于传递状态的方法给ui
)(Login)