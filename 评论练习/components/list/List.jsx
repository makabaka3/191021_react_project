import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Item from '../item/Item'
import './List.css'

export default class List extends Component{

  static propTypes = {
    comments:PropTypes.array.isRequired
  }

  render(){
    let {comments} = this.props
    let {deleteComment} = this.props
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{display:comments.length>0?'none':'block'}}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {comments.map((item)=>{return <Item key={item.id} comment={item} id={item.id} deleteComment={deleteComment}/>})}
        </ul>
      </div>
    )
  }
}