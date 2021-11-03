"use strict";
//typescript en mode strict
console.log("typescript en mode strict");
var v1;
//console.log("v1="+v1);// error TS2454: Variable 'v1' is used before being assigned.
var v2;
//console.log("v2="+v2); //error TS2454 and v2=undefined at runtime
var v3 = null;
console.log("v3=" + v3); //v3=null
console.log("------------------");
//-----------------------
var PersonneVa = /** @class */ (function () {
    function PersonneVa(prenom, nom) {
        if (prenom === void 0) { prenom = ""; }
        if (nom === void 0) { nom = ""; }
        this.taille = 0; //1ere façon d'initialiser (valeur par défaut)
        //2eme façon d'initialiser (via constructeur)
        this.prenom = prenom;
        this.nom = nom;
    }
    PersonneVa.prototype.methodXy = function () {
        //this.nom = null; //Erreur , null=valeur interdite
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        this.nom = this.nom.toUpperCase();
    };
    return PersonneVa;
}());
var pa1 = new PersonneVa();
console.log("pa1=" + JSON.stringify(pa1));
var pa2 = new PersonneVa("jean", "Bon");
pa2.taille = 175;
pa2.methodXy();
console.log("pa2=" + JSON.stringify(pa2));
console.log("------------------");
//-------------------
var PersonneVb = /** @class */ (function () {
    function PersonneVb(prenom, nom) {
        if (prenom === void 0) { prenom = null; }
        if (nom === void 0) { nom = null; }
        this.taille = null; //1ere façon d'initialiser (valeur par défaut)
        //2eme façon d'initialiser (via constructeur)
        this.prenom = prenom;
        this.nom = nom;
    }
    PersonneVb.prototype.methodXy = function () {
        //this.nom = null; //OK,null=valeur autorisée
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        //this.nom=this.nom.toUpperCase(); //Error this.nom possibly null
        if (this.nom)
            this.nom = this.nom.toUpperCase(); //OK apres verif != null
    };
    return PersonneVb;
}());
var pb1 = new PersonneVb();
console.log("pb1=" + JSON.stringify(pb1));
var pb2 = new PersonneVb("jean", "Bon");
pb2.taille = 175;
pb2.methodXy();
console.log("pb2=" + JSON.stringify(pb2));
console.log("------------------");
//-------------------
var PersonneVc = /** @class */ (function () {
    function PersonneVc(prenom, nom) {
        if (prenom === void 0) { prenom = undefined; }
        if (nom === void 0) { nom = undefined; }
        this.taille = undefined; //1ere façon d'initialiser (valeur par défaut)
        //2eme façon d'initialiser (via constructeur)
        this.prenom = prenom;
        this.nom = nom;
    }
    PersonneVc.prototype.methodXy = function () {
        //this.nom = null; //OK,null=valeur autorisée
        //this.nom = undefined; //Ok , undefined=valeur autorisée
        //this.nom=this.nom.toUpperCase(); //Error this.nom possibly null or undefined
        if (this.nom)
            this.nom = this.nom.toUpperCase(); //OK apres verif != null or undefined
    };
    return PersonneVc;
}());
var pc1 = new PersonneVc();
console.log("pc1=" + JSON.stringify(pc1));
var pc2 = new PersonneVc("jean", "Bon");
pc2.taille = 175;
pc2.methodXy();
console.log("pc2=" + JSON.stringify(pc2));
console.log("------------------");
//-------------------
//NB: avec la syntaxe spéciale et explicite ! le compilateur 
//typescript accepte que certaines variables ne soient exceptionnellement pas initialisées dès le départ
//meme en mode strict
var PersonneVd = /** @class */ (function () {
    function PersonneVd() {
    }
    PersonneVd.prototype.methodXy = function () {
        //this.nom = null; //Erreur,null=valeur interdite
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        this.nom = this.nom.toUpperCase(); //ATTENTION: pas de verification si pas undefined !!!!
        if (this.prenom)
            this.prenom = this.prenom.toUpperCase(); //OK apres verif != null or undefined
    };
    return PersonneVd;
}());
var pvd = new PersonneVd();
console.log("pvd=" + JSON.stringify(pvd));
//pvd.methodXy();  //Erreur à l'execution : TypeError: Cannot read property 'toUpperCase' of undefined
//CONCLUSION: la syntaxe ! est du laxisme explicitement permis en mode strict !!!
//            plutôt deconseillé !!!!
pvd.prenom = "jean";
pvd.nom = "Bon";
pvd.taille = 175;
pvd.methodXy();
console.log("pvd=" + JSON.stringify(pvd));
console.log("------------------");
//------------- enum en mode strict
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
; // start at 0 by default
// enum Color {Red = 1, Green, Blue}; 
var c = Color.Green;
console.log(c); //display as "1" by default
var colorName = Color[1];
console.log(colorName); // "Green" if "Red" is at [0]
var colorEnumVal = Color["Green"];
console.log(colorEnumVal); //1 
colorEnumVal = Color[colorName];
console.log(colorEnumVal); //1 
