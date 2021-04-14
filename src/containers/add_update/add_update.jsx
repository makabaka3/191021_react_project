import React, { Component } from 'react'
import {Card,Button,Form,Input,Select, message} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqAddProduct,reqProductInfoById,reqUpdateProduct} from '../../ajax'
import { createSaveCategoryAsyncAction } from "../../redux/actions/category";
import PictureWAll from './picture_wall'
import RichText from './rich_text'

const {Item} = Form
const {Option} = Select
class AddUpdate extends Component {
  state = {
    isUpdate:false,
    _id:''
  }

  onFinish = async(values)=>{
    values.imgs = this.refs.pictureWall.getImgNames()
    values.detail = this.refs.richText.getRichText()
    let result
    if(this.state.isUpdate){
      values._id = this.state._id
      result = await reqUpdateProduct(values)
    }else{
      result = await reqAddProduct(values)
    }

    const {status,msg} = result
    if(status===0){
      message.success(this.state.isUpdate?'添加商品成功':'新增商品成功')
      this.props.history.replace('/admin/prod_about/product')
    }else{
      message.error(msg)
    }
  }
  createOption = ()=>{
    return this.props.categoryList.map((categoryObj)=>{

      return <Option key ={categoryObj._id} value={categoryObj._id}>{categoryObj.name}</Option>
    })
  }
  getProductInfoById = async(id)=>{
    let {status,data,msg} = await reqProductInfoById(id)
    if(status===0){
      console.log(data);
    this.refs.form.setFieldsValue(data) 
    this.refs.pictureWall.setImgs(data.imgs)
    this.refs.richText.setRichText(data.detail)
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    const{id} = this.props.match.params
    if(!this.props.categoryList.length){
      this.props.saveCategoryList()
    }
    if(id){
      //如果有id就是修改
      this.setState({isUpdate:true,_id:id})
      //根据商品id查询商品的详细信息
      this.getProductInfoById(id)
    }
  }
  render() {
    return (
      <Card title={
        <div>
          <Button onClick= {()=>{this.props.history.goBack()}} type="link">
            <ArrowLeftOutlined />返回
          </Button>
          <span>{this.state.isUpdate?'修改商品':'新增商品'}</span>
        </div>
      }>
        <Form
          onFinish={this.onFinish}
          ref="form"
        >
          <Item
            name="name"
            rules={[{required:true,message:'商品名称不能为空'}]}
            label = "商品名称"
            wrapperCol= {{span:10}}
          >
            <Input placeholder="请输入商品名"/>
          </Item>

          <Item
            name="desc"
            rules={[{required:true,message:'描述不能为空'}]}
            label = "商品描述"
            wrapperCol= {{span:10}}
          >
            <Input placeholder="请输入商品描述"/>
          </Item>

          <Item
            name="price"
            rules={[{required:true,message:'商品价格不能为空'}]}
            label = "商品价格"
            wrapperCol= {{span:10}}
          >
            <Input 
              addonAfter="元"
              addonBefore="￥"
              type="number"
              placeholder="请输入商品价格"
            />
          </Item>

          <Item
            name="categoryId"
            rules={[{required:true,message:'必须选择一个分类'}]}
            label = "所属分类"
            wrapperCol= {{span:10}}
          >
            <Select>
              <Option value="">请选择分类</Option>
              {this.createOption()}
              
            </Select>
          </Item>
          <Item
            style={{marginLeft:'10px'}}
            label= "商品图片"
          >
            <PictureWAll ref="pictureWall"/>
          </Item>
          <Item
            style={{marginLeft:'10px'}}
            label= "商品详情"
            wrapperCol={{span:20}}
          >
            <RichText ref="richText"/>
          </Item>
          <Item>
            <Button htmlType="submit" type="primary">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default connect(
  (state)=>({categoryList:state.categoryList}),
  {
    saveCategoryList:createSaveCategoryAsyncAction
  }
)(AddUpdate)