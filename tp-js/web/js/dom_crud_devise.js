//constructeur d'objet Devise
function Devise(code,nom,change){
	this.code=code?code:"";
	this.nom=nom?nom:"";
	this.change=change?change:"";
}

Devise.prototype.suffix=" pour 1 euro"; //as static default suffix
Devise.prototype.changeAvecSuffixe = function(change) { 
  return this.change + this.suffix; 
} 

//variables globales:
var zoneBodyTableau; // ref sur elt DOM <tbody id="bodyTableau">
var zoneCode;// ref sur elt DOM <input id="code" type="text" />
var zoneNom;// ref sur elt DOM <input id="nom" type="text" />
var zoneChange;// ref sur elt DOM <input id="change" type="text" />
var idSelected; // id devise sélectionée (pour update et delete)
var currentDevise;// ref sur devise sélectionnée
var tabDevises = []; //tableau des devises en mémoire

//fonction utilitaire pour récupérer la devise de code recherché
//dans un tableau en mémoire
function tabDeviseElementFromCode(code){
	var d = null;
	for(i=0;i<tabDevises.length;i++){
		if(tabDevises[i].code == code){
			d=tabDevises[i]; break;
		}
	}
	return d;
}

window.onload = function(){
	initialiserPage();
}

//sous fonction qui réinitialise les champs de saisie et idSelected
function reInitEmptyDevise(){
	idSelected=undefined;
	currentDevise=new Devise();
	displayDevise(currentDevise); //RAZ champs de saisies
	document.getElementById("bntAdd").disabled = false; 
	document.getElementById("bntUpdate").disabled = true; 
	document.getElementById("bntDelete").disabled = true;
}

//sous fonction qui affiche les valeurs de la devise sélectionnée
//dans les zones de saisies et qui met à jour idSelected et currentDevise
function selectionnerDeviseExistante(code){
	idSelected=code;
	console.log("idSelected="+idSelected);
	currentDevise=tabDeviseElementFromCode(idSelected);
	displayDevise(currentDevise); //afficher valeurs actuelles 
	                              //dans champs de saisies
	document.getElementById("bntAdd").disabled = true; 
	document.getElementById("bntUpdate").disabled = false; 
	document.getElementById("bntDelete").disabled = false; 
}

//sous fonction qui ajoute une nouvelleDevise 
//dans le tableau HTML (partie zoneBodyTableau)
function addDeviseRow(devise){
	
	var newRow = zoneBodyTableau.insertRow(-1) ;//-1 pour ajout à la fin
	//************ A FAIRE EN TP:
	//sur newRow fixer l'attribut "id" à la valeur "tr_"+devise.code
	newRow.setAttribute("id" , "tr_"+devise.code);
	//****************************
	//pour acces rapide future suppression et autre
	var newCell1 = newRow.insertCell(0);
	//************ A FAIRE EN TP:
	//enregistrer un déclenchement en différé des 2 lignes d'instructions
	//suivante lors d'un futur événement "click" sur l'élément newRow:
	newRow.addEventListener("click", function(evt){
			selectionnerDeviseExistante(devise.code);
			mettreEnValeurLigneSelectionnee(newRow);
	     });	
	//*************************************
	newCell1.innerHTML = devise.code;
	newRow.insertCell(1).innerHTML = devise.nom;
	newRow.insertCell(2).innerHTML = devise.changeAvecSuffixe();//devise.change;
}

function initialiserPage(){
	console.log("initialiserPage");
	zoneBodyTableau=document.getElementById("bodyTableau");
	zoneCode=document.getElementById("code");
	zoneNom=document.getElementById("nom");
	zoneChange=document.getElementById("change");
	
	//tabDevises.push({code:'EUR' , nom : 'Euro' , change : 1})
	tabDevises.push(new Devise('EUR' ,  'Euro' ,  1));
	tabDevises.push(new Devise('USD' , 'Dollar' , 1.1));
	tabDevises.push(new Devise('GBP' , 'Livre' , 0.9));
	tabDevises.push(new Devise('JPY' , 'Yen' , 123.12));
	
	for(i=0;i<tabDevises.length;i++){
		addDeviseRow(tabDevises[i]);
	}
	reInitEmptyDevise();
}

//sous fonction qui vérifie si zoneChange.value est bien numérique et positif
function testValidChange(){
	var changeSaisi = Number(zoneChange.value);
	if( isNaN(changeSaisi) || changeSaisi < 0 ) {
		alert("le taux de change doit être numérique et positif");
		zoneChange.focus(); zoneChange.select();
		return false;
	}
	else return true;
}

function readDevise(devise){
	//récuperer le contenu des zones saisies (code , nom , change)
	//et peupler les parties de l'objet devise en paramètre
	devise.code = zoneCode.value;
	devise.nom = zoneNom.value;
	devise.change = Number(zoneChange.value);
}

