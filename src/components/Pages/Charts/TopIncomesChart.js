import React, { useEffect, useRef, Component} from "react";
import Chart from "chart.js";


function ChargesByPeriodChart(props){
	//console.log('ChargesByPeriodChart -props',props)
 	useEffect(() => {  
 		   // chargByPeriodChart();

 		//const canvas = canvasRef.current
        //const ctx = canvas.getContext('2d');
 		const ctx = document.getElementById('incomeChart').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: props.xLabels,
                datasets: [{
                    label: 'top incomes',
                    data: props.yLabels,
                    backgroundColor: ['rgba(255,255,0,0.6)','rgb(255,160,122)','rgb(0,128,0)','rgb(255,69,0)'],
                    borderColor: 'rgba(30, 144, 255, 1)',
                    borderWidth: 0
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
    		<canvas id="incomeChart" width="100" height="50">
    		</canvas>

  ) 
}

export default ChargesByPeriodChart;

