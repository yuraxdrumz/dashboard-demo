import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect, withRouter } from 'react-router'
import styled from 'styled-components'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Websites from '../Websites/Websites'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'

const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'

const AllWrapper = styled.div`
  display:flex;
  height:100%;
  flex:1;
`

const LoggedWrapper = styled(AllWrapper)`
  flex-direction:column;
`

const LoggedChildrenWrapper = styled.div`
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
    axios.defaults.headers.common['Authorization'] = token
  }
}

const navigateToMain = ()=>{
  let user = JSON.parse(localStorage.getItem('user'))
  if( user && user.exp > Date.now()/1000 ){
    browserHistory.push('/')
  }
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  browserHistory.push('/')
}

const SideBar = styled.div`
  width:15rem;
  display:flex;
  background:${MainColor};
  height:100%;
  flex-direction:column;
`

const NavigationButton = styled.div`
  display:flex;
  height:5rem;
  width:100%;
  color:#fff;
  font-size:1.5rem;
  justify-content:center;
  align-items:center;
  border-bottom:1px solid #fff;
  font-family:${fontFamily};
  background:${props=>props.isLogged ? 'rgba(255,255,255,0.3)' : null};
  &:hover{
    cursor:pointer;
    transition: background .2s;
    transition-timing-function: linear;
  }
`

export default function Logged(props){
  return (
    <LoggedWrapper>
      <Navbar logout={logout} user={JSON.parse(localStorage.getItem('user'))}></Navbar>
      <LoggedChildrenWrapper>
        <SideBar>
          <Link className="logged__link" to="main">
            <NavigationButton Link="/main" isLogged={props.location.pathname.includes('main')}>Dashboard</NavigationButton>
          </Link>
          <Link className="logged__link" to="websites">
            <NavigationButton Link="/websites" isLogged={props.location.pathname.includes('websites')}>Websites</NavigationButton>
          </Link>
        </SideBar>
        {props.children}
      </LoggedChildrenWrapper>
    </LoggedWrapper>
  )
}