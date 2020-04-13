import React, { useEffect, useRef, Component} from "react";
import Chart from "chart.js";


import ChargesByPeriodChart from "./ChargesChartByPeriod"

/*
1) Графік витрат за тиждень / місяць (див.дизайн, є фільтр)
В залежності від цього ви маєте мати масив обєктів з витратами за кожен день e.g const charges = [{date: 07.04.2019, chargesSum: 200}, {date: 08.04.2019, chargesSum: 20}]

2) Графік по топ 4 категорій по витратах, в цьому масиві мають бути обєкти в яких є категорія,
 і сума витрати - створіть масив з 6 категоріями і затратами, і відмалюйте 4 категорії, в яких було найбільше затрат

3) Графік по топ 4 категорій по прибутках, в цьому масиві мають бути обєкти в яких є категорія,
 і сума надходження - створіть масив з 6 категоріями і надходженнями, і відмалюйте 4 категорії, в яких було найбільше надходжень
*/

function Charts(){


    let xLbldateCharges = [];
    let yLbldateCharges = [];
   

//function for group(not my code) - TODO - CHECK IT!!!
const groupBy = (objectArray, property) => {
    return objectArray.reduce(function (total, obj) {
        let key = obj[property];
        if (!total[key]) {
            total[key] = [];
        }
        total[key].push(obj.chargesSum);
        return total;
    }, {});
} 




    //eventually all charges 

    //data from storage
    let charges = [
    	{date: '28.03.2020', chargesSum: 100, chargeCategory: 'car rent'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'car rent'},
		{date: '21.04.2020', chargesSum: 100, chargeCategory: 'restraunt'},
		{date: '07.04.2020', chargesSum: 200, chargeCategory: 'food'},
		{date: '07.03.2020', chargesSum: 200, chargeCategory: 'clothes'},
		{date: '27.03.2020', chargesSum: 300, chargeCategory: 'car rent'},
		{date: '21.03.2020', chargesSum: 270, chargeCategory: 'food'},
		{date: '20.03.2020', chargesSum: 150, chargeCategory: 'restraunt'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'food'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'clothes'},
		{date: '07.03.2020', chargesSum: 50, chargeCategory: 'food'},
		{date: '01.05.2020', chargesSum: 250.35, chargeCategory: 'food'},
	]
	//here will be set of chargeCategories
	let setChargesCategories=[];
	//here will be charges by day

	//return {  27.04.2019:[]}
	let chargesByDates = groupBy(charges, 'date');
	
	console.log('chargesByDates', chargesByDates);
	
	let normalizedCharges = [];

	//convert {  27.04.2019:[arrwith charges(nums)]} to> [ {date:''; chargesSum: number}]
	for(let key in chargesByDates){

		let chargesPerDate = parseFloat(chargesByDates[key].slice().reduce( (a,b) =>a+b).toString());
		normalizedCharges=[...normalizedCharges, {date:`${key}`, chargesSum:`${ chargesPerDate}`}]
	}
	console.log('normalizedCharges',normalizedCharges);
	//console.log(setChargesCategories);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//convert date to Date obj for sort
	normalizedCharges = normalizedCharges.map( ent =>{
		
		setChargesCategories.push(ent.chargeCategory);
		return { date: new Date(ent.date.split('.').reverse().join('-')), chargesSum: ent.chargesSum, dateN: ent.date}
	})


	//console.log(setChargesCategories);
   

	//sort charges array by day for 1 chart
   	//sortCharges array with all charges sorted by date 
	const sortedCharges = normalizedCharges.slice().sort((a,b)=>a.date-b.date)

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//functionality what gets last day and count -7days(1week) 
	//get last date in array
	let lastDate = sortedCharges[sortedCharges.length-1].date;
	//create date obj
	let minusWeek = new Date();
	let minusMonth = new Date();
	//count last 7 days
	minusWeek.setDate(lastDate.getDate()-7);	
	//count last 30 days
	minusMonth.setDate(lastDate.getDate()-30);

	//console.log('lastDate', lastDate);
	//console.log('minusWeek', minusWeek);
	//console.log('minusMonth', minusMonth);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//make logic, work with btns  - TODO
	//move to state!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
	let month,week, all; //just one of this could be used --- TODO
	month=false;
	week=false;
	all=true
	
	///!!!!!!!!!!!!!!!TODO - make filter function !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	//array with dates/charges from last week 
	let weekArray = sortedCharges.filter( function(element){

		if( (element.date.getDate() >= minusWeek.getDate()) && (element.date.getMonth() == minusWeek.getMonth()) ){
			return true;
		}
		if( (element.date.getDate() <= lastDate.getDate()) && (element.date.getMonth() == lastDate.getMonth()) ){
			return true;
		}

	})
	//array with dates/charges from last month 
	let monthArray =  sortedCharges.filter( function(element){

		if( (element.date.getDate() >= minusMonth.getDate()) && (element.date.getMonth() == minusMonth.getMonth()) ){
			return true;
		}
		if( (element.date.getDate() <= lastDate.getDate()) && (element.date.getMonth() == lastDate.getMonth()) ){
			return true;
		}

	})

	//console.log('lastDate',lastDate)
	//console.log('aminusMonth',minusMonth);
	//console.log('aminusWeek',minusWeek);
	//console.log('aminusMonth',minusMonth);
	
	console.log('all',sortedCharges);
	console.log('month',weekArray);
	console.log('month',monthArray);
	





	///////////////////////////////////////////////////////////////////////////////////////////
	//form x and y plot points for first charts
    sortedCharges.forEach(el=>{
    	xLbldateCharges.push(el.dateN);
    	yLbldateCharges.push(el.chargesSum)
    })




	//convert all chargesCategories to Set have no clue why i need it
	setChargesCategories= new Set(setChargesCategories);




   	const chartsStyle = {
		width:'40%',
		float:'left'
	}


  return(
    <div>
    	<div>
    		<p>Summary <button>Month</button> <button>Week</button> <button>All time</button></p>
    	</div>

    	<div >
    		Charges by date
    		<ChargesByPeriodChart xLabels={xLbldateCharges} yLabels={yLbldateCharges}/>
    	</div>

    	<div>
    		<div style={chartsStyle}>
    			Income categories
    			<canvas id="incomeChart" width="200" height="400">
    			</canvas>
    		</div>
    		<div style={chartsStyle}>
    			Charges categories
    			<canvas id="chargesChart" width="200" height="400">
    			</canvas>
    		</div>

    	</div>
  

    </div>
  ) 
}

export default Charts;

