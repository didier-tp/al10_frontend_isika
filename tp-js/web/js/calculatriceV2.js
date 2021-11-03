
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
		//zoneHistorique.style.visibility="visible";
	}else{
		zoneHistorique.style.display="none";
		//zoneHistorique.style.visibility="hidden";
	}
}

function calculerOperation(op){
	var a =  Number(document.getElementById("a").value);
	var b =  Number(document.getElementById("b").value);
	var res =eval ("a"+op+"b"); //eval("a+b") ou eval("a*b") ou ...
	document.getElementById("spanRes").innerHTML="<b>"+res+"</b>";
	var zoneHistorique = document.getElementById("ulHistorique");
	var li = document.createElement("li");
	li.innerHTML=""+ a + op + b +"="+res ;
	li.style.fontStyle='italic';
	zoneHistorique.appendChild(li);
	}


	

		
