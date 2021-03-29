import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const {Item} = Form

export default class Login extends Component {

  onFinish = (values) => {
    console.log('Received values of form: ', values);
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
              {max:12,message:'用户小于12'},
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
