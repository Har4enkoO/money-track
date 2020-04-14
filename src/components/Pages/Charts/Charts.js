import React, { useEffect, useRef, Component} from "react";
import Chart from "chart.js";


import ChargesByPeriodChart from "./ChargesChartByPeriod";
import TopChargesChart from "./TopChargesChart";

import TopIncomesChart from "./TopIncomesChart";

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


const groupIncomes = (objectArray, property) => {
    return objectArray.reduce(function (total, obj) {
        let key = obj[property];
        if (!total[key]) {
            total[key] = [];
        }
        total[key].push(obj.incomeSum);
        return total;
    }, {});
} 
	
	//incomes array
	let incomes = [
		{income:'My mom',incomeSum:100},
		{income:'My mom',incomeSum:30},
		{income:'Sell book',incomeSum:100},
		{income:'Sell dog',incomeSum:50},
		{income:'Sell pot',incomeSum:30},
		{income:'Sell last shirt',incomeSum:30},
		{income:'Sell kidney',incomeSum:1000},			
	]

////////////////////////////////////////////////////////////////////////////////////////////////
//chart 3
	let groupedAndReduced = groupIncomes(incomes,'income');
	//groupedAndReduced= groupedAndReduced.map((el)=> console.log(el))
	
	let reducedInc = reduceIncomes(groupedAndReduced);

	
	//return first 3 incomes
	let reducedSortedInc = reducedInc.sort((a,b)=>b.reducedIncome-a.reducedIncome).map((el,index)=>{
		if(index>3)return;
		return el
	}).filter(el=>el!==undefined)

	//console.log(reducedSortedInc)



	//function that reduce incomes [ mymom: [100,30]],..] => [ mymom: [130]],..] 
 	function reduceIncomes(obj){
		let newArr =[];
		for (let prop in obj){
			//console.log(prop )
			let reducedIncome = obj[prop].reduce((a,b)=>a+b)		
			newArr=[...newArr,{prop,reducedIncome}]
		}
		return newArr;
	}


	console.log(reducedSortedInc);

	//form arrays for incomes chart
	let xIncomes =[];
	let yIncomes =[];

	reducedSortedInc.forEach(el=>{
		xIncomes.push(el.prop);
		yIncomes.push(el.reducedIncome);
	})
























    //eventually all charges 

    //data from storage
    let charges = [
    	{date: '29.04.2020', chargesSum: 200, chargeCategory: 'trips'},	
    	{date: '28.03.2020', chargesSum: 100, chargeCategory: 'car rent'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'car rent'},
		{date: '21.04.2020', chargesSum: 100, chargeCategory: 'restraunt'},
		{date: '07.04.2020', chargesSum: 200, chargeCategory: 'food'},
		{date: '07.03.2020', chargesSum: 200, chargeCategory: 'clothes'},
		{date: '27.03.2020', chargesSum: 300, chargeCategory: 'car rent'},
		{date: '21.03.2020', chargesSum: 270, chargeCategory: 'food'},
		{date: '20.03.2020', chargesSum: 150, chargeCategory: 'restraunt'},
		{date: '20.03.2020', chargesSum: 150, chargeCategory: 'food'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'food'},
		{date: '27.04.2020', chargesSum: 100, chargeCategory: 'clothes'},
		{date: '07.03.2020', chargesSum: 50, chargeCategory: 'food'},
		{date: '30.04.2020', chargesSum: 250.35, chargeCategory: 'food'},
	]
	//here will be set of chargeCategories
	let setChargesCategories=[];
	//here will be charges by day

	//return {  27.04.2019:[]}
	let chargesByDates = groupBy(charges, 'date');
	
	//console.log('chargesByDates', chargesByDates);
	
	let normalizedCharges = [];

	//convert {  27.04.2019:[arrwith charges(nums)]} to> [ {date:''; chargesSum: number}]
	for(let key in chargesByDates){

		let chargesPerDate = parseFloat(chargesByDates[key].slice().reduce( (a,b) =>a+b).toString());
		normalizedCharges=[...normalizedCharges, {date:`${key}`, chargesSum:`${ chargesPerDate}`}]
	}
	//console.log('normalizedCharges',normalizedCharges);
	//console.log(setChargesCategories);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//convert date to Date obj for sort
	normalizedCharges = normalizedCharges.map( ent =>{

		return { date: new Date(ent.date.split('.').reverse().join('-')), chargesSum: ent.chargesSum, dateN: ent.date}
	})

		//convert all chargesCategories to Set have no clue why i need it
	//setChargesCategories= new Set(setChargesCategories);


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
	
	//console.log('all',sortedCharges);
	//console.log('week',weekArray);
	//console.log('month',monthArray);

	//TODO
	///////////////////////////////////////////////////////////////////////////////////////////
	//form x and y plot points for first charts
    sortedCharges.forEach(el=>{
    	xLbldateCharges.push(el.dateN);
    	yLbldateCharges.push(el.chargesSum)
    })




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for 2 chart
	//arr with week dates
	let weekFilterDates =[];

	//arr with month dates
	let monthFilterDates =[];


	//creates arr with mont and week dates
	weekArray.forEach((el)=>{
		weekFilterDates.push(el.dateN)
	})
	monthArray.forEach((el)=>{
		monthFilterDates.push(el.dateN)
	})


	///For month

	//get chargeCategories by dates
	let chargeCategoriesMonth = [];

	monthFilterDates.forEach((date)=>{
		let filtered = charges.filter((el)=>el.date == date);
		
		for(let i=0;i<filtered.length; i++){
			var { chargesSum, chargeCategory } = filtered[i];
			
			chargeCategoriesMonth = [...chargeCategoriesMonth, {chargesSum, chargeCategory}]
			
		}
	})
	;

	//console.log(chargeCategoriesMonth)
	//group by charges categories
	let filtChrgCatMonth = groupBy(chargeCategoriesMonth, 'chargeCategory');

	//reduce it
	let normRedFiltChrgsCatMont=[];
	//going trough object
	for(let key in filtChrgCatMonth){

		let chargesPerCategory = parseFloat(filtChrgCatMonth[key].slice().reduce( (a,b) =>a+b).toString());
		normRedFiltChrgsCatMont	= [...normRedFiltChrgsCatMont, {category:`${key}`,chargesSum: `${ chargesPerCategory}`}]
		
	}
	//sort mont categories from bigger to small
	let normRedFiltChrgsCatMonth = normRedFiltChrgsCatMont.sort((a,b)=>b.chargesSum-a.chargesSum)


	//if charges money arr GT than 4
	let monthMnyCat;
	if(normRedFiltChrgsCatMonth.length>4){
		monthMnyCat = normRedFiltChrgsCatMonth.slice(0, 4);
	}else{
		monthMnyCat = normRedFiltChrgsCatMonth
	}

	let categoriesDate =[];
	let chargesDate =[]

	//console.log('category/charges',monthMnyCat);

	//mont
    monthMnyCat.reverse().forEach(el=>{
    	categoriesDate.push(el.category);
    	chargesDate.push(el.chargesSum);
    })


    ///For week

	//get chargeCategories by dates
	let chargeCategoriesWeek = [];

	weekFilterDates.forEach((date)=>{
		let filtered = charges.filter((el)=>el.date == date);
		
		for(let i=0;i<filtered.length; i++){
			var { chargesSum, chargeCategory } = filtered[i];
			
			chargeCategoriesWeek = [...chargeCategoriesWeek, {chargesSum, chargeCategory}]
			
		}
	})
	;

	//group by charges categories
	let filtChrgCatWeek = groupBy(chargeCategoriesWeek, 'chargeCategory');

	//reduce it
	let normRedFiltChrgsCatWeek=[];
	//going trough object
	for(let key in filtChrgCatWeek){

		let chargesPerCategory = parseFloat(filtChrgCatWeek[key].slice().reduce( (a,b) =>a+b).toString());
		normRedFiltChrgsCatWeek	= [...normRedFiltChrgsCatWeek, {category:`${key}`,chargesSum: `${ chargesPerCategory}`}]
		
	}
	//sort mont categories from bigger to small
	let redFiltChrgsCatWeek = normRedFiltChrgsCatWeek.sort((a,b)=>b.chargesSum-a.chargesSum)


	//if charges money arr GT than 4
	let weekMnyCat;
	if(redFiltChrgsCatWeek.length>4){
		weekMnyCat = redFiltChrgsCatWeek.slice(0, 4);
	}else{
		weekMnyCat = redFiltChrgsCatWeek
	}

	let categoriesDateWeek =[];
	let chargesDateWeek =[]

	//console.log('category/charges',weekMnyCat);
/*
	//month
    weekMnyCat.reverse().forEach(el=>{
    	categoriesDateWeek.push(el.category);
    	chargesDateWeek.push(el.chargesSum);
    })*/

	const chartsStyle1 ={
		height:'10%',
		width:'70%',
		marginBottom:'1rem'
	
	}


   	const chartsStyle = {
		width:'40%',
		float:'left'
	}


  return(
    <div>
    	<div>
    		<p>Summary <button>Month</button> <button>Week</button> <button>All time</button></p>
    	</div>

    	<div style={chartsStyle1}>
    		Charges by date
    		<ChargesByPeriodChart xLabels={xLbldateCharges} yLabels={yLbldateCharges}/>
    	</div>

    	<div>
    		<div style={chartsStyle}>
   				<TopIncomesChart xLabels={xIncomes} yLabels={yIncomes}/>
    		</div>
    		<div style={chartsStyle}>
    			<TopChargesChart xLabels={categoriesDate} yLabels={chargesDate}/>
    		</div>

    	</div>
  

    </div>
  ) 
}

export default Charts;

