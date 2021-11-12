"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var employes_1 = require("./employes");
var personnes_1 = require("./personnes");
var p1;
p1 = new personnes_1.Personne();
if (p1 instanceof employes_1.Employe) {
    console.log("p1 est de type employe");
}
else {
    console.log("p1 n'est pas de type Employe");
}
p1.nom = "toto";
try {
    p1.age = -30; //appel automatique à set age(-30)
}
catch (e) {
    console.log("exception normale:" + e);
}
p1.incrementerAge();
console.log("Personne p1 avec nom=" + p1.nom + ' et age=' + p1.age);
var p2 = new personnes_1.Personne(2, "jean", "Bon", 45);
console.log("Personne p2 avec nom=" + p2.nom + ' et age=' + p2.age);
console.log("p2 au format json=" + JSON.stringify(p2));
var e1 = new employes_1.Employe(1, "Alex", "Therieur", 40, 2500);
//e1.salaire=3000;
e1.augmenterSalaire(500);
console.log("Empoye e1 au format json=" + JSON.stringify(e1) + ' et est de type=' + typeof (e1));
if (e1 instanceof employes_1.Employe) {
    console.log("e1 est de type Employe");
}
var chose; // 12 ou "abc" ou ...
var obj;
//obj= null; 
obj = { numero: 2 };
//données souvent recupérées via HTTP
var persJsonString = '{ "numero":2 , "nom" : "titi" , "prenom" : "p" } ';
var persJs = JSON.parse(persJsonString);
//let persJs :IPerson = <IPerson> ( <any> JSON.parse(persJsonString) );
//avec castings explicites dans les cas pointus
// persJs = new IPerson(); interdit sur IPerson qui est une interface
var persJs2 = { numero: 3, nom: "Bon", prenom: "jean" };
function affPerson(p) {
    console.log("**** p compatible IPerson avec  nom=" + p.nom + " , numero=" + p.numero);
}
function affPersonMoinsBien(p) {
    var pa = p;
    console.log("** p est un objet avec nom=" + pa["nom"] + "  , numero=" + pa["numero"]);
}
affPerson(persJs);
affPerson(persJs2);
affPersonMoinsBien(persJs2);
//# sourceMappingURL=test_pers_emp.js.map