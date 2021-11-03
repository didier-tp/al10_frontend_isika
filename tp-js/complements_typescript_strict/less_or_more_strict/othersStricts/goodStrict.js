"use strict";
//--alwaysStrict option  Ensures that your files are parsed 
//in the ECMAScript strict mode, and emit “use strict” for each source file.
function fonctionStricteANombreArgVariable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var nbArgs = args.length;
    for (var i = 0; i < nbArgs; i++) {
        console.log("pour i=" + i + " args[i]=" + args[i]);
    }
}
fonctionStricteANombreArgVariable("abc", "def"); //OK
//----------------------
// --strictBindCallApply : When set, TypeScript will check that the built-in methods of functions call, bind, and apply
//   are invoked with correct argument for the underlying function:
var voitureA = {
    immatriculation: "ABC1234",
    marque: "Peugeot",
    displayDetails: function () {
        console.log(this.immatriculation + " " + this.marque);
    },
    displayDetailsV2: function (prefixe) {
        console.log(prefixe + " " + this.immatriculation + " " + this.marque);
    }
};
var voitureB = {
    immatriculation: "XYZ789",
    marque: "Renault"
};
var functionVoitureDetails = voitureA.displayDetailsV2;
functionVoitureDetails.apply(voitureB, ['>>>>>']); //appel sur voitureB avec tableau de paramétres comportant le préfixe '>>>>>'
//functionVoitureDetails.apply(voitureB , [123]); //Erreur de type détectée sur parametre prefixe (de type string)
//--strictFunctionTypes : When enabled, this flag causes functions parameters 
//   to be checked more correctly.
function fnSayHello(x) {
    console.log("Hello, " + x.toLowerCase());
}
// Unsafe assignment (detect by typescript with --strictFunctionTypes activated by default)
//let func: StringOrNumberFunc = fnSayHello;
//func(10);
var func2 = fnSayHello;
//func2(10); //detected error
func2("toto"); //ok (Hello, toto)
