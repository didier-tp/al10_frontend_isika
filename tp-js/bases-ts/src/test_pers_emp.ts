import { Employe } from "./employes";
import { IPerson, Personne } from "./personnes";


let p1 : Personne;
p1 = new Personne();
if( p1 instanceof Employe){
    console.log("p1 est de type employe")
}else{
    console.log("p1 n'est pas de type Employe")
}
p1.nom="toto";
try {
   p1.age=-30;  //appel automatique à set age(-30)
}
catch(e){
    console.log("exception normale:" + e)
}

p1.incrementerAge();
console.log("Personne p1 avec nom="+p1.nom + ' et age=' + p1.age);
let p2 = new Personne(2,"jean" , "Bon",45);
console.log("Personne p2 avec nom="+p2.nom + ' et age=' + p2.age);
console.log("p2 au format json=" + JSON.stringify(p2))

var e1 = new Employe(1,"Alex","Therieur",40,2500);
//e1.salaire=3000;
e1.augmenterSalaire(500);
console.log("Empoye e1 au format json=" + JSON.stringify(e1) + ' et est de type=' + typeof(e1));
if( e1 instanceof Employe){
    console.log("e1 est de type Employe")
}

let chose : any;  // 12 ou "abc" ou ...
let obj : object  | null; 
//obj= null; 
obj = { numero : 2}

//données souvent recupérées via HTTP
let persJsonString = '{ "numero":2 , "nom" : "titi" , "prenom" : "p" } ';
let persJs :IPerson = JSON.parse(persJsonString);
//let persJs :IPerson = <IPerson> ( <any> JSON.parse(persJsonString) );
//avec castings explicites dans les cas pointus

// persJs = new IPerson(); interdit sur IPerson qui est une interface
let persJs2 : IPerson = { numero:3  , nom : "Bon" , prenom : "jean"} ;

function  affPerson(p:IPerson):void{
    console.log("**** p compatible IPerson avec  nom=" + p.nom +  " , numero=" + p.numero)
}

function  affPersonMoinsBien(p:object):void{
    let pa = <any> p;
    console.log("** p est un objet avec nom=" + pa["nom"] +  "  , numero=" + pa["numero"])
}

affPerson(persJs);
affPerson(persJs2); affPersonMoinsBien(persJs2);