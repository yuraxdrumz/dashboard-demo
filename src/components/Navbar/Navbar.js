import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../../../assets/template-logo.png'
import ProfileImg from '../../../assets/default-male.png'
import axios from 'axios'
import { hashHistory, browserHistory } from 'react-router'

const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'

const Wrapper = styled.div`
  height:5rem;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:${MainColor};
`

const LogoImg = styled.img`
  height:75px;
  width:75px;
  margin-left:1rem;
`

const LoginLogout = styled.div`
  display:flex;
  color:#fff;
  font-family:${fontFamily};
  font-size:1.2rem;
  margin-right:1rem;
`

const Logout = styled.button`
  display:flex;
  border-radius:5px;
  background:none;
  color:#fff;
  font-size:1.2rem;
  font-family: ${fontFamily};
  border:none;
  &:hover{
    cursor:pointer;
    opacity:0.8;
  }
`
const LogoWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`
const ProfileImgWrapper = styled.img`
  width:25px;
  height:25px;
  margin-right:1rem;
  border-radius:50%;
`
const LogoText = styled.div`
  color:#fff;
  font-size:1.5rem;
  font-family:${fontFamily};
`
export default function Navbar(props){
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src={Logo}/>
        <LogoText>Logo here</LogoText>
      </LogoWrapper>
      <LoginLogout> <ProfileImgWrapper src={ProfileImg} alt=""/>Logged in as: {props.user.email} / <Logout onClick={props.logout}>Logout</Logout></LoginLogout>
    </Wrapper>
  )
}