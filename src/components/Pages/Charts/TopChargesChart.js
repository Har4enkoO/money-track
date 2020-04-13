import React, { useEffect, useRef, Component} from "react";
import Chart from "chart.js";


function ChargesByPeriodChart(props){
	//console.log('ChargesByPeriodChart -props',props)
 	useEffect(() => {  
 		   // chargByPeriodChart();

 		//const canvas = canvasRef.current
        //const ctx = canvas.getContext('2d');
 		const ctx = document.getElementById('dateCharges').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.xLabels,
                datasets: [{
                    label: 'charges',
                    data: props.yLabels,
                    backgroundColor: 'rgba(135,206,250, 0.2)',
                    borderColor: 'rgba(30, 144, 255, 1)',
                    borderWidth: 3
                }]
            },
            options: {
        		scales: {
            		yAxes: [{
                		stacked: true
            		}]
        		}
    		}
        });
 	});
/*
	//*/

  return(
    		<canvas id="dateCharges" width="100" height="50">
    		</canvas>

  ) 
}

export default ChargesByPeriodChart;

