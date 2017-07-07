import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'

const WebsitesWrapper = styled.div`
  display:flex;
  flex:1;
  background:#eeebed;
  flex-direction:column;
`

const InnerWrapper = styled(WebsitesWrapper)`
  flex-direction:row;
`

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
const WebsitesName = styled.div`
  display:flex;
  padding:1rem;
  text-decoration:underline;
  font-size:1.5rem;
  font-family:${fontFamily};
  color:${MainColor};
`

export default class WebsiteInfo extends Component{
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      impressions:null,
      clicks:null,
      campaigns:null,
      fetched:false
    }
  }
  async componentWillMount(){
    const data = await axios.get(`http://52.39.248.26:5000/api/getwebsite/${this.props.routeParams.websiteId}`)
    this.setState({
      campaigns:data.data.data.campaigns,
      clicks:data.data.data.clicks,
      impressions:data.data.data.impressions,
      fetched:true
    })
  }

  render(){
    if(this.state.fetched){
      const campaigns = this.state.campaigns.map((each, index)=><EachDataRow key={index}>{each.name}</EachDataRow>)
      const impressions = this.state.impressions.map((each, index)=><EachDataRow key={index}>{each}</EachDataRow>)
      const clicks = this.state.clicks.map((each, index)=><EachDataRow key={index}>{each}</EachDataRow>)
      return(
        <WebsitesWrapper>
          <WebsitesName>{this.props.location.query.name}</WebsitesName>
          <InnerWrapper>
            <Column>
              <Title>Campaigns</Title>
              {campaigns}
            </Column>
            <Column>
              <Title>Impressions</Title>
              {impressions}
            </Column>
            <Column>
              <Title>Clicks</Title>
              {clicks}
            </Column>
          </InnerWrapper>

        </WebsitesWrapper>
      )
    }else{
      return(
        <WebsitesWrapper>
          <WebsitesName>{this.props.location.query.name}</WebsitesName>
          <InnerWrapper>
            <Column>
              <Title>Campaigns</Title>
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
          </InnerWrapper>

        </WebsitesWrapper>
      )
    }
  }
}