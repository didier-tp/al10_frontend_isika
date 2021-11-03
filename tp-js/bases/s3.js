function Produit(label, prix){
    this.label=label;
    this.prix=prix;
    this.ajusterPrix = function(coeff){
        this.prix= coeff * this.prix;
    }
}

var produit1 = new Produit("cahier",2.45);
produit1.ajusterPrix(1.1); //+10%
console.log(JSON.stringify(produit1));//{"label":"cahier","prix":2.695}

var tabProduits = [ produit1 ];
tabProduits.push(new Produit("gomme" , 1.6));
tabProduits.push(new Produit("stylo" , 1.3));
tabProduits.push(new Produit("classeur" , 3.1));
tabProduits.push(new Produit("crayon" , 1.96));

function moyennePrixDesProduits(tabProduits){
    if(tabProduits==undefined  || tabProduits.length == 0)
       return 0;
    /* else */
    var s = 0;
    for(i in tabProduits)
       s+=tabProduits[i].prix;
    return s / tabProduits.length;
}

var m = moyennePrixDesProduits(tabProduits);
console.log("moyenne des prix des produits="+m); //exemple: 2.131

//trouver le produit le plus cher , l'afficher , le supprimer du tableau puis afficher le nouveau tableau en JSON
var produitLePlusCher;
var prixLePlusEleve=-1;
var indiceProduitLePlusCher;
for(i in tabProduits){
    if(tabProduits[i].prix > prixLePlusEleve){
        produitLePlusCher=tabProduits[i];
        indiceProduitLePlusCher=i;
        prixLePlusEleve=produitLePlusCher.prix;
    }
}
console.log("produit le plus cher:" + JSON.stringify(produitLePlusCher));
//delete tabProduits[indiceProduitLePlusCher]; //avec trou "null"
tabProduits.splice(indiceProduitLePlusCher,1);
console.log("produits moins chers:" + JSON.stringify(tabProduits));
