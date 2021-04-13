import React, { Component } from 'react'
import {Button, Modal} from 'antd'
import { 
  FullscreenOutlined ,
  FullscreenExitOutlined, 
  ExclamationCircleOutlined} from '@ant-design/icons';
import {reqWeather} from '../../ajax/index'
import screenfull from 'screenfull';
import {connect} from 'react-redux'
import {createDeleteUserAction} from '../../redux/actions/login'
import {createSaveTitleAction} from '../../redux/actions/header'
import dayjs from 'dayjs'
import './css/header.less'
const { confirm } = Modal;


class Header extends Component {
  state={
    //标识是否全屏
    isFull:false,
    date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'),
      temperature:'',
      weather:'',
      city:''
  }
  
  fullScreen=()=>{
    
    //让网页全屏
    screenfull.toggle();
    
  }
  getWeather = async()=>{
    let result = await reqWeather()
    const {weather,temperature,city} = result
    this.setState({weather,temperature,city})
  }

  componentDidMount(){
    screenfull.onchange(()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    })
    //开启更新时间定时器
    this.timer=setInterval(()=>{
    this.setState({date:dayjs(Date.now()).format('YYYY年 MM月 DD日 HH:mm:ss  ')})
    },1000)
    //请求天气信息
    this.getWeather()
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }
  
  logOut=()=>{
    confirm({
      title: '确定退出吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后要重新登录',
      okText:'确定',
      cancelText:'取消',
      onOk:()=>{//确认按钮的回调
        this.props.logout()
        this.props.deleteTitle('')
      }
    });
    
  }

  render() {
    const {date,city,weather,temperature,isFull}=this.state
    return (
      <div className="header">
        
        <div className="header-top">
        <Button onClick={this.fullScreen} size="samll">
          {isFull?<FullscreenExitOutlined />:<FullscreenOutlined /> }
        </Button>
        <span className="user">欢迎，{this.props.username}</span>
        <Button onClick={this.logOut} type="link">退出登录</Button>
        </div>
       
        <div className="header-bottom">
          <div className="bottom-left">
            <h1>{this.props.title}</h1>
          </div>
          <div className="bottom-right">
            <span>{date}</span>
            <span>{city}天气：{weather} 温度：{temperature}℃</span>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  (state)=>({
    username:state.userInfo.user.username,
    title:state.title
  }),
  {
    logout:createDeleteUserAction,
    deleteTitle:createSaveTitleAction
  }
)(Header)
