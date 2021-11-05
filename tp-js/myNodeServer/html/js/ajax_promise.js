//fonction qui retourne une Promise
function ajaxGetPromise(url){
    return new Promise((resolve,reject)=>{
        makeAjaxGetRequest(url,
            (resJson)=>{ resolve(resJson); } ,
            (err)=>{ reject('echec:' + err);} )
    });
}

window.onload = function (){
    let btnConv = document.getElementById("btnConv");
    btnConv.addEventListener('click',
    async function (event){
        let codeMSource = document.getElementById("source").value;
        let codeMCible = document.getElementById("cible").value;
        let montant = Number(document.getElementById("montant").value);
        try{
        let urlDeviseSource = "../devise-api/public/devise/"+codeMSource;
        let deviseSourceJson = await ajaxGetPromise(urlDeviseSource);
        console.log("deviseSourceJson="+deviseSourceJson);
        let objDeviseSource = JSON.parse(deviseSourceJson);
        let urlDeviseCible = "../devise-api/public/devise/"+codeMCible;
        let deviseCibleJson  = await ajaxGetPromise(urlDeviseCible);
        let objDeviseCible = JSON.parse(deviseCibleJson);
        let montantConverti = montant * objDeviseCible.change / objDeviseSource.change;
        document.getElementById("spanRes").innerHTML="<i>"+montantConverti+"</i>";
        }
        catch(err){
            console.log(err);
        }
    })
}
/*
window.onload = function (){
    let btnConv = document.getElementById("btnConv");
    btnConv.addEventListener('click',function (event){
        let codeMSource = document.getElementById("source").value;
        let codeMCible = document.getElementById("cible").value;
        let montant = Number(document.getElementById("montant").value);
        let urlDeviseSource = "../devise-api/public/devise/"+codeMSource;
        let urlDeviseCible = "../devise-api/public/devise/"+codeMCible;
        let objDeviseSource = null;
        ajaxGetPromise(urlDeviseSource)
        .then((deviseSourceJson)=>{
            objDeviseSource = JSON.parse(deviseSourceJson);
            return ajaxGetPromise(urlDeviseCible);
           })
        .then((deviseCibleJson)=>{
                let objDeviseCible = JSON.parse(deviseCibleJson);
                let montantConverti = montant * objDeviseCible.change / objDeviseSource.change;
                document.getElementById("spanRes").innerHTML="<b>"+montantConverti+"</b>";
            })
        .catch((err)=>console.log(err));
    })
}
*/

/*
window.onload = function (){
    let btnConv = document.getElementById("btnConv");
    btnConv.addEventListener('click',function (event){
        let codeMSource = document.getElementById("source").value;
        let codeMCible = document.getElementById("cible").value;
        let montant = Number(document.getElementById("montant").value);
        let urlDeviseSource = "../devise-api/public/devise/"+codeMSource;
        let urlDeviseCible = "../devise-api/public/devise/"+codeMCible;
        makeAjaxGetRequest(urlDeviseSource,function (deviseSourceJson){
            let objDeviseSource = JSON.parse(deviseSourceJson);
            makeAjaxGetRequest(urlDeviseCible,function (deviseCibleJson){
                let objDeviseCible = JSON.parse(deviseCibleJson);
                let montantConverti = montant * objDeviseCible.change / objDeviseSource.change;
                document.getElementById("spanRes").innerHTML="<b>"+montantConverti+"</b>";
            });
        })
    })
}
*/