var express = require('express');
const apiRouter = express.Router();

var allProduits =[];
var codeMax=4; //pour simulation auto_incr 
allProduits.push({ code : 1 , nom : 'classeur' , prix : 4.0 });
allProduits.push({ code : 2 , nom : 'cahier' , prix : 2.1 });
allProduits.push({ code : 3 , nom : 'colle' , prix : 2.4 });
allProduits.push({ code : 4 , nom : 'stylo' , prix : 1.9 });


function findProduitInArrayByCode(produits,code){
    var produit=null;
    for(i in produits){
        if(produits[i].code == code){
            produit=produits[i]; break;
        }
    }
    return produit;
}

function removeProduitInArrayByCode(produits,code){
    var delIndex;
    for(i in produits){
        if(produits[i].code == code){
            delIndex=i; break;
        }
    }
    if(delIndex){
      produits.splice(i,1);
    }
}


function findProduitsWithPrixMini(produits,prixMini){
    var selProduits=[];
    for(i in produits){
        if(produits[i].prix >= prixMini){
            selProduits.push(produits[i]);
        }
    }
    return selProduits;
}


//exemple URL: http://localhost:8282/produit-api/public/produit/1
apiRouter.route('/produit-api/public/produit/:code')
.get( function(req , res , next ) {
    var codeProduit = req.params.code;
    var produit = findProduitInArrayByCode(allProduits,codeProduit);
    res.send(produit);
});

// exemple URL: http://localhost:8282/produit-api/public/produit
// returning all produits if no ?prixMini
// http://localhost:8282/produit-api/public/produit?prixMini=1.05
apiRouter.route('/produit-api/public/produit')
.get( function(req , res , next ) {
    var prixMini = req.query.prixMini;
    if(prixMini){
        res.send(findProduitsWithPrixMini(allProduits,prixMini));
    }else{
        res.send(allProduits);
    }
});

// http://localhost:8282/produit-api/private/role-admin/produit en mode post
// avec { "code" : null , "nom" : "produitXy" , "prix" : 12.3 }
//ou bien { "nom" : "produitXy" , "prix" : 12.3 }dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
.post( function(req , res , next ) {
    var nouveauProduit = req.body;
    //console.log("req.body="+req.body);
    //var nouveauProduit = JSON.parse(req.body);
    //simulation auto_incr :
    if(nouveauProduit.code == null){
        codeMax++; nouveauProduit.code = codeMax;
    }
    console.log("POST,nouveauProduit="+JSON.stringify(nouveauProduit));
    allProduits.push(nouveauProduit);
    res.send(nouveauProduit);
});

// http://localhost:8282/produit-api/private/role-admin/produit en mode PUT
// avec { "code" : 1 , "nom" : "produit_xy" , "prix" : 16.3 } dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
.put( function(req , res , next ) {
    var newValueOfProduitToUpdate = req.body;
    console.log("PUT,newValueOfProduitToUpdate="
            +JSON.stringify(newValueOfProduitToUpdate));
    var produitToUpdate =
    findProduitInArrayByCode(allProduits,newValueOfProduitToUpdate.code);
    if(produitToUpdate!=null){
        produitToUpdate.nom = newValueOfProduitToUpdate.nom;
        produitToUpdate.prix = newValueOfProduitToUpdate.prix;
        res.send(produitToUpdate);
    }else{
    res.status(404).json({ error : "no produit to update with code=" +
        newValueOfProduitToUpdate.code });
    }
});

// http://localhost:8282/produit-api/private/role-admin/produit/1 
// en mode DELETE
apiRouter.route('/produit-api/private/role-admin/produit/:code')
.delete( function(req , res , next ) {
    var codeProduit = req.params.code;
    console.log("DELETE,codeProduit="+codeProduit);
    var produitToDelete =
        findProduitInArrayByCode(allProduits,codeProduit);
    if(produitToDelete){
      removeProduitInArrayByCode(allProduits,codeProduit);
      res.send({ deletedProduitCode : codeProduit } );
    }else{
        res.status(404).json({ error : "no produit to delete with code=" +
        codeProduit });
    }
});

module.exports.apiRouter = apiRouter;