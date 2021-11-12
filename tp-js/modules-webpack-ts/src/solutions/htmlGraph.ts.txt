import { Serie } from './Serie';
import { MySimpleGraph } from './MyGraph';

 
 
 window.addEventListener("load", function(){


	 document.querySelector('#btnRefresh').addEventListener('click',function(){
		let eltSelTypeChart : HTMLSelectElement = document.querySelector('#selTypeChart');
		let strTypeChart = eltSelTypeChart.value;
		console.log("strTypeChart:"+strTypeChart)
		
		let eltListeValeurs :HTMLInputElement = document.querySelector('#txtListeValeurs');
		let tabVal : Array<any>= eltListeValeurs.value.split(',');
		for(let i in tabVal) tabVal[i]=Number(tabVal[i]);
		console.log("tabVal:"+JSON.stringify(tabVal));//[23,16,18,8,5]
		
		let sVal = new Serie("s1",tabVal);
		
		let eltListePays :HTMLInputElement = document.querySelector('#txtListePays');
		let tabPays : Array<string>= eltListePays.value.split(',');
		console.log("tabPays:"+JSON.stringify(tabPays));//["France","Allemagne","Italie","Espagne","Belgique"]
		
		let sLabel = new Serie("pays",tabPays);
		
		let myGraph = new MySimpleGraph("myCanvas",sVal , sLabel);
		myGraph.setTypeChartAsString(strTypeChart);
		myGraph.render();
	 });



 });


