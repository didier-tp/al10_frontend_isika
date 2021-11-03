function Produit(ref,label,prix){
	this.ref=ref;
	this.label=label;
	this.prix=prix;
}

//tableau associatif entre reférences de produit et produits complets
var mapProduitsByRef = [];
mapProduitsByRef['p1']= new Produit('p1','cahier',3.5);
mapProduitsByRef['p2']= new Produit('p2','stylo',1.2);
mapProduitsByRef['p3']= new Produit('p3','gomme',2.3);
mapProduitsByRef['p4']= new Produit('p4','classeur',4.1);


var selectedProdRef = 'p1';  //référence vers produit séléctionné

//second tableau associatif entre reférences de produit et quantité commandées
var mapSelProdQty = []; //map<selectedProd,qte> des produits avec quantité de la commande
//clef = ref produit , valeur = quantite

//NB: mapProduitsByRef , selectedProdRef , mapSelProdQty sont
//à considérer comme des variables globales (visibles par toutes les fonctions)

//fonction qui ajoute les options (sélections possible) dans la liste html:
function initSelProd(){
	var eltSelProd = document.getElementById("selProd");
	for(let refProd in mapProduitsByRef){
		var eltOption = document.createElement("option");
		eltOption.innerText=mapProduitsByRef[refProd].label;
		eltOption.value=refProd;
		eltSelProd.appendChild(eltOption);
	}
}

function addOrUpdateRowInTable(prodRef){
  var prod = mapProduitsByRef[prodRef];
  var qte = mapSelProdQty[prodRef];
  
  var existingRow = document.getElementById("r_"+prodRef);
  if(existingRow){
	  existingRow.cells[4].innerText = qte;
	  existingRow.cells[5].innerText = qte * prod.prix;
  }
  else{ //nouvelle ligne
	  var eltTbody = document.getElementById("bodyTableau");
	  var newRow = eltTbody.insertRow(-1) ;
	  newRow.setAttribute("id","r_"+prodRef);
	  newRow.insertCell(0).innerHTML = "<input type='checkbox'></input>";
	  //...
  }
}

function deleteSelectedRowInTable(){
	 var eltTbody = document.getElementById("bodyTableau");
	 var nbRows  = eltTbody.rows.length;
	 //console.log("nbRows="+nbRows);
	 for(let i=nbRows-1; i>=0 ; i--){
		 var tRow = eltTbody.rows[i];
		 var isSelected = tRow.cells[0].firstChild.checked;
		 if(isSelected){
			 //....
		 }
	 }
}

window.onload = function(){
	initSelProd();//ajout des options (sélections possibles) dans la liste html
	
	//affichage initial de la référence du produit sélectionné (p1 par défaut):
	var eltSpanProdSel = document.getElementById("spanProdSel");
    eltSpanProdSel.innerText=
	    JSON.stringify(mapProduitsByRef[selectedProdRef]);
	
	//gestion événement "change" sur liste déroulante:
	var eltSelProd = document.getElementById("selProd");
	eltSelProd.addEventListener("change",function(evt){
		 selectedProdRef = evt.target.value;
		 eltSpanProdSel.innerText = 
		   JSON.stringify(mapProduitsByRef[selectedProdRef]);
	});
	
	var eltBtnAdd = document.getElementById("btnAdd");
	eltBtnAdd.addEventListener("...",function(evt){
		var eltQte = document.getElementById("qte");
		mapSelProdQty[selectedProdRef]=Number(eltQte.value);
		addOrUpdateRowInTable(selectedProdRef);
	});
	
	var eltBtnSuppr = document.getElementById("btnSuppr");
	//....
}