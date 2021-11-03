function evaluerFx(){
	var x =  Number( document.getElementById("x").value );
	var fx =  document.getElementById("fx").value;
	var res = eval(fx);
	document.getElementById("spanResY").innerHTML = res;
	}
		
