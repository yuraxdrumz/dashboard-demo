import React, { Component } from 'react'
import styled from 'styled-components'
import LogoPng from '../../../assets/template-logo.png'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { hashHistory, browserHistory } from 'react-router'
const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'

const Wrapper = styled.div`
  display:flex;
  flex:1;
  background: linear-gradient(to bottom right,${MainColor}, #e6dada);
  background-size:cover;
  position:relative;
  overflow:hidden;
`
const LoginForm = styled.form`
  display:flex;
  justify-content:center
  align-items:center
  margin:0;
  height:100px;
  width:100px;
`

const Title = styled.div`
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
`


const FormWrapper = styled.div`
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
`

const Logo = styled.div`
  font-size:4rem;
  color:white;
  font-family: ${fontFamily};
	animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const Slogan = styled.div`
  font-size:2rem;
  color:white;
  font-family: ${fontFamily};
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const MiddleLine = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  width: 1px;
  height: 50%;
  background: rgba(255, 255, 255, 0.4);
	animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const FormContainer = styled.div`
  display:flex;
  flex:1;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  height:50%;
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const Input = styled.input`
  height:3.5rem;
  margin-bottom:1rem;
  width:50%;
  display:flex;
  font-family:${fontFamily};
  color:#fff;
  font-size:1.5rem;
  padding:10px;
  border:1px solid ${MainColor};
  border-radius:5px;
  background-color:rgba(255,255,255,0.2);
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #fff;
}
`

const LoginBtn = styled.button`
  margin-top:1rem;
  height:3.5rem;
  width:50%;
  display:flex;
  background:green;
  padding:10px;
  justify-content:center;
  align-items:center;
  background:${MainColor};
  border:1px solid rgba(255,255,255,0.5);
  border-radius:5px;
  color:#fff;
  font-size:1.5rem;
  font-family:${fontFamily};
  &:hover{
    animation:shakeThatBooty .3s;
    cursor:pointer;
  }
`

const ImgContainer = styled.div`
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  margin-right:1rem;
`

const SloganContainer = styled.div`

`

const ForgotPass = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:3.5rem;
  font-family:${fontFamily};
  color:#fff;
  font-size:1.5rem;
`
export default class Login extends Component{
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      email: '',
      password:'',
      message:'',
      status:''
    };
    this.changeEmail = this.changeEmail.bind(this)
    this.changePass = this.changePass.bind(this)
    this.auth = this.auth.bind(this)
  }
  componentWillMount(){
  }
  changeEmail(event){
    this.setState({email: event.target.value});
  }
  changePass(event){
    this.setState({password: event.target.value});
  }
  async auth(){
    let { email, password } = this.state
    const answer = await axios.post(`http://52.39.248.26:5000/auth/login`,{
      email,
      password
    })
    const token = answer.data.token
    const decoded_token = jwtDecode(token)
    localStorage.setItem('token',JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(decoded_token))
    this.context.router.push('main')
  }
  render(){
    return(
      <Wrapper>
        <Title>
          <ImgContainer>
            <img src={LogoPng} width="100" height="100" alt=""/>
          </ImgContainer>
          <SloganContainer>
            <Logo>Demo</Logo>
            <Slogan>Enter the dark Side</Slogan>
          </SloganContainer>
        </Title>
        <MiddleLine/>
        <FormWrapper>
          <FormContainer>
            <Input onChange={this.changeEmail} type="email" placeholder="Enter Email..."/>
            <Input onChange={this.changePass} type="password" placeholder="Enter Password..."/>
            <LoginBtn onClick={this.auth}>Login</LoginBtn>
            <ForgotPass>Forgot Credentials?</ForgotPass>
          </FormContainer>
        </FormWrapper>
      </Wrapper>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};
