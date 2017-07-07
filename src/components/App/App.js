import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect, withRouter } from 'react-router'
import styled from 'styled-components'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Websites from '../Websites/Websites'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Logged from '../LoggedState/LoggedState'
const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'
import WebsiteInfo from '../WebsiteInfo/WebsiteInfo'
const AllWrapper = styled.div`
  display:flex;
  height:100%;
  flex:1;
`


const All = props =><AllWrapper>{props.children}</AllWrapper>

const requireAuth = (nextState, replace)=>{
  let user = localStorage.getItem('user')
  let token = localStorage.getItem('token')
  if (!user || !token || user.exp < Date.now()/1000) {
    replace({
      pathname: '/'
    })
  }else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`

  }
}


export default class App extends Component{

  render(){
    return(
      <Router history={browserHistory}>
        <Route path='/' component={All}>
          <IndexRoute component={Login}></IndexRoute>
          <Route path='/main' component={Logged}>
            <IndexRoute component={Main} onEnter={requireAuth}></IndexRoute>
            <Route path='/websites' component={Websites} onEnter={requireAuth}></Route>
            <Route path="/websites/:websiteId" component={WebsiteInfo} onEnter={requireAuth}/>
          </Route>

        </Route>
      </Router>
    )
  }
}