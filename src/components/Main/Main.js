import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import LineChart from '../LineChart/LineChart'
import Donut from '../Doughnut/Doughnut'
const MainColor = '#274046'
const fontFamily = 'Lobster, cursive'
const colors  = ['#FF851B', '#0074D9', '#7B68EE', '#8FBC8F']

const MainContent = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  margin:1rem;
`
const ContentWrapper = styled.div`
  display:flex;
  flex:1;
  background:#eeebed;
`

const TopBoxedWrapper = styled.div`
  display:flex;
  height:5rem;
  width:100%;
  margin-bottom:1rem;
`

const GraphWrapper = styled.div`
  display:flex;
  flex:3;
  width:100%;
  margin-bottom:1rem;
`

const PieChartsWrapper = styled.div`
  display:flex;
  flex:2;
  justify-content:space-around;
  width:100%;
`

const TopSingleBox = styled.div`
  display:flex;
  flex:1;
  margin-right:.5rem;
  box-shadow:1px 2px 4px rgba(0, 0, 0, .5);
  border:1px solid rgba(0,0,0,0.5);
`

const EdgeBox = styled(TopSingleBox)`
  margin:0;
`

const BoxIconLeft = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:3rem;
  background:${props=>colors[props.iconNumber]}
`

const InnerBoxRightSide = styled.div`
  display:flex;
  flex:1;
  width:100%;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`

const BoxTitle = styled.div`
  color:${props=>colors[props.boxNumber]};
  font-size:1.2rem;
  font-family:${fontFamily};
`

const DataRetrieved = styled.div`
  color:black;
  font-size:1.2rem;
  font-family:${fontFamily};
`

export default class Main extends Component{
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      impressions:null,
      clicks:null,
      ctrs:null,
      ecpms:null,
      graphNumbers:null,
      firstPieNumbers:null,
      secondPieNumbers:null
    }
  }
  donutDataSet(data){
    return {

      labels: [
        'info1',
        'info2',
        'info3'
      ],
      datasets: [{
        data: data || [],
        backgroundColor: [
          '#FF6384',
          '#116a21',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#116a21',
          '#FFCE56'
        ]
      }]

    }
  }
  dataSet(data){
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My Dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 5,
          data:data || []
        }
      ]
    }
  }
  getChartDataSet(){
    return axios.get('http://52.39.248.26:5000/api/linechart')
  }
  getImpressions(){
    return axios.get('http://52.39.248.26:5000/api/impressions')
  }
  getClicks(){
    return axios.get('http://52.39.248.26:5000/api/clicks')
  }
  getCtrs(){
    return axios.get('http://52.39.248.26:5000/api/ctrs')
  }
  getEcpms(){
    return axios.get('http://52.39.248.26:5000/api/ecpms')
  }
  getPieNumbersOne(){
    return axios.get('http://52.39.248.26:5000/api/firstpie')
  }
  getPieNumbersTwo(){
    return axios.get('http://52.39.248.26:5000/api/secondpie')
  }
  async componentWillMount(){
    const answer = await axios.all([this.getImpressions(),this.getClicks(),
      this.getCtrs(), this.getEcpms(), this.getChartDataSet(), this.getPieNumbersOne(), this.getPieNumbersTwo()])
      .then(axios.spread((impressions, clicks, ctrs, ecpms, lineChartData, pieOne, pieTwo)=>{
        this.setState({
          firstPieNumbers:pieOne.data.firstPieNumbers,
          secondPieNumbers:pieTwo.data.secondPieNumbers,
          impressions:impressions.data.impressions,
          clicks:clicks.data.clicks,
          ctrs:ctrs.data.ctrs,
          ecpms:ecpms.data.ecpms,
          graphNumbers:lineChartData.data.graphNumbers
        })
      }))

  }
  render(){
    return(
      <ContentWrapper>
        <MainContent>
          <TopBoxedWrapper>
            <TopSingleBox>
              <BoxIconLeft iconNumber={0}>
                <i className="fa fa-list" aria-hidden="true"></i>
              </BoxIconLeft>
              <InnerBoxRightSide>
                <BoxTitle boxNumber={0}>Impressions</BoxTitle>
                <DataRetrieved>
                  {this.state.impressions ? this.state.impressions :
                    <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                  }
                </DataRetrieved>
              </InnerBoxRightSide>

            </TopSingleBox>
            <TopSingleBox>
              <BoxIconLeft iconNumber={1}>
                <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
              </BoxIconLeft>
              <InnerBoxRightSide>
                <BoxTitle boxNumber={1}>Clicks</BoxTitle>
                <DataRetrieved>
                  {this.state.clicks ? this.state.clicks :
                    <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                  }
                </DataRetrieved>
              </InnerBoxRightSide>
            </TopSingleBox>
            <TopSingleBox>
              <BoxIconLeft iconNumber={2}>
                <i className="fa fa-th" aria-hidden="true"></i>
              </BoxIconLeft>
              <InnerBoxRightSide>
                <BoxTitle boxNumber={2}>CTR</BoxTitle>
                <DataRetrieved>
                  {this.state.ctrs ? this.state.ctrs :
                    <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                  }
                </DataRetrieved>
              </InnerBoxRightSide>
            </TopSingleBox>
            <EdgeBox>
              <BoxIconLeft iconNumber={3}>
                <i className="fa fa-barcode" aria-hidden="true"></i>
              </BoxIconLeft>
              <InnerBoxRightSide>
                <BoxTitle boxNumber={3}>eCPM</BoxTitle>
                <DataRetrieved>
                  {this.state.ecpms ? this.state.ecpms :
                    <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                  }
                </DataRetrieved>
              </InnerBoxRightSide>
            </EdgeBox>
          </TopBoxedWrapper>
          <GraphWrapper>
            <LineChart data={this.dataSet(this.state.graphNumbers)}/>
          </GraphWrapper>
          <PieChartsWrapper>
            <Donut data={this.donutDataSet(this.state.firstPieNumbers)}></Donut>
            <Donut data={this.donutDataSet(this.state.secondPieNumbers)}></Donut>
          </PieChartsWrapper>
        </MainContent>
      </ContentWrapper>


    )
  }
}

