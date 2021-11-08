function startEuroToFranc(){ 

	var btnEuroToFranc = document.getElementById("idBtnEuroToFranc");

	btnEuroToFranc.addEventListener("click" , (event) => {
		var montantEuro = Number(document.getElementById("idMontantEuro").value);
		var montantFranc = 6.55957 * montantEuro;
		document.getElementById("idSpanMontantFranc").innerHTML=montantFranc;
	});

}