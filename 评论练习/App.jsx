import React,{Component} from 'react'
import Add from './components/add/Add'
import List from './components/list/List'

export default class App extends Component{

  state = {
    comments:[
      {id:'x89vcuboucxiuyboi7',userName:'王帅',content:'react just soso!'},
      {id:'siaudyf876sd98f7s8',userName:'丽君',content:'我觉得很容易'},
      {id:'xcv78xv987x9vx987x',userName:'班长',content:'等我节后归来'}
    ]
  }

  addComment =(commentObj)=>{
    //1.获取原状态----获取原状态时，不要用解构赋值（数据不是基本类型的时）。即：不要直接用原来的数据，要“缔造”一个新数据。
    //let {comments} = this.state
    let comments = [...this.state.comments]
    //console.log(comments === this.state.comments)

    /*2.修改状态（不能直接修改,要三点运算符）
      直接修改----如果使用了解构赋值方式获取到的state里的具体数据，那么如下代码就属于直接修改状态。
      非直接修改----使用了三点运算符，获取到原状态（实质上产生了一个新的对象）。（要用这种方式）*/
    comments.unshift(commentObj)

    //3.更新状态（不能直接更新，要用this.setState方法）
    //this.setState.comments = {}
    this.setState({comments})
  }

  deleteComment =(id)=>{
    let comments = [...this.state.comments]
    /*comments.forEach((item,index)=>{
      if(item.id === id){
        //删掉
        comments.splice(index,1)
      }
    })*/
    //comments.filter((item)=>{return item.id != id})
    this.setState({comments:comments.filter((item)=>{return item.id != id})})
  }

  render(){
    let {comments} = this.state
    return (
      <div id="app">
        <div>
          <header className="site-header jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <h1>请发表对React的评论</h1>
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            <Add addComment={this.addComment}/>
            <List comments={comments} deleteComment={this.deleteComment}/>
          </div>
        </div>
      </div>
    )
  }
}