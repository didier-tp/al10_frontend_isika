//old (no strict) javascipt syntax for function with any number of args:

/*

function vielleFonctionPasStricteANombreArgVariable(){
  var tabArgs = vielleFonctionPasStricteANombreArgVariable.arguments;
  var nbArgs = tabArgs.length;
  var i;
  for(i=0; i<nbArgs; i++){
    console.log("pour i="+i + " tabArgs[i]="+tabArgs[i]);
  }
}

//vielleFonctionPasStricteANombreArgVariable("abc","def"); //Erreur typescript
//(<any>vielleFonctionPasStricteANombreArgVariable)("abc","def"); //ok mais c'est de la triche

//NB: il semble que l'option --alwaysStrict soit activée d'office avec typescript

*/

function fnA(x: string) {
  return parseInt(x);
}
 
const n1 = fnA.call(undefined,"10"); console.log("n1="+n1) //OK
 
const n2 = fnA.call(undefined , false); console.log("n2="+n2) //erreur inapercu
//ou bien error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string'.
//si option --strictBindCallApply

//RAPPEL sisgnification de bind , call et apply (choses anciennes de ES5 devenues un peu inutiles avec ()=>{...})

var voiture = { 
  immatriculation: "ABC1234",
  marque: "Peugeot",

  displayDetails: function(){
      console.log(this.immatriculation + " " + this.marque);
  } ,

  displayDetailsV2: function(prefixe : string){
    console.log(prefixe + " " + this.immatriculation + " " + this.marque);
  }
}

var voiture2 = { 
  immatriculation: "XYZ789",
  marque: "Renault"
}

voiture.displayDetails();

var functionCarDetails =  voiture.displayDetails;
functionCarDetails(); //display undefined undefined because this is unknown

//.bind() en 2 temps : préparation , puis appel

var functionCarDetailsBindOnVoitureInstance =  voiture.displayDetails.bind(voiture);
functionCarDetailsBindOnVoitureInstance(); //display ABC1234 ABC1234 because this bind to voiture

var functionCarDetailsV2BindOnVoitureInstance =  voiture.displayDetailsV2.bind(voiture);
functionCarDetailsV2BindOnVoitureInstance(">>>>>");

var functionCarDetailsV2BindOnVoiture2Instance =  voiture.displayDetailsV2.bind(voiture2);
functionCarDetailsV2BindOnVoiture2Instance(">>>>>");

//.apply() ou .call() en 1 seul temps : paramétrages et  appel immédiat

var functionCarDetailsV2 =  voiture.displayDetailsV2;
functionCarDetailsV2.apply(voiture2 , ['*****']); //appel sur voiture2 avec tableau de paramétres comportant le préfixe '****'
functionCarDetailsV2.apply(voiture2 , [123]); //Erreur de type détectée sur parametre prefixe (de type string) que si option --strictBindCallApply


functionCarDetailsV2.call(voiture2 , '####'); //appel sur voiture2 avec  paramétre(s)  préfixe '****'




