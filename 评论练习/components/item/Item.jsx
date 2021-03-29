import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './Item.css'

export default class Item extends Component{

  static propTypes = {
    comment:PropTypes.object.isRequired
  }

  delete =()=>{
    //获取要删除的id
    let {id} = this.props
    let {comment} = this.props
    let {deleteComment} = this.props
    if(window.confirm(`是否要删除【${comment.userName}】该内容`)){
      deleteComment(id)
    }
  }

  render(){
    let {comment} = this.props
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="#1" onClick={this.delete}>删除</a>
        </div>
        <p className="user"><span >{comment.userName}</span><span>说：</span></p>
        <p className="centence">{comment.content}</p>
      </li>
    )
  }
}