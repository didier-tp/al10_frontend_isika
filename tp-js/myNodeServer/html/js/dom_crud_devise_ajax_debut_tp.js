//variables globales:
var zoneBodyTableau;
var zoneCode;
var zoneNom;
var zoneChange;
var zoneMsg;
var idSelected; 
var currentDevise;
var tabDevises = []; // A synchroniser (via api REST) avec le coté serveur

window.onload = function(){
    initialiserPage();
}

function reInitEmptyDevise(){
    idSelected=undefined;
    currentDevise={ code : "" , nom : "" , change : "" };
    displayDevise(currentDevise);
    zoneMsg.innerHTML="";
}

function displayMessage(txt){
    zoneMsg.innerHTML=txt?txt:"";
}

function loadDevisesWithAjax(){
    //************ CODE A ANALYSER ET COMPRENDRE EN TP ***************************
    makeAjaxGetRequest("../devise-api/public/devise" ,  function(texteReponse){
        tabDevises = JSON.parse(texteReponse /* au format json string */);
        /* //old simulated values:
        tabDevises.push({code:'EUR' , nom : 'Euro' , change : 1})
        tabDevises.push({code:'USD' , nom : 'Dollar' , change : 1.1})
        */
        for(i=0;i<tabDevises.length;i++){
            addDeviseRow(tabDevises[i]);
        }
    });
}

function postNewDeviseWithAjax(nouvelleDevise){
    //************ A FAIRE EN TP ***************************
    /*makeAjaxPostRequest( .....URL QUI VA BIEN ..... ,
                        nouvelleDevise AU FORMAT JSON ,  
                        afterPostNewDeviseWithAjaxCallback);*/
                         
    //*******************************************************
}

function afterPostNewDeviseWithAjaxCallback(texteReponse){
        newPostedDevise = JSON.parse(texteReponse /* au format json string */);
        //ajout de nouvelleDevise dans le tableau javascript tabDevises
        tabDevises.push(newPostedDevise);
        //ajout de nouvelleDevise dans le tableau HTML:
        addDeviseRow(newPostedDevise);
        reInitEmptyDevise();
        mettreEnValeurLigneSelectionnee(null);
}

function putNewValueOfExistingDeviseWithAjax(deviseToUpdate){
    makeAjaxPutRequest("../devise-api/private/role-admin/devise" ,
                        JSON.stringify(deviseToUpdate) ,  
                        afterPutNewValueOfExistingDeviseWithAjaxCallback);
}

function afterPutNewValueOfExistingDeviseWithAjaxCallback(texteReponse){
        updatedDevise = JSON.parse(texteReponse /* au format json string */);
        remplacerValeursDeLigneDansTableau(updatedDevise);
}

function deleteOldDeviseWithAjax(oldDevise){
    //************ A FAIRE EN TP ***************************
    // var deleteUrl = URL qui va bien avec le bon code devise a supprimer à la fin
    //***************************************
    makeAjaxDeleteRequest(deleteUrl , afterDeleteOldDeviseWithAjaxCallback , displayMessage);
}


function afterDeleteOldDeviseWithAjaxCallback(texteReponse){
    console.log("delete ajax response:" +  texteReponse);
    var d = null;
    for(i=0;i<tabDevises.length;i++){
            if(tabDevises[i] && tabDevises[i].code == idSelected){
                d=tabDevises[i]; 
                tabDevises.splice(i,1); break;
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

function initialiserPage(){
    console.log("initialiserPage");
    zoneBodyTableau=document.getElementById("bodyTableau");
    zoneCode=document.getElementById("code");
    zoneNom=document.getElementById("nom");
    zoneMsg=document.getElementById("msg");
    zoneSearchCode=document.getElementById("searchCode");
    zoneSearchResult=document.getElementById("searchResult");
    zoneChange=document.getElementById("change");

    loadDevisesWithAjax();

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
        postNewDeviseWithAjax(nouvelleDevise);
        //with async afterPostNewDeviseWithAjaxCallback() adding in DOM
     }else{
        alert("invalid id (duplicated or empty)!!!");
        zoneCode.focus()
     }
}

function updateDevise(){
    if(idSelected!=null){
        readDevise(currentDevise);
        if(currentDevise.code == idSelected){
            putNewValueOfExistingDeviseWithAjax(currentDevise)
            //with async afterPutNewValueOfExistingDeviseWithAjaxCallback
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
                d=tabDevises[i];  break;
            }
        }
        if(d!=null){
            deleteOldDeviseWithAjax(d);
            //with async callback afterDeleteOldDeviseWithAjaxCallback
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
            tr.querySelector("td").style.backgroundColor="lightblue";
        }else{
            tr.querySelector("td").style.backgroundColor="white";
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

function addDeviseRow(devise){
    //ajout de nouvelleDevise dans le tableau HTML (partie zoneBodyTableau)
    var newRow = zoneBodyTableau.insertRow(-1) ;//-1 pour ajout à la fin
    newRow.setAttribute("id","tr_"+devise.code);
    //pour acces rapide future suppression et autre
    var newCell1 = newRow.insertCell(0);
    newCell1.addEventListener("click" , function () { 
        selectionnerDevise(devise.code);
        mettreEnValeurLigneSelectionnee(newRow);
    }); 
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