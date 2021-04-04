import React, { Component } from 'react'
import {Route,Switch,Redirect } from 'react-router-dom'
import './App.less'
import Login from './containers/login/login'
import Admin from './containers/admin/admin'

export default class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Redirect to='/login'/>
        </Switch>
      
    )
  }
}
