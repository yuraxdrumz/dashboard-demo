import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'

const WebsitesWrapper = styled.div`
  display:flex;
  flex:1;
  background:#eeebed;
`

const TitlesWrapper = styled.div`
  display:flex;
  width:100%;
  height:5rem;
  margin:1rem;
`

// const Title = styled.div`
//   display:flex;
//   width:15rem;
//   justify-content:center;
//   align-items:center;
//   font-size:1.2rem;
//   color:${MainColor};
//   font-family:${fontFamily};
// `

const Column = styled.div`
  display:flex;
  margin:1rem;
  width:15rem;
  align-items:center;
  flex-direction:column;
`

const Title = styled.div`
  display:flex;
  width:100%;
  height:5rem;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  text-decoration:underline;
  color:${MainColor};
  font-family:${fontFamily};
`

const EachDataRow = styled.div`
  display:flex;
  font-size:1.2rem;
  color:${MainColor};
  font-family:${fontFamily};
  justify-content:center;
  height:3rem;
  width:100%;
  &:hover{
    cursor:${props=>props.cursor ? 'pointer' : null};
    opacity:${props=>props.cursor ? 0.8 : 1};
  }
`

export default class Websites extends Component{
  constructor(props, context){
    super(props, context)
    this.props = props
    this.state = {
      impressions:null,
      clicks:null,
      websites:null,
      fetched:false
    }
    this.fetchSingleWebsite = this.fetchSingleWebsite.bind(this)
  }
  fetchSingleWebsite(website,e){
    e.preventDefault();
    this.context.router.push(`/websites/${website.id}?name=${website.name}`)
  }
  async componentWillMount(){
    const data = await axios.get('http://localhost:5000/api/getwebsitesdata')
    this.setState({
      impressions:data.data.data.impressions,
      clicks:data.data.data.clicks,
      websites:data.data.data.websites,
      fetched:true
    })
  }

  render(){
    if(this.state.fetched){
      const websites = this.state.websites.map((each, index)=><EachDataRow cursor onClick={this.fetchSingleWebsite.bind(this,each)} key={index}>{each.name}</EachDataRow>)
      const impressions = this.state.impressions.map((each, index)=><EachDataRow key={index}>{each}</EachDataRow>)
      const clicks = this.state.clicks.map((each, index)=><EachDataRow key={index}>{each}</EachDataRow>)
      return(
        <WebsitesWrapper>
          <Column>
            <Title>Websites</Title>
            {websites}
          </Column>
          <Column>
            <Title>Impressions</Title>
            {impressions}
          </Column>
          <Column>
            <Title>Clicks</Title>
            {clicks}
          </Column>
        </WebsitesWrapper>
      )
    }else{
      return(
        <WebsitesWrapper>
          <Column>
            <Title>Websites</Title>
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          </Column>
          <Column>
            <Title>Impressions</Title>
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          </Column>
          <Column>
            <Title>Clicks</Title>
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          </Column>
        </WebsitesWrapper>
      )
    }

  }
}
Websites.contextTypes = {
  router: React.PropTypes.object.isRequired
};
