import React from 'react';
import {Doughnut} from 'react-chartjs-2';


export default function Donut(props){
  return <div style={{display:'flex',width:'25%'}}>
    <Doughnut data={props.data} options={{responsive: true,
      maintainAspectRatio: false, legend:{position:'right'}}} />
  </div>
}
