import {Line} from 'react-chartjs-2';
import React, { Component } from 'react'

export default function LineChart(props){
  return (
      <Line data={props.data} options={{responsive: true,
        maintainAspectRatio: false}}/>
  )
}
