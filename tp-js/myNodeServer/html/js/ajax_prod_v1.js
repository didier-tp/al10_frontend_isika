

function displaySelectedProd(prod){
	  document.getElementById('spanCode').innerText=prod.code;
	  document.getElementById('txtNom').value=prod.nom;
	  document.getElementById('txtPrix').value=prod.prix;
}

function onSelectRow(evt){
  let selectedTD = evt.target;
  let idSelectedRow=(selectedTD.parentNode).id;
  let codeOfSelectedProd = idSelectedRow.substring(2); //after p_
  makeAjaxGetRequest("../produit-api/public/produit/"+codeOfSelectedProd,function(data){
	var selectedProd = JSON.parse(data);
	displaySelectedProd(selectedProd);
  });
}

function addRowInTable(prod){
	  var eltTbody = document.getElementById("bodyTableau");
	  var newRow = eltTbody.insertRow(-1) ;
	  newRow.setAttribute("id","p_"+prod.code);
	  newRow.insertCell(0).innerText = prod.code;
	  newRow.insertCell(1).innerText = prod.nom;
	  newRow.insertCell(2).innerText = prod.prix;
	  newRow.addEventListener("click",onSelectRow);
}

function refreshAllDataInTable(){
	document.getElementById("bodyTableau").innerHTML="";//supprimer eventuelles anciennes lignes
	makeAjaxGetRequest("../produit-api/public/produit",function(data){
		tabProd = JSON.parse(data);
		for(let i in tabProd){
			addRowInTable(tabProd[i]);
		}
	});
}

window.onload=function(){
	refreshAllDataInTable();
}