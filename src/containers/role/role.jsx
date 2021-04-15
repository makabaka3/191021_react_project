import React, { Component } from 'react'
import { Card,Button,Table, message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqRoleList} from '../../ajax/index'

export default class Role extends Component {
  state = {
    roleList:[]
  }
  getRoleList = async()=>{
    let result = await reqRoleList()
    const {status,data,msg} = result
    if(status===0){
      this.setState({roleList:data})
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    this.getRoleList()
  }
  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(a)=>dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        date:(a)=>a? dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss'):'暂未授权'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        render:(a)=>a?a:'暂未授权'
      },
      {
        title: '操作',
        // dataIndex: 'auth_name',
        key: 'opera',
        width:'10%',
        align:'center',
        render:()=><Button type="link">设置权限</Button>
      }
    ]
    return (
      <Card 
        title={
          <div>
            <Button type="primary">
            <PlusCircleOutlined />
            新增角色
            </Button>
          </div>
        }
        extra={<a href="#">More</a>} 
      >
        <Table 
          dataSource={this.state.roleList} 
          columns={columns} 
          bordered
        />
        </Card>
    )
  }
}