function displayDevise(devise){
	//afficher les parties de l'objet devise 
	//dans les zones de la page
	 zoneCode.value=devise.code ;
	 zoneNom.value=devise.nom ;
	 zoneChange.value=devise.change;
}

//<input type="button" onclick="newDevise()" value="New"/>
function newDevise(){
	reInitEmptyDevise();
	mettreEnValeurLigneSelectionnee(null);
}

//sous fonction qui vérifie si newId non vide et unique
function testValidNewId(newId){
	if(newId==undefined || newId == "") return false;
	var res=true;
	for(i in tabDevises){
		if( tabDevises[i] && tabDevises[i].code == newId){
			res=false; //newId doit être différent 
			           //des autres id existants
		}
	}
	return res;
}

//<input type="button" id="bntAdd" onclick="ajoutDevise()" value="Add"/> 
function ajoutDevise(){
	if(!testValidChange()){
		return; //exit this function 
	}
	//récuperer le contenu des zones saisies (code , nom , change)
	/*
	var valCode = zoneCode.value;
	var valNom = zoneNom.value;
	var valChange = Number(zoneChange.value);
	
	var nouvelleDevise = {
	     code : valCode,
		 nom : valNom,
		 change : valChange
	  } 
	*/
	var nouvelleDevise = new Devise();
	readDevise(nouvelleDevise);
	 if(testValidNewId(nouvelleDevise.code)){ 
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



//<input type="button" id="bntUpdate" onclick="updateDevise()" value="Update" />
function updateDevise(){
	if(!testValidChange()){
		return; //exit this function 
	}
	if(idSelected!=null){
		var nouvelleValeurDevise = new Devise();
		readDevise(nouvelleValeurDevise);
		if(nouvelleValeurDevise.code == idSelected){
			currentDevise.nom = nouvelleValeurDevise.nom;
			currentDevise.change = nouvelleValeurDevise.change;
		    remplacerValeursDeLigneDansTableau(currentDevise);
		}
		else{
			alert("invalid change of id/code for update !!!");
		    zoneCode.focus()
		}
	}
}



//<input type="button" id="bntDelete" onclick="deleteDevise()" value="Delete"/> 
function deleteDevise(){
	if(idSelected!=null){
	    var d = tabDeviseElementFromCode(idSelected);
		if(d!=null){
			//NB: delete tabDevises[i] met à null tabDevises[i]
			tabDevises.splice(i,1); 
			//tabDevises.splice(i,2,val1,val2);
			//remplace [i] et [i+1] par val1 et val2
			//tabDevises.splice(i,1); 
			//remplace par rien et donc supprime
			  
			//********** A FAIRE EN TP:
			//récupérer un accès à la ligne du tableau dont
			//l'id est "tr_"+idSelected
			//si cette ligne existe , la supprimer vis à vis de l'élément parent
			//de l'arbre DOM ...parentNode , .removeChild(...)
			
			var trASupprimer = document.querySelector("#tr_"+idSelected);
			if(trASupprimer!=null){
				//zoneBodyTableau.removeChild(trASupprimer);
				trASupprimer.parentNode.removeChild(trASupprimer);
			}
			//************************
			reInitEmptyDevise();
		}
	}
}



function mettreEnValeurLigneSelectionnee(selectedTr){
	var trNodeList = zoneBodyTableau
	        .getElementsByTagName("tr");
	var nbLines = trNodeList.length;
	for(i=0;i<nbLines;i++){
		var tr = trNodeList.item(i);
		if(tr == selectedTr){
			//********** A FAIRE EN TP:
			//sur tr.querySelector("td") ou bien sur chaque element de tr.querySelectorAll("td")
			//changer le style backgroundColor 
			//à la valeur="lightblue";
			//tr.querySelector("td").style.backgroundColor="lightblue";
			for(let tdi of tr.querySelectorAll("td")){
				tdi.style.backgroundColor="lightblue";
			}
			//****************************
		}else{
			//********** A FAIRE EN TP:
			//sur tr.querySelector("td") ou bien sur chaque element de tr.querySelectorAll("td")
			//changer le style backgroundColor 
			//à la valeur="white";
			//tr.querySelector("td").style.backgroundColor="white";
			for(let tdi of tr.querySelectorAll("td")){
				tdi.style.backgroundColor="white";
			}
			//****************************
		}
	}
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

//********** A FAIRE GLOBALEMENT EN TP :
//comprendre la logique du code
//ajouter d'éventuelles améliorations ou variantes
//ne pas hésitez à tout reprogrammer en partant de zéro si temps suffisant
//pour s'entraîner .
