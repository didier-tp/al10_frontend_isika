 //V3 = V2 remaniée appelant sous fonction calculerOp(op,a,b)
 //dans calcul.js (pour test unitaire sur sous partie calcul.js)
 
 window.addEventListener("load",function(){

	var zoneCheckBox = document.getElementById("cbHisto");
	zoneCheckBox.addEventListener("change",cacherOuMontrerHistorique);

	var tabOpName = ["addition","soustraction","multiplication", "division"];
	var tabOp = ["+","-","*", "/"];
	for(let i in tabOp){
		document.getElementById("btn_op_" + tabOpName[i]).addEventListener("click" , function(){
			calculerOperation(tabOp[i]);
		});
	}
});

function cacherOuMontrerHistorique(){
	var zoneHistorique = document.getElementById("ulHistorique");
	var zoneCheckBox = document.querySelector("#cbHisto");
	if(zoneCheckBox.checked){
		zoneHistorique.style.display="block";
	}else{
		zoneHistorique.style.display="none";
	}
}

function calculerOperation(op){
	var a =  Number(document.getElementById("a").value);
	var b =  Number(document.getElementById("b").value);
	var res =calculerOp(op,a,b);
	document.getElementById("spanRes").innerHTML="<b>"+res+"</b>";
	var zoneHistorique = document.getElementById("ulHistorique");
	var li = document.createElement("li");
	li.innerHTML=""+ a + op + b +"="+res ;
	li.style.fontStyle='italic';
	zoneHistorique.appendChild(li);
	}




	

		
