
function calculerOperation(pOperation){
	let eltInputA = document.getElementById("a");
	var a =  eltInputA.value;
	let idDeEltInputA = eltInputA.getAttribute("id");
	console.log("idDeEltInputA="+idDeEltInputA);
	let ValeurDeEltInputA = eltInputA.getAttribute("value");
	console.log("ValeurDeEltInputA="+ValeurDeEltInputA);

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
	eltSpanRes.innerHTML = "<b><i>"+res+"</i></b>";
	if(res >= 0)
	  eltSpanRes.style.color = "rgb(0,150,0)";
	else
	  eltSpanRes.style.color = "red";
	  
	var zoneHistorique = document.getElementById("ulHistorique");
	var li = document.createElement("li");
	li.innerHTML=""+ a + pOperation + b +"="+res ;
	//li.setAttribute("style","font-style:italic; font-weight: bold;")
	li.style.fontStyle='italic';
	zoneHistorique.appendChild(li);
	}

function cacherOuMontrerHistorique(){
		var zoneHistorique = document.getElementById("ulHistorique");
		//var zoneCheckBox = document.getElementById("cbHisto");
		var zoneCheckBox = document.querySelector("#cbHisto");
		if(zoneCheckBox.checked){
			zoneHistorique.style.display="block";
			//zoneHistorique.style.visibility="visible";
		}else{
			zoneHistorique.style.display="none";
			//zoneHistorique.style.visibility="hidden";
		}
	}

window.onload = function (){
	let eltDivDuBas = document.getElementById("divDuBas");
	//eltDivDuBas.addEventListener("mousemove",reagirDeplacementSouris);
	eltDivDuBas.addEventListener("mousedown" , function (event){
		if(event.which == 1)
		console.log("le bouton gauche est enfonce");
		else if(event.which == 3)
		   console.log("le bouton droit est enfonce");
	})
}

/*
window.addEventListener("load",initialisation);

function initialisation(){
	let eltDivDuBas = document.getElementById("divDuBas");
	eltDivDuBas.addEventListener("mousemove",reagirDeplacementSouris);
}	
*/

function reagirDeplacementSouris(event){
	console.log("la souris se deplace au dessus de la zone " + event.target.id)
	console.log("x="+event.pageX + " y=" + event.pageY)
}
	

		
