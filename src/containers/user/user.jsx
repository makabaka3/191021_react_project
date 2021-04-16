import React, { Component } from 'react'
import {Button, Card,Table,Modal,Form,Input,Select, message} from 'antd'
import {reqUserList,reqAddUser,reqDeleteUser} from '../../ajax/index'
import dayjs from 'dayjs'
import {PlusOutlined} from '@ant-design/icons';
import {PAGE_SIZE} from '../../config/index'

const {Item} = Form
const {Option} = Select
export default class User extends Component {
  state = {
    visible: false,
    users:[],
    roles:[]
  };
  getRoleName = (id)=>{
    let result = this.state.roles.find((roleObj)=>{
      return roleObj._id === id
    })
    if(result) return result.name
  }
  //删除用户
  clickDelete = (user)=>{
    Modal.confirm({
      content:`确认删除${user.username}吗？`,
      okText:"确认",
      cancelText:"取消",
      onOk: async()=>{
        const result = await reqDeleteUser(user._id)
        if(result.status === 0){
          this.getUserList()
        }
      }
    })
  }

  getUserList = async()=>{
    let {status,data,msg} = await reqUserList()
    if(status===0){
      const {users,roles} = data
      this.setState({users:users.reverse(),roles})
    }else{
      message.error(msg)
    }
  }
//展示弹窗
showModal = (userObj) => {
  const {username,phone} = userObj //尝试着获取_id和name，若_id和name均存在，那么是修改分类
  if(username){
    //能进入此判断，就以为是修改操作
    this.username = username //在实例身上缓存要修改分类的名字...
    this.phone = phone
    this.isUpdate = true //实例身上标识：更新
    const {userForm} = this.refs //获取Form节点(第一次获取不到)
    if(userForm) userForm.setFieldsValue({username,phone})//第一次以后靠这行代码回显数据
  }
  this.setState({visible: true}); //更改状态，展示弹窗
};
  
  handleOk = async() => {
    const userObj = this.refs.form.getFieldsValue()
    let {status,data,msg} = await reqAddUser(userObj)
    if(status === 0){
      message.success('添加用户成功')
      //刷新列表
      this.getUserList()
      this.refs.form.resetFields()
      this.setState({ visible:false});
    }else{
      message.error(msg)
    }
  };

  handleCancel = () => {
    this.refs.userForm.setFieldsValue({username:''})
    this.isUpdate = false
    this.username = ''
    this.setState({ visible: false });
  };

  componentDidMount(){
    this.getUserList()
  }
  render() {
    const user = this.user || {}
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'creat_time',
        key: 'creat_time',
        render:(a)=>(dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss'))
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=> this.getRoleName(id)
      },
      {
        title: '操作',
        // dataIndex: 'address',
        key: 'opera',
        align:'center',
        render:(user)=>(
          <div>
            <Button onClick={()=>{this.showModal(user)}} type="link">修改</Button>
            <Button  onClick ={()=>{this.clickDelete(user)}} type="link">删除</Button>
          </div>
        )
      }
    ];
    return (
      <div>
        <Card title={
        <div>
          <Button type="primary" onClick={this.showModal}>
          <PlusOutlined />
            创建用户
          </Button>
        </div>
      }>
          <Table 
            rowKey="_id" 
            bordered
            dataSource={this.state.users} 
            columns={columns}
            pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}

          />
        </Card>
      {/* 新增用户弹窗 */}
        <Modal
        title={user._id?'修改用户':'添加用户'}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确定"
        cancelText="取消"
        >
          <Form 
            ref="userForm"
            initialValues={{
							username:this.username,
              phone:this.phone
              // phone:this.user.phone
						}}
          >
            <Item
            name="username"
            label="用户名"
            labelAlign="left"
            labelCol={{span:4}}
            wrapperCol={{span:12}}
            rules={[
              {required: true, message: 'Please input your Username!' },
              {max:12,message:'用户名要小于12'},
              {pattern:/^\w+$/,message:'数字字母下划线'}
            ]}
          >
            <Input placeholder="用户名"/>
          </Item>

            <Item
            name="password"
            label="密码"
            labelAlign="left"
            labelCol={{span:4}}
            wrapperCol={{span:12}}
            rules={[
              {required: true, message: '密码必须输入' },
              {max:12,message:'密码要小于12'},
              {pattern:/^\w+$/,message:'密码必须是数字字母下划线'}
            ]}
          >
            <Input placeholder="用户名"/>
            </Item>
          
            <Item
              name="phone"
              label="手机号"
              labelAlign="left"
              labelCol={{span:4}}
              wrapperCol={{span:12}}
              rules={[
                {required: true, message: '手机号必须输入' },
              ]}
            >
            <Input placeholder="请输入手机号"/>
          </Item>
          
            <Item
            name="email"
            label="邮箱"
            labelAlign="left"
            labelCol={{span:4}}
            wrapperCol={{span:12}}
            rules={[
              {required: true, message: '邮箱必须输入' },
            ]}
            > 
            <Input placeholder="请输入邮箱"/>
            </Item>
            <Item
            name="role_id"
            label="所属角色"
            labelAlign="left"
            labelCol={{span:4}}
            wrapperCol={{span:12}}
            rules={[
              {required: true, message: '必须选择一个角色' },
            ]}
          >
            <Select>
              <Option value="">请选择角色</Option>
              {
                this.state.roles.map((roleObj)=>{
                  return <Option key={roleObj._id} value={roleObj._id}>{roleObj.name}</Option>
                })
              }
              
            </Select>
          </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
