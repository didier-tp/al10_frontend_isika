//chargement/importation des modules :
var mycomputer = require('./mycomputer_module'); // ./ for searching in local relative
var Cercle = mycomputer.Cercle;//accès à la classe Cercle du module

var markdown = require('markdown').markdown; // without "./" in node_modules sub directory

//utilisation des modules importés :
var x=5;
var y=6;
var resStringAdd = mycomputer.myAddStringFct(x,y);
console.log(resStringAdd);
var resStringMult = mycomputer.myMultStringFct(x,y);
console.log(resStringMult);

console.log("infos sur le module="+JSON.stringify(mycomputer.infos));

var c1 = new Cercle(60,60,40);
console.log("perimetre de c1="+c1.perimetre());

var resHtmlStringMult = markdown.toHTML("**"+resStringMult+"**");

//NB: "markdown" est un mini langage de balisage
// où un encadrement par ** génère un équivalent de
// <strong> HTML (proche de <b>)
console.log(resHtmlStringMult);