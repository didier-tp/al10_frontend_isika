function errCallback(err){
	document.getElementById('spanMessage').innerText="error:" + err;
}

function displaySelectedProd(prod){
	  document.getElementById('spanCode').innerText=prod.code;
	  document.getElementById('txtNom').value=prod.nom;
	  document.getElementById('txtPrix').value=prod.prix;
}

function initProdFromNewInput(){
	var prod = { code : undefined , 
				nom : undefined, 
				prix: undefined};
	prod.code = document.getElementById('spanCode').innerText;
	prod.nom=document.getElementById('txtNom').value;
	prod.prix=Number(document.getElementById('txtPrix').value);
    return prod;
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

function callbackAfterUpdate(data){
	document.getElementById('spanMessage').innerText="updated data (server side):" + data;
	refreshAllDataInTable();//ici sans optimisation !
}

function onUpdateProd(evt){
	var prod = initProdFromNewInput();
	var jsonData = JSON.stringify(prod);//new value to send to backend
	var url = "../produit-api/private/role-admin/produit"
	makeAjaxPutRequest(url,jsonData,callbackAfterUpdate,errCallback)
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
	//page courante d'url = http://localhost:8282/html/ajax_prod.html
	//URL relative ici en .. pour remonter de http://localhost:8282/html
	//vers http://localhost:8282
	
	makeAjaxGetRequest("../produit-api/public/produit",function(data){
		tabProd = JSON.parse(data);
		for(let i in tabProd){
			addRowInTable(tabProd[i]);
		}
	});
}

window.onload=function(){
	refreshAllDataInTable();
	document.getElementById("btnUpdate").addEventListener("click",onUpdateProd);
}