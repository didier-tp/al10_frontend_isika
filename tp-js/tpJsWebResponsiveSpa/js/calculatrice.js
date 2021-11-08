
function startCalculatrice() {
	//var zoneCbHisto = document.getElementById("cbHisto");
	var zoneCbHisto = document.querySelector("#cbHisto"); //comme .css et comme jQuery
	
	zoneCbHisto.addEventListener("click",cacherOuMontrerHistorique);
}

function calculerOperation(pOperation){
	var a =  document.getElementById("a").value;
	console.log("a="+a);
	var b =   document.getElementById("b").value;
	console.log("b="+b);
		  
	var res = 0;
	switch(pOperation){
		  case '+':
		      res = Number(a)+Number(b);   break;
		  case '*':
			  res=a*b;  break;
		  case '-':
			  res=a-b;  break;
		  case '/':
			  res=a/b;  break;
		  default:
			  res="?";  break;
		   }
	var eltSpanRes = document.getElementById("spanRes");
	eltSpanRes.innerHTML = res;
	if(res >= 0)
	  eltSpanRes.style.color = "rgb(0,150,0)";
	else
	  eltSpanRes.style.color = "red";
	  
	var zoneHistorique = document.getElementById("ulHistorique");
	var li = document.createElement("li");
	li.innerHTML=""+ a + pOperation + b +"="+res ;
	li.style.fontStyle='italic';
	zoneHistorique.appendChild(li);
	}

function cacherOuMontrerHistorique(){
		var zoneHistorique = document.getElementById("ulHistorique");
		//var zoneCheckBox = document.getElementById("cbHisto");
		var zoneCheckBox = document.querySelector("#cbHisto");
		if(zoneCheckBox.checked){
			//zoneHistorique.style.display="block";
			//zoneHistorique.style.visibility="visible";
			zoneHistorique.setAttribute("class","visible-fade");
		}else{
			//zoneHistorique.style.display="none";
			//zoneHistorique.style.visibility="hidden";
			zoneHistorique.setAttribute("class","hidden-fade");
		}
	}
		
//******* partie y=f(x)	

var res; //variable de niveau global
	
function onCalculer(){
	var x= Number(document.querySelector("#x").value);
	var yEnFonctionDeX= document.querySelector("#y").value; //ex : "2*x"
	res = eval(yEnFonctionDeX);
	document.querySelector("#spanResFx").innerHTML=res;
	//window.setTimeout("alert(res)",2000); //traitement différé dans 2000 ms
}	