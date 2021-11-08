
//variables globales:
var zoneBodyTableau;
var zoneCode;
var zoneNom;
var zoneChange;
var idSelected; 
var currentDevise;
var tabDevises = [];

var firstInit=true;


function reInitEmptyDevise(){
	idSelected=undefined;
	currentDevise={ code : "" , nom : "" , change : "" };
	displayDevise(currentDevise);
}

function startDomCrudDevise(){
	console.log("startDomCrudDevise");
	zoneBodyTableau=document.getElementById("bodyTableau");
	zoneCode=document.getElementById("code");
	zoneNom=document.getElementById("nom");
	zoneChange=document.getElementById("change");
	
	if(firstInit==true){
		tabDevises.push({code:'EUR' , nom : 'Euro' , change : 1})
		tabDevises.push({code:'USD' , nom : 'Dollar' , change : 1.1})
		tabDevises.push({code:'GBP' , nom : 'Livre' , change : 0.9})
		tabDevises.push({code:'JPY' , nom : 'Yen' , change : 123.45})
		firstInit=false;
	}
	
	for(i=0;i<tabDevises.length;i++){
			addDeviseRow(tabDevises[i]);
		}
	document.getElementById("bntAdd").disabled = false; 
	document.getElementById("bntUpdate").disabled = true; 
	document.getElementById("bntDelete").disabled = true; 
	reInitEmptyDevise();
}

function readDevise(devise){
	//récuperer le contenu des zones saisies (code , nom , change)
	//et peupler les parties de l'objet devise existant
	devise.code = zoneCode.value;
	devise.nom = zoneNom.value;
	devise.change = Number(zoneChange.value);
}

function displayDevise(devise){
	//afficher les parties de l'objet devise dans les zones de la page
	 zoneCode.value=devise.code ;
	 zoneNom.value=devise.nom ;
	 zoneChange.value=devise.change;
}

function ajoutDevise(){
	//récuperer le contenu des zones saisies (code , nom , change)
	var valCode = zoneCode.value;
	var valNom = zoneNom.value;
	var valChange = Number(zoneChange.value);
	
	var nouvelleDevise = {
	     code : valCode,
		 nom : valNom,
		 change : valChange
	  } 
	 if(testValidId(valCode)){ 
		//ajout de nouvelleDevise dans le tableau javascript tabDevises
		tabDevises.push(nouvelleDevise);
		//ajout de nouvelleDevise dans le tableau HTML:
		addDeviseRow(nouvelleDevise);
		reInitEmptyDevise();
		mettreEnValeurLigneSelectionnee(null);
	 }else{
		alert("invalid id (duplicated or empty)!!!");
		zoneCode.focus()
	 }
}

function updateDevise(){
	if(idSelected!=null){
		readDevise(currentDevise);
		if(currentDevise.code == idSelected){
		    remplacerValeursDeLigneDansTableau(currentDevise);
		}
		else{
			alert("invalid change of id/code for update !!!");
		    zoneCode.focus()
		}
	}
}


function newDevise(){
	reInitEmptyDevise();
	document.getElementById("bntAdd").disabled = false; 
	document.getElementById("bntUpdate").disabled = true; 
	document.getElementById("bntDelete").disabled = true; 
	mettreEnValeurLigneSelectionnee(null);
}

function deleteDevise(){
	if(idSelected!=null){
	    var d = null;
		for(i=0;i<tabDevises.length;i++){
			if(tabDevises[i] && tabDevises[i].code == idSelected){
				d=tabDevises[i]; 
				//delete tabDevises[i]; break;
			  //NB: delete ...[i] met à null ...[i]
			  tabDevises.splice(i,1); break;
			  //tabDevises.splice(i,2,val1,val2);
			  //remplace [i] et [i+1] par val1 et val2
			  //tabDevises.splice(i,1); 
			  //remplace par rien et donc supprime
			}
		}
		if(d!=null){
			var trASupprimer = document.getElementById("tr_"+idSelected);
			if(trASupprimer){
				var parentDeTrDansArbreDom = trASupprimer.parentNode;
				parentDeTrDansArbreDom.removeChild(trASupprimer);
			}
			reInitEmptyDevise();
		}
	}
}

function tabDeviseElementFromCode(code){
	var d = null;
	for(i=0;i<tabDevises.length;i++){
		if(tabDevises[i].code == code){
			d=tabDevises[i]; break;
		}
	}
	return d;
}

function mettreEnValeurLigneSelectionnee(selectedTr){
	var trNodeList = zoneBodyTableau
	        .getElementsByTagName("tr");
	var nbLines = trNodeList.length;
	for(i=0;i<nbLines;i++){
		var tr = trNodeList.item(i);
		if(tr == selectedTr){
			tr.querySelector("td").style.fontWeight="bold";
			tr.querySelector("td").style.fontStyle="italic";
		}else{
			tr.querySelector("td").style.fontWeight="normal";
			tr.querySelector("td").style.fontStyle="normal";
		}
	}
}

function selectionnerDevise(code){
	idSelected=code;
	console.log("idSelected="+idSelected);
	currentDevise=tabDeviseElementFromCode(idSelected);
	displayDevise(currentDevise);
	document.getElementById("bntAdd").disabled = true; 
	document.getElementById("bntUpdate").disabled = false; 
	document.getElementById("bntDelete").disabled = false; 
}

function testValidId(newId){
	if(newId==undefined || newId == "") return false;
	var res=true;
	for(i in tabDevises){
		if( tabDevises[i] && tabDevises[i].code == newId){
			res=false;
		}
	}
	return res;
}
var numNouvelleLigne = 0;

function addDeviseRow(devise){
	//ajout de nouvelleDevise dans le tableau HTML (partie zoneBodyTableau)
	var newRow = zoneBodyTableau.insertRow(-1) ;//-1 pour ajout à la fin
	newRow.setAttribute("id","tr_"+devise.code);
	//pour acces rapide future suppression et autre

	numNouvelleLigne++;
	if(numNouvelleLigne%2==0) {
		newRow.setAttribute("class","pair");
	}else{
		newRow.setAttribute("class","impair");
	}

	var newCell1 = newRow.insertCell(0);
	
	newCell1.addEventListener("click" , function () { 
		selectionnerDevise(devise.code);
		mettreEnValeurLigneSelectionnee(newRow);
	});	
	//*************************************
	newCell1.innerHTML = devise.code;
	newRow.insertCell(1).innerHTML = devise.nom;
	newRow.insertCell(2).innerHTML = devise.change;
}

function remplacerValeursDeLigneDansTableau(devise){
	var trAModif = 
	   document.getElementById("tr_"+devise.code);
	   if(trAModif){
	      //var listeTd = trAModif.querySelectorAll("td");
		  var listeTd = trAModif.getElementsByTagName("td");
		  listeTd[0].innerHTML=devise.code;
		  listeTd[1].innerHTML=devise.nom;
		  listeTd[2].innerHTML=devise.change;
	   }
}

